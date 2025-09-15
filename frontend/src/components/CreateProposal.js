import React, { useState } from 'react';

const CreateProposal = ({ contract, onProposalCreated }) => {
  const [description, setDescription] = useState('');
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }

    if (days === 0 && hours === 0) {
      alert('Please set a voting duration');
      return;
    }

    setLoading(true);

    try {
      const timeUntilDeadline = (days * 24 * 60 * 60) + (hours * 60 * 60);
      
      const tx = await contract.createProposal(description, timeUntilDeadline);
      await tx.wait();
      
      setDescription('');
      setDays(1);
      setHours(0);
      
      if (onProposalCreated) {
        onProposalCreated();
      }
      
      alert('Proposal created successfully!');
    } catch (error) {
      console.error('Error creating proposal:', error);
      alert('Error creating proposal. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="create-proposal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Proposal Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your proposal description here..."
            rows={4}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Voting Duration:</label>
          <div className="duration-inputs">
            <div>
              <label htmlFor="days">Days:</label>
              <input
                type="number"
                id="days"
                min="0"
                max="365"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label htmlFor="hours">Hours:</label>
              <input
                type="number"
                id="hours"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Creating...' : 'Create Proposal'}
        </button>
      </form>
    </div>
  );
};

export default CreateProposal;
