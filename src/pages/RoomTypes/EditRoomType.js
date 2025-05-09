
// src/components/EditRoomType.tsx
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditRoomType(props: {
//   initial: any;
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: (msg: string) => void;
// }) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [name, setName] = useState<string>(initial.name);
//   const [rate, setRate] = useState<number>(initial.currentRate);
//   const [error, setError] = useState<string>('');

//   const { openPopup, closePopup } = usePopup();
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  
//     useEffect(() => {
//       if (isOpen) {
//         openPopup();
//       } else {
//         closePopup();
//       }
//       return () => closePopup();
//     }, [isOpen]);

//   useEffect(() => {
//     setName(initial.name);
//     setRate(initial.currentRate);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(
//         `http://localhost:8080/api/room-types/${initial.roomTypeId}`,
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
//           <input
//             className="w-full border rounded p-2"
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />
//           <input
//             type="number"
//             className="w-full border rounded p-2"
//             value={rate}
//             onChange={e => setRate(+e.target.value)}
//           />
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

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditRoomType(props: {
//   initial: any;
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: (msg: string) => void;
// }) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [name, setName] = useState<string>(initial.name);
//   const [rate, setRate] = useState<number>(initial.currentRate);
//   const [error, setError] = useState<string>('');

//   const { openPopup, closePopup } = usePopup();
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  
//   useEffect(() => {
//     if (isOpen) {
//       openPopup();
//     } else {
//       closePopup();
//     }
//     return () => closePopup();
//   }, [isOpen]);

//   useEffect(() => {
//     setName(initial.name);
//     setRate(initial.currentRate);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(
//         `http://localhost:8080/api/room-types/${initial.roomTypeId}`,
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
  }, [isOpen]);

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
      onSuccess('Updated successfully.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl p-6 w-80 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-medium mb-4">Edit Room Type</h2>
        {error && (
          <p className="mb-2 text-red-600">{error}</p>
        )}
        <div className="space-y-4">
          <div>
            <label htmlFor="roomTypeName" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              id="roomTypeName"
              className="w-full border rounded p-2"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="roomTypeRate" className="block mb-1 text-sm font-medium">
              Rate
            </label>
            <input
              id="roomTypeRate"
              type="number"
              className="w-full border rounded p-2"
              value={rate}
              onChange={e => setRate(+e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-gray-200"
            onClick={onClose}
          >
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
