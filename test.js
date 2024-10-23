// test.js
const { createRule, evaluateRule } = require('./utils/astUtils');

// Test with a valid single operand rule
// const ruleString = 'age > 18'; // This should work as a single operand
const ruleString = 'age>18 AND income>50000'; // Uncomment to test with an operator

const data = { age: 25, income: 60000 }; // Make sure data has attributes you want to test

// Create the rule
try {
    const rule = createRule(ruleString);
    console.log(JSON.stringify(rule, null, 2)); // Print the AST for debugging

    // Evaluate the rule
    const result = evaluateRule(rule, data);
    console.log(`Evaluation Result: ${result}`); // Should print true
} catch (error) {
    console.error(`Error: ${error.message}`);
}
