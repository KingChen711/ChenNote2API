const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
    default: '',
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  folder: {
    ref: 'Folder',
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Note', notesSchema);
