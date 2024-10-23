const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ast: { type: Object, required: true }
});

module.exports = mongoose.model('Rule', ruleSchema);