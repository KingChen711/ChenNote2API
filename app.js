require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./routes/auth');
const folderRouter = require('./routes/folder');
const noteRouter = require('./routes/note');
const cors = require('cors');

const connectDB = async () => {
  await mongoose
    .set('strictQuery', false)
    .connect(
      `mongodb+srv://kingchen711:Truongvan03@cluster0.1rhruvs.mongodb.net/chenNote2DB`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('Mongoose connected successfully'))
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};
connectDB();
require('./models/Note');
require('./models/User');
require('./models/Folder');

app.use(cors(), express.json());

app.use('/api/auth', authRouter);
app.use('/api/folders', folderRouter);
app.use('/api/notes', noteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
