import { useState } from 'react'
import { Link } from 'react-router-dom';

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await api.post('/auth/login', { email, password });
        login(res.data);
        navigate('/');
      } catch (err) {
        setError('Invalid email or password');
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-0">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Bhairahawa Jobs</h1>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>
  
          <div className="card">
            {error && <div className="error-message">{error}</div>}
  
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
  
              <button type="submit" className="btn-primary w-full">
                Sign in
              </button>
  
              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
  
          <footer className="text-center text-sm text-gray-500">
            © 2024 Bhairahawa Job Portal. All rights reserved.
          </footer>
        </div>
      </div>
    );
  }