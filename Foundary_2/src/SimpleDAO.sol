//SPDX-License-Identification:MIT
pragma solidity ^0.8.20;

contract SimpleDAO{

    //proposal structure
    struct Proposal{
        string description;
        address payable recipent;
        uint amount;
        uint deadline;
        uint yesVotes;
        uint noVotes;
        bool executed;
        mapping(address=>bool) voters;//Track who already voted

    }

     Proposal[] public proposals; // store all proposals


     //💰 allow dao to recieve eth
     receive() external payable{}

  function createProposal(
        string memory _description,
        address payable _recipient,
        uint _amount,
        uint _votingPeriod
    )  public {
        require(_votingPeriod>0 ,"Voting period must be > 0");
        require(_amount>0, "Amount must be >0");
        Proposal storage newProposal = proposals.push();

        newProposal.recipent=_recipient;

        newProposal.amount=_amount;
        newProposal.description = _description;
        newProposal.deadline = block.timestamp +_votingPeriod; // voting open for 1 day
        newProposal.executed = false;
    }

      function vote(uint _proposalId, bool _voteYes) public {
        Proposal storage proposal = proposals[_proposalId];

        require(block.timestamp < proposal.deadline, "Voting ended!");
        require(!proposal.voters[msg.sender], "Already voted!");

        proposal.voters[msg.sender] = true; // mark as voted

        if (_voteYes) {
            proposal.yesVotes++;
        } else {
            proposal.noVotes++;
        }
    }

    function executeProposal(uint _proposalId) public{
        Proposal storage proposal=proposals[_proposalId];
        require(block.timestamp>=proposal.deadline,"Voting not ended");
        require(!proposal.executed,"Already executed");
        if(proposal.yesVotes>proposal.noVotes){
            //Proposal passes
            //for now just mark executed,no funds action
            (bool success,)=proposal.recipent.call{value:proposal.amount}("");
            require(success,"Transfer failed");
        }
        proposal.executed=true;
    }

     function getProposal(uint _proposalId) 
        public 
        view 
        returns (string memory, uint, uint, uint, bool) 
    {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.description,
            proposal.deadline,
            proposal.yesVotes,
            proposal.noVotes,
            proposal.executed
        );
    }

}