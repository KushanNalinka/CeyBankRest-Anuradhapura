
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StoreRequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;  // build-time constant

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/good-requisitions/summaries`)
      .then((res) => setRequisitions(res.data))
      .catch(() => setMessage('Failed to load requisitions.'));
  }, []);

  const handleEditStatus = (id) => {
    alert(`Edit status functionality for ID ${id} not implemented yet.`);
  };

  const handleViewItems = (id) => {
    navigate(`/good-requisition-items/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Good Requisitions List to Approve</h1>
      {message && <p className="text-red-600">{message}</p>}
      <table className="table-auto w-full border shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Good Requisition ID</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {requisitions.map((req) => (
            <tr key={req.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{req.id}</td>
              <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
              <td className="p-2 border">{req.date}</td>
              <td className="p-2 border">{req.status ?? 'Pending'}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEditStatus(req.id)}
                  className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleViewItems(req.id)}
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreRequisitionList;
