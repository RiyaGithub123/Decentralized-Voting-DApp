// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string description;
        uint voteCountYes;
        uint voteCountNo;
        uint deadline; // timestamp
        bool executed;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount;

    mapping(uint => mapping(address => bool)) public voted;

    event ProposalCreated(uint indexed proposalId, string description, uint deadline);
    event VoteCast(uint indexed proposalId, address indexed voter, bool support);

    function createProposal(string memory desc, uint timeUntilDeadline) public {
        proposalCount++;
        proposals[proposalCount] = Proposal({
            description: desc,
            voteCountYes: 0,
            voteCountNo: 0,
            deadline: block.timestamp + timeUntilDeadline,
            executed: false
        });
        
        emit ProposalCreated(proposalCount, desc, block.timestamp + timeUntilDeadline);
    }

    function vote(uint proposalId, bool support) public {
        Proposal storage p = proposals[proposalId];
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        require(block.timestamp <= p.deadline, "Voting over");
        require(!voted[proposalId][msg.sender], "Already voted");
        
        voted[proposalId][msg.sender] = true;
        if (support) {
            p.voteCountYes++;
        } else {
            p.voteCountNo++;
        }
        
        emit VoteCast(proposalId, msg.sender, support);
    }

    function getResult(uint proposalId) public view returns (string memory description, uint yes, uint no, bool isOver) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        Proposal storage p = proposals[proposalId];
        description = p.description;
        yes = p.voteCountYes;
        no = p.voteCountNo;
        isOver = (block.timestamp > p.deadline);
    }

    function getProposal(uint proposalId) public view returns (Proposal memory) {
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal ID");
        return proposals[proposalId];
    }

    function hasVoted(uint proposalId, address voter) public view returns (bool) {
        return voted[proposalId][voter];
    }
}
