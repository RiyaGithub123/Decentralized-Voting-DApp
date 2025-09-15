const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  console.log("Voting contract deployed to:", await voting.getAddress());

  // Save the contract address and ABI for the frontend
  const contractsDir = './frontend/src/contracts';

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    `${contractsDir}/contract-address.json`,
    JSON.stringify({ Voting: await voting.getAddress() }, undefined, 2)
  );

  const VotingArtifact = await hre.artifacts.readArtifact("Voting");

  fs.writeFileSync(
    `${contractsDir}/Voting.json`,
    JSON.stringify(VotingArtifact, null, 2)
  );

  console.log("Contract address and ABI saved to frontend/src/contracts/");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
