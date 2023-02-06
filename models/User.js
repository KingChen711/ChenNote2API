const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  folders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Folder',
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('User', usersSchema);
