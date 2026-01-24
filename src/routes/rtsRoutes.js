const express = require('express');
const router = express.Router();
const rtsController = require('../controllers/rtsController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, rtsController.getAllRTS);
router.get('/:id', verifyToken, rtsController.getRTS);
router.post('/', verifyToken, rtsController.createRTS);
router.put('/:id', verifyToken, rtsController.updateRTS);
router.delete('/:id', verifyToken, rtsController.deleteRTS);

module.exports = router;