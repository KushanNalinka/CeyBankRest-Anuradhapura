


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditRoom(props) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [roomNo] = useState(initial.roomNo);
//   const [status, setStatus] = useState(initial.status);
//   const [types, setTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState(initial.roomType.roomTypeId);
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
//     } catch {
//       setError('Could not load room types.');
//     }
//   }

//   useEffect(() => {
//     if (isOpen) fetchTypes();
//   });

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(`${API_URL}/rooms/${roomNo}`, {
//         roomNo,
//         status,
//         roomType: { roomTypeId: selectedType },
//       });
//       onSuccess('Room updated.');
//       onClose();
//     } catch {
//       setError('Update failed.');
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
//         <h2 className="text-xl font-medium mb-4">Edit Room {roomNo}</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}
//         <div className="space-y-4">
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
//             className="px-4 py-2 rounded bg-blue-500 text-white"
//             onClick={handleUpdate}
//           >
//             Update
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 rounded-t-xl border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Edit Room {roomNo}</h2>
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

          {/* Room Number Display */}
          <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">{roomNo}</span>
              </div>
              <div>
                <span className="text-sm text-blue-600 font-medium">Room Number</span>
                <p className="text-lg font-bold text-blue-900">{roomNo}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-5">
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
                Room Status
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
              
              {/* Status Preview */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-gray-500">Current status:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                    status === 'available' ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  {status === 'available' ? 'Available' : 'Unavailable'}
                </span>
              </div>
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
              onClick={handleUpdate}
            >
              Update Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}