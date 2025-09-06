//SPDX-License-Identification:MIT
pragma solidity ^0.8.20;

contract SimpleDAO{

    //proposal structure
    struct Proposal{
        string description;
        uint deadline;
        uint yesVotes;
        uint noVotes;
        bool executed;
        mapping(address=>bool) voters;//Track who already voted

    }

     Proposal[] public proposals; // store all proposals

       function createProposal(string memory _description) public {
        Proposal storage newProposal = proposals.push();
        newProposal.description = _description;
        newProposal.deadline = block.timestamp + 1 days; // voting open for 1 day
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