# 🗳️ Decentralized Voting DApp

This is a full-stack decentralized application (DApp) that allows users to create and vote on proposals. The application is built using a modern web development stack, including Solidity for the smart contract, Hardhat for the development environment, React for the frontend, and ethers.js for interacting with the Ethereum blockchain.

The DApp is currently deployed on the **Sepolia testnet**.

- 🌐 **Live Demo**: [Link to your Vercel deployment]
- 🔗 **Contract Address**: `0xd3B11D906B4b14b68381d96abB9d5523f7500C43` (on Sepolia)
- 🔍 **Etherscan**: [https://sepolia.etherscan.io/address/0xd3B11D906B4b14b68381d96abB9d5523f7500C43](https://sepolia.etherscan.io/address/0xd3B11D906B4b14b68381d96abB9d5523f7500C43)

## ✨ Features

- **Create Proposals**: Any user can create a new proposal for others to vote on.
- **Vote on Proposals**: Users can cast a "Yes" or "No" vote on any active proposal.
- **Real-time Results**: Voting results are updated in real-time and can be viewed by anyone.
- **Prevent Double Voting**: The smart contract ensures that each user can only vote once per proposal.
- **Deadline Enforcement**: Proposals have a voting deadline, after which no more votes can be cast.
- **MetaMask Integration**: Users can easily connect their MetaMask wallet to interact with the DApp.
- **Modern UI**: The frontend is built with React and styled with modern CSS for a great user experience.

## 🛠️ Tech Stack

- **Smart Contract**: Solidity `^0.8.19`
- **Development Environment**: Hardhat
- **Frontend**: React.js
- **Blockchain Interaction**: ethers.js
- **Network**: Sepolia Testnet
- **RPC Provider**: Alchemy
- **Frontend Deployment**: Vercel
- **Styling**: CSS3
- **Testing**: Hardhat/Chai

## 🏗️ Project Structure

```
/
├── contracts/
│   └── Voting.sol          # The main smart contract for the voting system
├── test/
│   └── Voting.js           # Tests for the smart contract
├── scripts/
│   └── deploy.js           # Script for deploying the smart contract
├── frontend/
│   └── src/
│       ├── components/     # React components for the UI
│       ├── contracts/      # ABI and contract address
│       └── App.js          # Main React application component
└── hardhat.config.js       # Hardhat configuration file
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [MetaMask](https://metamask.io/) browser extension
- [Git](https://git-scm.com/)

### Local Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/GangserX/Decentralized-Voting-DApp.git
    cd Decentralized-Voting-DApp
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following, replacing the placeholder values with your own:

    ```
    SEPOLIA_URL=YOUR_ALCHEMY_SEPOLIA_URL
    PRIVATE_KEY=YOUR_METAMASK_PRIVATE_KEY
    ```

### Running the Application

1.  **Start the local Hardhat node:**

    ```bash
    npx hardhat node
    ```

2.  **Deploy the smart contract to the local network:**

    In a new terminal, run:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

3.  **Start the React frontend:**

    In another new terminal, run:
    ```bash
    npm run frontend
    ```

    The application should now be running at `http://localhost:3000`.

## 🧪 Running Tests

To run the tests for the smart contract, execute the following command:

```bash
npx hardhat test
```

## � Deployment

### Deploying the Smart Contract

To deploy the smart contract to the Sepolia testnet, run:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Make sure you have configured your `.env` file with the correct Sepolia RPC URL and your private key, and that your account has enough Sepolia ETH to cover the gas fees.

### Deploying the Frontend

The frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

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
