import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../Components/Header';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { UserDataContext } from '../Context/UserContext';
import { loginUser } from '../api/api'; // <-- Import your API helper

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState('');
  const nav = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existUser = {
      email,
      password,
    };

    try {
      const res = await loginUser(existUser); // Use API helper

      if (res.status === 200) {
        const data = res.data;
        localStorage.setItem('accessToken', data.token); // Store as accessToken
        setUser(data.user); // Optionally update user context
        nav('/home');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrors(err.response.data.message || 'Invalid credentials. Please try again.');
        } else {
          setErrors(err.response.data.message || 'Something went wrong. Please try again later.');
        }
      } else {
        setErrors('An unexpected error occurred. Please check your connection and try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-start min-h-screen pt-4 bg-gray-100 dark:bg-gray-900">
        <form className="w-full max-w-sm p-4 mt-4" onSubmit={handleSubmit}>
          <h2 className="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-white">Welcome Back!</h2>
          {errors && <p className="mb-3 text-center text-red-500">{errors}</p>}
          <div className="mb-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              value={email}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
          >
            Sign In
          </button>

          <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-300">
            <a href="/forgot-password" className="hover:underline">Forgot password?</a>
          </div>

          <div className="flex items-center justify-center mb-6 text-sm text-gray-500 dark:text-gray-300">
            <p>Don't have an account?
              <a href="/signUp" className="ml-1 text-blue-600 hover:underline">Sign Up</a>
            </p>
          </div>

          {/* Captain Sign In Button */}
          <Link to="/capLogin">
            <button
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-900"
            >
              Sign In as Captain
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default UserLogin;
