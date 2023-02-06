const mongoose = require('mongoose');

const foldersSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Note',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Folder', foldersSchema);
