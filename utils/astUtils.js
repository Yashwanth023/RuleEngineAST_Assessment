// class Node {
//     constructor(type, left = null, right = null, value = null) {
//       this.type = type;
//       this.left = left;
//       this.right = right;
//       this.value = value;
//     }
//   }
  
//   function createRule(ruleString) {
//     // This is a simplified implementation. In a real-world scenario, you'd need a proper parser.
//     const tokens = ruleString.split(' ');
//     return parseExpression(tokens);
//   }
  
//   function parseExpression(tokens) {
//     if (tokens.length === 1) {
//       return new Node('operand', null, null, tokens[0]);
//     }
  
//     const operatorIndex = tokens.findIndex(token => ['AND', 'OR'].includes(token));
//     if (operatorIndex === -1) {
//       throw new Error('Invalid rule string: missing operator');
//     }
  
//     const leftTokens = tokens.slice(0, operatorIndex);
//     const rightTokens = tokens.slice(operatorIndex + 1);
  
//     return new Node(
//       'operator',
//       parseExpression(leftTokens),
//       parseExpression(rightTokens),
//       tokens[operatorIndex]
//     );
//   }
  
//   function combineRules(rules) {
//     if (rules.length === 0) return null;
//     if (rules.length === 1) return createRule(rules[0]);
  
//     const combinedRule = rules.join(' OR ');
//     return createRule(combinedRule);
//   }
  
//   function evaluateRule(ast, data) {
//     if (ast.type === 'operand') {
//       const [attribute, operator, value] = ast.value.split(/([<>=])/);
//       const dataValue = data[attribute];
      
//       switch (operator) {
//         case '>': return dataValue > parseFloat(value);
//         case '<': return dataValue < parseFloat(value);
//         case '=': return dataValue === value;
//         default: throw new Error(`Invalid operator: ${operator}`);
//       }
//     }
  
//     if (ast.type === 'operator') {
//       const leftResult = evaluateRule(ast.left, data);
//       const rightResult = evaluateRule(ast.right, data);
  
//       return ast.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
//     }
  
//     throw new Error('Invalid AST node');
//   }
  
//   module.exports = { createRule, combineRules, evaluateRule };


class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type;
        this.left = left;
        this.right = right;
        this.value = value;
    }
}

function createRule(ruleString) {
    console.log('Creating rule from string:', ruleString);
    const tokens = ruleString.trim().split(/\s+/);
    const ast = parseExpression(tokens);
    console.log('Created AST:', JSON.stringify(ast, null, 2));
    return ast;
}

function parseExpression(tokens) {
    if (tokens.length === 1) {
        const match = tokens[0].match(/(\w+)\s*([><=]+)\s*(\d+)/);
        if (match) {
            return new Node('operand', null, null, tokens[0]);
        } else {
            throw new Error('Invalid operand format');
        }
    }

    const operatorIndex = tokens.findIndex(token => token === 'AND' || token === 'OR');
    if (operatorIndex === -1) {
        throw new Error('Invalid rule string: missing operator');
    }

    const leftTokens = tokens.slice(0, operatorIndex);
    const rightTokens = tokens.slice(operatorIndex + 1);

    return new Node(
        'operator',
        parseExpression(leftTokens),
        parseExpression(rightTokens),
        tokens[operatorIndex]
    );
}

function parseExpression(tokens) {
    if (tokens.length === 1) {
        return new Node('operand', null, null, tokens[0]);
    }

    const operatorIndex = tokens.findIndex(token => token === 'AND' || token === 'OR');
    if (operatorIndex === -1) {
        throw new Error('Invalid rule string: missing operator');
    }

    const leftTokens = tokens.slice(0, operatorIndex);
    const rightTokens = tokens.slice(operatorIndex + 1);

    return new Node(
        'operator',
        parseExpression(leftTokens),
        parseExpression(rightTokens),
        tokens[operatorIndex]
    );
}

function combineRules(rules) {
    if (rules.length === 0) return null;
    if (rules.length === 1) return createRule(rules[0]);

    const combinedRule = rules.join(' OR ');
    return createRule(combinedRule);
}

function evaluateRule(ast, data) {
    console.log('Evaluating AST:', JSON.stringify(ast, null, 2));
    console.log('Data:', data);

    if (ast.type === 'operand') {
        const [attribute, operator, value] = ast.value.split(/([><=])/);
        const dataValue = data[attribute.trim()];
        console.log(`Evaluating Operand: ${attribute.trim()} ${operator} ${value}`);
        console.log(`Data Value: ${dataValue}`);
        
        switch (operator) {
            case '>':
                return dataValue > parseFloat(value);
            case '<':
                return dataValue < parseFloat(value);
            case '=':
                return dataValue === parseFloat(value);
            default:
                throw new Error(`Invalid operator: ${operator}`);
        }
    }

    if (ast.type === 'operator') {
        const leftResult = evaluateRule(ast.left, data);
        const rightResult = evaluateRule(ast.right, data);
        console.log(`Evaluating Operator: ${ast.value}`);
        console.log(`Left Result: ${leftResult}, Right Result: ${rightResult}`);

        return ast.value === 'AND' ? leftResult && rightResult : leftResult || rightResult;
    }

    throw new Error('Invalid AST node');
}

module.exports = { createRule, combineRules, evaluateRule };
