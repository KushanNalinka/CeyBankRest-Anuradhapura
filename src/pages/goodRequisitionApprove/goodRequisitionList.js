
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



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // build-time constant

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Good Requisitions List to Approve</h1>

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by ID, Date, Status..."
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />

      {message && <p className="text-red-600">{message}</p>}

      <table className="table-auto w-full border shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">ID</th>
            <th className="p-3 border">Good Requisition ID</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((req) => (
            <tr key={req.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{req.id}</td>
              <td className="p-2 border">{req.goodRequisitionId ?? '-'}</td>
              <td className="p-2 border">{req.date}</td>
              <td className="p-2 border">{req.status ?? 'Pending'}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleViewItems(req.id, req.status)}
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-md ${
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
