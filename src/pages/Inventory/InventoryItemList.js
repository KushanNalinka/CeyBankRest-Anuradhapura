
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
  const itemsPerPage = 6;

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
      setMessage('Deleted item.');
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {message && (
          <div className="mb-4 p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded">
            {message}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              📦 Inventory Items
            </h1>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="🔍 Search inventory..."
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
              <div className="grid grid-cols-9 gap-4 py-2 border-b font-semibold text-gray-600 text-sm sm:text-base">
                <span>🖼️ Image</span>
                <span>📋 Code</span>
                <span>🏷️ Name</span>
                <span>📂 Category</span>
                <span>📦 Qty</span>
                <span>📏 Unit</span>
                <span>🔁 Re-Order</span>
                <span>📈 Max</span>
                <span className="text-right">⚙️ Actions</span>
              </div>

              <ul>
                {currentItems.map((it) => (
                  <li
                    key={it.itemId}
                    className="grid grid-cols-9 gap-4 py-3 border-b items-center hover:bg-gray-50 text-sm sm:text-base"
                  >
                    <span>
                      <img
                        src={it.image || 'https://via.placeholder.com/40'}
                        alt={it.itemName}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </span>
                    <span>{it.itemCode}</span>
                    <span>{it.itemName}</span>
                    <span>{it.category}</span>
                    <span>{it.quantity}</span>
                    <span>{it.unit}</span>
                    <span>{it.reOrderLevel}</span>
                    <span>{it.maximumReorderLevel}</span>
                    <span className="flex justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        onClick={() => setEditItem({ ...it, id: it.itemId })}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(it.itemId)}
                      >
                        <FaTrash />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              {filteredItems.length > itemsPerPage && (
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
