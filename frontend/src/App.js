import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRules';
import './styles.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="container navbar-content">
            <div className="navbar-brand">RuleEngine AST</div>
            <div className="navbar-links">
              <Link to="/" className="navbar-link">Create Rule</Link>
              <Link to="/evaluate" className="navbar-link">Evaluate Rule</Link>
              <Link to="/combine" className="navbar-link">Combine Rules</Link>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<CreateRule />} />
            <Route path="/evaluate" element={<EvaluateRule />} />
            <Route path="/combine" element={<CombineRules />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;