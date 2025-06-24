// // src/components/StoreRequisitionItems.tsx

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// interface RequisitionItem {
//   id: number;
//   itemCode: string;
//   itemName: string;
//   unit: string;
//   requiredQuantity: number;
//   approvedQuantity: number;
//   receivedQuantity: number;
//   rate: number;
//   total: number;
//   grnNo: string;
//   receivedDate: string;
//   transactionId: number;
// }

// const StoreRequisitionItems: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [items, setItems] = useState<RequisitionItem[]>([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/api/v1/store-requisitions/${id}/items`)
//       .then((res) => setItems(res.data))
//       .catch(() => setMessage('Failed to load requisition items.'));
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Items for Requisition ID: {id}</h2>
//       <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Back to List</Link>
//       {message && <p className="text-red-600">{message}</p>}
//       <table className="table-auto w-full border shadow-md rounded-lg mt-2">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Item Code</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Unit</th>
//             <th className="p-2 border">Required</th>
//             <th className="p-2 border">Approved</th>
//             <th className="p-2 border">Received</th>
//             <th className="p-2 border">Rate</th>
//             <th className="p-2 border">Total</th>
//             <th className="p-2 border">GRN No</th>
//             <th className="p-2 border">Received Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{item.itemCode}</td>
//               <td className="p-2 border">{item.itemName}</td>
//               <td className="p-2 border">{item.unit}</td>
//               <td className="p-2 border">{item.requiredQuantity}</td>
//               <td className="p-2 border">{item.approvedQuantity}</td>
//               <td className="p-2 border">{item.receivedQuantity}</td>
//               <td className="p-2 border">{item.rate}</td>
//               <td className="p-2 border">{item.total}</td>
//               <td className="p-2 border">{item.grnNo}</td>
//               <td className="p-2 border">{item.receivedDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StoreRequisitionItems;
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate} from 'react-router-dom';
// import axios from 'axios';
// const API_URL = process.env.REACT_APP_API_URL;  // build-time constant


// const StoreRequisitionItems = () => {
//   const { id } = useParams();
//   const [items, setItems] = useState([]);
//   const [message, setMessage] = useState('');
//     const navigate = useNavigate();
    
//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/${id}/items`)
//       .then((res) => setItems(res.data))
//       .catch(() => setMessage('Failed to load requisition items.'));
//   }, [id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Items for Requisition Good ID: {id}</h2>
//       <button
//         onClick={() => navigate(-1)}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
//       >
//         ← Back to Previous Page
//       </button>
//       {message && <p className="text-red-600">{message}</p>}
//       <table className="table-auto w-full border shadow-md rounded-lg mt-2">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Item Code</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Unit</th>
//             <th className="p-2 border">Required</th>
//             <th className="p-2 border">Approved</th>
//             <th className="p-2 border">Issued</th>
//             <th className="p-2 border">Rate</th>
//             <th className="p-2 border">Total</th>
//             <th className="p-2 border">ISSUE No</th>
//             <th className="p-2 border">Received Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{item.itemCode}</td>
//               <td className="p-2 border">{item.itemName}</td>
//               <td className="p-2 border">{item.unit}</td>
//               <td className="p-2 border">{item.requiredQuantity}</td>
//               <td className="p-2 border">{item.approvedQuantity}</td>
//               <td className="p-2 border">{item.issuedQuantity}</td>
//               <td className="p-2 border">{item.rate}</td>
//               <td className="p-2 border">{item.total}</td>
//               <td className="p-2 border">{item.issueNo}</td>
//               <td className="p-2 border">{item.receivedDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StoreRequisitionItems;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaArrowLeft, FaSearch} from 'react-icons/fa';

// const API_URL = process.env.REACT_APP_API_URL;

// const StoreRequisitionItems = () => {
//   const { id } = useParams();
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [message, setMessage] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/${id}/items`)
//       .then((res) => {
//         setItems(res.data);
//         setFilteredItems(res.data);
//       })
//       .catch(() => setMessage('❌ Failed to load requisition items.'));
//   }, [id]);

//   useEffect(() => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const filtered = items.filter((item) =>
//       Object.values(item).some((value) =>
//         String(value).toLowerCase().includes(lowerSearch)
//       )
//     );
//     setFilteredItems(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, items]);

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
//           📋 Items for Good Requisition ID: {id}
//         </h2>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="🔍 Search items..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
//         </div>
//       </div>

//       <button
//         onClick={() => navigate(-1)}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors flex items-center gap-2"
//       >
//         <FaArrowLeft /> Back to Previous Page
//       </button>

//       {message && <p className="text-red-600">{message}</p>}

//       <div className="overflow-x-auto shadow border rounded-lg bg-white">
//         <table className="table-auto w-full">
//           <thead className="bg-blue-100 text-gray-700">
//             <tr>
//               <th className="p-2 border">📦 Item Code</th>
//               <th className="p-2 border">📋 Name</th>
//               <th className="p-2 border">📏 Unit</th>
//               <th className="p-2 border">🛒 Required</th>
//               <th className="p-2 border">✅ Approved</th>
//               <th className="p-2 border">📥 Issued</th>
//               <th className="p-2 border">💰 Rate</th>
//               <th className="p-2 border">💵 Total</th>
//               <th className="p-2 border">🆔 Issue No</th>
//               <th className="p-2 border">📅 Received Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item) => (
//               <tr key={item.id} className="text-center hover:bg-gray-50 transition">
//                 <td className="p-2 border">{item.itemCode}</td>
//                 <td className="p-2 border">{item.itemName}</td>
//                 <td className="p-2 border">{item.unit}</td>
//                 <td className="p-2 border">{item.requiredQuantity}</td>
//                 <td className="p-2 border">{item.approvedQuantity}</td>
//                 <td className="p-2 border">{item.issuedQuantity}</td>
//                 <td className="p-2 border">{item.rate}</td>
//                 <td className="p-2 border">{item.total}</td>
//                 <td className="p-2 border">{item.issueNo}</td>
//                 <td className="p-2 border">{item.receivedDate}</td>
//               </tr>
//             ))}
//             {currentItems.length === 0 && (
//               <tr>
//                 <td colSpan="10" className="text-center py-4 text-gray-500">
//                   No matching items found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
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

// export default StoreRequisitionItems;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const StoreRequisitionItems = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/v1/good-requisitions/${id}/items`)
      .then((res) => {
        setItems(res.data);
        setFilteredItems(res.data);
      })
      .catch(() => setMessage('Failed to load requisition items.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [searchTerm, items]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading requisition items...</span>
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
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Requisition Items</h1>
                  <p className="text-gray-600">Good Requisition ID: #{id}</p>
                </div>
              </div>
              
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
            >
              <FaArrowLeft className="h-4 w-4" />
              Back to Requisitions
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {/* Table Header */}
                <thead className="bg-blue-600">
                  <tr>
                    <th className="py-3 px-4 text-left text-white font-medium text-xs">Item Code</th>
                    <th className="py-3 px-4 text-left text-white font-medium text-xs">Item Name</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Unit</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Required</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Approved</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Issued</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Rate</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Total</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Issue No</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-xs">Received Date</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-lg">
                          {item.itemCode}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{item.itemName}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-gray-700 text-sm">{item.unit}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded">
                          {item.requiredQuantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                          {item.approvedQuantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                          {item.issuedQuantity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <svg className="h-3 w-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-900 font-medium">{item.rate}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-green-800 font-bold">{item.total}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-gray-700 text-sm font-mono">{item.issueNo || 'N/A'}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {item.receivedDate || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentItems.length === 0 && !loading && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Items Found</h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Try adjusting your search criteria.' : 'No items found for this requisition.'}
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

          {/* Summary Statistics */}
          {items.length > 0 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Item Summary</h3>
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
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-600">Total Required</p>
                      <p className="text-xl font-bold text-yellow-800">
                        {items.reduce((sum, item) => sum + (item.requiredQuantity || 0), 0)}
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
                      <p className="text-sm text-green-600">Total Approved</p>
                      <p className="text-xl font-bold text-green-900">
                        {items.reduce((sum, item) => sum + (item.approvedQuantity || 0), 0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Total Value</p>
                      <p className="text-xl font-bold text-purple-900">
                        {items.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2)}
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

export default StoreRequisitionItems;
