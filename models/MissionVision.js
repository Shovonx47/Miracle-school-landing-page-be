const mongoose = require('mongoose');

const coreValueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const missionVisionSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  mission: {
    description: {
      type: String,
      required: true
    },
    points: [{
      type: String,
      required: true
    }],
    image: {
      type: String,
      required: true
    }
  },
  vision: {
    description: {
      type: String,
      required: true
    },
    quote: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  coreValues: [coreValueSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('MissionVision', missionVisionSchema); 