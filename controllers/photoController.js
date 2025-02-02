const Photo = require('../models/photo');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Get all photos with pagination => /api/photos
exports.getPhotos = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const total = await Photo.countDocuments();
  
  const photos = await Photo.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    total,
    photos,
    currentPage: page,
    totalPages: Math.ceil(total / limit)
  });
});

// Get single photo => /api/photos/:id
exports.getSinglePhoto = catchAsyncErrors(async (req, res, next) => {
  const photo = await Photo.findById(req.params.id);

  if (!photo) {
    return next(new ErrorHandler('Photo not found', 404));
  }

  res.status(200).json({
    success: true,
    photo
  });
}); 