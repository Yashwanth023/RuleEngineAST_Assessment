import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CombineRules() {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [combinedAst, setCombinedAst] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rules');
        setRules(response.data);
      } catch (error) {
        setMessage('Error fetching rules. Please try again.');
      }
    };
    fetchRules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/rules/combine', {
        ruleIds: selectedRules
      });
      setCombinedAst(JSON.stringify(response.data.combinedAst, null, 2));
      setMessage('');
    } catch (error) {
      setMessage('Error combining rules. Please try again.');
      setCombinedAst('');
    }
  };

  const handleRuleSelection = (ruleId) => {
    setSelectedRules((prevSelected) =>
      prevSelected.includes(ruleId)
        ? prevSelected.filter((id) => id !== ruleId)
        : [...prevSelected, ruleId]
    );
  };

  return (
    <div className="card">
      <h3 className="card-title">Combine Rules</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Rules to Combine</label>
          <div className="checkbox-group">
            {rules.map((rule) => (
              <div key={rule._id} className="checkbox-item">
                <input
                  id={rule._id}
                  type="checkbox"
                  checked={selectedRules.includes(rule._id)}
                  onChange={() => handleRuleSelection(rule._id)}
                />
                <label htmlFor={rule._id} className="checkbox-label">
                  {rule.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Combine Rules</button>
      </form>
      {combinedAst && (
        <div className="form-group">
          <label className="form-label">Combined AST:</label>
          <pre className="pre-container">
            {combinedAst}
          </pre>
        </div>
      )}
      {message && (
        <div className="message message-error">
          {message}
        </div>
      )}
    </div>
  );
}

export default CombineRules;