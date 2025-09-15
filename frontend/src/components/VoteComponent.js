import React, { useState, useEffect } from 'react';

const VoteComponent = ({ proposalId, contract, account, onVote }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkVotingStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalId, account]);

  const checkVotingStatus = async () => {
    try {
      const voted = await contract.hasVoted(proposalId, account);
      setHasVoted(voted);
    } catch (error) {
      console.error('Error checking voting status:', error);
    }
    setLoading(false);
  };

  const handleVote = async (support) => {
    setVoting(true);
    
    try {
      const tx = await contract.vote(proposalId, support);
      await tx.wait();
      
      setHasVoted(true);
      
      if (onVote) {
        onVote();
      }
      
      alert(`Vote cast successfully! You voted ${support ? 'YES' : 'NO'}`);
    } catch (error) {
      console.error('Error voting:', error);
      if (error.message.includes('Already voted')) {
        alert('You have already voted on this proposal!');
        setHasVoted(true);
      } else if (error.message.includes('Voting over')) {
        alert('Voting period has ended for this proposal!');
      } else {
        alert('Error casting vote. Please try again.');
      }
    }
    
    setVoting(false);
  };

  if (loading) {
    return <div className="vote-loading">Checking voting status...</div>;
  }

  if (hasVoted) {
    return (
      <div className="vote-status voted">
        <p>✅ You have already voted on this proposal</p>
      </div>
    );
  }

  return (
    <div className="vote-component">
      <h4>Cast Your Vote:</h4>
      <div className="vote-buttons">
        <button 
          onClick={() => handleVote(true)}
          disabled={voting}
          className="vote-button yes"
        >
          {voting ? 'Voting...' : '✅ Vote YES'}
        </button>
        <button 
          onClick={() => handleVote(false)}
          disabled={voting}
          className="vote-button no"
        >
          {voting ? 'Voting...' : '❌ Vote NO'}
        </button>
      </div>
    </div>
  );
};

export default VoteComponent;
