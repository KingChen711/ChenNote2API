const Folder = require('../models/Folder');
const User = require('../models/User');

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ user: req.userId }).populate('notes');
    res.status(200).json(folders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addFolder = async (req, res) => {
  const { name } = req.body;
  try {
    const newFolder = new Folder({
      name,
      user: req.userId,
    });

    await newFolder.save();

    const user = await User.findById(req.userId);
    user.folders = [...user.folders, newFolder];

    await user.save();

    res.status(200).json(newFolder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteFolder = async (req, res) => {
  const { folderId } = req.body;

  try {
    const folder = await Folder.findByIdAndDelete(folderId);
    await User.updateOne({ _id: req.userId }, { $pull: { folders: folderId } });
    res.status(200).json(folder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
