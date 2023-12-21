const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  founders: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  values: [{
    type: String,
  }],
  backgroundImage: {
    type: String,
    required: true, 
  },
 
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;
