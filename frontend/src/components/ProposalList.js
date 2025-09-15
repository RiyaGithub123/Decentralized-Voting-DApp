import React from 'react';
import VoteComponent from './VoteComponent';

const ProposalList = ({ proposals, contract, account, onVote, formatTimeLeft }) => {
  if (proposals.length === 0) {
    return (
      <div className="no-proposals">
        <p>No proposals yet. Create the first one!</p>
      </div>
    );
  }

  return (
    <div className="proposals-list">
      {proposals.map((proposal) => (
        <div key={proposal.id} className={`proposal-card ${proposal.isOver ? 'ended' : 'active'}`}>
          <div className="proposal-header">
            <h3>Proposal #{proposal.id}</h3>
            <span className={`status ${proposal.isOver ? 'ended' : 'active'}`}>
              {proposal.isOver ? 'Ended' : 'Active'}
            </span>
          </div>
          
          <div className="proposal-description">
            <p>{proposal.description}</p>
          </div>
          
          <div className="proposal-stats">
            <div className="votes">
              <div className="vote-count yes">
                <span className="label">Yes:</span>
                <span className="count">{proposal.voteCountYes}</span>
              </div>
              <div className="vote-count no">
                <span className="label">No:</span>
                <span className="count">{proposal.voteCountNo}</span>
              </div>
            </div>
            
            <div className="deadline">
              <span className="time-left">{formatTimeLeft(proposal.deadline)}</span>
            </div>
          </div>
          
          {!proposal.isOver && (
            <VoteComponent 
              proposalId={proposal.id}
              contract={contract}
              account={account}
              onVote={onVote}
            />
          )}
          
          {proposal.isOver && (
            <div className="final-result">
              <h4>Final Result:</h4>
              <p className={`winner ${proposal.voteCountYes > proposal.voteCountNo ? 'yes' : proposal.voteCountNo > proposal.voteCountYes ? 'no' : 'tie'}`}>
                {proposal.voteCountYes > proposal.voteCountNo 
                  ? `✅ Proposal PASSED (${proposal.voteCountYes} vs ${proposal.voteCountNo})`
                  : proposal.voteCountNo > proposal.voteCountYes 
                  ? `❌ Proposal REJECTED (${proposal.voteCountNo} vs ${proposal.voteCountYes})`
                  : `🤝 TIE (${proposal.voteCountYes} vs ${proposal.voteCountNo})`
                }
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProposalList;
