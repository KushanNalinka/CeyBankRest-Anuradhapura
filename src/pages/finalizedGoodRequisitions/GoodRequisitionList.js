

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL;  // build-time constant

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

  

//   const handleViewItems = (id) => {
//     navigate(`/good-requisition-final/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Good Requisitions</h1>
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
// import { FaEye, FaSearch } from 'react-icons/fa';

// const API_URL = process.env.REACT_APP_API_URL;

// const StoreRequisitionList = () => {
//   const [requisitions, setRequisitions] = useState([]);
//   const [filteredRequisitions, setFilteredRequisitions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [message, setMessage] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const requisitionsPerPage = 6;

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/summaries`)
//       .then((res) => {
//         const sorted = res.data.sort(
//           (a, b) => new Date(b.date) - new Date(a.date)
//         );
//         setRequisitions(sorted);
//         setFilteredRequisitions(sorted);
//       })
//       .catch(() => setMessage('❌ Failed to load requisitions.'));
//   }, []);

//   useEffect(() => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const filtered = requisitions.filter((req) =>
//       Object.values(req).some((value) =>
//         String(value).toLowerCase().includes(lowerSearch)
//       )
//     );
//     setFilteredRequisitions(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, requisitions]);

//   const indexOfLast = currentPage * requisitionsPerPage;
//   const indexOfFirst = indexOfLast - requisitionsPerPage;
//   const currentRequisitions = filteredRequisitions.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredRequisitions.length / requisitionsPerPage);

//   const handleViewItems = (id) => {
//     navigate(`/good-requisition-final/${id}`);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//           📋 Good Requisitions
//         </h1>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="🔍 Search requisitions..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
//         </div>
//       </div>

//       {message && <p className="text-red-600">{message}</p>}

//       <div className="overflow-x-auto shadow rounded-lg border bg-white">
//         <table className="table-auto w-full">
//           <thead className="bg-blue-100 text-gray-700">
//             <tr>
//               <th className="p-3 border">🆔 ID</th>
//               <th className="p-3 border">📄 Requisition ID</th>
//               <th className="p-3 border">📅 Date</th>
//               <th className="p-3 border">✅ Status</th>
//               <th className="p-3 border">👁️ Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRequisitions.map((req) => (
//               <tr key={req.id} className="text-center hover:bg-gray-50 transition">
//                 <td className="p-2 border">{req.id}</td>
//                 <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
//                 <td className="p-2 border">{req.date}</td>
//                 <td className="p-2 border">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       req.status === 'Approved'
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-yellow-100 text-yellow-700'
//                     }`}
//                   >
//                     {req.status ?? 'Pending'}
//                   </span>
//                 </td>
//                 <td className="p-2 border">
//                   <button
//                     onClick={() => handleViewItems(req.id)}
//                     className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-600 flex items-center gap-1 justify-center"
//                   >
//                     <FaEye /> View
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {currentRequisitions.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-500">
//                   No matching requisitions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-4 mt-6">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
//         >
//           ← Prev
//         </button>
//         <span className="font-semibold text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages}
//           className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StoreRequisitionList;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaSearch } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const StoreRequisitionList = () => {
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const requisitionsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/v1/good-requisitions/summaries`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setRequisitions(sorted);
        setFilteredRequisitions(sorted);
      })
      .catch(() => setMessage('Failed to load requisitions.'))
      .finally(() => setLoading(false));
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
  const currentRequisitions = filteredRequisitions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRequisitions.length / requisitionsPerPage);

  const handleViewItems = (id) => {
    navigate(`/good-requisition-final/${id}`);
  };

  const paginate = (pageNum) => setCurrentPage(pageNum);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading requisitions...</span>
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
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
              <p className="font-medium">{message}</p>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Good Requisitions</h1>
                  <p className="text-gray-600">Manage and track store requisition requests</p>
                </div>
              </div>
              
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search requisitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
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
                    <th className="py-3 px-6 text-left text-white font-medium text-sm">ID</th>
                    <th className="py-3 px-6 text-left text-white font-medium text-sm">Requisition ID</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Date</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Status</th>
                    <th className="py-3 px-6 text-center text-white font-medium text-sm">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRequisitions.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                          {req.id}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">
                          {req.goodRequisitionId || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                          {req.date}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          req.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : req.status === 'Rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            req.status === 'Approved'
                              ? 'bg-green-500'
                              : req.status === 'Rejected'
                              ? 'bg-red-500'
                              : 'bg-yellow-500'
                          }`}></span>
                          {req.status || 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleViewItems(req.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          title="View Requisition Details"
                        >
                          <FaEye className="h-3 w-3" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentRequisitions.length === 0 && !loading && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Requisitions Found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search criteria.' : 'No requisitions have been created yet.'}
                </p>
              </div>
            )}

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

          {/* Statistics Card */}
          {requisitions.length > 0 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total</p>
                      <p className="text-xl font-bold text-blue-900">{requisitions.length}</p>
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
                      <p className="text-sm text-green-600">Approved</p>
                      <p className="text-xl font-bold text-green-900">
                        {requisitions.filter(r => r.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600">Pending</p>
                      <p className="text-xl font-bold text-yellow-800">
                        {requisitions.filter(r => !r.status || r.status === 'Pending').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-red-600">Rejected</p>
                      <p className="text-xl font-bold text-red-900">
                        {requisitions.filter(r => r.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreRequisitionList;