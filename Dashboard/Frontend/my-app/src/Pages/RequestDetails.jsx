// LocalCandidateInfoTable.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const LocalCandidateInfoTable = ({ listId }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts or when listId changes
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/local-candidate-info/${listId}`
        );
        setCandidates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [listId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>الاسم</th>
          <th>الرقم الوطني</th>
          <th>البريد الإلكتروني</th>
          <th>الجنس</th>
          <th>الديانة </th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate) => (
          <tr key={candidate.N_Id}>
            <td>{candidate.name}</td>
            <td>{candidate.N_Id}</td>
            <td>{candidate.email}</td>
            <td>{candidate.gender}</td>
            <td>{candidate.religion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocalCandidateInfoTable;
