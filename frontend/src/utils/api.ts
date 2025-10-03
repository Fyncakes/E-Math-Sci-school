import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (userData: any) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData: any) => api.put('/auth/profile', userData),
  changePassword: (currentPassword: string, newPassword: string) => 
    api.post('/auth/change-password', { currentPassword, newPassword }),
};

export const coursesAPI = {
  getCourses: (params?: any) => api.get('/courses', { params }),
  getCourse: (id: string) => api.get(`/courses/${id}`),
  createCourse: (courseData: any) => api.post('/courses', courseData),
  updateCourse: (id: string, courseData: any) => api.put(`/courses/${id}`, courseData),
  enrollInCourse: (id: string) => api.post(`/courses/${id}/enroll`),
  rateCourse: (id: string, rating: number, review?: string) => 
    api.post(`/courses/${id}/rate`, { rating, review }),
  getCourseStudents: (id: string) => api.get(`/courses/${id}/students`),
};

export const assignmentsAPI = {
  getAssignments: (params?: any) => api.get('/assignments', { params }),
  getAssignment: (id: string) => api.get(`/assignments/${id}`),
  createAssignment: (assignmentData: any) => api.post('/assignments', assignmentData),
  updateAssignment: (id: string, assignmentData: any) => api.put(`/assignments/${id}`, assignmentData),
  submitAssignment: (id: string, answers: any) => api.post(`/assignments/${id}/submit`, { answers }),
};

export const quizAPI = {
  getPracticeQuiz: (params?: any) => api.get('/quiz/practice', { params }),
  submitPracticeQuiz: (answers: any) => api.post('/quiz/submit-practice', { answers }),
  getLeaderboard: (params?: any) => api.get('/quiz/leaderboard', { params }),
};

export const usersAPI = {
  getProfile: (id: string) => api.get(`/users/profile/${id}`),
  getStudents: (params?: any) => api.get('/users/students', { params }),
  getTeachers: () => api.get('/users/teachers'),
};

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getCourseAnalytics: (id: string) => api.get(`/analytics/course/${id}`),
};
