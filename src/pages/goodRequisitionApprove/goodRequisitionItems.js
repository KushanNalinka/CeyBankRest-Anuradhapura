
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

export default function StoreRequisitionItems() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [approveQty, setApproveQty] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
const API_URL = process.env.REACT_APP_API_URL;  // build-time constant

  const fetchItems = () => {
    axios
      .get(`${API_URL}/v1/good-requisitions/${id}/items`)
      .then((res) => setItems(res.data))
      .catch(() => setMessage('Failed to load requisition items.'));
  };

  useEffect(() => {
    fetchItems();
  });

  const handleApprove = (item) => {
    setSelectedItem(item);
    setApproveQty(item.approvedQuantity || 0);
    setShowPopup(true);
    setSuccessMsg('');
  };

  const handleSubmitApproval = () => {
    axios
      .put(`${API_URL}/v1/good-requisitions/approve-item`, {
        itemId: selectedItem?.id,
        approvedQuantity: approveQty,
      })
      .then(() => {
        setShowPopup(false);
        setSuccessMsg('Approval updated successfully.');
        fetchItems(); // Refresh data
      })
      .catch(() => alert('Failed to update approval.'));
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Items for Good Requisition ID: {id}</h2>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
      >
        ← Back to Previous Page
      </button>
      {message && <p className="text-red-600">{message}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <table className="table-auto w-full border shadow-md rounded-lg mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Item Id</th>
            <th className="p-2 border">Item Code</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Required</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{item.id}</td>
              <td className="p-2 border">{item.itemCode}</td>
              <td className="p-2 border">{item.itemName}</td>
              <td className="p-2 border">{item.unit}</td>
              <td className="p-2 border">{item.requiredQuantity}</td>
              <td className="p-2 border">{item.approvedQuantity}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleApprove(item)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transparent Popup */}
      {showPopup && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
          <div className="bg-white border shadow-lg rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Approve Quantity</h3>
            <p>
              <strong>Item Name:</strong> {selectedItem.itemName}
            </p>
            <p>
              <strong>Item Code:</strong> {selectedItem.itemCode}
            </p>
            <p>
              <strong>Required Quantity:</strong> {selectedItem.requiredQuantity}
            </p>
            <label className="block mt-4 font-medium">
              Approved Quantity:
              <input
                type="number"
                value={approveQty}
                onChange={(e) => setApproveQty(Number(e.target.value))}
                className="mt-1 block w-full border rounded px-3 py-1 shadow"
                min={0}
                max={selectedItem.requiredQuantity}
              />
            </label>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApproval}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
