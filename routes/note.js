const router = require('express').Router();
const noteController = require('../controllers/note');
const verifyToken = require('../middleware/auth');

const { addNote,deleteNote,getNotes,updateNote } = noteController;

router.get('/:folderId', verifyToken, getNotes);
router.post('/', verifyToken, addNote);
router.put('/', verifyToken, updateNote);
router.delete('/', verifyToken, deleteNote);

module.exports = router;
