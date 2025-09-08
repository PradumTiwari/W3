//SPDX-License-Identification:MIT

pragma solidity ^0.8.20;

contract TreasuryDAOWithQuorum{
    struct Proposal{
        string description;
        address payable recipent;
        uint amount;
        uint deadline;
        uint yesVotes;
        uint noVotes;
        bool executed;
        mapping(address=>bool) voters;
    }



    Proposal[] public proposals;

    uint public quorumVotes;//Minimum no of total votes

    receive() external payable {}

    //set quorum at ddeployment
    constructor(uint _qorumVotes){
        require(_qorumVotes>0,"Quorum votes must be >0");

        quorumVotes=_qorumVotes;
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
        p.executed = false;


    }

    function vote(uint _proposalId,bool _voteYes) public{
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



    function executeProposal(uint _proposalId) public{
        Proposal storage p=proposals[_proposalId];

        require(block.timestamp>=p.deadline,"Voting not ended");

        require(!p.executed,"Already executed");

        uint totalVotes=p.yesVotes+p.noVotes;
        require(totalVotes>quorumVotes,"Quorum not reached");

        require(p.yesVotes>p.noVotes,"Proposal did not pass");
        
        require(address(this).balance>=p.amount,"Insufficent funds");

        //Effect before interaction

        p.executed=true;

        (bool success,)=p.recipent.call{value:p.amount}("");

        require(success,"Transfer failed");
    }

    function getProposal(uint _proposalId) public view returns(string memory description,address recipent,uint amount,uint deadline,uint yesVotes,uint noVotes,bool executed){

        Proposal storage p=proposals[_proposalId];

           return (p.description, p.recipent, p.amount, p.deadline, p.yesVotes, p.noVotes, p.executed);
    

    }

      function getProposalCount() public view returns (uint) {
        return proposals.length;
    }
}