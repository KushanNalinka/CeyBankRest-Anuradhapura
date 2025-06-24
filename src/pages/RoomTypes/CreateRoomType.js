

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function CreateRoomType(props) {
//   const { isOpen, onClose, onSuccess } = props;
//   const [name, setName] = useState('');
//   const [rate, setRate] = useState(0);
//   const [error, setError] = useState('');
//   const { openPopup, closePopup } = usePopup();
//  const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) {
//       openPopup();
//     } else {
//       closePopup();
//     }
//     return () => closePopup();
//   });

//   async function handleCreate() {
//     setError('');
//     try {
//       await axios.post(`${API_URL}/room-types`, {
//         name,
//         currentRate: rate,
//       });
//       onSuccess('Created successfully.');
//       onClose();
//     } catch {
//       setError('Create failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/30"
//         onClick={onClose}
//       />
//       <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Create Room Type</h2>
//         {error && (
//           <p className="mb-2 text-red-600">{error}</p>
//         )}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block mb-1 text-sm font-medium">
//               Name
//             </label>
//             <input
//               id="name"
//               placeholder="Name"
//               className="w-full border rounded p-2"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="rate" className="block mb-1 text-sm font-medium">
//               Rate
//             </label>
//             <input
//               id="rate"
//               type="number"
//               placeholder="Rate"
//               className="w-full border rounded p-2"
//               value={rate}
//               onChange={e => setRate(+e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="mt-5 flex justify-end space-x-2">
//           <button
//             className="px-4 py-2 rounded bg-gray-200"
//             onClick={onClose}
//           >
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

export default function CreateRoomType(props) {
  const { isOpen, onClose, onSuccess } = props;
  const [name, setName] = useState('');
  const [rate, setRate] = useState(0);
  const [error, setError] = useState('');
  const { openPopup, closePopup } = usePopup();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isOpen) {
      openPopup();
    } else {
      closePopup();
    }
    return () => closePopup();
  });

  async function handleCreate() {
    setError('');
    try {
      await axios.post(`${API_URL}/room-types`, {
        name,
        currentRate: rate,
      });
      onSuccess('Room type created successfully.');
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
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Create Room Type</h2>
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Room Type Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter room type name (e.g., Deluxe Suite)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">A descriptive name for this room category</p>
            </div>
            
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
                Rate per Night (Rs)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Rs</span>
                <input
                  id="rate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={rate}
                  onChange={e => setRate(+e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Base rate charged per night for this room type</p>
              
              {/* Rate Preview */}
              {rate > 0 && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-yellow-800 font-medium">
                      Rate: Rs {rate.toLocaleString()} per night
                    </span>
                  </div>
                </div>
              )}
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
              Create Room Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}