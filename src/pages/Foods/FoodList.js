

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


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
// import CreateFood from './CreateFood';
// import EditFood from './EditFood';

// const API_URL = process.env.REACT_APP_API_URL;

// export default function FoodList() {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

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
//   }, []);

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

//   useEffect(() => {
//     fetchFoods();
//   }, [fetchFoods]);

//   const filteredFoods = foods.filter((food) =>
//     Object.values(food).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentItems = filteredFoods.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//             <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//               📋 Food Items
//             </h1>
//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <div className="relative w-full sm:w-64">
//                 <input
//                   type="text"
//                   placeholder="🔍 Search food..."
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
//               </div>
//               <button
//                 className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
//                 onClick={() => setShowCreate(true)}
//               >
//                 <FaPlus />
//               </button>
//             </div>
//           </div>

//           {loading ? (
//             <p>Loading…</p>
//           ) : (
//             <>
//               <div className="grid grid-cols-7 gap-4 py-2 border-b font-semibold text-gray-600 text-sm sm:text-base">
//                 <span>🍽️ Image</span>
//                 <span>🔖 Code</span>
//                 <span>📛 Name</span>
//                 <span>💵 Price</span>
//                 <span>📂 Category</span>
//                 <span>📏 Portion</span>
//                 <span className="text-right">⚙️ Actions</span>
//               </div>

//               <ul>
//                 {currentItems.map((f) => (
//                   <li
//                     key={f.foodId}
//                     className="grid grid-cols-7 gap-4 py-3 border-b items-center hover:bg-gray-50 text-sm sm:text-base"
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

//               {/* Pagination Controls */}
//               {filteredFoods.length > itemsPerPage && (
//                 <div className="flex justify-center items-center gap-4 mt-6">
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
//                   >
//                     ← Prev
//                   </button>
//                   <span className="font-semibold text-gray-700">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                     }
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
//                   >
//                     Next →
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
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
  const itemsPerPage = 8;

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
      setMessage('Food item deleted successfully.');
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

  const paginate = (pageNum) => setCurrentPage(pageNum);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading food items...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
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
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.39-.14.65-.5.65-.92 0-.55-.45-1-1-1-.19 0-.38.06-.54.14-.78.28-1.6.42-2.52.42-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6c0 .92-.14 1.74-.42 2.52-.08.16-.14.35-.14.54 0 .55.45 1 1 1 .42 0 .78-.26.92-.65.39-1.07.6-2.22.6-3.41C22 6.48 17.52 2 12 2zM7 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Food Items</h1>
                  <p className="text-gray-600">Manage restaurant menu items and pricing</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search food items..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                
                <button
                  onClick={() => setShowCreate(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
                >
                  <FaPlus className="h-4 w-4" />
                  Add Food Item
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {/* Table Header */}
                <thead className="bg-blue-600">
                  <tr>
                    <th className="py-3 px-4 text-left text-white font-medium text-sm">Image</th>
                    <th className="py-3 px-4 text-left text-white font-medium text-sm">Code</th>
                    <th className="py-3 px-4 text-left text-white font-medium text-sm">Name</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Price</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Category</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Portion</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((food) => (
                    <tr key={food.foodId} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={food.image || 'https://via.placeholder.com/40'}
                            alt={food.name}
                            className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40';
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-lg">
                          {food.code}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{food.name}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-green-50 border border-green-200 rounded-lg px-3 py-1">
                          <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-bold text-green-800">₹{food.price.toFixed(2)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                          {food.itemCategory}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                          {food.portionType}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditItem(food)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Food Item"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(food.foodId)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Food Item"
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
                      onClick={() => paginate(i + 1)}
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
          {currentItems.length === 0 && !loading && (
            <div className="bg-white border rounded-lg p-12 text-center mt-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.39-.14.65-.5.65-.92 0-.55-.45-1-1-1-.19 0-.38.06-.54.14-.78.28-1.6.42-2.52.42-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6c0 .92-.14 1.74-.42 2.52-.08.16-.14.35-.14.54 0 .55.45 1 1 1 .42 0 .78-.26.92-.65.39-1.07.6-2.22.6-3.41C22 6.48 17.52 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Food Items Found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first food item.'}
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
                Add Food Item
              </button>
            </div>
          )}

          {/* Statistics Card */}
          {foods.length > 0 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Menu Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.39-.14.65-.5.65-.92 0-.55-.45-1-1-1-.19 0-.38.06-.54.14-.78.28-1.6.42-2.52.42-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6c0 .92-.14 1.74-.42 2.52-.08.16-.14.35-.14.54 0 .55.45 1 1 1 .42 0 .78-.26.92-.65.39-1.07.6-2.22.6-3.41C22 6.48 17.52 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Items</p>
                      <p className="text-xl font-bold text-blue-900">{foods.length}</p>
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
                      <p className="text-sm text-yellow-600">Average Price</p>
                      <p className="text-xl font-bold text-yellow-800">
                        ₹{(foods.reduce((sum, item) => sum + item.price, 0) / foods.length).toFixed(2)}
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
                      <p className="text-sm text-green-600">Highest Price</p>
                      <p className="text-xl font-bold text-green-800">
                        ₹{Math.max(...foods.map(item => item.price)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Categories</p>
                      <p className="text-xl font-bold text-purple-900">
                        {new Set(foods.map(item => item.itemCategory)).size}
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