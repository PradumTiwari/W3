// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

contract TreasuryDAOWithQuorum is AutomationCompatibleInterface {


    struct Proposal{
        string description;
        address payable recipent;
        uint amount;
        uint deadline;
        uint yesVotes;
        uint noVotes;
        bool executed;
        bool approved; //marks proposal as passed before voting
        uint readyAt;// timestamp after which it can be executed
        mapping(address=>bool) voters;
    }



    Proposal[] public proposals;

    uint public quorumVotes;//Minimum no of total votes

    uint public timelockDelay; //Seconds to wait after approval

    //Pointer to avoid rescan from 0 every time(gas-freindly)
    uint public nextExecutable;


    receive() external payable {}

    //set quorum at ddeployment
    constructor(uint _qorumVotes,uint _timelockDelay){
        require(_qorumVotes>0,"Quorum votes must be >0");
        require(_timelockDelay>0,"TIme lock must be >0");
        quorumVotes=_qorumVotes;
        timelockDelay=_timelockDelay;
        nextExecutable=0;
    }

    //Creat proposal : recipent+amount+voting period
    function createProposal(
        string memory _description,
        address payable _recipent,
        uint _amount,
        uint _votingPeriod
    ) public{

        require(_votingPeriod>0,"Voting period>0");

        require(_recipent!=address(0),"Invalid recipent");

        Proposal storage p = proposals.push();
        p.description = _description;
        p.recipent = _recipent;
        p.amount = _amount;
        p.deadline = block.timestamp + _votingPeriod;
        
    }

    function vote(uint _proposalId,bool _voteYes) public{

        require(_proposalId<proposals.length,"Proposal Not found");
        Proposal storage p=proposals[_proposalId];

        require(block.timestamp<p.deadline,"Voting ended");
        require(!p.voters[msg.sender],"already voted");

        p.voters[msg.sender]=true;

        if(_voteYes){
            p.yesVotes++;
        }
        else{
            p.noVotes++;
        }
    }

    function finalizeProposal(uint _proposalId) public{
        Proposal storage p=proposals[_proposalId];
        require(block.timestamp>=p.deadline,"Voting not ended");
        require(!p.approved,"Already finalized");
        uint totalVotes=p.yesVotes+p.noVotes;
        require(totalVotes>=quorumVotes,"Quorum not reached");
        require(p.yesVotes>p.noVotes,"proposal did not pass");
        p.approved=true;
        p.readyAt=block.timestamp+timelockDelay;
    }

//Notice execture after timelock
    function executeProposal(uint _proposalId) public{
        Proposal storage p=proposals[_proposalId];

        require(p.approved,"Not approved");
        require(block.timestamp>=p.readyAt,"timeLock not passed");

        require(!p.executed,"Already executed");

        require(address(this).balance>=p.amount,"Insuffficent funds");

       

        p.executed=true;

        (bool success,)=p.recipent.call{value:p.amount}("");

        require(success,"Transfer failed");


        while(nextExecutable<proposals.length){
            Proposal storage q=proposals[nextExecutable];
            if(q.executed){
                nextExecutable++;
            }
            else{
                break;
            }
        }
    }

    //ChainLink automation interface

    //checkUpKeep is called off-chain by automation nodes
    //it should return (true,performData) when there is atleast one proposal ready to be executed

       function checkUpkeep(bytes calldata) external  override returns (bool upkeepNeeded, bytes memory performData) {   uint len=proposals.length;
        uint i=nextExecutable;

        //Scan for first ready proposal 
        for(;i<len;i++){
            Proposal storage p=proposals[i];
            //ready if approved,not executed,and readyAt<=now

            if(p.approved&&!p.executed&&block.timestamp>=p.readyAt){
                upkeepNeeded=true;
                performData=abi.encode(i);
                return (upkeepNeeded,performData);
            }
        }

        upkeepNeeded=false;
        performData=bytes("");
    }


    //PerformUpKeep is called on-chain by automation nodes when checkUpkeep returned true

    function performUpkeep(bytes calldata performData) external override {    require(performData.length==32,"Invalid perform data");
        uint256 proposalId=abi.decode(performData,(uint256));

       require(proposalId<proposals.length,"Proposal not found");
       Proposal storage p=proposals[proposalId];

       require(p.approved,"Not approved");
       require(!p.executed,"Already executed");
       require(block.timestamp>=p.readyAt,"TImelock not passed");
       require(address(this).balance>=p.amount,"insufficent funds");

       //Perform executrion (same as execute propsal )
       p.executed=true;
       (bool success,)=p.recipent.call{value:p.amount}("");
       require(success,"Transfer failed");

       //update next executable 
         while (nextExecutable < proposals.length) {
            Proposal storage q = proposals[nextExecutable];
            if (q.executed) { nextExecutable++; } else { break; }
        }
    }


    function getProposal(uint _proposalId) public view returns(string memory description,address recipent,uint amount,uint deadline,uint yesVotes,uint noVotes,bool executed,bool approved,uint readyAt){

        Proposal storage p=proposals[_proposalId];

           return (p.description, p.recipent, p.amount, p.deadline, p.yesVotes, p.noVotes, p.executed,p.approved,p.readyAt);
    

    }

      function getProposalCount() public view returns (uint) {
        return proposals.length;
    }
}