const express = require('express');
const { addBasicInfo, updateEvent, getAllEvents, deleteEvent } = require('../controllers/event.controller');
const router = express.Router();

router.post('/add',addBasicInfo);
router.put('/update/:id',updateEvent);

router.get('/all', getAllEvents);
router.delete('/delete/:id', deleteEvent);


module.exports = router;
