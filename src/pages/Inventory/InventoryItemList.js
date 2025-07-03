
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateInventoryItem from './CreateInventoryItem';
// import EditInventoryItem from './EditInventoryItem';

// export default function InventoryItemList() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState(null);

//   const API = process.env.REACT_APP_API_URL;

//   async function fetchItems() {
//     try {
//       setLoading(true);
//       setMessage('');
//       const { data } = await axios.get(`${API}/v1/InventoryItem/all`);
//       setItems(data);
//     } catch {
//       setMessage('Could not load inventory items.');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     try {
//       await axios.delete(`${API}/v1/InventoryItem/${id}`);
//       setMessage('Deleted item.');
//       fetchItems();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   }

//   useEffect(() => {
//     fetchItems();
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
//             <h1 className="text-2xl font-semibold">Inventory Items</h1>
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
//               <div className="grid grid-cols-9 gap-4 py-2 border-b font-semibold text-gray-600">
//                 <span>Image</span>
//                 <span>Code</span>
//                 <span>Name</span>
//                 <span>Category</span>
//                 <span>Qty</span>
//                 <span>Unit</span>
//                 <span>Re-Order</span>
//                 <span>Max</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {items.map((it) => (
//                   <li
//                     key={it.itemId} /* unique key */
//                     className="grid grid-cols-9 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>
//                       <img
//                         src={it.image || 'https://via.placeholder.com/40'}
//                         alt={it.itemName}
//                         className="w-10 h-10 rounded-full object-cover border"
//                       />
//                     </span>

//                     <span>{it.itemCode}</span>
//                     <span>{it.itemName}</span>
//                     <span>{it.category}</span>
//                     <span>{it.quantity}</span>
//                     <span>{it.unit}</span>
//                     <span>{it.reOrderLevel}</span>
//                     <span>{it.maximumReorderLevel}</span>

//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem({ ...it, id: it.itemId })}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(it.itemId)}
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

//       <CreateInventoryItem
//         isOpen={showCreate}
//         onClose={() => setShowCreate(false)}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchItems();
//         }}
//       />

//       {editItem && (
//         <EditInventoryItem
//           initial={editItem}
//           isOpen={true}
//           onClose={() => setEditItem(null)}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchItems();
//           }}
//         />
//       )}
//     </div>
//   );
// }

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import CreateInventoryItem from './CreateInventoryItem';
// import EditInventoryItem from './EditInventoryItem';

// const API_URL = process.env.REACT_APP_API_URL;   // one source of truth

// export default function InventoryItemList() {
//   const [items, setItems]             = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [message, setMessage]         = useState('');
//   const [showCreate, setShowCreate]   = useState(false);
//   const [editItem, setEditItem]       = useState(null);

//   /* ────────────────── fetch helper ────────────────── */
//   const fetchItems = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/v1/InventoryItem/all`);
//       setItems(data);
//     } catch {
//       setMessage('Could not load inventory items.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);                              // stable reference

//   /* ────────────────── delete helper ────────────────── */
//   const handleDelete = async (id) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/v1/InventoryItem/${id}`);
//       setMessage('Deleted item.');
//       fetchItems();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   /* ────────────────── initial load ────────────────── */
//   useEffect(() => {
//     fetchItems();
//   }, [fetchItems]);                    // ESLint satisfied

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
//             <h1 className="text-2xl font-semibold">Inventory Items</h1>
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
//               <div className="grid grid-cols-9 gap-4 py-2 border-b font-semibold text-gray-600">
//                 <span>Image</span>
//                 <span>Code</span>
//                 <span>Name</span>
//                 <span>Category</span>
//                 <span>Qty</span>
//                 <span>Unit</span>
//                 <span>Re-Order</span>
//                 <span>Max</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               <ul>
//                 {items.map(it => (
//                   <li
//                     key={it.itemId}
//                     className="grid grid-cols-9 gap-4 py-3 border-b items-center hover:bg-gray-50"
//                   >
//                     <span>
//                       <img
//                         src={it.image || 'https://via.placeholder.com/40'}
//                         alt={it.itemName}
//                         className="w-10 h-10 rounded-full object-cover border"
//                       />
//                     </span>
//                     <span>{it.itemCode}</span>
//                     <span>{it.itemName}</span>
//                     <span>{it.category}</span>
//                     <span>{it.quantity}</span>
//                     <span>{it.unit}</span>
//                     <span>{it.reOrderLevel}</span>
//                     <span>{it.maximumReorderLevel}</span>

//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem({ ...it, id: it.itemId })}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(it.itemId)}
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

//       {/* ────── modals ────── */}
//       <CreateInventoryItem
//         isOpen={showCreate}
//         onClose={() => setShowCreate(false)}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchItems();
//         }}
//       />

//       {editItem && (
//         <EditInventoryItem
//           initial={editItem}
//           isOpen={true}
//           onClose={() => setEditItem(null)}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchItems();
//           }}
//         />
//       )}
//     </div>
//   );
// }


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
// import CreateInventoryItem from './CreateInventoryItem';
// import EditInventoryItem from './EditInventoryItem';

// const API_URL = process.env.REACT_APP_API_URL;

// export default function InventoryItemList() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [showCreate, setShowCreate] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const fetchItems = useCallback(async () => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const { data } = await axios.get(`${API_URL}/v1/InventoryItem/all`);
//       setItems(data);
//     } catch {
//       setMessage('Could not load inventory items.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const handleDelete = async (id) => {
//     setMessage('');
//     try {
//       await axios.delete(`${API_URL}/v1/InventoryItem/${id}`);
//       setMessage('Deleted item.');
//       fetchItems();
//     } catch {
//       setMessage('Delete failed.');
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [fetchItems]);

//   const filteredItems = items.filter((item) =>
//     Object.values(item).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         {message && (
//           <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
//             {message}
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-xl shadow-md">
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//             <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//               📦 Inventory Items
//             </h1>
//             <div className="flex items-center gap-2 w-full sm:w-auto">
//               <div className="relative w-full sm:w-64">
//                 <input
//                   type="text"
//                   placeholder="🔍 Search inventory..."
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
//               <div className="grid grid-cols-9 gap-4 py-2 border-b font-semibold text-gray-600 text-sm sm:text-base">
//                 <span>🖼️ Image</span>
//                 <span>📋 Code</span>
//                 <span>🏷️ Name</span>
//                 <span>📂 Category</span>
//                 <span>📦 Qty</span>
//                 <span>📏 Unit</span>
//                 <span>🔁 Re-Order</span>
//                 <span>📈 Max</span>
//                 <span className="text-right">⚙️ Actions</span>
//               </div>

//               <ul>
//                 {currentItems.map((it) => (
//                   <li
//                     key={it.itemId}
//                     className="grid grid-cols-9 gap-4 py-3 border-b items-center hover:bg-gray-50 text-sm sm:text-base"
//                   >
//                     <span>
//                       <img
//                         src={it.image || 'https://via.placeholder.com/40'}
//                         alt={it.itemName}
//                         className="w-10 h-10 rounded-full object-cover border"
//                       />
//                     </span>
//                     <span>{it.itemCode}</span>
//                     <span>{it.itemName}</span>
//                     <span>{it.category}</span>
//                     <span>{it.quantity}</span>
//                     <span>{it.unit}</span>
//                     <span>{it.reOrderLevel}</span>
//                     <span>{it.maximumReorderLevel}</span>
//                     <span className="flex justify-end space-x-2">
//                       <button
//                         className="p-1 text-blue-600 hover:text-blue-800"
//                         onClick={() => setEditItem({ ...it, id: it.itemId })}
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         className="p-1 text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(it.itemId)}
//                       >
//                         <FaTrash />
//                       </button>
//                     </span>
//                   </li>
//                 ))}
//               </ul>

//               {/* Pagination */}
//               {filteredItems.length > itemsPerPage && (
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
//       <CreateInventoryItem
//         isOpen={showCreate}
//         onClose={() => setShowCreate(false)}
//         onSuccess={(msg) => {
//           setMessage(msg);
//           fetchItems();
//         }}
//       />

//       {editItem && (
//         <EditInventoryItem
//           initial={editItem}
//           isOpen={true}
//           onClose={() => setEditItem(null)}
//           onSuccess={(msg) => {
//             setMessage(msg);
//             fetchItems();
//           }}
//         />
//       )}
//     </div>
//   );
// }



import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import CreateInventoryItem from './CreateInventoryItem';
import EditInventoryItem from './EditInventoryItem';

const API_URL = process.env.REACT_APP_API_URL;

export default function InventoryItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.get(`${API_URL}/v1/InventoryItem/all`);
      setItems(data);
    } catch {
      setMessage('Could not load inventory items.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    setMessage('');
    try {
      await axios.delete(`${API_URL}/v1/InventoryItem/${id}`);
      setMessage('Inventory item deleted successfully.');
      fetchItems();
    } catch {
      setMessage('Delete failed.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  // Get stock status for an item
  const getStockStatus = (item) => {
    if (item.quantity <= item.reOrderLevel) {
      return { status: 'low', color: 'bg-red-100 text-red-800', label: 'Low Stock' };
    } else if (item.quantity <= item.reOrderLevel * 1.5) {
      return { status: 'medium', color: 'bg-yellow-100 text-yellow-800', label: 'Medium' };
    } else {
      return { status: 'good', color: 'bg-green-100 text-green-800', label: 'Good Stock' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading inventory items...</span>
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
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Inventory Items</h1>
                  <p className="text-gray-600">Manage stock levels and inventory tracking</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-64">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search inventory items..."
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
                  Add Item
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
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Category</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Stock</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Unit</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Re-Order</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Max Level</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => {
                    const stockStatus = getStockStatus(item);
                    return (
                      <tr key={item.itemId} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <img
                              src={item.image || 'https://via.placeholder.com/40'}
                              alt={item.itemName}
                              className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/40';
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-lg">
                            {item.itemCode}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">{item.itemName}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`inline-flex items-center px-3 py-1 text-sm font-bold rounded-full ${stockStatus.color}`}>
                              {item.quantity}
                            </span>
                            <span className="text-xs text-gray-500">{stockStatus.label}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-gray-700 font-medium">{item.unit}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded">
                            {item.reOrderLevel}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                            {item.maximumReorderLevel}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setEditItem({ ...item, id: item.itemId })}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Item"
                            >
                              <FaEdit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.itemId)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Item"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Inventory Items Found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first inventory item.'}
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="h-4 w-4" />
                Add Item
              </button>
            </div>
          )}

          {/* Statistics Card */}
          {items.length > 0 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Items</p>
                      <p className="text-xl font-bold text-blue-900">{items.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-red-600">Low Stock</p>
                      <p className="text-xl font-bold text-red-900">
                        {items.filter(item => item.quantity <= item.reOrderLevel).length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Good Stock</p>
                      <p className="text-xl font-bold text-green-900">
                        {items.filter(item => item.quantity > item.reOrderLevel * 1.5).length}
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
                        {new Set(items.map(item => item.category)).size}
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
      <CreateInventoryItem
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={(msg) => {
          setMessage(msg);
          fetchItems();
        }}
      />

      {editItem && (
        <EditInventoryItem
          initial={editItem}
          isOpen={true}
          onClose={() => setEditItem(null)}
          onSuccess={(msg) => {
            setMessage(msg);
            fetchItems();
          }}
        />
      )}
    </div>
  );
}
