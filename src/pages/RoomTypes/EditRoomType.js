

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditRoomType(props) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [name, setName] = useState(initial.name);
//   const [rate, setRate] = useState(initial.currentRate);
//   const [error, setError] = useState('');

//   const { openPopup, closePopup } = usePopup();
//   const API_URL = process.env.REACT_APP_API_URL;
  
//   useEffect(() => {
//     if (isOpen) {
//       openPopup();
//     } else {
//       closePopup();
//     }
//     return () => closePopup();
//   });

//   useEffect(() => {
//     setName(initial.name);
//     setRate(initial.currentRate);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(
//         `${API_URL}/room-types/${initial.roomTypeId}`,
//         { name, currentRate: rate }
//       );
//       onSuccess('Updated successfully.');
//       onClose();
//     } catch {
//       setError('Update failed.');
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
//         <h2 className="text-xl font-medium mb-4">Edit Room Type</h2>
//         {error && (
//           <p className="mb-2 text-red-600">{error}</p>
//         )}
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="roomTypeName" className="block mb-1 text-sm font-medium">
//               Name
//             </label>
//             <input
//               id="roomTypeName"
//               className="w-full border rounded p-2"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="roomTypeRate" className="block mb-1 text-sm font-medium">
//               Rate
//             </label>
//             <input
//               id="roomTypeRate"
//               type="number"
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

export default function EditRoomType(props) {
  const { initial, isOpen, onClose, onSuccess } = props;
  const [name, setName] = useState(initial.name);
  const [rate, setRate] = useState(initial.currentRate);
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

  useEffect(() => {
    setName(initial.name);
    setRate(initial.currentRate);
  }, [initial]);

  async function handleUpdate() {
    setError('');
    try {
      await axios.put(
        `${API_URL}/room-types/${initial.roomTypeId}`,
        { name, currentRate: rate }
      );
      onSuccess('Room type updated successfully.');
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
              <h2 className="text-lg font-semibold text-gray-900">Edit Room Type</h2>
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

          {/* Room Type ID Display */}
          <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">#{initial.roomTypeId}</span>
              </div>
              <div>
                <span className="text-sm text-blue-600 font-medium">Room Type ID</span>
                <p className="text-lg font-bold text-blue-900">#{initial.roomTypeId}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="roomTypeName" className="block text-sm font-medium text-gray-700 mb-2">
                Room Type Name
              </label>
              <input
                id="roomTypeName"
                type="text"
                placeholder="Enter room type name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Update the descriptive name for this room category</p>
            </div>
            
            <div>
              <label htmlFor="roomTypeRate" className="block text-sm font-medium text-gray-700 mb-2">
                Rate per Night (Rs)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">Rs</span>
                <input
                  id="roomTypeRate"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={rate}
                  onChange={e => setRate(+e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Update the base rate charged per night</p>
              
              {/* Rate Comparison */}
              <div className="mt-3 flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-xs text-yellow-600 font-medium">Rate Change</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-yellow-800">Rs {initial.currentRate.toLocaleString()}</span>
                      <svg className="h-3 w-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-yellow-800">Rs {rate.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                {rate !== initial.currentRate && (
                  <div className={`text-xs font-medium px-2 py-1 rounded ${
                    rate > initial.currentRate 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {rate > initial.currentRate ? '+' : ''}
                    Rs {(rate - initial.currentRate).toLocaleString()}
                  </div>
                )}
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
              Update Room Type
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}