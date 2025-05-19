// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';


// const PAGE_SIZE = 2;

// const genRandomIssue = () =>
//   'ISN' + Math.floor(Math.random() * 1_000_000_0000).toString().padStart(10, '0');

// const normaliseIssueList = (data) => {
//   if (!Array.isArray(data)) return [];
//   if (typeof data[0] === 'string') {
//     return data.map((g) => ({ issueNo: g }));
//   }
//   return data.map((o) => ({
//     issueNo: o.issueNo ?? o.grnNo ?? '',
//     name: o.name ?? o.issueName ?? undefined,
//   }));
// };

// const StoreRequisitionItems = () => {

//   const API_URL = process.env.REACT_APP_API_URL;
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [page, setPage] = useState(1);
//   const [selected, setSelected] = useState([]);
//   const [issues, setIssues] = useState([]);
//   const [view, setView] = useState(null);
//   const [viewItems, setViewItems] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [issueInput, setIssueInput] = useState('');
//   const [issuedDate, setIssuedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [confirm, setConfirm] = useState(false);
//   const [modalErr, setModalErr] = useState('');

//   const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
//   const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

//   const toggleSelect = (it) =>
//     setSelected((prev) =>
//       prev.find((i) => i.id === it.id)
//         ? prev.filter((i) => i.id !== it.id)
//         : [...prev, it]
//     );

//   const loadIssues = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/v1/good-requisitions/issue/list/${id}`);
//       setIssues(normaliseIssueList(res.data));
//     } catch {
//       setIssues([]);
//     }
//   };

//   const openViewer = async (issueNo) => {
//     try {
//       const res = await axios.get(`${API_URL}/v1/good-requisitions/issue/items/${issueNo}`);
//       setViewItems(res.data);
//       setView(issueNo);
//     } catch {
//       setMessage('Failed to load issue items');
//     }
//   };

//   const changeViewItem = (idx, field, value) => {
//     setViewItems((prev) => {
//       const copy = [...prev];
//       const upd = { ...copy[idx], [field]: value };
//       if (field !== 'total') {
//         upd.total =
//           field === 'issuedQuantity'
//             ? value * upd.rate
//             : upd.issuedQuantity * value;
//       }
//       copy[idx] = upd;
//       return copy;
//     });
//   };

//   const saveViewChanges = async () => {
//     try {
//       await axios.put(`${API_URL}/v1/good-requisitions/issue/update-items`, {
//         issueNo: view,
//         items: viewItems.map((i) => ({
//           itemId: i.id,
//           issuedQuantity: i.issuedQuantity,
//           rate: i.rate,
//           total: i.total,
//         })),
//       });
//       setView(null);
//       setMessage('Issue updated successfully.');
//       loadIssues();
//     } catch {
//       setMessage('Update failed.');
//     }
//   };

//   const openAddModal = () => {
//     setIssueInput(genRandomIssue());
//     setIssuedDate(new Date().toISOString().split('T')[0]);
//     setConfirm(false);
//     setModalErr('');
//     setShowModal(true);
//   };

//   const addToIssue = async () => {
//     if (!issueInput.trim()) return setModalErr('Issue number is required.');
//     if (selected.length === 0) return setModalErr('Select at least one item.');
//     if (!confirm) return setModalErr('Please confirm this issue.');
//     try {
//       await axios.post(`${API_URL}/v1/good-requisitions/issue/add-batch`, {
//         issueNo: issueInput.trim(),
//         issuedDate: issuedDate,
//         itemIds: selected.map((i) => i.id),
//       });
//       setShowModal(false);
//       setSelected([]);
//       setMessage('Items added to issue successfully.');
//       loadIssues();
//     } catch {
//       setModalErr('Failed to add items.');
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${API_URL}/v1/good-requisitions/${id}/items`);
//         setItems(res.data);
//         await loadIssues();
//       } catch {
//         setMessage('Failed to load data.');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   });

//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="p-6 flex gap-6">
//       {/* Left Panel */}
//       <div className="flex-1">
//         <h2 className="text-2xl font-bold mb-4">Items for Requisition {id}</h2>
//         <button
//           onClick={() => navigate(-1)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
//         >
//           ← Back to Previous Page
//         </button>

//         {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

//         <table className="table-auto w-full border shadow rounded-lg">
//           <thead>
//             <tr className="bg-gray-100 text-sm">
//               <th className="p-2 border" />
//               <th className="p-2 border">Item Code</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Unit</th>
//               <th className="p-2 border">Required</th>
//               <th className="p-2 border">Approved</th>
//               <th className="p-2 border">Issue</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageItems.map((it) => (
//               <tr key={`it-${it.id}`} className="text-center hover:bg-gray-50">
//                 <td className="p-2 border">
//                   <input
//                     type="checkbox"
//                     checked={!!selected.find((s) => s.id === it.id)}
//                     onChange={() => toggleSelect(it)}
//                   />
//                 </td>
//                 <td className="p-2 border">{it.itemCode}</td>
//                 <td className="p-2 border">{it.itemName}</td>
//                 <td className="p-2 border">{it.unit}</td>
//                 <td className="p-2 border">{it.requiredQuantity}</td>
//                 <td className="p-2 border">{it.approvedQuantity}</td>
//                 <td className="p-2 border">{it.issueNo}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {pageCount > 1 && (
//           <div className="mt-4 flex justify-center gap-2">
//             <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
//             {Array.from({ length: pageCount }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-gray-300' : ''}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button onClick={() => setPage(page + 1)} disabled={page === pageCount} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
//           </div>
//         )}

//         {selected.length > 0 && (
//           <button
//             onClick={openAddModal}
//             className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Add to ISSUE ({selected.length})
//           </button>
//         )}
//       </div>

//       {/* Right Panel */}
//       <div className="w-72 border-l pl-4">
//         <h3 className="font-semibold mb-2">Existing ISSUES</h3>
//         {issues.length === 0 ? (
//           <p className="text-sm text-gray-500">None yet.</p>
//         ) : (
//           <ul className="space-y-1">
//             {issues.map((g) => (
//               <li key={`issue-${g.issueNo}`}>
//                 <button onClick={() => openViewer(g.issueNo)} className="text-blue-700 underline text-sm">
//                   {g.issueNo}{g.name ? ` — ${g.name}` : ''}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Add Issue Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50">
//           <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-3xl">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-bold">Add Items to Issue</h4>
//               <button onClick={() => setShowModal(false)} className="text-xl text-gray-600 hover:text-black">×</button>
//             </div>

//             <label className="block text-sm font-medium mb-1">Issue Number</label>
//             <input value={issueInput} onChange={(e) => setIssueInput(e.target.value)} className="border rounded w-full px-3 py-2 mb-3" placeholder="ISNXXXXXXXXXX" />

//             <label className="block text-sm font-medium mb-1">Issued Date</label>
//             <input type="date" value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} className="border rounded w-full px-3 py-2 mb-4" />

//             <h5 className="font-semibold mb-2">Selected Items</h5>
//             {selected.length === 0 ? (
//               <p className="text-sm text-gray-500 mb-4">No items selected.</p>
//             ) : (
//               <table className="table-auto w-full border shadow rounded mb-4">
//                 <thead>
//                   <tr className="bg-gray-100 text-sm">
//                     <th className="p-2 border">Code</th>
//                     <th className="p-2 border">Name</th>
//                     <th className="p-2 border">Remove</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selected.map((it) => (
//                     <tr key={`sel-${it.id}`} className="text-center">
//                       <td className="p-2 border">{it.itemCode}</td>
//                       <td className="p-2 border">{it.itemName}</td>
//                       <td className="p-2 border">
//                         <button onClick={() => toggleSelect(it)} className="text-red-600 underline text-sm">×</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             <label className="inline-flex items-center mb-4">
//               <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} className="mr-2" />
//               <span className="text-sm">I confirm this Issue</span>
//             </label>

//             {modalErr && <p className="text-sm text-red-600 mb-3">{modalErr}</p>}

//             <div className="flex justify-end gap-2">
//               <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
//               {confirm && (
//                 <button onClick={addToIssue} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Add to Issue</button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View/Edit Issue Popup */}
//       {view && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
//           <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-bold">Issue {view}</h4>
//               <button onClick={() => setView(null)} className="text-xl text-gray-600 hover:text-black">×</button>
//             </div>

//             {viewItems.length === 0 ? (
//               <p className="text-sm text-gray-500">No items for this Issue.</p>
//             ) : (
//               <>
//                 <table className="table-auto w-full border shadow rounded mb-4">
//                   <thead>
//                     <tr className="bg-gray-100 text-sm">
//                       <th className="p-2 border">Code</th>
//                       <th className="p-2 border">Name</th>
//                       <th className="p-2 border">Issued Qty</th>
//                       <th className="p-2 border">Rate</th>
//                       <th className="p-2 border">Total</th>
//                       <th className="p-2 border">Issued Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {viewItems.map((it, idx) => (
//                       <tr key={`view-${it.id}`} className="text-center hover:bg-gray-50">
//                         <td className="p-2 border">{it.itemCode}</td>
//                         <td className="p-2 border">{it.itemName}</td>
//                         <td className="p-2 border">
//                           <input type="number" value={it.issuedQuantity} min={0} onChange={(e) => changeViewItem(idx, 'issuedQuantity', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
//                         </td>
//                         <td className="p-2 border">
//                           <input type="number" value={it.rate} min={0} onChange={(e) => changeViewItem(idx, 'rate', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
//                         </td>
//                         <td className="p-2 border">
//                           <input type="number" value={it.total} min={0} onChange={(e) => changeViewItem(idx, 'total', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
//                         </td>
//                         <td className="p-2 border">{it.issuedDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 <div className="flex justify-end">
//                   <button onClick={saveViewChanges} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Changes</button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreRequisitionItems;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const PAGE_SIZE = 2;

const genRandomIssue = () =>
  'ISN' + Math.floor(Math.random() * 1_000_000_0000).toString().padStart(10, '0');

const normaliseIssueList = (data) => {
  if (!Array.isArray(data)) return [];
  if (typeof data[0] === 'string') {
    return data.map((g) => ({ issueNo: g }));
  }
  return data.map((o) => ({
    issueNo: o.issueNo ?? o.grnNo ?? '',
    name: o.name ?? o.issueName ?? undefined,
  }));
};

const StoreRequisitionItems = () => {

  const API_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [issues, setIssues] = useState([]);
  const [view, setView] = useState(null);
  const [viewItems, setViewItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [issueInput, setIssueInput] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date().toISOString().split('T')[0]);
  const [confirm, setConfirm] = useState(false);
  const [modalErr, setModalErr] = useState('');

  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  const toggleSelect = (it) =>
    setSelected((prev) =>
      prev.find((i) => i.id === it.id)
        ? prev.filter((i) => i.id !== it.id)
        : [...prev, it]
    );

  const loadIssues = async () => {
    try {
      const res = await axios.get(`${API_URL}/v1/good-requisitions/issue/list/${id}`);
      setIssues(normaliseIssueList(res.data));
    } catch {
      setIssues([]);
    }
  };

  const openViewer = async (issueNo) => {
    try {
      const res = await axios.get(`${API_URL}/v1/good-requisitions/issue/items/${issueNo}`);
      setViewItems(res.data);
      setView(issueNo);
    } catch {
      setMessage('Failed to load issue items');
    }
  };

  const changeViewItem = (idx, field, value) => {
    setViewItems((prev) => {
      const copy = [...prev];
      const upd = { ...copy[idx], [field]: value };
      if (field !== 'total') {
        upd.total =
          field === 'issuedQuantity'
            ? value * upd.rate
            : upd.issuedQuantity * value;
      }
      copy[idx] = upd;
      return copy;
    });
  };

  const saveViewChanges = async () => {
    try {
      await axios.put(`${API_URL}/v1/good-requisitions/issue/update-items`, {
        issueNo: view,
        items: viewItems.map((i) => ({
          itemId: i.id,
          issuedQuantity: i.issuedQuantity,
          
        })),
      });
      setView(null);
      setMessage('Issue updated successfully.');
      loadIssues();
    } catch {
      setMessage('Update failed.');
    }
  };

  const openAddModal = () => {
    setIssueInput(genRandomIssue());
    setIssuedDate(new Date().toISOString().split('T')[0]);
    setConfirm(false);
    setModalErr('');
    setShowModal(true);
  };

  const addToIssue = async () => {
    if (!issueInput.trim()) return setModalErr('Issue number is required.');
    if (selected.length === 0) return setModalErr('Select at least one item.');
    if (!confirm) return setModalErr('Please confirm this issue.');
    try {
      await axios.post(`${API_URL}/v1/good-requisitions/issue/add-batch`, {
        issueNo: issueInput.trim(),
        issuedDate: issuedDate,
        itemIds: selected.map((i) => i.id),
      });
      setShowModal(false);
      setSelected([]);
      setMessage('Items added to issue successfully.');
      loadIssues();
    } catch {
      setModalErr('Failed to add items.');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/v1/good-requisitions/${id}/items`);
        setItems(res.data);
        await loadIssues();
      } catch {
        setMessage('Failed to load data.');
      } finally {
        setLoading(false);
      }
    })();
  });

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 flex gap-6">
      {/* Left Panel */}
      <div className="flex-1">
        {/* <h2 className="text-2xl font-bold mb-4">Items for Requisition {id}</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
        >
          ← Back to Previous Page
        </button>

        {selected.length > 0 && (
          <button
            onClick={openAddModal}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 ml-4 rounded hover:bg-indigo-700"
          >
            Add to ISSUE ({selected.length})
          </button>
        )}

        {message && <p className="mb-4 text-sm text-green-700">{message}</p>} */}

        <div className="mb-6">
  {/* Heading with subtle accent */}
  <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-wide mb-3">
    📋 Items for  Good Requisition <span className="text-gray-800 dark:text-gray-200">#{id}</span>
  </h2>

  {/* Navigation and action buttons */}
  <div className="flex flex-wrap items-center gap-3 mb-4">
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow transition"
    >
      ← Back
    </button>

    {selected.length > 0 && (
      <button
        onClick={openAddModal}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow transition"
      >
        ➕ Add to ISSUE ({selected.length})
      </button>
    )}
  </div>

  {/* Feedback message */}
  {message && (
    <p className="text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900 rounded px-3 py-2 shadow-sm border border-green-200 dark:border-green-600">
      ✅ {message}
    </p>
  )}
</div>


        {/* <table className="table-auto w-full border shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th className="p-2 border" />
              <th className="p-2 border">Item Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Required</th>
              <th className="p-2 border">Approved</th>
              <th className="p-2 border">Issue</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((it) => (
              <tr key={`it-${it.id}`} className="text-center hover:bg-gray-50">
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={!!selected.find((s) => s.id === it.id)}
                    onChange={() => toggleSelect(it)}
                  />
                </td>
                <td className="p-2 border">{it.itemCode}</td>
                <td className="p-2 border">{it.itemName}</td>
                <td className="p-2 border">{it.unit}</td>
                <td className="p-2 border">{it.requiredQuantity}</td>
                <td className="p-2 border">{it.approvedQuantity}</td>
                <td className="p-2 border">{it.issueNo}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
  <table className="min-w-full table-auto text-sm text-left dark:text-gray-300">
    <thead className="bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-800 dark:to-gray-700 text-indigo-900 dark:text-white">
      <tr>
        <th className="p-3 border dark:border-gray-700 rounded-tl-xl w-12" />
        <th className="p-3 border dark:border-gray-700">Item Code</th>
        <th className="p-3 border dark:border-gray-700">Name</th>
        <th className="p-3 border dark:border-gray-700">Unit</th>
        <th className="p-3 border dark:border-gray-700">Required</th>
        <th className="p-3 border dark:border-gray-700">Approved</th>
        <th className="p-3 border dark:border-gray-700 rounded-tr-xl">Issue</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
      {pageItems.map((it) => (
        <tr
          key={`it-${it.id}`}
          className="text-center transition-colors duration-150 hover:bg-indigo-50 dark:hover:bg-gray-800"
        >
          <td className="p-3 border dark:border-gray-700">
            <input
              type="checkbox"
              checked={!!selected.find((s) => s.id === it.id)}
              onChange={() => toggleSelect(it)}
              className="accent-indigo-600 h-4 w-4"
            />
          </td>
          <td className="p-3 border dark:border-gray-700">{it.itemCode}</td>
          <td className="p-3 border dark:border-gray-700">{it.itemName}</td>
          <td className="p-3 border dark:border-gray-700">{it.unit}</td>
          <td className="p-3 border dark:border-gray-700">{it.requiredQuantity}</td>
          <td className="p-3 border dark:border-gray-700">{it.approvedQuantity}</td>
          <td className="p-3 border dark:border-gray-700">{it.issueNo}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* Pagination */}
        {/* {pageCount > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-gray-300' : ''}`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(page + 1)} disabled={page === pageCount} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
          </div>
        )} */}

        {pageCount > 1 && (
  <div className="mt-6 flex justify-center gap-2 flex-wrap text-sm">
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      ⬅ Prev
    </button>

    {Array.from({ length: pageCount }, (_, i) => (
      <button
        key={i}
        onClick={() => setPage(i + 1)}
        className={`px-4 py-2 rounded-lg border transition font-medium ${
          page === i + 1
            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setPage(page + 1)}
      disabled={page === pageCount}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      Next ➡
    </button>
  </div>
)}

      </div>

      {/* Right Panel */}
      {/* <div className="w-72 border-l pl-4">
        <h3 className="font-semibold mb-2">Existing ISSUES</h3>
        {issues.length === 0 ? (
          <p className="text-sm text-gray-500">None yet.</p>
        ) : (
          <ul className="space-y-1">
            {issues.map((g) => (
              <li key={`issue-${g.issueNo}`}>
                <button onClick={() => openViewer(g.issueNo)} className="text-blue-700 underline text-sm">
                  {g.issueNo}{g.name ? ` — ${g.name}` : ''}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      {/* ───────── right panel: Existing ISSUES (Enhanced) */}

{/* ───────── right panel: Existing ISSUES (No Scrollbars) */}
<div className="w-80 border-l border-gray-200 dark:border-gray-700 px-5 py-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl">
  <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 tracking-wide">
    📦 Existing ISSUES
  </h3>

  {issues.length === 0 ? (
    <p className="text-sm text-gray-500 dark:text-gray-400">No issues reported yet.</p>
  ) : (
    <ul className="space-y-3 min-w-[300px]">
      {issues.map((g) => (
        <li
          key={`issue-${g.issueNo}`}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition transform hover:scale-[1.015] hover:shadow-md"
        >
          <button
            onClick={() => openViewer(g.issueNo)}
            className="text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:underline focus:outline-none"
          >
            📝 {g.issueNo}
            {g.name ? ` — ${g.name}` : ''}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>



      {/* Add Issue Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">Add Items to Issue</h4>
              <button onClick={() => setShowModal(false)} className="text-xl text-gray-600 hover:text-black">×</button>
            </div>

            <label className="block text-sm font-medium mb-1">Issue Number</label>
            <input value={issueInput} onChange={(e) => setIssueInput(e.target.value)} className="border rounded w-full px-3 py-2 mb-3" placeholder="ISNXXXXXXXXXX" />

            <label className="block text-sm font-medium mb-1">Issued Date</label>
            <input type="date" value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} className="border rounded w-full px-3 py-2 mb-4" />

            <h5 className="font-semibold mb-2">Selected Items</h5>
            {selected.length === 0 ? (
              <p className="text-sm text-gray-500 mb-4">No items selected.</p>
            ) : (
              <table className="table-auto w-full border shadow rounded mb-4">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="p-2 border">Code</th>
                    <th className="p-2 border">Name</th>
                     <th className="p-2 border">Unit</th>
                     <th className="p-2 border">Required</th>
                      <th className="p-2 border">Approved</th>
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.map((it) => (
                    <tr key={`sel-${it.id}`} className="text-center">
                      <td className="p-2 border">{it.itemCode}</td>
                      <td className="p-2 border">{it.itemName}</td>
                      <td className="p-2 border">{it.unit}</td>
                      <td className="p-2 border">{it.requiredQuantity}</td>
                      <td className="p-2 border">{it.approvedQuantity}</td>
                      <td className="p-2 border">
                        <button onClick={() => toggleSelect(it)} className="text-red-600 underline text-sm">×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <label className="inline-flex items-center mb-4">
              <input type="checkbox" checked={confirm} onChange={(e) => setConfirm(e.target.checked)} className="mr-2" />
              <span className="text-sm">I confirm this Issue</span>
            </label>

            {modalErr && <p className="text-sm text-red-600 mb-3">{modalErr}</p>}

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
              {confirm && (
                <button onClick={addToIssue} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">Add to Issue</button>
              )}
            </div>
          </div>
        </div>
      )} */}

      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50 overflow-auto">
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          ➕ Add Items to Issue
        </h4>
        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-gray-500 hover:text-red-600 transition"
          title="Close"
        >
          ×
        </button>
      </div>

      <label className="block text-sm font-medium mb-1">Issue Number</label>
      <input
        value={issueInput}
        onChange={(e) => setIssueInput(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2 mb-4 bg-white dark:bg-gray-800"
        placeholder="ISNXXXXXXXXXX"
      />

      <label className="block text-sm font-medium mb-1">Issued Date</label>
      <input
        type="date"
        value={issuedDate}
        onChange={(e) => setIssuedDate(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2 mb-4 bg-white dark:bg-gray-800"
      />

      <h5 className="font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
        🗂️ Selected Items
      </h5>

      {selected.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No items selected.</p>
      ) : (
        <div className="overflow-auto max-h-[300px] border rounded-md shadow-inner">
          <table className="table-auto w-full min-w-[600px] border border-gray-200 dark:border-gray-600 mb-4 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800 text-indigo-900 dark:text-indigo-200">
              <tr>
                <th className="p-2 border dark:border-gray-700">Code</th>
                <th className="p-2 border dark:border-gray-700">Name</th>
                <th className="p-2 border dark:border-gray-700">Unit</th>
                <th className="p-2 border dark:border-gray-700">Required</th>
                <th className="p-2 border dark:border-gray-700">Approved</th>
                <th className="p-2 border dark:border-gray-700">Remove</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((it) => (
                <tr
                  key={`sel-${it.id}`}
                  className="text-center bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-2 border dark:border-gray-700">{it.itemCode}</td>
                  <td className="p-2 border dark:border-gray-700">{it.itemName}</td>
                  <td className="p-2 border dark:border-gray-700">{it.unit}</td>
                  <td className="p-2 border dark:border-gray-700">{it.requiredQuantity}</td>
                  <td className="p-2 border dark:border-gray-700">{it.approvedQuantity}</td>
                  <td className="p-2 border dark:border-gray-700">
                    <button
                      onClick={() => toggleSelect(it)}
                      className="text-red-600 hover:text-red-800 underline text-sm"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
          className="mr-2"
        />
        <span className="text-sm">I confirm this Issue</span>
      </label>

      {modalErr && (
        <p className="text-sm text-red-600 mb-4">{modalErr}</p>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
        >
          Cancel
        </button>
        {confirm && (
          <button
            onClick={addToIssue}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
          >
            Add to Issue
          </button>
        )}
      </div>
    </div>
  </div>
)}


      {/* View/Edit Issue Popup */}
      {/* {view && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">Issue {view}</h4>
              <button onClick={() => setView(null)} className="text-xl text-gray-600 hover:text-black">×</button>
            </div>

            {viewItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items for this Issue.</p>
            ) : (
              <>
                <table className="table-auto w-full border shadow rounded mb-4">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="p-2 border">Code</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Required</th>
                      <th className="p-2 border">Approved</th>
                      <th className="p-2 border">Issued</th>
                      <th className="p-2 border">Issued Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewItems.map((it, idx) => (
                      <tr key={`view-${it.id}`} className="text-center hover:bg-gray-50">
                        <td className="p-2 border">{it.itemCode}</td>
                        <td className="p-2 border">{it.itemName}</td>
                         <td className="p-2 border">{it.requiredQuantity}</td>
                          <td className="p-2 border">{it.approvedQuantity}</td>
                        <td className="p-2 border">
                          <input type="number" value={it.issuedQuantity} min={0} onChange={(e) => changeViewItem(idx, 'issuedQuantity', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
                        </td>
                        
                        <td className="p-2 border">{it.issuedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <button onClick={saveViewChanges} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save Changes</button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}

      {/* View/Edit Issue Popup (Enhanced with Scrollbars + UI) */}
{view && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50 overflow-auto">
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-2xl w-11/12 max-w-6xl max-h-[90vh] overflow-auto border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          🛠️ Issue {view}
        </h4>
        <button
          onClick={() => setView(null)}
          className="text-2xl text-gray-500 hover:text-red-600 transition"
          title="Close"
        >
          ×
        </button>
      </div>

      {viewItems.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No items for this Issue.</p>
      ) : (
        <>
          <div className="overflow-auto max-h-[400px]">
            <table className="table-auto w-full min-w-[700px] border border-gray-200 dark:border-gray-600 shadow rounded mb-4">
              <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-indigo-900 dark:text-indigo-200">
                <tr>
                  <th className="p-2 border dark:border-gray-700">Code</th>
                  <th className="p-2 border dark:border-gray-700">Name</th>
                  <th className="p-2 border dark:border-gray-700">Required</th>
                  <th className="p-2 border dark:border-gray-700">Approved</th>
                  <th className="p-2 border dark:border-gray-700">Issued</th>
                  <th className="p-2 border dark:border-gray-700">Issued Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-center">
                {viewItems.map((it, idx) => (
                  <tr
                    key={`view-${it.id}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="p-2 border dark:border-gray-700">{it.itemCode}</td>
                    <td className="p-2 border dark:border-gray-700">{it.itemName}</td>
                    <td className="p-2 border dark:border-gray-700">{it.requiredQuantity}</td>
                    <td className="p-2 border dark:border-gray-700">{it.approvedQuantity}</td>
                    <td className="p-2 border dark:border-gray-700">
                      <input
                        type="number"
                        value={it.issuedQuantity}
                        min={0}
                        onChange={(e) =>
                          changeViewItem(idx, 'issuedQuantity', Number(e.target.value))
                        }
                        className="border dark:border-gray-600 bg-white dark:bg-gray-800 rounded px-2 py-1 w-24"
                      />
                    </td>
                    <td className="p-2 border dark:border-gray-700">{it.issuedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={saveViewChanges}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}



    </div>
  );
};

export default StoreRequisitionItems;
