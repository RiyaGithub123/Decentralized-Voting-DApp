# 🗳️ Decentralized Voting DApp

A full-stack decentralized application (DApp) for voting on proposals, built with Solidity, Hardhat, React, and ethers.js. **Now deployed on Sepolia testnet!**

🌐 **Live Demo**: [Replace with your actual Vercel URL]  
🔗 **Contract Address**: `0xd3B11D906B4b14b68381d96abB9d5523f7500C43` (Sepolia)  
🔍 **View on Etherscan**: [https://sepolia.etherscan.io/address/0xd3B11D906B4b14b68381d96abB9d5523f7500C43](https://sepolia.etherscan.io/address/0xd3B11D906B4b14b68381d96abB9d5523f7500C43)

## 📋 Features

- **Create Proposals**: Users can create voting proposals with custom descriptions and deadlines
- **Vote on Proposals**: Cast YES/NO votes on active proposals
- **Real-time Results**: View live voting results and final outcomes
- **Prevent Double Voting**: Smart contract ensures each address can only vote once per proposal  
- **Deadline Management**: Automatic voting period enforcement
- **Beautiful UI**: Modern, responsive React frontend
- **MetaMask Integration**: Connect your wallet to interact with the blockchain

## 🛠️ Technology Stack

- **Smart Contract**: Solidity ^0.8.19
- **Development Framework**: Hardhat
- **Frontend**: React.js
- **Blockchain Interaction**: ethers.js
- **Network**: Sepolia Ethereum Testnet
- **RPC Provider**: Alchemy
- **Deployment**: Vercel (Frontend)
- **Styling**: CSS3 with modern gradients and animations
- **Testing**: Hardhat/Chai

## 🏗️ Project Structure

```
build-on-ethereum/
├── contracts/               # Smart contracts
│   └── Voting.sol          # Main voting contract
├── test/                   # Smart contract tests
│   └── Voting.js           # Comprehensive test suite
├── scripts/                # Deployment scripts
│   └── deploy.js           # Contract deployment script
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # React components
│       ├── contracts/      # Generated contract ABIs
│       └── App.js          # Main app component
└── hardhat.config.js       # Hardhat configuration
```

## 🚀 Quick Start for Users

### ⚡ **Using the Live DApp** (Recommended)

1. **Visit the live DApp**: [Your Vercel URL here]

2. **Setup MetaMask for Sepolia:**
   - Install MetaMask browser extension
   - Add Sepolia Testnet to MetaMask:
     - Network Name: `Sepolia`
     - RPC URL: `https://sepolia.infura.io/v3/YOUR_KEY` or `https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY`
     - Chain ID: `11155111`
     - Currency Symbol: `ETH`
     - Block Explorer: `https://sepolia.etherscan.io`

3. **Get Sepolia Test ETH** (free):
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Or [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
   - Enter your wallet address and get free test ETH

4. **Connect & Vote:**
   - Connect your MetaMask wallet to the DApp
   - Make sure you're on Sepolia network
   - Create proposals and vote!

---

## 🛠️ Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Git

### Local Development

1. **Clone the repository:**
   ```bash
   git clone [your-repo-url]
   cd decentralized-voting-dapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup** (for deployment only):
   ```bash
   # Create .env file in root directory
   ALCHEMY_API_KEY=your_alchemy_api_key
   PRIVATE_KEY=your_wallet_private_key
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

5. **Local Development** (optional):
   ```bash
   # Start local blockchain
   npm run node
   
   # Deploy to local network (new terminal)
   npm run deploy:localhost
   
   # Start frontend
   npm run frontend
   ```

6. **Deploy to Sepolia** (if you want your own instance):
   ```bash
   npm run deploy:sepolia
   ```

## 📱 Using the DApp

### 🔗 Connect to Sepolia Network

**Important**: Make sure MetaMask is connected to **Sepolia Testnet** before using the DApp!

1. **Switch to Sepolia Network** in MetaMask
2. **Get Test ETH** from faucets (links provided above)
3. **Visit the DApp** and connect your wallet

### 🗳️ Voting Process

1. **Connect Wallet**: Click "Connect Wallet" to connect your MetaMask
2. **Create Proposal**: 
   - Enter a description for your proposal
   - Set voting duration (days and hours)
   - Click "Create Proposal" and confirm transaction
   - Wait for confirmation (~15 seconds on Sepolia)
3. **Vote on Proposals**:
   - Browse active proposals
   - Click "Vote YES" or "Vote NO"
   - Confirm transaction in MetaMask
   - Pay small gas fee (~$0.001-0.01 worth of ETH)
4. **View Results**: 
   - See real-time vote counts
   - Check final results after deadline

### ⚠️ **Important Notes for Users:**

- **Network**: Must be on Sepolia Testnet
- **Gas Fees**: You need Sepolia ETH for transactions (free from faucets)
- **Transaction Time**: ~15 seconds for confirmation
- **One Vote Only**: Each wallet can only vote once per proposal

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm run test
```

The tests cover:
- ✅ Proposal creation
- ✅ Voting functionality
- ✅ Double voting prevention
- ✅ Deadline enforcement
- ✅ Results retrieval
- ✅ Edge cases and error handling

## 🔧 Available Scripts

```bash
npm run test              # Run smart contract tests
npm run compile           # Compile smart contracts
npm run deploy            # Deploy to default network
npm run deploy:localhost  # Deploy to localhost
npm run deploy:sepolia    # Deploy to Sepolia testnet
npm run node              # Start Hardhat local network
npm run frontend          # Start React frontend
npm run dev               # Run both node and frontend
npm run clean             # Clean Hardhat cache
```

## 📊 Smart Contract Functions

### Core Functions

- `createProposal(string description, uint timeUntilDeadline)`: Create a new voting proposal
- `vote(uint proposalId, bool support)`: Vote on a proposal (true = YES, false = NO)
- `getResult(uint proposalId)`: Get proposal results and status
- `getProposal(uint proposalId)`: Get full proposal details
- `hasVoted(uint proposalId, address voter)`: Check if an address has voted

### Events

- `ProposalCreated(uint indexed proposalId, string description, uint deadline)`
- `VoteCast(uint indexed proposalId, address indexed voter, bool support)`

## 🔒 Security Features

- **Access Control**: Only prevents double voting, anyone can create proposals
- **Input Validation**: Proper bounds checking and error messages
- **Deadline Enforcement**: Time-based voting restrictions
- **Event Logging**: All actions are logged for transparency

## 🚀 Deployment Information

### 🌐 **Current Deployment**

- **Network**: Sepolia Ethereum Testnet
- **Contract Address**: `0xd3B11D906B4b14b68381d96abB9d5523f7500C43`
- **Frontend**: Deployed on Vercel
- **RPC Provider**: Alchemy

### 📋 **Vercel Deployment Steps**

When deploying the frontend to Vercel:

1. **Upload project to GitHub** (`.env` file will be ignored)
2. **Connect GitHub to Vercel**
3. **Import repository to Vercel**
4. **Configure Vercel settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. **Deploy!**

### 🔄 **Redeploying Smart Contract**

To deploy your own instance:

1. **Setup environment:**
   ```bash
   # Create .env file
   ALCHEMY_API_KEY=your_alchemy_api_key
   PRIVATE_KEY=your_wallet_private_key
   ```

2. **Deploy to Sepolia:**
   ```bash
   npm run deploy:sepolia
   ```

3. **Update frontend and redeploy to Vercel**

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Useful Links

- **Live DApp**: [Your Vercel URL]
- **Contract on Sepolia**: [https://sepolia.etherscan.io/address/0xd3B11D906B4b14b68381d96abB9d5523f7500C43](https://sepolia.etherscan.io/address/0xd3B11D906B4b14b68381d96abB9d5523f7500C43)
- **Sepolia Faucet**: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- **MetaMask**: [https://metamask.io/](https://metamask.io/)
- **Alchemy**: [https://www.alchemy.com/](https://www.alchemy.com/)

## 📞 Support

If you're having issues:

1. **Make sure you're on Sepolia network** in MetaMask
2. **Check you have Sepolia ETH** for gas fees
3. **Try refreshing the page** and reconnecting wallet
4. **Check browser console** for error messages

## ⚠️ Disclaimer

This is a demo application for educational purposes. Built on Sepolia testnet using test tokens with no real value. Do not use with real funds on mainnet without proper security audits.

---

**Happy Voting on Sepolia!** 🗳️✨ 

*Ready for production on Ethereum mainnet with proper security audits and more features!*
