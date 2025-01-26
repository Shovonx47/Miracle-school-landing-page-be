const GoverningBody = require('../models/governingBodyModel');
const AlbumImage = require('../models/albumImageModel');

// CRUD operations for Governing Body
exports.createGoverningBodyMember = async (req, res) => {
  const member = new GoverningBody(req.body);
  await member.save();
  res.status(201).send(member);
};

exports.getGoverningBodyMembers = async (req, res) => {
  const members = await GoverningBody.find();
  res.status(200).send(members);
};

exports.updateGoverningBodyMember = async (req, res) => {
  const member = await GoverningBody.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).send(member);
};

exports.deleteGoverningBodyMember = async (req, res) => {
  await GoverningBody.findByIdAndDelete(req.params.id);
  res.status(204).send();
};

// Combined endpoint for administration page
exports.getAdministrationData = async (req, res) => {
  try {
    const [governingBody, albumImages] = await Promise.all([
      GoverningBody.find(),
      AlbumImage.find()
    ]);
    
    res.status(200).json({
      governingBody,
      albumImages
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CRUD operations for Album Images
exports.createAlbumImage = async (req, res) => {
  const image = new AlbumImage(req.body);
  await image.save();
  res.status(201).send(image);
};

exports.getAlbumImages = async (req, res) => {
  const images = await AlbumImage.find();
  res.status(200).send(images);
};

exports.deleteAlbumImage = async (req, res) => {
  await AlbumImage.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
