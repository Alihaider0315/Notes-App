// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndPoint';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '../Redux/AuthSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/auth/login', value);
      const response = request.data;

      if (response.success) {
        toast.success(response.message);
        dispatch(addUser({ user: response.user, token: response.token }));
        console.log('Navigating to home...'); // Debug log
        navigate('/'); // Navigate to home page
      } else {
        toast.error('Login failed');
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred');
      }
      console.log('error', error);
    }
  };

  return (
    <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
      <div className='form-container border shadow p-5 rounded-4 bg-white'>
        <h2 className='text-center mb-4 fw-bold'>Login</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className='form-label'>Email</label>
            <input
              type="email"
              value={value.email}
              onChange={handleChange}
              name='email'
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input
              type="password"
              value={value.password}
              onChange={handleChange}
              name='password'
              className='form-control'
              placeholder='Enter your password'
            />
          </div>
          <button className='btn btn-success w-100 mb-3'>Login</button>
          <div className='text-center'>
            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
