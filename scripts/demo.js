const hre = require("hardhat");

async function main() {
  const [deployer, voter1, voter2, voter3] = await hre.ethers.getSigners();

  console.log("🗳️  Voting DApp Demo");
  console.log("==================");
  
  // Deploy contract
  console.log("\n📋 Deploying Voting Contract...");
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();
  
  console.log("✅ Contract deployed to:", await voting.getAddress());
  console.log("📊 Initial proposal count:", await voting.proposalCount());

  // Create some demo proposals
  console.log("\n🆕 Creating Demo Proposals...");
  
  await voting.createProposal("Should we implement dark mode?", 86400); // 1 day
  console.log("✅ Proposal 1 created: 'Should we implement dark mode?'");
  
  await voting.createProposal("Should we add multi-language support?", 172800); // 2 days
  console.log("✅ Proposal 2 created: 'Should we add multi-language support?'");
  
  await voting.createProposal("Should we migrate to TypeScript?", 259200); // 3 days
  console.log("✅ Proposal 3 created: 'Should we migrate to TypeScript?'");

  console.log("\n📊 Total proposals:", await voting.proposalCount());

  // Demo voting
  console.log("\n🗳️  Demo Voting Session...");
  
  // Proposal 1 voting
  await voting.connect(voter1).vote(1, true);  // YES
  await voting.connect(voter2).vote(1, false); // NO
  await voting.connect(voter3).vote(1, true);  // YES
  console.log("✅ Votes cast for Proposal 1");

  // Proposal 2 voting
  await voting.connect(voter1).vote(2, true);  // YES
  await voting.connect(voter2).vote(2, true);  // YES
  console.log("✅ Votes cast for Proposal 2");

  // Proposal 3 voting
  await voting.connect(voter1).vote(3, false); // NO
  console.log("✅ Vote cast for Proposal 3");

  // Display results
  console.log("\n📊 Current Voting Results:");
  console.log("==========================");

  for (let i = 1; i <= 3; i++) {
    const result = await voting.getResult(i);
    const proposal = await voting.getProposal(i);
    
    console.log(`\nProposal ${i}: ${result.description}`);
    console.log(`└─ YES: ${result.yes} votes`);
    console.log(`└─ NO: ${result.no} votes`);
    console.log(`└─ Status: ${result.isOver ? 'ENDED' : 'ACTIVE'}`);
    console.log(`└─ Deadline: ${new Date(Number(proposal.deadline) * 1000).toLocaleString()}`);
    
    if (result.isOver) {
      const winner = Number(result.yes) > Number(result.no) ? "PASSED" : 
                    Number(result.no) > Number(result.yes) ? "REJECTED" : "TIE";
      console.log(`└─ Result: ${winner}`);
    }
  }

  // Check voting status
  console.log("\n👥 Voting Status Check:");
  console.log("======================");
  
  for (let i = 1; i <= 3; i++) {
    const voter1Voted = await voting.hasVoted(i, voter1.address);
    const voter2Voted = await voting.hasVoted(i, voter2.address);
    const voter3Voted = await voting.hasVoted(i, voter3.address);
    
    console.log(`Proposal ${i}:`);
    console.log(`└─ Voter 1: ${voter1Voted ? '✅ Voted' : '❌ Not voted'}`);
    console.log(`└─ Voter 2: ${voter2Voted ? '✅ Voted' : '❌ Not voted'}`);
    console.log(`└─ Voter 3: ${voter3Voted ? '✅ Voted' : '❌ Not voted'}`);
  }

  console.log("\n🎉 Demo completed successfully!");
  console.log("\n💡 To interact with the frontend:");
  console.log("   1. Make sure Hardhat node is running: npm run node");
  console.log("   2. Deploy contract: npm run deploy");
  console.log("   3. Start frontend: npm run frontend");
  console.log("   4. Connect MetaMask to localhost:8545");
  console.log("   5. Import a test account from Hardhat node");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error in demo:", error);
    process.exit(1);
  });
