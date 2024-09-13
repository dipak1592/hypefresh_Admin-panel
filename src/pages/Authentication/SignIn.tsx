import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate()
  
  const baseUrl = import.meta.env.VITE_BASE_URL;
  
  interface LoginResponse {
    token:string;
  }
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {

        throw new Error('Login failed! Please Enter Valid Credential');
      }
      
      const data: LoginResponse = await response.json();
      // console.log('Login successful!', data);
      // window.localStorage.setItem('token', data.token);
      Cookies.set('token', data.token, { expires: 1 });
      navigate('/');
    } catch (err: any) { 
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <div className="mt-2">
              <input type="checkbox" onClick={togglePasswordVisibility} /> Show Password
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
