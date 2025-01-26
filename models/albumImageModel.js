const mongoose = require('mongoose');

const albumImageSchema = new mongoose.Schema({
  url: { type: String, required: true }
});

module.exports = mongoose.model('AlbumImage', albumImageSchema);
