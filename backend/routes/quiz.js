const express = require('express');
const { body, validationResult } = require('express-validator');
const Assignment = require('../models/Assignment');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/quiz/practice
// @desc    Get practice quiz questions
// @access  Private
router.get('/practice', auth, async (req, res) => {
  try {
    const { subject, grade, difficulty, limit = 10 } = req.query;

    const filter = {
      type: 'quiz',
      isPublished: true,
      subject: subject || { $exists: true },
      grade: grade || { $exists: true }
    };

    if (difficulty) {
      // Map difficulty to course difficulty
      const courseFilter = { difficulty };
      const courses = await Course.find(courseFilter).select('_id');
      filter.course = { $in: courses.map(c => c._id) };
    }

    const assignments = await Assignment.find(filter)
      .populate('course', 'title subject grade difficulty')
      .populate('instructor', 'firstName lastName')
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Extract questions from assignments
    const questions = [];
    assignments.forEach(assignment => {
      assignment.questions.forEach(question => {
        questions.push({
          id: question._id,
          questionText: question.questionText,
          questionType: question.questionType,
          options: question.options,
          points: question.points,
          hints: question.hints,
          assignmentId: assignment._id,
          assignmentTitle: assignment.title,
          course: assignment.course
        });
      });
    });

    // Shuffle questions
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, limit);

    res.json({ questions: shuffledQuestions });
  } catch (error) {
    console.error('Get practice quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/quiz/submit-practice
// @desc    Submit practice quiz answers
// @access  Private
router.post('/submit-practice', auth, [
  body('answers').isArray().withMessage('Answers must be an array'),
  body('answers.*.questionId').isMongoId().withMessage('Valid question ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { answers } = req.body;
    const results = [];
    let totalScore = 0;
    let totalPossible = 0;

    for (const answer of answers) {
      // Find the assignment and question
      const assignment = await Assignment.findOne({
        'questions._id': answer.questionId
      });

      if (!assignment) {
        results.push({
          questionId: answer.questionId,
          correct: false,
          userAnswer: answer.answer,
          correctAnswer: null,
          explanation: 'Question not found'
        });
        continue;
      }

      const question = assignment.questions.id(answer.questionId);
      if (!question) {
        results.push({
          questionId: answer.questionId,
          correct: false,
          userAnswer: answer.answer,
          correctAnswer: null,
          explanation: 'Question not found'
        });
        continue;
      }

      let isCorrect = false;
      let pointsEarned = 0;

      // Grade the answer based on question type
      if (question.questionType === 'multiple-choice') {
        isCorrect = question.correctAnswer === answer.answer;
      } else if (question.questionType === 'true-false') {
        isCorrect = question.correctAnswer === answer.answer;
      } else if (question.questionType === 'short-answer') {
        // Case-insensitive comparison for short answers
        isCorrect = question.correctAnswer.toLowerCase().trim() === 
                   answer.answer.toLowerCase().trim();
      }

      if (isCorrect) {
        pointsEarned = question.points;
        totalScore += pointsEarned;
      }

      totalPossible += question.points;

      results.push({
        questionId: answer.questionId,
        correct: isCorrect,
        userAnswer: answer.answer,
        correctAnswer: question.correctAnswer,
        pointsEarned,
        totalPoints: question.points,
        explanation: question.explanation
      });
    }

    const percentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;

    res.json({
      results,
      score: {
        totalScore,
        totalPossible,
        percentage: Math.round(percentage * 100) / 100
      }
    });
  } catch (error) {
    console.error('Submit practice quiz error:', error);
    res.status(500).json({ message: 'Server error during quiz submission' });
  }
});

// @route   GET /api/quiz/leaderboard
// @desc    Get quiz leaderboard
// @access  Private
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const { subject, grade, timeframe = 'week' } = req.query;

    let dateFilter = {};
    const now = new Date();
    
    switch (timeframe) {
      case 'day':
        dateFilter = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
        break;
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        dateFilter = { $gte: weekAgo };
        break;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        dateFilter = { $gte: monthAgo };
        break;
    }

    const filter = {
      type: 'quiz',
      isPublished: true,
      'submissions.submittedAt': dateFilter
    };

    if (subject) filter.subject = subject;
    if (grade) filter.grade = grade;

    const assignments = await Assignment.find(filter)
      .populate('submissions.student', 'firstName lastName avatar')
      .select('submissions subject grade');

    // Calculate scores for each student
    const studentScores = {};

    assignments.forEach(assignment => {
      assignment.submissions.forEach(submission => {
        if (submission.submittedAt >= dateFilter.$gte) {
          const studentId = submission.student._id.toString();
          if (!studentScores[studentId]) {
            studentScores[studentId] = {
              student: submission.student,
              totalScore: 0,
              totalPossible: 0,
              quizCount: 0
            };
          }
          studentScores[studentId].totalScore += submission.totalScore;
          studentScores[studentId].totalPossible += assignment.maxPoints;
          studentScores[studentId].quizCount += 1;
        }
      });
    });

    // Convert to array and calculate percentages
    const leaderboard = Object.values(studentScores)
      .map(student => ({
        ...student,
        averagePercentage: student.totalPossible > 0 ? 
          (student.totalScore / student.totalPossible) * 100 : 0
      }))
      .sort((a, b) => b.averagePercentage - a.averagePercentage)
      .slice(0, 50); // Top 50

    res.json({ leaderboard });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
