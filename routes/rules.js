const express = require('express');
const router = express.Router();
const Rule = require('../models/rule');
const { createRule, combineRules, evaluateRule } = require('../utils/astUtils');

// Get all rules
router.get('/', async (req, res) => {
  try {
    console.log('GET /api/rules route hit'); // Add this line for debugging
    const rules = await Rule.find({}, 'name _id');
    console.log('Fetched rules:', rules); // Add this line for debugging
    res.json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(500).json({ message: 'Error fetching rules', error: error.message });
  }
});

// Evaluate rule
router.post('/evaluate', async (req, res) => {
  try {
    const { ruleId, data } = req.body;
    console.log('Evaluating rule:', ruleId);
    console.log('Data:', data);
    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }
    console.log('Retrieved rule:', JSON.stringify(rule, null, 2));
    const result = evaluateRule(rule.ast, data);
    console.log('Evaluation result:', result);
    res.json({ result });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(400).json({ message: 'Error evaluating rule', error: error.message });
  }
});

// Combine rules
router.post('/combine', async (req, res) => {
  try {
    const { ruleIds } = req.body;
    const rules = await Rule.find({ _id: { $in: ruleIds } });
    const ruleStrings = rules.map(rule => JSON.stringify(rule.ast));
    const combinedAst = combineRules(ruleStrings);
    res.json({ combinedAst });
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(400).json({ message: 'Error combining rules', error: error.message });
  }
});

// Evaluate rule
router.post('/evaluate', async (req, res) => {
  try {
    const { ruleId, data } = req.body;
    console.log('Evaluating rule:', ruleId);
    console.log('Data:', data);
    const rule = await Rule.findById(ruleId);
    if (!rule) {
      return res.status(404).json({ message: 'Rule not found' });
    }
    console.log('Retrieved rule:', JSON.stringify(rule, null, 2));
    const result = evaluateRule(rule.ast, data);
    console.log('Evaluation result:', result);
    res.json({ result });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(400).json({ message: 'Error evaluating rule', error: error.message });
  }
});


module.exports = router;