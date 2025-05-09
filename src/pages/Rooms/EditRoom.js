


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { usePopup } from '../../context/PopupContext';

export default function EditRoom(props) {
  const { initial, isOpen, onClose, onSuccess } = props;
  const [roomNo] = useState(initial.roomNo);
  const [status, setStatus] = useState(initial.status);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(initial.roomType.roomTypeId);
  const [error, setError] = useState('');
  const { openPopup, closePopup } = usePopup();
const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isOpen) openPopup();
    else closePopup();
    return () => closePopup();
  });

  async function fetchTypes() {
    try {
      const res = await axios.get(`${API_URL}/room-types`);
      setTypes(res.data);
    } catch {
      setError('Could not load room types.');
    }
  }

  useEffect(() => {
    if (isOpen) fetchTypes();
  });

  async function handleUpdate() {
    setError('');
    try {
      await axios.put(`${API_URL}/rooms/${roomNo}`, {
        roomNo,
        status,
        roomType: { roomTypeId: selectedType },
      });
      onSuccess('Room updated.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4">Edit Room {roomNo}</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="roomType" className="block mb-1 text-sm font-medium">
              Room Type
            </label>
            <select
              id="roomType"
              className="w-full border rounded p-2"
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
            >
              {types.map(t => (
                <option key={t.roomTypeId} value={t.roomTypeId}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block mb-1 text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              className="w-full border rounded p-2"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="available">available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
        </div>
        <div className="mt-5 flex justify-end space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
