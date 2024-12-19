import React, { useState } from 'react';
import axios from 'axios';

const UrlShort = () => {
  const [inp, setInp] = useState({});
  const [shortUrl, setShortUrl] = useState("");

  const handleInput = (e) => {
    setInp({ ...inp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:7001/orgurl',
        inp,
        { withCredentials: true }, 
      );
      setShortUrl(data.shortUrl);
    } catch (e) {
      console.error(e);
      alert("Failed to shorten the URL. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center pt-[25px] h-[25.5em] bg-gray-100">
      <div className="w-[400px] p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">URL Shortener</h2>
        <div className="flex gap-3">
          <input
            onChange={handleInput}
            className="flex-1 border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            type="text"
            name="url"
            placeholder="Enter your URL here..."
          />
          <button
            onClick={handleSubmit}
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition"
          >
            Shorten
          </button>
        </div>
        {shortUrl && (
          <div className="mt-4 p-3 bg-cyan-50 text-cyan-800 rounded-md text-center">
            <span className="font-medium">Shortened URL:</span>{" "}
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-700 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShort;
