import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EvaluateRule() {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      try {
        console.log('Fetching rules...');
        const response = await axios.get('http://localhost:3000/api/rules');
        console.log('Fetched rules:', response.data);
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
        setMessage('Error fetching rules. Please check the console for more details.');
      }
    };
    fetchRules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Selected Rule ID:', selectedRule);
      console.log('Input Data:', data);
      const parsedData = JSON.parse(data);
      console.log('Parsed Data:', parsedData);
      const response = await axios.post('http://localhost:3000/api/rules/evaluate', {
        ruleId: selectedRule,
        data: parsedData
      });
      console.log('Evaluation Response:', response.data);
      setResult(response.data.result);
      setMessage('');
    } catch (error) {
      console.error('Error evaluating rule:', error);
      setMessage('Error evaluating rule. Please check the console for more details.');
      setResult(null);
    }
  };

  return (
    <div className="card">
      <h3 className="card-title">Evaluate a Rule</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ruleSelect" className="form-label">Select Rule</label>
          <select
            id="ruleSelect"
            value={selectedRule}
            onChange={(e) => setSelectedRule(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select a rule</option>
            {rules.map((rule) => (
              <option key={rule._id} value={rule._id}>
                {rule.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="data" className="form-label">Data (JSON format)</label>
          <textarea
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            rows={5}
            className="form-textarea"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Evaluate Rule</button>
      </form>
      {result !== null && (
        <div className={`message ${result ? 'message-success' : 'message-error'}`}>
          Result: {result ? 'True' : 'False'}
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

export default EvaluateRule;