// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../services/api'; // Use named imports
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        if (formData.photo) data.append('photo', formData.photo);

        const res = await register(data); 
        localStorage.setItem('token', res.token);
      } else {
        const res = await login({
          email: formData.email,
          password: formData.password,
        }); 
        localStorage.setItem('token', res.token);
      }

      navigate('/worker/:id"');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login/Register failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-4 max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Register as Worker' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>

          <p className="text-sm mt-2 text-center">
            {isRegistering ? 'Already have an account?' : 'New user?'}{' '}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-600 underline"
            >
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
}
