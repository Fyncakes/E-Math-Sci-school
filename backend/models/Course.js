const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['mathematics', 'physics', 'chemistry', 'biology', 'computer-science']
  },
  grade: {
    type: String,
    required: [true, 'Grade level is required'],
    enum: ['6', '7', '8', '9', '10', '11', '12', 'college']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  thumbnail: {
    type: String,
    default: ''
  },
  duration: {
    type: Number, // in weeks
    required: [true, 'Course duration is required']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  isFree: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  learningObjectives: [{
    type: String,
    maxlength: [200, 'Learning objective cannot exceed 200 characters']
  }],
  modules: [{
    title: {
      type: String,
      required: true,
      maxlength: [100, 'Module title cannot exceed 100 characters']
    },
    description: {
      type: String,
      maxlength: [500, 'Module description cannot exceed 500 characters']
    },
    order: {
      type: Number,
      required: true
    },
    lessons: [{
      title: {
        type: String,
        required: true,
        maxlength: [100, 'Lesson title cannot exceed 100 characters']
      },
      content: {
        type: String,
        required: true
      },
      videoUrl: String,
      duration: Number, // in minutes
      order: {
        type: Number,
        required: true
      },
      isFree: {
        type: Boolean,
        default: true
      }
    }]
  }],
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLessons: [{
      type: mongoose.Schema.Types.ObjectId
    }]
  }],
  ratings: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: {
      type: String,
      maxlength: [500, 'Review cannot exceed 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalStudents: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
  return this.averageRating;
};

// Update total students count
courseSchema.methods.updateStudentCount = function() {
  this.totalStudents = this.enrolledStudents.length;
  return this.totalStudents;
};

module.exports = mongoose.model('Course', courseSchema);
