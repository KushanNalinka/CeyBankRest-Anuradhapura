
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateRoom from './CreateRoom';
// import EditRoom from './EditRoom';

// const API_URL = process.env.REACT_APP_API_URL;   // build-time constant

// export default function RoomList() {
//   const [rooms, setRooms]           = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [message, setMessage]       = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editRoom, setEditRoom]     = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const roomsPerPage = 5;

//   /* ────────────────── fetch helper ────────────────── */
//   const fetchRooms = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/rooms`);
//       setRooms(data);
//     } catch {
//       setMessage('Could not load rooms.');
//     } finally {
//       setLoading(false);
//     }
//   }, []); // stable ref

//   /* ────────────────── delete helper ────────────────── */
//   const handleDelete = async (roomNo) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/rooms/${roomNo}`);
//       setMessage('Deleted room.');
//       fetchRooms();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   /* ────────────────── initial load ────────────────── */
//   useEffect(() => {
//     fetchRooms();
//   }, [fetchRooms]);

//    //const indexOfLast = currentPage * roomsPerPage;
//   //const indexOfFirst = indexOfLast - roomsPerPage;
//  // const currentRooms = rooms.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(rooms.length / roomsPerPage);

//   /* ────────────────── UI ────────────────── */
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-3xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Rooms</h1>
//             <button
//               className="p-2 bg-yellow-300 text-white rounded-full hover:bg-yellow-600"
//               onClick={() => setShowCreate(true)}
//             >
//               <FaPlus />
//             </button>
//           </div>

//           {loading ? (
//             <p>Loading…</p>
//           ) : (
//             <>
//               {/* table headings */}
//               <div className="grid grid-cols-4 gap-4 py-2 border-b font-semibold text-gray-600">
//                 <span>Room&nbsp;No</span>
//                 <span>Room&nbsp;Type</span>
//                 <span>Status</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {rooms.map((r) => (
//                   <li
//                     key={r.roomNo}
//                     className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>{r.roomNo}</span>

//                     <span>{r.roomType?.name ?? '-'}</span>

//                     <span
//                       className={
//                         r.status === 'available'
//                           ? 'text-green-600'
//                           : 'text-red-600'
//                       }
//                     >
//                       {r.status}
//                     </span>

//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditRoom(r)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(r.roomNo)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => setCurrentPage(i + 1)}
//                       className={`px-3 py-1 rounded-md text-sm font-medium ${
//                         currentPage === i + 1
//                           ? 'bg-[#24256D] text-white'
//                           : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* modals */}
//       <CreateRoom
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchRooms();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchRooms();
//         }}
//       />

//       {editRoom && (
//         <EditRoom
//           initial={editRoom}
//           isOpen={true}
//           onClose={() => {
//             setEditRoom(null);
//             fetchRooms();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchRooms();
//           }}
//         />
//       )}
//     </div>
//   );
// }



// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateRoom from './CreateRoom';
// import EditRoom from './EditRoom';

// const API_URL = process.env.REACT_APP_API_URL;

// export default function RoomList() {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editRoom, setEditRoom] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const roomsPerPage = 10;

//   const fetchRooms = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/rooms`);
//       setRooms(data);
//     } catch {
//       setMessage('Could not load rooms.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleDelete = async (roomNo) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/rooms/${roomNo}`);
//       setMessage('Deleted room.');
//       fetchRooms();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, [fetchRooms]);

//   const indexOfLast = currentPage * roomsPerPage;
//   const indexOfFirst = indexOfLast - roomsPerPage;
//   const currentRooms = rooms.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(rooms.length / roomsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Rooms</h1>
//             <button
//               className="p-2 bg-yellow-300 text-white rounded-full hover:bg-yellow-600"
//               onClick={() => setShowCreate(true)}
//             >
//               <FaPlus />
//             </button>
//           </div>

//           {loading ? (
//             <p>Loading…</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-4 gap-4 py-2 border-b font-semibold text-gray-600">
//                 <span>Room&nbsp;No</span>
//                 <span>Room&nbsp;Type</span>
//                 <span>Status</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {currentRooms.map((r) => (
//                   <li
//                     key={r.roomNo}
//                     className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>{r.roomNo}</span>
//                     <span>{r.roomType?.name ?? '-'}</span>
//                     <span
//                       className={
//                         r.status === 'available'
//                           ? 'text-green-600'
//                           : 'text-red-600'
//                       }
//                     >
//                       {r.status}
//                     </span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditRoom(r)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(r.roomNo)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => setCurrentPage(i + 1)}
//                       className={`px-3 py-1 rounded-md text-sm font-medium ${
//                         currentPage === i + 1
//                           ? 'bg-[#24256D] text-white'
//                           : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       <CreateRoom
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchRooms();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchRooms();
//         }}
//       />

//       {editRoom && (
//         <EditRoom
//           initial={editRoom}
//           isOpen={true}
//           onClose={() => {
//             setEditRoom(null);
//             fetchRooms();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchRooms();
//           }}
//         />
//       )}
//     </div>
//   );
// }




import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom';

const API_URL = process.env.REACT_APP_API_URL;

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 10;

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.get(`${API_URL}/rooms`);
      setRooms(data);
    } catch {
      setMessage('Could not load rooms.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (roomNo) => {
    setMessage('');
    try {
      await axios.delete(`${API_URL}/rooms/${roomNo}`);
      setMessage('Room deleted successfully.');
      fetchRooms();
    } catch {
      setMessage('Delete failed.');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const indexOfLast = currentPage * roomsPerPage;
  const indexOfFirst = indexOfLast - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading rooms...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              message.includes('success') || message.includes('created') || message.includes('Deleted')
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <p className="font-medium">{message}</p>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
                  <p className="text-gray-600">Manage hotel rooms and their availability</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
              >
                <FaPlus className="h-4 w-4" />
                Add New Room
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {/* Table Header */}
                <thead className="bg-blue-600">
                  <tr>
                    <th className="py-3 px-6 text-left text-white font-medium text-sm">Room No</th>
                    <th className="py-3 px-6 text-left text-white font-medium text-sm">Room Type</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Status</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRooms.map((room) => (
                    <tr key={room.roomNo} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                            {room.roomNo}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">
                          {room.roomType?.name || 'No Type'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          room.status === 'available'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            room.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          {room.status === 'available' ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditRoom(room)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Room"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(room.roomNo)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Room"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 border-t px-6 py-3">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Empty State */}
          {rooms.length === 0 && !loading && (
            <div className="bg-white border rounded-lg p-12 text-center mt-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first room.</p>
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
                Create Room
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateRoom
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchRooms();
        }}
        onSuccess={(msg) => {
          setMessage(msg);
          fetchRooms();
        }}
      />

      {editRoom && (
        <EditRoom
          initial={editRoom}
          isOpen={true}
          onClose={() => {
            setEditRoom(null);
            fetchRooms();
          }}
          onSuccess={(msg) => {
            setMessage(msg);
            fetchRooms();
          }}
        />
      )}
    </div>
  );
}