


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateRoomType from './CreateRoomType';
// import EditRoomType from './EditRoomType';

// const API_URL = process.env.REACT_APP_API_URL;   // one constant

// export default function RoomTypeList() {
//   const [list, setList]             = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [message, setMessage]       = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem]     = useState(null);

//    // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 4;

//   /* ────────────────── fetch helper ────────────────── */
//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/room-types`);
//       setList(data);
//     } catch {
//       setMessage('Could not load room types.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);                             // stable reference

//   /* ────────────────── delete helper ────────────────── */
//   const handleDelete = async (id) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/room-types/${id}`);
//       setMessage('Deleted successfully.');
//       fetchAll();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   /* ────────────────── initial load ────────────────── */
//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);                     // ESLint happy

//   // Pagination logic
//   //const indexOfLast = currentPage * itemsPerPage;
//  // const indexOfFirst = indexOfLast - itemsPerPage;
//   //const currentItems = list.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(list.length / itemsPerPage);

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
//             <h1 className="text-2xl font-semibold">Room Types</h1>
//             <button
//               className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
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
//                 <span>ID</span>
//                 <span>Name</span>
//                 <span>Rate</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {list.map((item) => (
//                   <li
//                     key={item.roomTypeId}
//                     className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>#{item.roomTypeId}</span>
//                     <span>{item.name}</span>
//                     <span>Rs.{item.currentRate.toLocaleString()}</span>

//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem(item)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(item.roomTypeId)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//                {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="mt-4 flex justify-center space-x-2">
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                       key={index + 1}
//                       onClick={() => setCurrentPage(index + 1)}
//                       className={`px-3 py-1 rounded-md text-sm font-medium ${
//                         currentPage === index + 1
//                           ? 'bg-[#24256D] text-white'
//                           : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//                       }`}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>
//               )}

//             </>
//           )}
//         </div>
//       </div>

//       {/* modals */}
//       <CreateRoomType
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchAll();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchAll();
//         }}
//       />

//       {editItem && (
//         <EditRoomType
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchAll();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchAll();
//           }}
//         />
//       )}
//     </div>
//   );
// }


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateRoomType from './CreateRoomType';
// import EditRoomType from './EditRoomType';

// const API_URL = process.env.REACT_APP_API_URL;

// export default function RoomTypeList() {
//   const [list, setList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/room-types`);
//       setList(data);
//     } catch {
//       setMessage('Could not load room types.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleDelete = async (id) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/room-types/${id}`);
//       setMessage('Deleted successfully.');
//       fetchAll();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);

//   // Pagination logic
//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentItems = list.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(list.length / itemsPerPage);

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
//             <h1 className="text-2xl font-semibold">Room Types</h1>
//             <button
//               className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
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
//                 <span>ID</span>
//                 <span>Name</span>
//                 <span>Rate</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {currentItems.map((item) => (
//                   <li
//                     key={item.roomTypeId}
//                     className="grid grid-cols-4 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>#{item.roomTypeId}</span>
//                     <span>{item.name}</span>
//                     <span>Rs.{item.currentRate.toLocaleString()}</span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem(item)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(item.roomTypeId)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="mt-4 flex justify-center space-x-2">
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                       key={index + 1}
//                       onClick={() => setCurrentPage(index + 1)}
//                       className={`px-3 py-1 rounded-md text-sm font-medium ${
//                         currentPage === index + 1
//                           ? 'bg-[#24256D] text-white'
//                           : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//                       }`}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* modals */}
//       <CreateRoomType
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchAll();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchAll();
//         }}
//       />

//       {editItem && (
//         <EditRoomType
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchAll();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchAll();
//           }}
//         />
//       )}
//     </div>
//   );
// }




import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import CreateRoomType from './CreateRoomType';
import EditRoomType from './EditRoomType';

const API_URL = process.env.REACT_APP_API_URL;

export default function RoomTypeList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.get(`${API_URL}/room-types`);
      setList(data);
    } catch {
      setMessage('Could not load room types.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    setMessage('');
    try {
      await axios.delete(`${API_URL}/room-types/${id}`);
      setMessage('Room type deleted successfully.');
      fetchAll();
    } catch {
      setMessage('Delete failed.');
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = list.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(list.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading room types...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-5xl mx-auto">
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
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Room Types</h1>
                  <p className="text-gray-600">Manage different room categories and their rates</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
              >
                <FaPlus className="h-4 w-4" />
                Add Room Type
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
                    <th className="py-3 px-6 text-left text-white font-medium text-sm">ID</th>
                    <th className="py-3 px-6 text-left text-white font-medium text-sm">Name</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Current Rate</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => (
                    <tr key={item.roomTypeId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                          #{item.roomTypeId}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="inline-flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1">
                          <svg className="h-4 w-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold text-yellow-800">
                            Rs {item.currentRate.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditItem(item)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Room Type"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.roomTypeId)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Room Type"
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
          {list.length === 0 && !loading && (
            <div className="bg-white border rounded-lg p-12 text-center mt-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Room Types Found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first room type.</p>
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
                Create Room Type
              </button>
            </div>
          )}

          {/* Statistics Card */}
          {list.length > 0 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Types</p>
                      <p className="text-xl font-bold text-blue-900">{list.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600">Average Rate</p>
                      <p className="text-xl font-bold text-yellow-800">
                        Rs {Math.round(list.reduce((sum, item) => sum + item.currentRate, 0) / list.length).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Highest Rate</p>
                      <p className="text-xl font-bold text-green-800">
                        Rs {Math.max(...list.map(item => item.currentRate)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateRoomType
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchAll();
        }}
        onSuccess={(msg) => {
          setMessage(msg);
          fetchAll();
        }}
      />

      {editItem && (
        <EditRoomType
          initial={editItem}
          isOpen={true}
          onClose={() => {
            setEditItem(null);
            fetchAll();
          }}
          onSuccess={(msg) => {
            setMessage(msg);
            fetchAll();
          }}
        />
      )}
    </div>
  );
}