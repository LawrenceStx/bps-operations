const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/category', verifyToken, inventoryController.createInventoryCategory);
router.get('/category', verifyToken, inventoryController.getAllInventoryCategories);
router.delete('/category/:id', verifyToken, inventoryController.deleteInventoryCategory);

router.get('/', verifyToken, isAdmin, inventoryController.getAllInventory);

module.exports = router;