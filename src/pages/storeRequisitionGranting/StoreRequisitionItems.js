// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate} from 'react-router-dom';
// import axios from 'axios';

// /* ────────────────── constants */
// const PAGE_SIZE = 3;


// /* ────────────────── helpers */
// const genRandomGrn = () =>
//   'GRN' +
//   Math.floor(Math.random() * 1_000_000_0000)
//     .toString()
//     .padStart(10, '0');

// const normaliseGrnList = (data) => {
//   if (!Array.isArray(data)) return [];
//   if (typeof data[0] === 'string') {
//     return data.map((g) => ({ grnNo: g }));
//   }
//   return data.map((o) => ({
//     grnNo: o.grnNo ?? o.grn_no ?? o.grnNumber ?? '',
//     name: o.name ?? o.grnName ?? undefined,
//   }));
// };

// /* ────────────────── component */
// const StoreRequisitionItems = () => {
//   const API= process.env.REACT_APP_API_URL;   // one constant
//   const { id } = useParams();
 
//   /* requisition items */
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   /* pagination */
//   const [page, setPage] = useState(1);
//   const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
//   const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

//   /* selection */
//   const [selected, setSelected] = useState([]);
//   const toggleSelect = (it) =>
//     setSelected((prev) =>
//       prev.find((i) => i.id === it.id)
//         ? prev.filter((i) => i.id !== it.id)
//         : [...prev, it]
//     );

//   /* GRN list */
//   const [grns, setGrns] = useState([]);
//   const loadGrns = async () => {
//     try {
//       const res = await axios.get(`${API}/v1/store-requisitions/grn/list/${id}`);
//       setGrns(normaliseGrnList(res.data));
//     } catch {
//       setGrns([]);
//     }
//   };

//   /* view / edit GRN */
//   const [view, setView] = useState(null);
//   const [viewItems, setViewItems] = useState([]);
//   const openViewer = async (grnNo) => {
//     try {
//       const res = await axios.get(
//         `${API}/v1/store-requisitions/grn/items/${grnNo}`
//       );
//       setViewItems(res.data);
//       setView(grnNo);
//     } catch {
//       setMessage('Failed to load GRN items');
//     }
//   };

//   // allow TOTAL editable & keep calculations in sync
//   const changeViewItem = (idx, field, value) => {
//     setViewItems((prev) => {
//       const copy = [...prev];
//       const upd = { ...copy[idx], [field]: value };
//       if (field !== 'total') {
//         upd.total =
//           field === 'receivedQuantity'
//             ? value * upd.rate
//             : upd.receivedQuantity * value;
//       }
//       copy[idx] = upd;
//       return copy;
//     });
//   };

//   const saveViewChanges = async () => {
//     try {
//       await axios.put(`${API}/v1/store-requisitions/grn/update-items`, {
//         grnNo: view,
//         items: viewItems.map((i) => ({
//           itemId: i.id,
//           receivedQuantity: i.receivedQuantity,
//           rate: i.rate,
//           total: i.total,
//         })),
//       });
//       setView(null);
//       setMessage('GRN updated successfully.');
//       loadGrns();
//     } catch {
//       setMessage('Update failed.');
//     }
//   };

//   /* add‑to‑GRN modal */
//   const [showModal, setShowModal] = useState(false);
//   const [grnInput, setGrnInput] = useState('');
//   const [recvDate, setRecvDate] = useState(
//     new Date().toISOString().split('T')[0]
//   );
//   const [confirm, setConfirm] = useState(false);
//   const [modalErr, setModalErr] = useState('');

//   const openAddModal = () => {
//     setGrnInput(genRandomGrn());
//     setRecvDate(new Date().toISOString().split('T')[0]);
//     setConfirm(false);
//     setModalErr('');
//     setShowModal(true);
//   };

//   const addToGrn = async () => {
//     if (!grnInput.trim()) return setModalErr('GRN number is required.');
//     if (selected.length === 0) return setModalErr('Select at least one item.');
//     if (!confirm) return setModalErr('Please confirm this GRN.');
//     try {
//       await axios.post(`${API}/v1/store-requisitions/grn/add-batch`, {
//         grnNo: grnInput.trim(),
//         receivedDate: recvDate,
//         itemIds: selected.map((i) => i.id),
//       });
//       setShowModal(false); // close FIRST
//       setSelected([]);
//       setMessage('Items added to GRN successfully.');
//       loadGrns();
//     } catch {
//       setModalErr('Failed to add items.');
//     }
//   };

//   /* initial fetch */
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(
//           `${API}/v1/store-requisitions/${id}/items`
//         );
//         setItems(res.data);
//         await loadGrns();
//       } catch {
//         setMessage('Failed to load data.');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   });

//   /* render */
//   if (loading) return <p className="p-6">Loading…</p>;

//   return (
//     <div className="p-6 flex gap-6">
//       {/* ───────── left panel */}
//       <div className="flex-1">
//         <h2 className="text-2xl font-bold mb-4">Items for Requisition {id}</h2>
//          <button
//         onClick={() => navigate(-1)}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
//       >
//         ← Back to Previous Page
//       </button>
//         {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

//         <table className="table-auto w-full border shadow rounded-lg">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border" />
//               <th className="p-2 border">Item Code</th>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Unit</th>
//               <th className="p-2 border">Required</th>
//               <th className="p-2 border">Approved</th>
//               <th className="p-2 border">GRN</th>
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
//                 <td className="p-2 border">{it.grnNo}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* pagination */}
//         {pageCount > 1 && (
//           <div className="mt-4 flex justify-center gap-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//               className="px-3 py-1 border rounded disabled:opacity-40"
//             >
//               Prev
//             </button>
//             {Array.from({ length: pageCount }, (_, i) => (
//               <button
//                 key={`pg-${i}`}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${
//                   page === i + 1 ? 'bg-gray-300' : ''
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={page === pageCount}
//               onClick={() => setPage(page + 1)}
//               className="px-3 py-1 border rounded disabled:opacity-40"
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {selected.length > 0 && (
//           <button
//             onClick={openAddModal}
//             className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//           >
//             Add to GRN ({selected.length})
//           </button>
//         )}
//       </div>

//       {/* ───────── right panel */}
//       <div className="w-72 border-l pl-4">
//         <h3 className="font-semibold mb-2">Existing GRNs</h3>
//         {grns.length === 0 ? (
//           <p className="text-sm text-gray-500">None yet.</p>
//         ) : (
//           <ul className="space-y-1">
//             {grns.map((g) => (
//               <li key={`grn-${g.grnNo}`}>
//                 <button
//                   onClick={() => openViewer(g.grnNo)}
//                   className="text-blue-700 underline text-sm"
//                 >
//                   {g.grnNo}
//                   {g.name ? ` — ${g.name}` : ''}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

     

//       {/* ───────── modal: add to GRN */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50">
//           <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-3xl">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-bold">Add Items to GRN</h4>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-xl text-gray-600 hover:text-black"
//               >
//                 ×
//               </button>
//             </div>

//             <label className="block text-sm font-medium mb-1">
//               GRN Number
//             </label>
//             <input
//               value={grnInput}
//               onChange={(e) => setGrnInput(e.target.value)}
//               className="border rounded w-full px-3 py-2 mb-3"
//               placeholder="GRNXXXXXXXXXX"
//             />

//             <label className="block text-sm font-medium mb-1">
//               Received Date
//             </label>
//             <input
//               type="date"
//               value={recvDate}
//               onChange={(e) => setRecvDate(e.target.value)}
//               className="border rounded w-full px-3 py-2 mb-4"
//             />

//             <h5 className="font-semibold mb-2">Selected Items</h5>
//             {selected.length === 0 ? (
//               <p className="text-sm text-gray-500 mb-4">No items selected.</p>
//             ) : (
//               <table className="table-auto w-full border shadow rounded mb-4">
//                 <thead>
//                   <tr className="bg-gray-100 text-sm">
//                     <th className="p-2 border">Code</th>
//                     <th className="p-2 border">Name</th>
//                      <th className="p-2 border">Required</th>
//                    <th className="p-2 border">Approved</th>
//                     <th className="p-2 border">Remove</th>
                   
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selected.map((it) => (
//                     <tr key={`sel-${it.id}`} className="text-center">
//                       <td className="p-2 border">{it.itemCode}</td>
//                       <td className="p-2 border">{it.itemName}</td>
//                        <td className="p-2 border">{it.requiredQuantity}</td>
//                         <td className="p-2 border">{it.approvedQuantity}</td>

//                       <td className="p-2 border">
//                         <button
//                           onClick={() => toggleSelect(it)}
//                           className="text-red-600 underline text-sm"
//                         >
//                           ×
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             <label className="inline-flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 checked={confirm}
//                 onChange={(e) => setConfirm(e.target.checked)}
//                 className="mr-2"
//               />
//               <span className="text-sm">I confirm this GRN</span>
//             </label>

//             {modalErr && (
//               <p className="text-sm text-red-600 mb-3">{modalErr}</p>
//             )}

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               {confirm && (
//                 <button
//                   onClick={addToGrn}
//                   className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//                 >
//                   Add to GRN
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ───────── popup: view / edit GRN */}
//       {view && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
//           <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
//             <div className="flex justify-between items-center mb-4">
//               <h4 className="text-lg font-bold">GRN {view}</h4>
//               <button
//                 onClick={() => setView(null)}
//                 className="text-xl text-gray-600 hover:text-black"
//               >
//                 ×
//               </button>
//             </div>

//             {viewItems.length === 0 ? (
//               <p className="text-sm text-gray-500">No items for this GRN.</p>
//             ) : (
//               <>
//                 <table className="table-auto w-full border shadow rounded mb-4">
//                   <thead>
//                     <tr className="bg-gray-100 text-sm">
//                       <th className="p-2 border">Code</th>
//                       <th className="p-2 border">Name</th>
//                       <th className="p-2 border">Required</th>
//                       <th className="p-2 border">Approved</th>
//                       <th className="p-2 border">Received Qty</th>
//                       <th className="p-2 border">Rate</th>
//                       <th className="p-2 border">Total</th>
//                       <th className="p-2 border">Received Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {viewItems.map((it, idx) => (
//                       <tr
//                         key={`view-${it.id}`}
//                         className="text-center hover:bg-gray-50"
//                       >
//                         <td className="p-2 border">{it.itemCode}</td>
//                         <td className="p-2 border">{it.itemName}</td>
//                          <td className="p-2 border">{it.requiredQuantity}</td>
//                          <td className="p-2 border">{it.approvedQuantity}</td>
//                         <td className="p-2 border">
//                           <input
//                             type="number"
//                             value={it.receivedQuantity}
//                             min={0}
//                             onChange={(e) =>
//                               changeViewItem(
//                                 idx,
//                                 'receivedQuantity',
//                                 Number(e.target.value)
//                               )
//                             }
//                             className="border rounded px-2 py-1 w-24"
//                           />
//                         </td>
//                         <td className="p-2 border">
//                           <input
//                             type="number"
//                             value={it.rate}
//                             min={0}
//                             onChange={(e) =>
//                               changeViewItem(
//                                 idx,
//                                 'rate',
//                                 Number(e.target.value)
//                               )
//                             }
//                             className="border rounded px-2 py-1 w-24"
//                           />
//                         </td>
//                         {/* total editable */}
//                         <td className="p-2 border">
//                           <input
//                             type="number"
//                             value={it.total}
//                             min={0}
//                             onChange={(e) =>
//                               changeViewItem(
//                                 idx,
//                                 'total',
//                                 Number(e.target.value)
//                               )
//                             }
//                             className="border rounded px-2 py-1 w-24"
//                           />
//                         </td>
//                         <td className="p-2 border">{it.receivedDate}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={saveViewChanges}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                   >
//                     Save Changes
//                   </button>
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
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

/* ────────────────── constants */
const PAGE_SIZE = 3;


/* ────────────────── helpers */
const genRandomGrn = () =>
  'GRN' +
  Math.floor(Math.random() * 1_000_000_0000)
    .toString()
    .padStart(10, '0');

const normaliseGrnList = (data) => {
  if (!Array.isArray(data)) return [];
  if (typeof data[0] === 'string') {
    return data.map((g) => ({ grnNo: g }));
  }
  return data.map((o) => ({
    grnNo: o.grnNo ?? o.grn_no ?? o.grnNumber ?? '',
    name: o.name ?? o.grnName ?? undefined,
  }));
};

/* ────────────────── component */
const StoreRequisitionItems = () => {
  const API= process.env.REACT_APP_API_URL;   // one constant
  const { id } = useParams();
 
  /* requisition items */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  /* pagination */
  const [page, setPage] = useState(1);
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  /* selection */
  const [selected, setSelected] = useState([]);
  const toggleSelect = (it) =>
    setSelected((prev) =>
      prev.find((i) => i.id === it.id)
        ? prev.filter((i) => i.id !== it.id)
        : [...prev, it]
    );

  /* GRN list */
  const [grns, setGrns] = useState([]);
  const loadGrns = async () => {
    try {
      const res = await axios.get(`${API}/v1/store-requisitions/grn/list/${id}`);
      setGrns(normaliseGrnList(res.data));
    } catch {
      setGrns([]);
    }
  };

  /* view / edit GRN */
  const [view, setView] = useState(null);
  const [viewItems, setViewItems] = useState([]);
  const openViewer = async (grnNo) => {
    try {
      const res = await axios.get(
        `${API}/v1/store-requisitions/grn/items/${grnNo}`
      );
      setViewItems(res.data);
      setView(grnNo);
    } catch {
      setMessage('Failed to load GRN items');
    }
  };

  // allow TOTAL editable & keep calculations in sync
  const changeViewItem = (idx, field, value) => {
    setViewItems((prev) => {
      const copy = [...prev];
      const upd = { ...copy[idx], [field]: value };
      if (field !== 'total') {
        upd.total =
          field === 'receivedQuantity'
            ? value * upd.rate
            : upd.receivedQuantity * value;
      }
      copy[idx] = upd;
      return copy;
    });
  };

  const saveViewChanges = async () => {
    try {
      await axios.put(`${API}/v1/store-requisitions/grn/update-items`, {
        grnNo: view,
        items: viewItems.map((i) => ({
          itemId: i.id,
          receivedQuantity: i.receivedQuantity,
          rate: i.rate,
          total: i.total,
        })),
      });
      setView(null);
      setMessage('GRN updated successfully.');
      loadGrns();
    } catch {
      setMessage('Update failed.');
    }
  };

  /* add‑to‑GRN modal */
  const [showModal, setShowModal] = useState(false);
  const [grnInput, setGrnInput] = useState('');
  const [recvDate, setRecvDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [confirm, setConfirm] = useState(false);
  const [modalErr, setModalErr] = useState('');

  const openAddModal = () => {
    setGrnInput(genRandomGrn());
    setRecvDate(new Date().toISOString().split('T')[0]);
    setConfirm(false);
    setModalErr('');
    setShowModal(true);
  };

  const addToGrn = async () => {
    if (!grnInput.trim()) return setModalErr('GRN number is required.');
    if (selected.length === 0) return setModalErr('Select at least one item.');
    if (!confirm) return setModalErr('Please confirm this GRN.');
    try {
      await axios.post(`${API}/v1/store-requisitions/grn/add-batch`, {
        grnNo: grnInput.trim(),
        receivedDate: recvDate,
        itemIds: selected.map((i) => i.id),
      });
      setShowModal(false); // close FIRST
      setSelected([]);
      setMessage('Items added to GRN successfully.');
      loadGrns();
    } catch {
      setModalErr('Failed to add items.');
    }
  };

  /* initial fetch */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${API}/v1/store-requisitions/${id}/items`
        );
        setItems(res.data);
        await loadGrns();
      } catch {
        setMessage('Failed to load data.');
      } finally {
        setLoading(false);
      }
    })();
  });

  /* render */
  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 flex gap-6">
      {/* ───────── left panel */}
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
            Add to GRN ({selected.length})
          </button>
        )}

        {message && <p className="mb-4 text-sm text-green-700">{message}</p>} */}

        <div className="mb-6 space-y-4">
  {/* Title */}
  <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
    📦 Items for Store Requisition <span className="text-gray-800 dark:text-gray-200">#{id}</span>
  </h2>

  {/* Buttons */}
  <div className="flex flex-wrap items-center gap-3">
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition"
    >
      ← Back to Previous Page
    </button>

    {selected.length > 0 && (
      <button
        onClick={openAddModal}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition"
      >
        ➕ Add to GRN ({selected.length})
      </button>
    )}
  </div>

  {/* Feedback message */}
  {message && (
    <p className="text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 px-4 py-2 rounded shadow-sm">
      ✅ {message}
    </p>
  )}
</div>


        {/* <table className="table-auto w-full border shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border" />
              <th className="p-2 border">Item Code</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Required</th>
              <th className="p-2 border">Approved</th>
              <th className="p-2 border">GRN</th>
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
                <td className="p-2 border">{it.grnNo}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
  <table className="min-w-full text-sm text-left table-auto dark:text-gray-300">
    <thead className="bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-800 dark:to-gray-700 text-indigo-900 dark:text-white">
      <tr>
        <th className="p-3 border dark:border-gray-700 rounded-tl-xl" />
        <th className="p-3 border dark:border-gray-700">Item Code</th>
        <th className="p-3 border dark:border-gray-700">Name</th>
        <th className="p-3 border dark:border-gray-700">Unit</th>
        <th className="p-3 border dark:border-gray-700">Required</th>
        <th className="p-3 border dark:border-gray-700">Approved</th>
        <th className="p-3 border dark:border-gray-700 rounded-tr-xl">GRN</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
      {pageItems.map((it, idx) => (
        <tr
          key={`it-${it.id}`}
          className={`text-center transition-colors duration-200 ${
            idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
          } hover:bg-indigo-50 dark:hover:bg-gray-700`}
        >
          <td className="p-3 border dark:border-gray-700">
            <input
              type="checkbox"
              checked={!!selected.find((s) => s.id === it.id)}
              onChange={() => toggleSelect(it)}
              className="h-4 w-4 accent-indigo-600"
            />
          </td>
          <td className="p-3 border dark:border-gray-700">{it.itemCode}</td>
          <td className="p-3 border dark:border-gray-700">{it.itemName}</td>
          <td className="p-3 border dark:border-gray-700">{it.unit}</td>
          <td className="p-3 border dark:border-gray-700">{it.requiredQuantity}</td>
          <td className="p-3 border dark:border-gray-700">{it.approvedQuantity}</td>
          <td className="p-3 border dark:border-gray-700">{it.grnNo}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


        {/* pagination */}
        {/* {pageCount > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={`pg-${i}`}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? 'bg-gray-300' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={page === pageCount}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )} */}

        {pageCount > 1 && (
  <div className="mt-6 flex justify-center items-center flex-wrap gap-2 text-sm font-medium">
    {/* Prev Button */}
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
    >
      ⬅ Prev
    </button>

    {/* Page Buttons */}
    {Array.from({ length: pageCount }, (_, i) => (
      <button
        key={`pg-${i}`}
        onClick={() => setPage(i + 1)}
        className={`px-4 py-2 rounded-lg border text-sm transition shadow-sm ${
          page === i + 1
            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {i + 1}
      </button>
    ))}

    {/* Next Button */}
    <button
      disabled={page === pageCount}
      onClick={() => setPage(page + 1)}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
    >
      Next ➡
    </button>
  </div>
)}


      
      </div>

      {/* ───────── right panel */}
      {/* <div className="w-72 border-l pl-4">
        <h3 className="font-semibold mb-2">Existing GRNs</h3>
        {grns.length === 0 ? (
          <p className="text-sm text-gray-500">None yet.</p>
        ) : (
          <ul className="space-y-1">
            {grns.map((g) => (
              <li key={`grn-${g.grnNo}`}>
                <button
                  onClick={() => openViewer(g.grnNo)}
                  className="text-blue-700 underline text-sm"
                >
                  {g.grnNo}
                  {g.name ? ` — ${g.name}` : ''}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div> */}

     {/* ───────── right panel (Fully Enhanced & Elegant) */}
<div className="w-80 max-h-[85vh] overflow-y-auto border-l border-gray-200 dark:border-gray-700 px-5 py-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl">
  <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 mb-4 tracking-wide">
    📦 Existing GRNs
  </h3>

  {grns.length === 0 ? (
    <p className="text-sm text-gray-500 dark:text-gray-400">No GRNs have been added yet.</p>
  ) : (
    <ul className="space-y-3">
      {grns.map((g) => (
        <li
          key={`grn-${g.grnNo}`}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 transition transform hover:scale-[1.015] hover:shadow-md"
        >
          <button
            onClick={() => openViewer(g.grnNo)}
            className="text-sm font-medium text-indigo-700 dark:text-indigo-300 hover:underline focus:outline-none"
          >
             📄 {g.grnNo}
            {g.name ? ` — ${g.name}` : ''}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>


      {/* ───────── modal: add to GRN */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-3xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">Add Items to GRN</h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-xl text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            <label className="block text-sm font-medium mb-1">
              GRN Number
            </label>
            <input
              value={grnInput}
              onChange={(e) => setGrnInput(e.target.value)}
              className="border rounded w-full px-3 py-2 mb-3"
              placeholder="GRNXXXXXXXXXX"
            />

            <label className="block text-sm font-medium mb-1">
              Received Date
            </label>
            <input
              type="date"
              value={recvDate}
              onChange={(e) => setRecvDate(e.target.value)}
              className="border rounded w-full px-3 py-2 mb-4"
            />

            <h5 className="font-semibold mb-2">Selected Items</h5>
            {selected.length === 0 ? (
              <p className="text-sm text-gray-500 mb-4">No items selected.</p>
            ) : (
              <table className="table-auto w-full border shadow rounded mb-4">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="p-2 border">Code</th>
                    <th className="p-2 border">Name</th>
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
                       <td className="p-2 border">{it.requiredQuantity}</td>
                        <td className="p-2 border">{it.approvedQuantity}</td>

                      <td className="p-2 border">
                        <button
                          onClick={() => toggleSelect(it)}
                          className="text-red-600 underline text-sm"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <label className="inline-flex items-center mb-4">
              <input
                type="checkbox"
                checked={confirm}
                onChange={(e) => setConfirm(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">I confirm this GRN</span>
            </label>

            {modalErr && (
              <p className="text-sm text-red-600 mb-3">{modalErr}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              {confirm && (
                <button
                  onClick={addToGrn}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Add to GRN
                </button>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/* ───────── modal: add to GRN (Enhanced with scrollbars & styling) */}
{showModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-12 z-50 overflow-auto">
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-2xl w-11/12 max-w-4xl max-h-[90vh] overflow-auto border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          ➕ Add Items to GRN
        </h4>
        <button
          onClick={() => setShowModal(false)}
          className="text-2xl text-gray-500 hover:text-red-600 transition"
          title="Close"
        >
          ×
        </button>
      </div>

      <label className="block text-sm font-medium mb-1">GRN Number</label>
      <input
        value={grnInput}
        onChange={(e) => setGrnInput(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2 mb-4 bg-white dark:bg-gray-800"
        placeholder="GRNXXXXXXXXXX"
      />

      <label className="block text-sm font-medium mb-1">Received Date</label>
      <input
        type="date"
        value={recvDate}
        onChange={(e) => setRecvDate(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded w-full px-3 py-2 mb-4 bg-white dark:bg-gray-800"
      />

      <h5 className="font-semibold mb-3 text-indigo-700 dark:text-indigo-300">
        🗂️ Selected Items
      </h5>

      {selected.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">No items selected.</p>
      ) : (
        <div className="overflow-auto max-h-[300px] border rounded-md shadow-inner">
          <table className="table-auto w-full min-w-[600px] border border-gray-200 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-sm">
                <th className="p-2 border dark:border-gray-700">Code</th>
                <th className="p-2 border dark:border-gray-700">Name</th>
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

      <label className="inline-flex items-center mt-4 mb-4">
        <input
          type="checkbox"
          checked={confirm}
          onChange={(e) => setConfirm(e.target.checked)}
          className="mr-2"
        />
        <span className="text-sm">I confirm this GRN</span>
      </label>

      {modalErr && <p className="text-sm text-red-600 mb-4">{modalErr}</p>}

      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm"
        >
          Cancel
        </button>
        {confirm && (
          <button
            onClick={addToGrn}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 text-sm"
          >
            Add to GRN
          </button>
        )}
      </div>
    </div>
  </div>
)}


      {/* ───────── popup: view / edit GRN */}
      {/* {view && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50">
          <div className="bg-white p-6 rounded shadow-xl w-11/12 max-w-4xl overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-bold">GRN {view}</h4>
              <button
                onClick={() => setView(null)}
                className="text-xl text-gray-600 hover:text-black"
              >
                ×
              </button>
            </div>

            {viewItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items for this GRN.</p>
            ) : (
              <>
                <table className="table-auto w-full border shadow rounded mb-4">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="p-2 border">Code</th>
                      <th className="p-2 border">Name</th>
                      <th className="p-2 border">Required</th>
                      <th className="p-2 border">Approved</th>
                      <th className="p-2 border">Received Qty</th>
                      <th className="p-2 border">Rate</th>
                      <th className="p-2 border">Total</th>
                      <th className="p-2 border">Received Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewItems.map((it, idx) => (
                      <tr
                        key={`view-${it.id}`}
                        className="text-center hover:bg-gray-50"
                      >
                        <td className="p-2 border">{it.itemCode}</td>
                        <td className="p-2 border">{it.itemName}</td>
                         <td className="p-2 border">{it.requiredQuantity}</td>
                         <td className="p-2 border">{it.approvedQuantity}</td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={it.receivedQuantity}
                            min={0}
                            onChange={(e) =>
                              changeViewItem(
                                idx,
                                'receivedQuantity',
                                Number(e.target.value)
                              )
                            }
                            className="border rounded px-2 py-1 w-24"
                          />
                        </td>
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={it.rate}
                            min={0}
                            onChange={(e) =>
                              changeViewItem(
                                idx,
                                'rate',
                                Number(e.target.value)
                              )
                            }
                            className="border rounded px-2 py-1 w-24"
                          />
                        </td>
                     
                        <td className="p-2 border">
                          <input
                            type="number"
                            value={it.total}
                            min={0}
                            onChange={(e) =>
                              changeViewItem(
                                idx,
                                'total',
                                Number(e.target.value)
                              )
                            }
                            className="border rounded px-2 py-1 w-24"
                          />
                        </td>
                        <td className="p-2 border">{it.receivedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end">
                  <button
                    onClick={saveViewChanges}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )} */}

      {view && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-10 z-50 overflow-auto">
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-xl shadow-2xl w-11/12 max-w-6xl max-h-[90vh] overflow-auto border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          📦 GRN {view}
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
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No items for this GRN.
        </p>
      ) : (
        <>
          <div className="overflow-auto max-h-[400px]">
            <table className="table-auto w-full min-w-[800px] border border-gray-200 dark:border-gray-600 shadow rounded mb-4">
              <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-indigo-900 dark:text-indigo-200">
                <tr>
                  <th className="p-2 border dark:border-gray-700">Code</th>
                  <th className="p-2 border dark:border-gray-700">Name</th>
                  <th className="p-2 border dark:border-gray-700">Required</th>
                  <th className="p-2 border dark:border-gray-700">Approved</th>
                  <th className="p-2 border dark:border-gray-700">Received Qty</th>
                  <th className="p-2 border dark:border-gray-700">Rate</th>
                  <th className="p-2 border dark:border-gray-700">Total</th>
                  <th className="p-2 border dark:border-gray-700">Received Date</th>
                </tr>
              </thead>
              <tbody className="text-center divide-y divide-gray-100 dark:divide-gray-700">
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
                        value={it.receivedQuantity}
                        min={0}
                        onChange={(e) =>
                          changeViewItem(idx, 'receivedQuantity', Number(e.target.value))
                        }
                        className="border dark:border-gray-600 rounded px-2 py-1 w-24 bg-white dark:bg-gray-800"
                      />
                    </td>
                    <td className="p-2 border dark:border-gray-700">
                      <input
                        type="number"
                        value={it.rate}
                        min={0}
                        onChange={(e) =>
                          changeViewItem(idx, 'rate', Number(e.target.value))
                        }
                        className="border dark:border-gray-600 rounded px-2 py-1 w-24 bg-white dark:bg-gray-800"
                      />
                    </td>
                    <td className="p-2 border dark:border-gray-700">
                      <input
                        type="number"
                        value={it.total}
                        min={0}
                        onChange={(e) =>
                          changeViewItem(idx, 'total', Number(e.target.value))
                        }
                        className="border dark:border-gray-600 rounded px-2 py-1 w-24 bg-white dark:bg-gray-800"
                      />
                    </td>
                    <td className="p-2 border dark:border-gray-700">{it.receivedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🧾 Complete Bill Total */}
          <div className="text-right text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Complete Bill Total: Rs.{' '}
            {viewItems.reduce((sum, item) => sum + Number(item.total || 0), 0).toFixed(2)}
          </div>

          <div className="flex justify-end">
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
