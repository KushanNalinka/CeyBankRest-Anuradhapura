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
//     navigate(`/requisition-final/${id}`);
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

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
//  const API_URL = process.env.REACT_APP_API_URL;  // build-time constant

// const StoreRequisitionList = () => {
//   const [requisitions, setRequisitions] = useState([]);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
 

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/store-requisitions/summaries`)
//       .then((res) => setRequisitions(res.data))
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

 

//   const handleViewItems = (id) => {
//     navigate(`/requisition-final/${id}`);
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


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaEye } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const StoreRequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const requisitionsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/store-requisitions/summaries`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRequisitions(sorted);
        setFilteredRequisitions(sorted);
      })
      .catch(() => setMessage('❌ Failed to load requisitions.'));
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = requisitions.filter((req) =>
      Object.values(req).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredRequisitions(filtered);
    setCurrentPage(1);
  }, [searchTerm, requisitions]);

  const indexOfLast = currentPage * requisitionsPerPage;
  const indexOfFirst = indexOfLast - requisitionsPerPage;
  const currentRequisitions = filteredRequisitions.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredRequisitions.length / requisitionsPerPage);

  const handleViewItems = (id) => {
    navigate(`/requisition-final/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📋 Store Requisitions
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
        </div>
      </div>

      {message && <p className="text-red-600">{message}</p>}

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="table-auto w-full bg-white">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-3 border">🆔 ID</th>
              <th className="p-3 border">📄 Requisition ID</th>
              <th className="p-3 border">📅 Date</th>
              <th className="p-3 border">✅ Status</th>
              <th className="p-3 border">👁️ Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequisitions.map((req) => (
              <tr
                key={req.id}
                className="text-center hover:bg-gray-50 transition duration-200"
              >
                <td className="p-2 border">{req.id}</td>
                <td className="p-2 border">{req.storeRequisitionId ?? '-'}</td>
                <td className="p-2 border">{req.date}</td>
                <td className="p-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      req.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {req.status ?? 'Pending'}
                  </span>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleViewItems(req.id)}
                    className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600 flex items-center gap-1 justify-center"
                  >
                    <FaEye /> View
                  </button>
                </td>
              </tr>
            ))}
            {currentRequisitions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No matching requisitions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
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
    </div>
  );
};

export default StoreRequisitionList;
