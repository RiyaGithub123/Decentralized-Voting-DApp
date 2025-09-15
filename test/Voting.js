const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("Voting", function () {
  let voting;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy();
  });

  describe("Deployment", function () {
    it("Should set the initial proposal count to 0", async function () {
      expect(await voting.proposalCount()).to.equal(0);
    });
  });

  describe("Creating Proposals", function () {
    it("Should create a proposal with correct details", async function () {
      const description = "Should we implement feature X?";
      const timeUntilDeadline = 86400; // 1 day

      const tx = await voting.createProposal(description, timeUntilDeadline);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);
      
      await expect(tx)
        .to.emit(voting, "ProposalCreated")
        .withArgs(1, description, block.timestamp + timeUntilDeadline);

      expect(await voting.proposalCount()).to.equal(1);

      const proposal = await voting.getProposal(1);
      expect(proposal.description).to.equal(description);
      expect(proposal.voteCountYes).to.equal(0);
      expect(proposal.voteCountNo).to.equal(0);
      expect(proposal.executed).to.equal(false);
    });

    it("Should increment proposal count for multiple proposals", async function () {
      await voting.createProposal("Proposal 1", 86400);
      await voting.createProposal("Proposal 2", 86400);
      await voting.createProposal("Proposal 3", 86400);

      expect(await voting.proposalCount()).to.equal(3);
    });
  });

  describe("Voting", function () {
    beforeEach(async function () {
      await voting.createProposal("Test proposal", 86400);
    });

    it("Should allow voting yes", async function () {
      await expect(voting.connect(addr1).vote(1, true))
        .to.emit(voting, "VoteCast")
        .withArgs(1, addr1.address, true);

      const proposal = await voting.getProposal(1);
      expect(proposal.voteCountYes).to.equal(1);
      expect(proposal.voteCountNo).to.equal(0);

      expect(await voting.hasVoted(1, addr1.address)).to.equal(true);
    });

    it("Should allow voting no", async function () {
      await expect(voting.connect(addr1).vote(1, false))
        .to.emit(voting, "VoteCast")
        .withArgs(1, addr1.address, false);

      const proposal = await voting.getProposal(1);
      expect(proposal.voteCountYes).to.equal(0);
      expect(proposal.voteCountNo).to.equal(1);
    });

    it("Should prevent double voting", async function () {
      await voting.connect(addr1).vote(1, true);

      await expect(voting.connect(addr1).vote(1, false))
        .to.be.revertedWith("Already voted");
    });

    it("Should prevent voting on invalid proposal", async function () {
      await expect(voting.connect(addr1).vote(99, true))
        .to.be.revertedWith("Invalid proposal ID");
    });

    it("Should prevent voting after deadline", async function () {
      // Fast forward time past deadline
      await time.increase(86401); // 1 day + 1 second

      await expect(voting.connect(addr1).vote(1, true))
        .to.be.revertedWith("Voting over");
    });

    it("Should allow multiple users to vote", async function () {
      await voting.connect(addr1).vote(1, true);
      await voting.connect(addr2).vote(1, false);
      await voting.connect(owner).vote(1, true);

      const proposal = await voting.getProposal(1);
      expect(proposal.voteCountYes).to.equal(2);
      expect(proposal.voteCountNo).to.equal(1);
    });
  });

  describe("Getting Results", function () {
    beforeEach(async function () {
      await voting.createProposal("Test proposal", 86400);
      await voting.connect(addr1).vote(1, true);
      await voting.connect(addr2).vote(1, false);
    });

    it("Should return correct results while voting is active", async function () {
      const result = await voting.getResult(1);
      expect(result.description).to.equal("Test proposal");
      expect(result.yes).to.equal(1);
      expect(result.no).to.equal(1);
      expect(result.isOver).to.equal(false);
    });

    it("Should return correct results after deadline", async function () {
      await time.increase(86401); // Fast forward past deadline

      const result = await voting.getResult(1);
      expect(result.description).to.equal("Test proposal");
      expect(result.yes).to.equal(1);
      expect(result.no).to.equal(1);
      expect(result.isOver).to.equal(true);
    });

    it("Should revert for invalid proposal ID", async function () {
      await expect(voting.getResult(99))
        .to.be.revertedWith("Invalid proposal ID");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await voting.createProposal("Test proposal", 86400);
    });

    it("Should check if user has voted correctly", async function () {
      expect(await voting.hasVoted(1, addr1.address)).to.equal(false);
      
      await voting.connect(addr1).vote(1, true);
      
      expect(await voting.hasVoted(1, addr1.address)).to.equal(true);
      expect(await voting.hasVoted(1, addr2.address)).to.equal(false);
    });
  });
});
