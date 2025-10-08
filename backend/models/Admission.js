const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  parentName: {
    type: String,
    required: true
  },
  parentEmail: {
    type: String,
    required: true
  },
  parentPhone: {
    type: String,
    required: true
  },
  previousSchool: {
    type: String
  },
  academicRecords: {
    type: String // File path or URL to academic records
  },
  motivation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'waitlisted'],
    default: 'pending'
  },
  adminNotes: {
    type: String
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  interviewScheduled: {
    type: Date
  },
  interviewNotes: {
    type: String
  },
  admissionFee: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'waived'],
    default: 'pending'
  },
  enrollmentDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt field
admissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Get full name
admissionSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
admissionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Admission', admissionSchema);
