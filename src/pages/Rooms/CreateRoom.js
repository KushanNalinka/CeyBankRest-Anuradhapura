

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { usePopup } from '../../context/PopupContext';

export default function CreateRoom(props) {
  const { isOpen, onClose, onSuccess } = props;
  const [roomNo, setRoomNo] = useState('');
  const [status, setStatus] = useState('available');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
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
      if (res.data.length) setSelectedType(res.data[0].roomTypeId);
    } catch {
      setError('Could not load room types.');
    }
  }

  useEffect(() => {
    if (isOpen) fetchTypes();
  });

  async function handleCreate() {
    setError('');
    try {
      await axios.post(`${API_URL}/rooms`, {
        roomNo,
        status,
        roomType: { roomTypeId: selectedType },
      });
      onSuccess('Room created.');
      onClose();
    } catch {
      setError('Create failed.');
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
        <h2 className="text-xl font-medium mb-4">Create Room</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="roomNo" className="block mb-1 text-sm font-medium">
              Room Number
            </label>
            <input
              id="roomNo"
              placeholder="Room No"
              className="w-full border rounded p-2"
              value={roomNo}
              onChange={e => setRoomNo(e.target.value)}
            />
          </div>
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
            className="px-4 py-2 rounded bg-green-500 text-white"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
