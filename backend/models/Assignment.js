const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Assignment title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Assignment description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  type: {
    type: String,
    enum: ['homework', 'quiz', 'project', 'exam', 'lab'],
    required: [true, 'Assignment type is required']
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
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  maxPoints: {
    type: Number,
    required: [true, 'Maximum points is required'],
    min: [1, 'Maximum points must be at least 1']
  },
  instructions: {
    type: String,
    required: [true, 'Instructions are required']
  },
  attachments: [{
    filename: String,
    url: String,
    fileType: String,
    size: Number
  }],
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    questionType: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'short-answer', 'essay', 'problem-solving'],
      required: true
    },
    options: [String], // For multiple choice questions
    correctAnswer: mongoose.Schema.Types.Mixed, // Can be string, number, or array
    points: {
      type: Number,
      default: 1,
      min: 1
    },
    explanation: String,
    hints: [String]
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  allowLateSubmission: {
    type: Boolean,
    default: false
  },
  latePenalty: {
    type: Number,
    default: 0,
    min: 0,
    max: 100 // Percentage
  },
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    answers: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      answer: mongoose.Schema.Types.Mixed,
      isCorrect: Boolean,
      pointsEarned: {
        type: Number,
        default: 0
      }
    }],
    submittedAt: {
      type: Date,
      default: Date.now
    },
    isLate: {
      type: Boolean,
      default: false
    },
    totalScore: {
      type: Number,
      default: 0
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'],
      default: 'F'
    },
    feedback: {
      type: String,
      maxlength: [1000, 'Feedback cannot exceed 1000 characters']
    },
    gradedAt: Date,
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  statistics: {
    totalSubmissions: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    highestScore: {
      type: Number,
      default: 0
    },
    lowestScore: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Calculate statistics
assignmentSchema.methods.calculateStatistics = function() {
  const submissions = this.submissions;
  if (submissions.length === 0) {
    this.statistics = {
      totalSubmissions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0
    };
    return;
  }

  const scores = submissions.map(sub => sub.totalScore);
  this.statistics = {
    totalSubmissions: submissions.length,
    averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
    highestScore: Math.max(...scores),
    lowestScore: Math.min(...scores)
  };
};

// Check if assignment is overdue
assignmentSchema.methods.isOverdue = function() {
  return new Date() > this.dueDate;
};

module.exports = mongoose.model('Assignment', assignmentSchema);
