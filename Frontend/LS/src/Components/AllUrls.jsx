import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllUrls = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const { data } = await axios.get('http://localhost:7001/allurls', { withCredentials: true });
      setUrls(data.urls);
    } catch (err) {
      console.error("Error fetching URLs:", err);
      setError("Failed to fetch URLs. You may not have access.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7001/deleteUrl/${id}`, { withCredentials: true });
      setUrls(urls.filter((url) => url._id !== id));
    } catch (err) {
      console.error("Error deleting URL:", err);
      alert("Failed to delete URL. Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">All Shortened URLs</h1>
        {urls.length === 0 ? (
          <p className="text-center text-gray-500">No URLs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-4 text-left border-b">Original URL</th>
                  <th className="py-3 px-4 text-left border-b">Shortened URL</th>
                  <th className="py-3 px-4 text-center border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url._id} className="hover:bg-gray-50 transition duration-300">
                    <td className="py-3 px-4 border-b text-gray-700 break-all">
                      {url.Orgurl}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <a
                        href={url.ShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-500 hover:underline"
                      >
                        {url.ShortUrl}
                      </a>
                    </td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleDelete(url._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUrls;
