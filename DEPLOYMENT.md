# 🌐 Testnet Deployment Guide

This guide will help you deploy the Voting DApp to Ethereum testnets like Goerli or Sepolia.

## 🔑 Prerequisites

1. **Get Test ETH**: 
   - Goerli: https://goerlifaucet.com/
   - Sepolia: https://sepoliafaucet.com/

2. **RPC Provider**: Get a free API key from:
   - Alchemy: https://www.alchemy.com/
   - Infura: https://infura.io/

3. **MetaMask**: Make sure you have the testnet added

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the root directory:

```bash
# .env
GOERLI_RPC_URL="https://eth-goerli.alchemyapi.io/v2/YOUR-API-KEY"
SEPOLIA_RPC_URL="https://eth-sepolia.alchemyapi.io/v2/YOUR-API-KEY"
PRIVATE_KEY="your-wallet-private-key-here"
ETHERSCAN_API_KEY="your-etherscan-api-key"
```

### 2. Update Hardhat Config

Add to `hardhat.config.js`:

```javascript
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 5
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
```

### 3. Install Dependencies

```bash
npm install dotenv
```

## 🚀 Deployment Steps

### Deploy to Goerli

```bash
npx hardhat run scripts/deploy.js --network goerli
```

### Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Verify Contract on Etherscan

```bash
npx hardhat verify --network goerli CONTRACT_ADDRESS
```

## 🔧 Frontend Configuration

After deployment, update the frontend:

1. **Update Contract Address**: 
   - Copy the deployed contract address
   - Update `frontend/src/contracts/contract-address.json`

2. **Network Configuration**: 
   - Make sure MetaMask is connected to the correct testnet
   - The frontend will automatically detect the network

## 📱 MetaMask Setup

### Add Goerli Testnet
- Network Name: Goerli Test Network
- RPC URL: https://goerli.infura.io/v3/YOUR-PROJECT-ID
- Chain ID: 5
- Currency Symbol: ETH
- Block Explorer: https://goerli.etherscan.io

### Add Sepolia Testnet
- Network Name: Sepolia Test Network  
- RPC URL: https://sepolia.infura.io/v3/YOUR-PROJECT-ID
- Chain ID: 11155111
- Currency Symbol: ETH
- Block Explorer: https://sepolia.etherscan.io

## ✅ Testing on Testnet

1. **Deploy Contract**: Follow deployment steps above
2. **Update Frontend**: Update contract address
3. **Connect Wallet**: Switch MetaMask to testnet
4. **Test Functions**: Create proposals and vote
5. **Verify on Etherscan**: Check transactions and contract state

## 🔍 Troubleshooting

### Common Issues

**"Insufficient funds"**
- Get more test ETH from faucets
- Check your wallet balance

**"Network Error"**  
- Verify RPC URL in MetaMask
- Check internet connection

**"Contract not found"**
- Verify contract address in frontend
- Ensure contract was deployed successfully

**"Transaction failed"**
- Check gas fees
- Verify contract functions are working

## 📊 Gas Optimization Tips

1. **Batch Operations**: Group multiple votes if possible
2. **Efficient Data Types**: Use appropriate uint sizes  
3. **Events**: Use events instead of storage for logs
4. **View Functions**: Use view functions for read operations

## 🔒 Security Considerations

1. **Private Keys**: Never commit private keys to git
2. **Environment Variables**: Use .env for sensitive data
3. **Test Thoroughly**: Test all functions on testnet first
4. **Audit**: Consider professional audit for mainnet

---

**Ready to go live!** 🚀
