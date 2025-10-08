const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherSchema = new mongoose.Schema({
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
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  subjects: [{
    type: String,
    required: true
  }],
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  specialties: [{
    type: String
  }],
  achievements: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  studentsTaught: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: 'teacher',
    enum: ['teacher', 'admin']
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'pending']
  },
  image: {
    type: String,
    default: '/api/placeholder/300/300'
  },
  reviews: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
teacherSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update updatedAt field
teacherSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Compare password method
teacherSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get full name
teacherSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Get average rating
teacherSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / this.reviews.length).toFixed(1);
});

// Ensure virtual fields are serialized
teacherSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Teacher', teacherSchema);
