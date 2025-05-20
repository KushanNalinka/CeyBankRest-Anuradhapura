
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateBeverage from './CreateBeverage';
// import EditBeverage from './EditBeverage';

// export default function BeverageList() {
//   const [bevs, setBevs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const API_URL = process.env.REACT_APP_API_URL;

//   async function fetchBevs() {
//     setLoading(true);
//     setMessage('');
//     try {
//       const res = await axios.get(`${API_URL}/beverages`);
//       setBevs(res.data);
//     } catch {
//       setMessage('Could not load beverages.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     setMessage('');
//     try {
//       await axios.delete(`http://localhost:8080/api/beverages/${id}`);
//       setMessage('Deleted beverage.');
//       fetchBevs();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   }

//   useEffect(() => {
//     fetchBevs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}
//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Beverages</h1>
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
//               <div className="grid grid-cols-7 gap-4 py-2 border-b font-semibold text-gray-600">
//                 <span>Image</span>
//                 <span>Code</span>
//                 <span>Name</span>
//                 <span>Price</span>
//                 <span>Category</span>
//                 <span>Portion</span>
//                 <span className="text-right">Actions</span>
//               </div>
//               <ul>
//                 {bevs.map((b) => (
//                   <li
//                     key={b.beverageId}
//                     className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>
//                       <img
//                         src={b.image || 'https://via.placeholder.com/40'}
//                         alt={b.name}
//                         className="w-10 h-10 object-cover rounded-full border"
//                       />
//                     </span>
//                     <span>{b.code}</span>
//                     <span>{b.name}</span>
//                     <span>₹{b.price.toFixed(2)}</span>
//                     <span>{b.itemCategory}</span>
//                     <span>{b.portionType}</span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem(b)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(b.beverageId)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       </div>

//       <CreateBeverage
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchBevs();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchBevs();
//         }}
//       />

//       {editItem && (
//         <EditBeverage
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchBevs();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchBevs();
//           }}
//         />
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateBeverage from './CreateBeverage';
// import EditBeverage from './EditBeverage';
// const API_URL = process.env.REACT_APP_API_URL;  // build-time constant


// export default function BeverageList() {
//   const [bevs, setBevs]       = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem]     = useState(null);
  
//   /* ────────────────── helpers ────────────────── */
//   const fetchBevs = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/beverages`);
//       setBevs(data);
//     } catch {
//       setMessage('Could not load beverages.');
//     } finally {
//       setLoading(false);
//     }
//   }, []); // ← empty array: same function reference every render

//   const handleDelete = async (id) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/beverages/${id}`);
//       setMessage('Deleted beverage.');
//       fetchBevs();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   /* ────────────────── effects ────────────────── */
//   useEffect(() => {
//     fetchBevs();
//   }, [fetchBevs]);   // ESLint satisfied, no infinite loop

//   /* ────────────────── UI ────────────────── */
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-semibold">Beverages</h1>
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
//               <div className="grid grid-cols-7 gap-4 py-2 border-b font-semibold text-gray-600">
//                 <span>Image</span>
//                 <span>Code</span>
//                 <span>Name</span>
//                 <span>Price</span>
//                 <span>Category</span>
//                 <span>Portion</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {bevs.map((b) => (
//                   <li
//                     key={b.beverageId}
//                     className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>
//                       <img
//                         src={b.image || 'https://via.placeholder.com/40'}
//                         alt={b.name}
//                         className="w-10 h-10 object-cover rounded-full border"
//                       />
//                     </span>
//                     <span>{b.code}</span>
//                     <span>{b.name}</span>
//                     <span>₹{b.price.toFixed(2)}</span>
//                     <span>{b.itemCategory}</span>
//                     <span>{b.portionType}</span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem(b)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(b.beverageId)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </>
//           )}
//         </div>
//       </div>

//       {/* ────── Modals ────── */}
//       <CreateBeverage
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchBevs();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchBevs();
//         }}
//       />

//       {editItem && (
//         <EditBeverage
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchBevs();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchBevs();
//           }}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import CreateBeverage from './CreateBeverage';
import EditBeverage from './EditBeverage';

const API_URL = process.env.REACT_APP_API_URL;

export default function BeverageList() {
  const [bevs, setBevs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchBevs = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.get(`${API_URL}/beverages`);
      setBevs(data);
    } catch {
      setMessage('Could not load beverages.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    setMessage('');
    try {
      await axios.delete(`${API_URL}/beverages/${id}`);
      setMessage('Deleted beverage.');
      fetchBevs();
    } catch {
      setMessage('Delete failed.');
    }
  };

  useEffect(() => {
    fetchBevs();
  }, [fetchBevs]);

  const filteredBevs = bevs.filter((bev) =>
    Object.values(bev).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredBevs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBevs.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {message && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              🍹 Beverages
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="🔍 Search beverages..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
              </div>
              <button
                className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                onClick={() => setShowCreate(true)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading…</p>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-4 py-2 border-b font-semibold text-gray-600 text-sm sm:text-base">
                <span>📷 Image</span>
                <span>📋 Code</span>
                <span>📛 Name</span>
                <span>💰 Price</span>
                <span>📂 Category</span>
                <span>📏 Portion</span>
                <span className="text-right">⚙️ Actions</span>
              </div>

              <ul>
                {currentItems.map((b) => (
                  <li
                    key={b.beverageId}
                    className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50 text-sm sm:text-base"
                  >
                    <span>
                      <img
                        src={b.image || 'https://via.placeholder.com/40'}
                        alt={b.name}
                        className="w-10 h-10 object-cover rounded-full border"
                      />
                    </span>
                    <span>{b.code}</span>
                    <span>{b.name}</span>
                    <span>₹{b.price.toFixed(2)}</span>
                    <span>{b.itemCategory}</span>
                    <span>{b.portionType}</span>
                    <span className="flex justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => setEditItem(b)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(b.beverageId)}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {filteredBevs.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    ← Prev
                  </button>
                  <span className="font-semibold text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateBeverage
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchBevs();
        }}
        onSuccess={(msg) => {
          setMessage(msg);
          fetchBevs();
        }}
      />

      {editItem && (
        <EditBeverage
          initial={editItem}
          isOpen={true}
          onClose={() => {
            setEditItem(null);
            fetchBevs();
          }}
          onSuccess={(msg) => {
            setMessage(msg);
            fetchBevs();
          }}
        />
      )}
    </div>
  );
}
