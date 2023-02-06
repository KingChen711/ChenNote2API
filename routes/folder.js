const router = require('express').Router();
const folderController = require('../controllers/folder');
const verifyToken = require('../middleware/auth');

const { getFolders, addFolder,deleteFolder } = folderController;

router.get('/', verifyToken, getFolders);
router.post('/', verifyToken, addFolder);
router.delete('/', verifyToken, deleteFolder);

module.exports = router;
