const AlbumImage = require('../models/albumImageModel');

const albumImages = [
  { url: '/assets/images/album/image1.jpg' },
  { url: '/assets/images/album/image2.jpg' },
  { url: '/assets/images/album/image3.jpg' },
  { url: '/assets/images/album/image4.jpg' },
  { url: '/assets/images/album/image5.jpg' }
];

const seedAlbumImages = async () => {
  await AlbumImage.deleteMany(); // Clear existing data
  await AlbumImage.insertMany(albumImages); // Insert new data
  console.log('Album images seeded successfully!');
};

module.exports = seedAlbumImages;
