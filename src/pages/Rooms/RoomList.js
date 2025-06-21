
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



import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateRoom from './CreateRoom';
import EditRoom from './EditRoom';

const API_URL = process.env.REACT_APP_API_URL;   // build-time constant

export default function RoomList() {
  const [rooms, setRooms]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [message, setMessage]           = useState('');
  const [showCreate, setShowCreate]     = useState(false);
  const [editRoom, setEditRoom]         = useState(null);

  const [currentPage, setCurrentPage]   = useState(1);
  const roomsPerPage                    = 5;

  /* ────────────────── fetch helper ────────────────── */
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

  /* ────────────────── delete helper ────────────────── */
  const handleDelete = async (roomNo) => {
    setMessage('');
    try {
      await axios.delete(`${API_URL}/rooms/${roomNo}`);
      setMessage('Deleted room.');
      fetchRooms();
    } catch {
      setMessage('Delete failed.');
    }
  };

  /* ────────────────── initial load ────────────────── */
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  /* ────────────────── pagination maths ────────────────── */
  const totalPages   = Math.ceil(rooms.length / roomsPerPage);
  const indexOfLast  = currentPage * roomsPerPage;
  const indexOfFirst = indexOfLast - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirst, indexOfLast);

  /* Reset to the last valid page if we deleted items */
  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
  }, [rooms, currentPage, totalPages]);

  /* ────────────────── UI ────────────────── */
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        {message && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Rooms</h1>
            <button
              className="p-2 bg-yellow-300 text-white rounded-full hover:bg-yellow-600"
              onClick={() => setShowCreate(true)}
            >
              <FaPlus />
            </button>
          </div>

          {loading ? (
            <p>Loading…</p>
          ) : (
            <>
              {/* table headings */}
              <div className="grid grid-cols-4 gap-4 py-2 border-b font-semibold text-gray-600">
                <span>Room&nbsp;No</span>
                <span>Room&nbsp;Type</span>
                <span>Status</span>
                <span className="text-right">Actions</span>
              </div>

              <ul>
                {currentRooms.map((r) => (
                  <li
                    key={r.roomNo}
                    className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
                  >
                    <span>{r.roomNo}</span>

                    <span>{r.roomType?.name ?? '-'}</span>

                    <span
                      className={
                        r.status === 'available'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {r.status}
                    </span>

                    <span className="flex justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => setEditRoom(r)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(r.roomNo)}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        currentPage === i + 1
                          ? 'bg-[#24256D] text-white'
                          : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* modals */}
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
