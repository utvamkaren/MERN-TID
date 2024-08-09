const express = require('express');
const router = express.Router();
const { getTasks, setTasks, updateTasks, deleteTasks } = require('../controllers/taskController');
const {protect}=require ('../middleware/authMiddleware');

router.get('/',protect, getTasks);
router.post('/',protect, setTasks);
router.put('/:id',protect,updateTasks);
router.delete('/:id',protect, deleteTasks);

module.exports = router;
