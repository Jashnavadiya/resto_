const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    
  },
  city: {
    type: String,
    trim: true,
    
  },
  images: {
    type: [String],
    trim: true,
    validate: [arrayLimit, 'Exceeds the limit of images']
  },
  time: {
    date: {
      type: String,
      trim: true,
      
    },
    start: {
      type: String,
      trim: true,
      
    },
    end: {
      type: String,
      trim: true,
      
    }
  },
  price: {
    type: String,
    trim: true
  },
  tickets: {
    name: {
      type: String,
      trim: true,
      
    },
    type: {
      type: String,
      trim: true,
      
    },
    available: {
      type: String,
      trim: true,
      
    },
    description: {
      type: String,
      trim: true
    }
  },
  info: {
    desc: {
      type: String,
      trim: true,
      
    },
    terms: {
      type: String,
      trim: true
    }
  },
  status: {
    type: Boolean,
    default: false
  }
});

function arrayLimit(val) {
  return val.length <= 10; // Example limit, adjust as needed
}

const Event= mongoose.model('Event', eventSchema);
module.exports =Event
