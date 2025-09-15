import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import VotingContract from './contracts/Voting.json';
import contractAddress from './contracts/contract-address.json';
import ProposalList from './components/ProposalList';
import CreateProposal from './components/CreateProposal';

function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [proposalCount, setProposalCount] = useState(0);

  useEffect(() => {
    initEthers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initEthers = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setAccount(address);
        setSigner(provider);

        // Initialize contract
        const votingContract = new ethers.Contract(
          contractAddress.Voting,
          VotingContract.abi,
          signer
        );
        setContract(votingContract);

        // Load proposals
        loadProposals(votingContract);

      } catch (error) {
        console.error('Error connecting to wallet:', error);
        alert('Please install MetaMask or another Web3 wallet!');
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet!');
    }
  };

  const loadProposals = async (contractInstance = contract) => {
    if (!contractInstance) return;

    try {
      const count = await contractInstance.proposalCount();
      setProposalCount(Number(count));

      const proposalsArray = [];
      for (let i = 1; i <= count; i++) {
        const proposal = await contractInstance.getProposal(i);
        const result = await contractInstance.getResult(i);
        
        proposalsArray.push({
          id: i,
          description: proposal.description,
          voteCountYes: Number(proposal.voteCountYes),
          voteCountNo: Number(proposal.voteCountNo),
          deadline: Number(proposal.deadline),
          executed: proposal.executed,
          isOver: result.isOver
        });
      }
      setProposals(proposalsArray);
    } catch (error) {
      console.error('Error loading proposals:', error);
    }
  };

  const connectWallet = async () => {
    await initEthers();
  };

  const formatTimeLeft = (deadline) => {
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = deadline - now;
    
    if (timeLeft <= 0) return 'Voting ended';
    
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    
    return `${days}d ${hours}h ${minutes}m left`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🗳️ Decentralized Voting DApp</h1>
        {account ? (
          <div className="wallet-info">
            <p>Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          </div>
        ) : (
          <button onClick={connectWallet} className="connect-button">
            Connect Wallet
          </button>
        )}
      </header>

      {account && contract && (
        <main className="main-content">
          <div className="section">
            <h2>Create New Proposal</h2>
            <CreateProposal 
              contract={contract} 
              onProposalCreated={loadProposals}
            />
          </div>

          <div className="section">
            <h2>Active Proposals ({proposalCount})</h2>
            <ProposalList 
              proposals={proposals}
              contract={contract}
              account={account}
              onVote={loadProposals}
              formatTimeLeft={formatTimeLeft}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
