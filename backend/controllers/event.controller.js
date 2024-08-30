const Event = require('../models/event');

const addBasicInfo = async (req, res) => {
    try {
      // Extract data from the request body
      const {
        name,
        city,
        images,
        time,
        price,
        tickets,
        info,
        status
      } = req.body;
  
      // Create a new event instance
      const newEvent = new Event({
        name,
        city,
        images,
        time,
        price,
        tickets,
        info,
        status
      });
  
      // Save the event to the database
      const savedEvent = await newEvent.save();
  
      // Respond with the created event
      res.status(201).json({
        success: true,
        data: savedEvent
      });
    } catch (error) {
      // Handle errors and respond
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  const updateEvent  = async (req, res) => {
    try {
      const { id } = req.params; // Event ID from URL
      const updatedData = req.body; // Entire event data from request body
  
      // Find the event by ID and replace it with the new data
      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        updatedData,
        { new: true, runValidators: true } // Return the updated document and validate
      );
  
      if (!updatedEvent) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: updatedEvent
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  const getAllEvents = async (req, res) => {
    try {
      // Retrieve all events from the database
      const events = await Event.find(); // This will get all documents in the collection
  
      // Respond with the list of events
      res.status(200).json({
        success: true,
        count: events.length,
        data: events
      });
    } catch (error) {
      // Handle errors and respond
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params; // Extract event ID from URL parameters
  
      // Find and delete the event by ID
      const deletedEvent = await Event.findByIdAndDelete(id);
  
      if (!deletedEvent) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }
  
      // Respond with a success message
      res.status(200).json({
        success: true,
        message: 'Event successfully deleted'
      });
    } catch (error) {
      // Handle errors and respond
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  module.exports={
    addBasicInfo,
    updateEvent,
    getAllEvents,
    deleteEvent

  }