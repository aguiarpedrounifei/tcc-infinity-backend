import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import InstallPWA from './components/InstallPWA';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import GenerateQuestions from './pages/GenerateQuestions';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/quiz/:categoryId" element={<Quiz />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/generate-questions" element={<GenerateQuestions />} />
              </Route>

              {/* Catch all - redirect to home (which will redirect to login if not auth) */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <InstallPWA />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
