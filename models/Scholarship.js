const mongoose = require('mongoose');

const scholarshipTypeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverage: { type: String, required: true },
  requirements: [{ type: String, required: true }],
  duration: { type: String, required: true }
});

const requiredDocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const deadlineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }
});

const scholarshipPageSchema = new mongoose.Schema({
  scholarshipTypes: [scholarshipTypeSchema],
  requiredDocuments: [requiredDocumentSchema],
  deadlines: [deadlineSchema],
  pdfUrl: { type: String, required: true },
  academicYear: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ScholarshipPage', scholarshipPageSchema); 