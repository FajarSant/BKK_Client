"use client"
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  // Anda bisa menambahkan state untuk data tambahan lainnya yang dibutuhkan

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setMessage('Login successful');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, fullName, email })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setMessage('Registration successful');
      } else {
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage('Error registering');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleToggleRegister = () => {
    setIsRegistering(prevState => !prevState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://th.bing.com/th/id/OIP.HG6Dcd6Hg01wH3CyRrdLRgHaEo?rs=1&pid=ImgDetMain')" }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-semibold mb-4">{isRegistering ? 'Register' : 'Login'}</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="border rounded-md w-full py-2 px-3 mb-4"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="border rounded-md w-full py-2 px-3"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-0 top-0 mt-2 mr-2 text-gray-500 focus:outline-none"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {isRegistering && (
          <>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Full Name"
              className="border rounded-md w-full py-2 px-3 mb-4"
            />
            {/* Tambahkan input tambahan yang dibutuhkan */}
          </>
        )}
        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md w-full mb-4"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p className="text-gray-700 text-center">
          {isRegistering
            ? 'Sudah mempunyai akun?'
            : 'Belum memiliki akun?'}
          <a onClick={handleToggleRegister} className="text-blue-500 cursor-pointer ml-1">
            {isRegistering ? 'Login' : 'Register'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
