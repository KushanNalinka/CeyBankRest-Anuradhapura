
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate} from 'react-router-dom';
// import axios from 'axios';

// export default function StoreRequisitionItems() {
//   const { id } = useParams();
//   const [items, setItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [approveQty, setApproveQty] = useState(0);
//   const [successMsg, setSuccessMsg] = useState('');
//     const navigate = useNavigate();
// const API_URL = process.env.REACT_APP_API_URL;  // build-time constant

//   const fetchItems = () => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/${id}/items`)
//       .then((res) => setItems(res.data))
//       .catch(() => setMessage('Failed to load requisition items.'));
//   };

//   useEffect(() => {
//     fetchItems();
//   });

//   const handleApprove = (item) => {
//     setSelectedItem(item);
//     setApproveQty(item.approvedQuantity || 0);
//     setShowPopup(true);
//     setSuccessMsg('');
//   };

//   const handleSubmitApproval = () => {
//     axios
//       .put(`${API_URL}/v1/good-requisitions/approve-item`, {
//         itemId: selectedItem?.id,
//         approvedQuantity: approveQty,
//       })
//       .then(() => {
//         setShowPopup(false);
//         setSuccessMsg('Approval updated successfully.');
//         fetchItems(); // Refresh data
//       })
//       .catch(() => alert('Failed to update approval.'));
//   };

//   return (
//     <div className="p-6 relative">
//       <h2 className="text-2xl font-bold mb-4">Items for Good Requisition ID: {id}</h2>
//       <button
//         onClick={() => navigate(-1)}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
//       >
//         ← Back to Previous Page
//       </button>
//       {message && <p className="text-red-600">{message}</p>}
//       {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

//       <table className="table-auto w-full border shadow-md rounded-lg mt-2">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Item Id</th>
//             <th className="p-2 border">Item Code</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Unit</th>
//             <th className="p-2 border">Required</th>
//             <th className="p-2 border">Approved</th>
//             <th className="p-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{item.id}</td>
//               <td className="p-2 border">{item.itemCode}</td>
//               <td className="p-2 border">{item.itemName}</td>
//               <td className="p-2 border">{item.unit}</td>
//               <td className="p-2 border">{item.requiredQuantity}</td>
//               <td className="p-2 border">{item.approvedQuantity}</td>
//               <td className="p-2 border">
//                 <button
//                   onClick={() => handleApprove(item)}
//                   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                 >
//                   Approve
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Transparent Popup */}
//       {showPopup && selectedItem && (
//         <div className="fixed inset-0 flex justify-center items-center bg-transparent z-50">
//           <div className="bg-white border shadow-lg rounded-lg p-6 w-96">
//             <h3 className="text-lg font-bold mb-4">Approve Quantity</h3>
//             <p>
//               <strong>Item Name:</strong> {selectedItem.itemName}
//             </p>
//             <p>
//               <strong>Item Code:</strong> {selectedItem.itemCode}
//             </p>
//             <p>
//               <strong>Required Quantity:</strong> {selectedItem.requiredQuantity}
//             </p>
//             <label className="block mt-4 font-medium">
//               Approved Quantity:
//               <input
//                 type="number"
//                 value={approveQty}
//                 onChange={(e) => setApproveQty(Number(e.target.value))}
//                 className="mt-1 block w-full border rounded px-3 py-1 shadow"
//                 min={0}
//                 max={selectedItem.requiredQuantity}
//               />
//             </label>
//             <div className="mt-5 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitApproval}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';

// export default function GoodRequisitionItems() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const status = location.state?.status ?? 'NOT_APPROVED';
//   const API_URL = process.env.REACT_APP_API_URL;

//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [message, setMessage] = useState('');
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [approveQty, setApproveQty] = useState(0);
//   const [successMsg, setSuccessMsg] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showFinalizePopup, setShowFinalizePopup] = useState(false);
//   const [confirmFinalize, setConfirmFinalize] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     fetchItems();
//   });

//   const fetchItems = () => {
//     axios
//       .get(`${API_URL}/v1/good-requisitions/${id}/items`)
//       .then((res) => {
//         setItems(res.data);
//         setFilteredItems(res.data);
//       })
//       .catch(() => setMessage('Failed to load requisition items.'));
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = items.filter(
//       (item) =>
//         String(item.id).toLowerCase().includes(value) ||
//         String(item.itemCode).toLowerCase().includes(value) ||
//         String(item.itemName).toLowerCase().includes(value) ||
//         String(item.unit).toLowerCase().includes(value) ||
//         String(item.requiredQuantity).toLowerCase().includes(value) ||
//         String(item.approvedQuantity).toLowerCase().includes(value)
//     );
//     setFilteredItems(filtered);
//     setCurrentPage(1);
//   };

//   const handleApprove = (item) => {
//     setSelectedItem(item);
//     setApproveQty(item.approvedQuantity || 0);
//     setShowPopup(true);
//     setSuccessMsg('');
//   };

//   const handleSubmitApproval = () => {
//     axios
//       .put(`${API_URL}/v1/good-requisitions/approve-item`, {
//         itemId: selectedItem?.id,
//         approvedQuantity: approveQty,
//       })
//       .then(() => {
//         setShowPopup(false);
//         setSuccessMsg('Approval updated successfully.');
//         fetchItems();
//       })
//       .catch(() => alert('Failed to update approval.'));
//   };

//   const allApproved = filteredItems.length > 0 && filteredItems.every(i => i.approvedQuantity > 0);
//   const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
//   const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const finalizeGoodRequisition = () => {
//     axios
//       .put(`${API_URL}/v1/good-requisitions/approve-status/${id}`)
//       .then(() => {
//         setShowFinalizePopup(false);
//         navigate(-1);
//       })
//       .catch(() => alert("Approval failed."));
//   };

//   return (
//     <div className="p-6 relative">
//       <h2 className="text-2xl font-bold mb-4">Items for Good Requisition ID: {id}</h2>

//       <button
//         onClick={() => navigate(-1)}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
//       >
//         ← Back
//       </button>

//       <button
//         disabled={status === 'APPROVED' || !allApproved}
//         onClick={() => setShowFinalizePopup(true)}
//         className={`px-6 py-2 ml-4 rounded font-semibold ${
//           status === 'APPROVED' || !allApproved
//             ? 'bg-gray-400 text-white cursor-not-allowed'
//             : 'bg-[#24256D] text-white hover:bg-[#1c1d50]'
//         }`}
//       >
//         Finalize Approval
//       </button>

//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder="Search items by any field..."
//         className="mt-4 mb-2 px-4 ml-4 py-2 border rounded w-full max-w-md"
//       />

//       {message && <p className="text-red-600">{message}</p>}
//       {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

//       <table className="table-auto w-full border shadow-md rounded-lg mt-2">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Item ID</th>
//             <th className="p-2 border">Item Code</th>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Unit</th>
//             <th className="p-2 border">Required</th>
//             <th className="p-2 border">Approved</th>
//             <th className="p-2 border">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedItems.map((item) => (
//             <tr key={item.id} className="text-center hover:bg-gray-50">
//               <td className="p-2 border">{item.id}</td>
//               <td className="p-2 border">{item.itemCode}</td>
//               <td className="p-2 border">{item.itemName}</td>
//               <td className="p-2 border">{item.unit}</td>
//               <td className="p-2 border">{item.requiredQuantity}</td>
//               <td className="p-2 border">{item.approvedQuantity}</td>
//               <td className="p-2 border">
//                 <button
//                   disabled={status === 'APPROVED'}
//                   onClick={() => handleApprove(item)}
//                   className={`px-3 py-1 rounded text-white ${
//                     status === 'APPROVED'
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-green-500 hover:bg-green-600'
//                   }`}
//                 >
//                   Approve
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

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

//       {showFinalizePopup && (
//         <div className="fixed inset-0 bg-black/40 z-40 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-scroll relative">
//             <h3 className="text-xl font-bold mb-4">🗑️ Review Before Final Approval</h3>
//             <div className="space-y-3">
//               {items.map((item, index) => (
//                 <div key={item.id} className="flex items-center justify-between bg-gray-50 border p-3 rounded">
//                   <div>
//                     <p><strong>{index + 1}. {item.itemCode}</strong> — {item.itemName}</p>
//                     <p className="text-sm text-gray-600">
//                       Unit: {item.unit}, Required: {item.requiredQuantity}, Approved: {item.approvedQuantity}
//                     </p>
//                   </div>
//                   <div className="flex gap-3 items-center">
//                     {item.approvedQuantity > 0 ? (
//                       <FaCheckCircle className="text-green-600 text-xl" />
//                     ) : (
//                       <FaTimesCircle className="text-red-500 text-xl" />
//                     )}
//                     <button
//                       disabled={status === 'APPROVED'}
//                       className={`bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm ${
//                         status === 'APPROVED' ? 'opacity-50 cursor-not-allowed' : ''
//                       }`}
//                       onClick={() => {
//                         setSelectedItem(item);
//                         setApproveQty(item.approvedQuantity);
//                         setShowPopup(true);
//                       }}
//                     >
//                       <FaEdit />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-4">
//               <label className="flex items-center space-x-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={confirmFinalize}
//                   onChange={() => setConfirmFinalize(!confirmFinalize)}
//                   disabled={status === 'APPROVED'}
//                 />
//                 <span>I confirm this approval order</span>
//               </label>
//             </div>

//             <div className="mt-6 flex justify-end gap-4">
//               <button
//                 onClick={() => setShowFinalizePopup(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={finalizeGoodRequisition}
//                 disabled={!confirmFinalize || status === 'APPROVED'}
//                 className={`px-4 py-2 rounded text-white ${
//                   confirmFinalize && status !== 'APPROVED'
//                     ? 'bg-green-600 hover:bg-green-700'
//                     : 'bg-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 Approve Good Requisition
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showPopup && selectedItem && (
//         <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60">
//           <div className="bg-white border shadow-lg rounded-lg p-6 w-96 relative z-50">
//             <h3 className="text-lg font-bold mb-4">Approve Quantity</h3>
//             <p><strong>Item Name:</strong> {selectedItem.itemName}</p>
//             <p><strong>Item Code:</strong> {selectedItem.itemCode}</p>
//             <p><strong>Required Quantity:</strong> {selectedItem.requiredQuantity}</p>
//             <label className="block mt-4 font-medium">
//               Approved Quantity:
//               <input
//                 type="number"
//                 value={approveQty}
//                 onChange={(e) => setApproveQty(Number(e.target.value))}
//                 className="mt-1 block w-full border rounded px-3 py-1 shadow"
//                 min={0}
//                 max={selectedItem.requiredQuantity}
//               />
//             </label>
//             <div className="mt-5 flex justify-end gap-3">
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmitApproval}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function GoodRequisitionItems() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showFinalizePopup, setShowFinalizePopup] = useState(false);
  const [confirmFinalize, setConfirmFinalize] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const status = location.state?.status ?? 'NOT_APPROVED';

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchItems = () => {
    axios
      .get(`${API_URL}/v1/good-requisitions/${id}/items`)
      .then((res) => {
        const updated = res.data.map(item => ({
          ...item,
          isChecked: item.approvedQuantity > 0
        }));
        setItems(updated);
        setFilteredItems(updated);
      })
      .catch(() => setMessage('Failed to load requisition items.'));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = items.filter(
      (item) =>
        String(item.id).toLowerCase().includes(value) ||
        String(item.itemCode).toLowerCase().includes(value) ||
        String(item.itemName).toLowerCase().includes(value) ||
        String(item.unit).toLowerCase().includes(value) ||
        String(item.requiredQuantity).toLowerCase().includes(value) ||
        String(item.approvedQuantity).toLowerCase().includes(value)
    );
    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleApprovedQtyChange = (id, value) => {
    const updated = items.map(item => item.id === id ? {
      ...item,
      approvedQuantity: Number(value)
    } : item);
    setItems(updated);
    setFilteredItems(updated);
  };

  const handleCheckboxChange = (id) => {
    const updated = items.map(item => item.id === id ? {
      ...item,
      isChecked: !item.isChecked
    } : item);
    setItems(updated);
    setFilteredItems(updated);
  };

  const allChecked = filteredItems.length > 0 && filteredItems.every(i => i.isChecked);

  const finalizeGoodRequisition = () => {
    const approvalList = items.map(item => ({
      itemId: item.id,
      approvedQuantity: item.approvedQuantity
    }));
    axios
      .put(`${API_URL}/v1/good-requisitions/approve-itemslist`, {
        requisitionId: id,
        items: approvalList
      })
      .then(() => {
        return axios.put(`${API_URL}/v1/good-requisitions/approve-statuses`, {
          requisitionIds: [parseInt(id)]
        });
      })
      .then(() => {
        setShowFinalizePopup(false);
        navigate(-1);
      })
      .catch(() => alert("Approval failed."));
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-2xl font-bold mb-4">Items for Good Requisition ID: {id}</h2>

      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
      >
        ← Back
      </button>

      <button
        disabled={status === 'APPROVED' || !allChecked}
        onClick={() => setShowFinalizePopup(true)}
        className={`px-6 py-2 ml-4 rounded font-semibold ${
          status === 'APPROVED' || !allChecked
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-[#24256D] text-white hover:bg-[#1c1d50]'
        }`}
      >
        Finalize Approval
      </button>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search items by any field..."
        className="mt-4 mb-2 px-4 ml-4 py-2 border rounded w-full max-w-md"
      />

      {message && <p className="text-red-600">{message}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <table className="table-auto w-full border shadow-md rounded-lg mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Item ID</th>
            <th className="p-2 border">Item Code</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Required</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">✔</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id} className="text-center hover:bg-gray-50">
              <td className="p-2 border">{item.id}</td>
              <td className="p-2 border">{item.itemCode}</td>
              <td className="p-2 border">{item.itemName}</td>
              <td className="p-2 border">{item.unit}</td>
              <td className="p-2 border">{item.requiredQuantity}</td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={item.requiredQuantity}
                  min={0}
                  max={item.requiredQuantity}
                  onChange={(e) => handleApprovedQtyChange(item.id, e.target.value)}
                  className="w-20 border rounded px-2 py-1"
                  disabled={status === 'APPROVED'}
                />
              </td>
              <td className="p-2 border">
                {item.isChecked ? (
                  <FaCheckCircle className="text-green-600 text-lg mx-auto" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-lg mx-auto" />
                )}
              </td>
              <td className="p-2 border">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(item.id)}
                  disabled={status === 'APPROVED'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {showFinalizePopup && (
        <div className="fixed inset-0 bg-black/40 z-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-scroll relative">
            <h3 className="text-xl font-bold mb-4">📝 Review Before Final Approval</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 border p-3 rounded">
                  <div>
                    <p><strong>{index + 1}. {item.itemCode}</strong> — {item.itemName}</p>
                    <p className="text-sm text-gray-600">
                      Unit: {item.unit}, Required: {item.requiredQuantity}, Approved: {item.approvedQuantity}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    {item.approvedQuantity > 0 ? (
                      <FaCheckCircle className="text-green-600 text-xl" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-xl" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={confirmFinalize}
                  onChange={() => setConfirmFinalize(!confirmFinalize)}
                  disabled={status === 'APPROVED'}
                />
                <span>I confirm this approval order</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowFinalizePopup(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={finalizeGoodRequisition}
                disabled={!confirmFinalize || status === 'APPROVED'}
                className={`px-4 py-2 rounded text-white ${
                  confirmFinalize && status !== 'APPROVED'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Approve Good Requisition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
