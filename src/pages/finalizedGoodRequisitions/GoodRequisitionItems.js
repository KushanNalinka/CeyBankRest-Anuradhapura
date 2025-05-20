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


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSearch, FaBoxOpen } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const StoreRequisitionItems = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/good-requisitions/${id}/items`)
      .then((res) => {
        setItems(res.data);
        setFilteredItems(res.data);
      })
      .catch(() => setMessage('❌ Failed to load requisition items.'));
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📋 Items for Good Requisition ID: {id}
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-3.5 left-3 text-gray-400" />
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Previous Page
      </button>

      {message && <p className="text-red-600">{message}</p>}

      <div className="overflow-x-auto shadow border rounded-lg bg-white">
        <table className="table-auto w-full">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="p-2 border">📦 Item Code</th>
              <th className="p-2 border">📋 Name</th>
              <th className="p-2 border">📏 Unit</th>
              <th className="p-2 border">🛒 Required</th>
              <th className="p-2 border">✅ Approved</th>
              <th className="p-2 border">📥 Issued</th>
              <th className="p-2 border">💰 Rate</th>
              <th className="p-2 border">💵 Total</th>
              <th className="p-2 border">🆔 Issue No</th>
              <th className="p-2 border">📅 Received Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="text-center hover:bg-gray-50 transition">
                <td className="p-2 border">{item.itemCode}</td>
                <td className="p-2 border">{item.itemName}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">{item.requiredQuantity}</td>
                <td className="p-2 border">{item.approvedQuantity}</td>
                <td className="p-2 border">{item.issuedQuantity}</td>
                <td className="p-2 border">{item.rate}</td>
                <td className="p-2 border">{item.total}</td>
                <td className="p-2 border">{item.issueNo}</td>
                <td className="p-2 border">{item.receivedDate}</td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-500">
                  No matching items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default StoreRequisitionItems;
