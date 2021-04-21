const mongoose = require('mongoose');

const PhotoSheet = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    size: { type: Number, requiered: false },
});

const Photo = mongoose.model("Photo", PhotoSheet);
module.exports = Photo;