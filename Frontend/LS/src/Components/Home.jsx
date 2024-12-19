import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7001/logout', {}, { withCredentials: true });
      alert('Logged out successfully');
      navigate('/login'); // Redirect to the login page after logout
    } catch (err) {
      console.error('Logout error:', err);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[15rem] bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome To Home</h1>

        <div className="flex gap-5">
          <Link to="shorturl" className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-600 transition duration-300">Shorten URL</Link>
          <Link to="userurls" className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-600 transition duration-300">Your URLs</Link>
          <Link to="allurls" className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-md shadow-md hover:bg-cyan-600 transition duration-300">All URLs</Link>
          <button onClick={handleLogout} className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-300">Logout</button>
        </div>
      </div>

      <div className="p-6 shadow-inner rounded-lg">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
