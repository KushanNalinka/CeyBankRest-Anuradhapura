
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
//       .get(`${API_URL}/v1/good-requisitions/summaries`)
//       .then((res) => setRequisitions(res.data))
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

//   const handleEditStatus = (id) => {
//     alert(`Edit status functionality for ID ${id} not implemented yet.`);
//   };

//   const handleViewItems = (id) => {
//     navigate(`/good-requisition-items/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Good Requisitions List to Approve</h1>
//       {message && <p className="text-red-600">{message}</p>}
//       <table className="table-auto w-full border shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Good Requisition ID</th>
//             <th className="p-3 border">Date</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requisitions.map((req) => (
//             <tr key={req.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{req.id}</td>
//               <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
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
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL; // build-time constant

// const GoodRequisitionList = () => {
//   const [requisitions, setRequisitions] = useState([]);
//   const [filteredRequisitions, setFilteredRequisitions] = useState([]);
//   const [message, setMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/summaries`)
//       .then((res) => {
//         const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setRequisitions(sorted);
//         setFilteredRequisitions(sorted);
//       })
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = requisitions.filter(
//       (req) =>
//         String(req.id).toLowerCase().includes(value) ||
//         String(req.goodRequisitionId).toLowerCase().includes(value) ||
//         String(req.date).toLowerCase().includes(value) ||
//         String(req.status).toLowerCase().includes(value)
//     );
//     setFilteredRequisitions(filtered);
//     setCurrentPage(1);
//   };

//   const handleViewItems = (id, status) => {
//     navigate(`/good-requisition-items/${id}`, { state: { status } });
//   };

//   const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage);
//   const paginatedData = filteredRequisitions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Good Requisitions List to Approve</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder="Search by ID, Date, Status..."
//         className="mb-4 px-4 py-2 border rounded w-full max-w-md"
//       />

//       {message && <p className="text-red-600">{message}</p>}

//       <table className="table-auto w-full border shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Good Requisition ID</th>
//             <th className="p-3 border">Date</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((req) => (
//             <tr key={req.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{req.id}</td>
//               <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
//               <td className="p-2 border">{req.date}</td>
//               <td className="p-2 border">{req.status ?? 'Pending'}</td>
//               <td className="p-2 border space-x-2">
//                 <button
//                   onClick={() => handleViewItems(req.id, req.status)}
//                   className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center gap-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded-md ${
//               currentPage === i + 1
//                 ? 'bg-[#24256D] text-white'
//                 : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GoodRequisitionList;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL; // build-time constant

// const GoodRequisitionList = () => {
//   const [requisitions, setRequisitions] = useState([]);
//   const [filteredRequisitions, setFilteredRequisitions] = useState([]);
//   const [message, setMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/summaries`)
//       .then((res) => {
//         const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setRequisitions(sorted);
//         setFilteredRequisitions(sorted);
//       })
//       .catch(() => setMessage('Failed to load requisitions.'));
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = requisitions.filter(
//       (req) =>
//         String(req.id).toLowerCase().includes(value) ||
//         String(req.goodRequisitionId).toLowerCase().includes(value) ||
//         String(req.date).toLowerCase().includes(value) ||
//         String(req.status).toLowerCase().includes(value)
//     );
//     setFilteredRequisitions(filtered);
//     setCurrentPage(1);
//   };

//   const handleViewItems = (id, status) => {
//     navigate(`/good-requisition-items/${id}`, { state: { status } });
//   };

//   const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage);
//   const paginatedData = filteredRequisitions.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Good Requisitions List to Approve</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder="Search by ID, Date, Status..."
//         className="mb-4 px-4 py-2 border rounded w-full max-w-md"
//       />

//       {message && <p className="text-red-600">{message}</p>}

//       <table className="table-auto w-full border shadow-md rounded-lg">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-3 border">ID</th>
//             <th className="p-3 border">Good Requisition ID</th>
//             <th className="p-3 border">Date</th>
//             <th className="p-3 border">Status</th>
//             <th className="p-3 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((req) => (
//             <tr key={req.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{req.id}</td>
//               <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
//               <td className="p-2 border">{req.date}</td>
//               <td className="p-2 border">{req.status ?? 'Pending'}</td>
//               <td className="p-2 border space-x-2">
//                 <button
//                   onClick={() => handleViewItems(req.id, req.status)}
//                   className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center gap-2">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded-md ${
//               currentPage === i + 1
//                 ? 'bg-[#24256D] text-white'
//                 : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GoodRequisitionList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const GoodRequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/good-requisitions/summaries`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRequisitions(sorted);
        setFilteredRequisitions(sorted);
      })
      .catch(() => setMessage('Failed to load requisitions.'));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = requisitions.filter(
      (req) =>
        String(req.id).toLowerCase().includes(value) ||
        String(req.goodRequisitionId).toLowerCase().includes(value) ||
        String(req.date).toLowerCase().includes(value) ||
        String(req.status).toLowerCase().includes(value)
    );
    setFilteredRequisitions(filtered);
    setCurrentPage(1);
  };

  const handleViewItems = (id, status) => {
    navigate(`/good-requisition-items/${id}`, { state: { status } });
  };

  const totalPages = Math.ceil(filteredRequisitions.length / itemsPerPage);
  const paginatedData = filteredRequisitions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-[#24256D] flex items-center gap-2">
        📋 Good Requisitions List to Approve
      </h1>

      {/* Search Input */}
      <div className="relative max-w-md mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="🔍 Search by ID, Date, Status..."
          className="w-full px-4 py-2 pl-10 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#24256D]"
        />
        <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
      </div>

      {message && <p className="text-red-600">{message}</p>}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto w-full border rounded-lg">
          <thead className="bg-blue-100 text-gray-700 text-sm sm:text-base">
            <tr>
              <th className="p-3 border">🆔 ID</th>
              <th className="p-3 border">📄 Requisition ID</th>
              <th className="p-3 border">📅 Date</th>
              <th className="p-3 border">✅ Status</th>
              <th className="p-3 border">🔍 Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((req) => (
              <tr key={req.id} className="text-center hover:bg-gray-50 transition">
                <td className="p-2 border">{req.id}</td>
                <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
                <td className="p-2 border">{req.date}</td>
                <td className="p-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      req.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : req.status === 'Rejected'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {req.status ?? 'Pending'}
                  </span>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleViewItems(req.id, req.status)}
                    className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No matching requisitions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md font-medium ${
              currentPage === i + 1
                ? 'bg-[#24256D] text-white'
                : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoodRequisitionList;
