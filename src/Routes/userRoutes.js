const express = require('express');
const router = express.Router();
const path = require('path');
const taskmanagerController = require('../Controllers/TaskmanagerController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'views', 'html', 'index.html'));
})

router.get('/tasks',taskmanagerController.getTasks)
router.get('/changeStatus/:id', taskmanagerController.changeTaskstatus)
router.get('/remove/:id', taskmanagerController.deleteTask)
router.post('/createTask', taskmanagerController.createTask)

module.exports = router;
