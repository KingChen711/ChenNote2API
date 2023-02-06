const Note = require('../models/Note');
const Folder = require('../models/Folder');

exports.getNotes = async (req, res) => {
  const { folderId } = req.params;
  if (!folderId) res.status(200).json([]);

  try {
    const notes = await Note.find({ folder: folderId });
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addNote = async (req, res) => {
  const { folderId, title, createdAt } = req.body;
  try {
    const newNote = new Note({
      title,
      createdAt,
      user: req.userId,
      folder: folderId,
    });

    await newNote.save();

    const folder = await Folder.findById(folderId);
    folder.notes = [...folder.notes, newNote];
    folder.save();

    res.status(200).json(newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteNote = async (req, res) => {
  const { noteId, folderId } = req.body;

  try {
    const note = await Note.findByIdAndDelete(noteId);
    await Folder.updateOne({ _id: folderId }, { $pull: { notes: noteId } });
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateNote = async (req, res) => {
  const { note, noteId } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { $set: { ...note, user: req.userId } },
      { new: true }
    );
    await updatedNote.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
