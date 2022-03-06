const express = require('express');
const controller = require('../controllers/teamController');
const router = express.Router();

router.get('/', controller.home);
router.get('/add', controller.addGet);
router.post('/add', controller.addPost);
router.get('/delete/:id', controller.delete);

module.exports = router;