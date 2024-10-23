import React, { useState } from 'react';
import axios from 'axios';

function CreateRule() {
  const [ruleName, setRuleName] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting rule:', { name: ruleName, ruleString });
      const response = await axios.post('http://localhost:3000/api/rules', { name: ruleName, ruleString });
      console.log('Rule creation response:', response.data);
      setMessage(`Rule created successfully with ID: ${response.data._id}`);
      setRuleName('');
      setRuleString('');
    } catch (error) {
      console.error('Error creating rule:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      setMessage(`Error creating rule: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">Create a New Rule</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ruleName" className="form-label">Rule Name</label>
          <input
            type="text"
            id="ruleName"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ruleString" className="form-label">Rule String</label>
          <textarea
            id="ruleString"
            value={ruleString}
            onChange={(e) => setRuleString(e.target.value)}
            rows={3}
            className="form-textarea"
            required
          ></textarea>
          <small className="form-text text-muted">
            Enter the rule in the format: "condition1 AND/OR condition2". Example: "age>18 AND income>50000"
          </small>
        </div>
        <button type="submit" className="btn btn-primary">Create Rule</button>
      </form>
      {message && (
        <div className={`message ${message.includes('Error') ? 'message-error' : 'message-success'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default CreateRule;