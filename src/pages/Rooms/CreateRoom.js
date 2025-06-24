

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function CreateRoom(props) {
//   const { isOpen, onClose, onSuccess } = props;
//   const [roomNo, setRoomNo] = useState('');
//   const [status, setStatus] = useState('available');
//   const [types, setTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState('');
//   const [error, setError] = useState('');

//   const { openPopup, closePopup } = usePopup();
// const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) openPopup();
//     else closePopup();
//     return () => closePopup();
//   });

//   async function fetchTypes() {
//     try {
//       const res = await axios.get(`${API_URL}/room-types`);
//       setTypes(res.data);
//       if (res.data.length) setSelectedType(res.data[0].roomTypeId);
//     } catch {
//       setError('Could not load room types.');
//     }
//   }

//   useEffect(() => {
//     if (isOpen) fetchTypes();
//   });

//   async function handleCreate() {
//     setError('');
//     try {
//       await axios.post(`${API_URL}/rooms`, {
//         roomNo,
//         status,
//         roomType: { roomTypeId: selectedType },
//       });
//       onSuccess('Room created.');
//       onClose();
//     } catch {
//       setError('Create failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Create Room</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="roomNo" className="block mb-1 text-sm font-medium">
//               Room Number
//             </label>
//             <input
//               id="roomNo"
//               placeholder="Room No"
//               className="w-full border rounded p-2"
//               value={roomNo}
//               onChange={e => setRoomNo(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="roomType" className="block mb-1 text-sm font-medium">
//               Room Type
//             </label>
//             <select
//               id="roomType"
//               className="w-full border rounded p-2"
//               value={selectedType}
//               onChange={e => setSelectedType(e.target.value)}
//             >
//               {types.map(t => (
//                 <option key={t.roomTypeId} value={t.roomTypeId}>
//                   {t.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label htmlFor="status" className="block mb-1 text-sm font-medium">
//               Status
//             </label>
//             <select
//               id="status"
//               className="w-full border rounded p-2"
//               value={status}
//               onChange={e => setStatus(e.target.value)}
//             >
//               <option value="available">available</option>
//               <option value="Unavailable">Unavailable</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-5 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-green-500 text-white"
//             onClick={handleCreate}
//           >
//             Create
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 rounded-t-xl border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Create New Room</h2>
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}
          
          <div className="space-y-5">
            <div>
              <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700 mb-2">
                Room Number
              </label>
              <input
                id="roomNo"
                type="text"
                placeholder="Enter room number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={roomNo}
                onChange={e => setRoomNo(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-2">
                Room Type
              </label>
              <select
                id="roomType"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
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
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={handleCreate}
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}