"use client"
import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:2000/auth/login', {
        email,
        password
      });
      const { token, message } = response.data;
      localStorage.setItem('token', token);
      setMessage(message);
      // Redirect to /profile after successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Error logging in');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
