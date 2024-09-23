// export default LocalCandidateInfoPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const LocalCandidateInfoPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { listId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch list details
        const listResponse = await axios.get(
          `http://localhost:3000/api/local-list/${listId}`
        );
        setListName(listResponse.data.name); // Set the list name

        // Fetch candidates for the list
        const candidatesResponse = await axios.get(
          `http://localhost:3000/api/local-candidate-info/${listId}`
        );
        setCandidates(candidatesResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [listId]);

  const handleStatusUpdate = async (status) => {
    try {
      await axios.put(`http://localhost:3000/api/local-list/status/${listId}`, {
        status,
      });
      alert(`List ${status} successfully`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-lg text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">{listName}</h1>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                الإسم
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                الرقم الوطني
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                البريد الالكتروني
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                الجنس
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider">
                الديانة
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <tr key={candidate.N_Id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {candidate.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {candidate.N_Id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {candidate.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {candidate.gender}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  {candidate.religion}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center space-x-4 gap-3">
        <button
          onClick={() => handleStatusUpdate("approved")}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          قبول
        </button>
        <button
          onClick={() => handleStatusUpdate("rejected")}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          رفض
        </button>
      </div>
    </div>
  );
};

export default LocalCandidateInfoPage;
