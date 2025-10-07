# E-School - Math & Science Learning Platform

A modern, responsive website for E-School, featuring comprehensive math and science education programs.

## 🚀 Features

- **Video Hero Section** - Engaging full-screen video background
- **Interactive Showcase** - Math and science video demonstrations
- **Real Curriculum Integration** - PDF viewer for curriculum documents
- **Student Portal** - Login and registration system
- **Admin Dashboard** - Content management system
- **Mobile Responsive** - Works perfectly on all devices
- **Professional Design** - Modern, student-friendly interface

## 🛠️ Technology Stack

- **Frontend**: React 18, JavaScript, CSS3
- **Styling**: Custom CSS with modern animations
- **Icons**: React Icons
- **Routing**: React Router
- **Build Tool**: Create React App

## 📁 Project Structure

```
E-Math-Sci-school/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── curriculum/      # PDF curriculum documents
│   │   ├── *.mp4           # Video files
│   │   ├── *.jpeg          # Image assets
│   │   └── logo.png         # School logo
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS styles
│   │   └── data/           # Static data
│   └── package.json
├── backend/                 # Node.js backend (optional)
├── render.yaml             # Render.com deployment config
└── README.md
```

## 🚀 Deployment on Render.com

### Prerequisites
- GitHub repository with your code
- Render.com account

### Deployment Steps

1. **Connect to GitHub**
   - Go to [Render.com](https://render.com)
   - Sign up/Login with GitHub
   - Connect your repository

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose the repository: `E-Math-Sci-school`

3. **Configure Build Settings**
   - **Name**: `e-school-website`
   - **Environment**: `Static Site`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Node Version**: `18.x`

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your site
   - Your site will be available at: `https://your-app-name.onrender.com`

## 🎯 Key Features Implemented

### Video Integration
- **Hero Video**: Full-screen background video
- **Math Video**: Interactive mathematics demonstrations
- **Science Video**: Science experiment showcases
- **Student Stories**: Success story videos

### Curriculum System
- **PDF Viewer**: Built-in curriculum document viewer
- **Real Documents**: Mathematics, Sciences, and English Grammar curricula
- **Download Options**: Direct PDF downloads
- **Full-screen Mode**: Enhanced viewing experience

### User Experience
- **Responsive Design**: Mobile-first approach
- **Fast Loading**: Optimized assets and code
- **Professional UI**: Modern, clean design
- **Student-Focused**: Engaging content and navigation

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design Features

- **Modern Color Palette**: Child-friendly, educational colors
- **Smooth Animations**: CSS animations and transitions
- **Professional Typography**: Clean, readable fonts
- **Interactive Elements**: Hover effects and micro-interactions
- **Professional Layout**: Organized content structure

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm run install-frontend

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup
- Node.js 16+ required
- npm 8+ recommended
- Modern web browser

## 📞 Support

For technical support or questions about the website:
- Email: info@eschool.edu
- Phone: +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**E-School** - Where Math & Science Come Alive! 🎓✨