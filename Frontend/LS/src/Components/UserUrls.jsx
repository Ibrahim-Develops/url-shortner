import React, { useEffect, useState } from "react";
import axios from "axios";

const UserUrls = ({ userId }) => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchUserUrls = async () => {
            try {
                const { data } = await axios.get(`http://localhost:7001/specurls`, { withCredentials: true });
                setUrls(data.urls);
            } catch (error) {
                console.error("Error fetching URLs:", error);
                alert("Failed to load URLs. Please log in again.");
            }
        };

        fetchUserUrls();
    }, [userId]);

    return (
        <div className="py-[25px]  h-[25.5rem]  bg-gray-100 flex  justify-center">
            <div className="w-[80rem]  bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Your Shortened URLs
                </h2>
                {urls.length === 0 ? (
                    <p className="text-gray-500 text-center">No URLs created yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {urls.map((url) => (
                            <li key={url._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300 bg-gray-50">
                                <p className="text-gray-700 truncate">
                                    <span className="font-medium text-gray-600">Original URL:</span>{" "}
                                    <a
                                        href={url.Orgurl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {url.Orgurl}
                                    </a>
                                </p>
                                <p className="mt-2">
                                    <span className="font-medium text-gray-600">Shortened URL:</span>{" "}
                                    <a
                                        href={url.ShortUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-500 hover:underline"
                                    >
                                        {url.ShortUrl}
                                    </a>
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserUrls;
