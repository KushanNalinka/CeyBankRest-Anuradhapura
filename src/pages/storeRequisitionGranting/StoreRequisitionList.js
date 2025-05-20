// // src/components/StoreRequisitionList.tsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// interface RequisitionSummary {
//   id: number;
//   storeRequisitionId: string | null;
//   date: string;
//   status: string | null;
// }

// const StoreRequisitionList: React.FC = () => {
//   const [requisitions, setRequisitions] = useState<RequisitionSummary[]>([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/v1/store-requisitions/summaries')
//       .then((res) => setRequisitions(res.data))
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

//   const handleEditStatus = (id: number) => {
//     alert(`Edit status functionality for ID ${id} not implemented yet.`);
//   };

//   const handleViewItems = (id: number) => {
//     navigate(`/requisition/grant/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Store Requisitions</h1>
//       {message && <p className="text-red-600">{message}</p>}
//       <table className="table-auto w-full border shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Store Requisition ID</th>
//             <th className="p-3 border">Date</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requisitions.map((req) => (
//             <tr key={req.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{req.id}</td>
//               <td className="p-2 border">{req.storeRequisitionId ?? '-'}</td>
//               <td className="p-2 border">{req.date}</td>
//               <td className="p-2 border">{req.status ?? 'Pending'}</td>
//               <td className="p-2 border space-x-2">
//                 <button
//                   onClick={() => handleEditStatus(req.id)}
//                   className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleViewItems(req.id)}
//                   className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StoreRequisitionList;

// StoreRequisitionList.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const API_URL = process.env.REACT_APP_API_URL;   // one constant

// const StoreRequisitionList = () => {
  
//   const [requisitions, setRequisitions] = useState([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${API_URL}/v1/store-requisitions/summaries`)
//       .then((res) => res.json())
//       .then(setRequisitions)
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

 

//   const handleViewItems = (id) => {
//     navigate(`/requisition/grant/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Store Requisitions</h1>
//       {message && <p className="text-red-600">{message}</p>}
//       <table className="table-auto w-full border shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Store Requisition ID</th>
//             <th className="p-3 border">Date</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requisitions.map((req) => (
//             <tr key={req.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{req.id}</td>
//               <td className="p-2 border">{req.storeRequisitionId ?? '-'}</td>
//               <td className="p-2 border">{req.date}</td>
//               <td className="p-2 border">{req.status ?? 'Pending'}</td>
//               <td className="p-2 border space-x-2">
               
//                 <button
//                   onClick={() => handleViewItems(req.id)}
//                   className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StoreRequisitionList;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiEye } from 'react-icons/fi';

// const API_URL = process.env.REACT_APP_API_URL;

// const StoreRequisitionList = () => {
//   const [requisitions, setRequisitions] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`${API_URL}/v1/store-requisitions/summaries`)
//       .then((res) => res.json())
//       .then(setRequisitions)
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

//   // Sort descending by date
//   const sorted = [...requisitions].sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );

//   const totalPages = Math.ceil(sorted.length / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const currentItems = sorted.slice(startIdx, startIdx + itemsPerPage);

//   const handleViewItems = (id) => navigate(`/requisition/grant/${id}`);
//   const changePage = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-semibold mb-6 text-gray-800">
//         Store Requisitions
//       </h1>

//       {message && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//           {message}
//         </div>
//       )}

//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
//         <table className="min-w-full divide-y">
//           <thead className="bg-gray-100 sticky top-0">
//             <tr>
//               {['ID', 'Req. No.', 'Date', 'Status', 'Action'].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {currentItems.map((req) => (
//               <tr
//                 key={req.id}
//                 className="hover:bg-gray-50 transition-colors"
//               >
//                 <td className="px-4 py-3 text-sm text-gray-700">{req.id}</td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   {req.storeRequisitionId || '-'}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-700">
//                   {new Date(req.date).toLocaleDateString(undefined, {
//                     year: 'numeric',
//                     month: 'short',
//                     day: 'numeric',
//                   })}
//                 </td>
//                 <td className="px-4 py-3 text-sm">
//                   <span
//                     className={
//                       req.status === 'APPROVED'
//                         ? 'inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full'
//                         : 'inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'
//                     }
//                   >
//                     {req.status || 'Pending'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-sm">
//                   <button
//                     onClick={() => handleViewItems(req.id)}
//                     disabled={req.status !== 'APPROVED'}
//                     className={
//                       `inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition ` +
//                       (req.status === 'APPROVED'
//                         ? 'bg-blue-500 text-white hover:bg-blue-600'
//                         : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60')
//                     }
//                   >
//                     <FiEye className="mr-1" />
//                     View
//                   </button>
//                 </td>
//               </tr>
//             ))}

//             {currentItems.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
//                   No requisitions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-end items-center mt-4 space-x-2">
//           <button
//             onClick={() => changePage(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//             <button
//               key={num}
//               onClick={() => changePage(num)}
//               className={
//                 `px-3 py-1 rounded transition ` +
//                 (num === currentPage
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-gray-200 hover:bg-gray-300')
//               }
//             >
//               {num}
//             </button>
//           ))}

//           <button
//             onClick={() => changePage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreRequisitionList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const StoreRequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/v1/store-requisitions/summaries`)
      .then((res) => res.json())
      .then(setRequisitions)
      .catch(() => setMessage('Failed to load requisitions.'));
  }, []);

  // Sort by date descending
  const sorted = [...requisitions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Filter by any field
  const filtered = sorted.filter((req) =>
    Object.values(req).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIdx, startIdx + itemsPerPage);

  const handleViewItems = (id) => navigate(`/requisition/grant/${id}`);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        📋 Store Requisitions
      </h1>

      {/* Search Input */}
      <div className="relative max-w-md mb-5">
        <input
          type="text"
          placeholder="🔍 Search by any field..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
      </div>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y">
          <thead className="bg-blue-100 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">🆔 ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">🏷️ Req. No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">📅 Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">✅ Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 tracking-wider">👁️ Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentItems.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">{req.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{req.storeRequisitionId || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(req.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      req.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : req.status === 'REJECTED'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {req.status || 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <button
                    onClick={() => handleViewItems(req.id)}
                    disabled={req.status !== 'APPROVED'}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition ${
                      req.status === 'APPROVED'
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <FiEye className="mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No requisitions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => changePage(num)}
              className={`px-3 py-1 rounded font-medium transition ${
                num === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default StoreRequisitionList;
