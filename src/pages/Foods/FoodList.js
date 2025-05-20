

// import  { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateFood from './CreateFood';
// import EditFood from './EditFood';

// export default function FoodList() {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const API_URL = process.env.REACT_APP_API_URL;

//   async function fetchFoods() {
//     setLoading(true);
//     setMessage('');
//     try {
//       const res = await axios.get(`${API_URL}/foods`);
//       setFoods(res.data);
//     } catch {
//       setMessage('Could not load food items.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     setMessage('');
//     try {
//       await axios.delete(`http://localhost:8080/api/foods/${id}`);
//       setMessage('Deleted food item.');
//       fetchFoods();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   }

//   useEffect(() => {
//     fetchFoods();
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
//             <h1 className="text-2xl font-semibold">Food Items</h1>
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
//               {/* Table Headings */}
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
//                 {foods.map(f => (
//                   <li
//                     key={f.foodId}
//                     className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>
//                       <img
//                         src={f.image || 'https://via.placeholder.com/40'}
//                         alt={f.name}
//                         className="w-10 h-10 object-cover rounded-full border"
//                       />
//                     </span>
//                     <span>{f.code}</span>
//                     <span>{f.name}</span>
//                     <span>₹{f.price.toFixed(2)}</span>
//                     <span>{f.itemCategory}</span>
//                     <span>{f.portionType}</span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem(f)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(f.foodId)}
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

//       <CreateFood
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchFoods();
//         }}
//         onSuccess={msg => {
//           setMessage(msg);
//           fetchFoods();
//         }}
//       />

//       {editItem && (
//         <EditFood
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchFoods();
//           }}
//           onSuccess={msg => {
//             setMessage(msg);
//             fetchFoods();
//           }}
//         />
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateFood from './CreateFood';
// import EditFood from './EditFood';
// const API_URL = process.env.REACT_APP_API_URL;  // build-time constant


// export default function FoodList() {
//   const [foods, setFoods]           = useState([]);
//   const [loading, setLoading]       = useState(true);
//   const [message, setMessage]       = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem]     = useState(null);
  

//   /* ────────────────── fetch helper ────────────────── */
//   const fetchFoods = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/foods`);
//       setFoods(data);
//     } catch {
//       setMessage('Could not load food items.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);                            // stable reference

//   /* ────────────────── delete helper ────────────────── */
//   const handleDelete = async (id) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/foods/${id}`);
//       setMessage('Deleted food item.');
//       fetchFoods();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   /* ────────────────── load once ────────────────── */
//   useEffect(() => {
//     fetchFoods();
//   }, [fetchFoods]);                  // ESLint happy, no loop

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
//             <h1 className="text-2xl font-semibold">Food Items</h1>
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
//                 {foods.map(f => (
//                   <li
//                     key={f.foodId}
//                     className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>
//                       <img
//                         src={f.image || 'https://via.placeholder.com/40'}
//                         alt={f.name}
//                         className="w-10 h-10 object-cover rounded-full border"
//                       />
//                     </span>
//                     <span>{f.code}</span>
//                     <span>{f.name}</span>
//                     <span>₹{f.price.toFixed(2)}</span>
//                     <span>{f.itemCategory}</span>
//                     <span>{f.portionType}</span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem(f)}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(f.foodId)}
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

//       {/* modals */}
//       <CreateFood
//         isOpen={showCreate}
//         onClose={() => {
//           setShowCreate(false);
//           fetchFoods();
//         }}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchFoods();
//         }}
//       />

//       {editItem && (
//         <EditFood
//           initial={editItem}
//           isOpen={true}
//           onClose={() => {
//             setEditItem(null);
//             fetchFoods();
//           }}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchFoods();
//           }}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import CreateFood from './CreateFood';
import EditFood from './EditFood';

const API_URL = process.env.REACT_APP_API_URL;

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.get(`${API_URL}/foods`);
      setFoods(data);
    } catch {
      setMessage('Could not load food items.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    setMessage('');
    try {
      await axios.delete(`${API_URL}/foods/${id}`);
      setMessage('Deleted food item.');
      fetchFoods();
    } catch {
      setMessage('Delete failed.');
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const filteredFoods = foods.filter((food) =>
    Object.values(food).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

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
              📋 Food Items
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="🔍 Search food..."
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
                <span>🍽️ Image</span>
                <span>🔖 Code</span>
                <span>📛 Name</span>
                <span>💵 Price</span>
                <span>📂 Category</span>
                <span>📏 Portion</span>
                <span className="text-right">⚙️ Actions</span>
              </div>

              <ul>
                {currentItems.map((f) => (
                  <li
                    key={f.foodId}
                    className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50 text-sm sm:text-base"
                  >
                    <span>
                      <img
                        src={f.image || 'https://via.placeholder.com/40'}
                        alt={f.name}
                        className="w-10 h-10 object-cover rounded-full border"
                      />
                    </span>
                    <span>{f.code}</span>
                    <span>{f.name}</span>
                    <span>₹{f.price.toFixed(2)}</span>
                    <span>{f.itemCategory}</span>
                    <span>{f.portionType}</span>
                    <span className="flex justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => setEditItem(f)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(f.foodId)}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              {filteredFoods.length > itemsPerPage && (
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
      <CreateFood
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          fetchFoods();
        }}
        onSuccess={(msg) => {
          setMessage(msg);
          fetchFoods();
        }}
      />

      {editItem && (
        <EditFood
          initial={editItem}
          isOpen={true}
          onClose={() => {
            setEditItem(null);
            fetchFoods();
          }}
          onSuccess={(msg) => {
            setMessage(msg);
            fetchFoods();
          }}
        />
      )}
    </div>
  );
}
