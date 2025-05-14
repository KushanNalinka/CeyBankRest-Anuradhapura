import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const PAGE_SIZE = 8;

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
          rate: i.rate,
          total: i.total,
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
        <h2 className="text-2xl font-bold mb-4">Items for Requisition {id}</h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 transition-colors"
        >
          ← Back to Previous Page
        </button>

        {message && <p className="mb-4 text-sm text-green-700">{message}</p>}

        <table className="table-auto w-full border shadow rounded-lg">
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
        </table>

        {/* Pagination */}
        {pageCount > 1 && (
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
        )}

        {selected.length > 0 && (
          <button
            onClick={openAddModal}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Add to ISSUE ({selected.length})
          </button>
        )}
      </div>

      {/* Right Panel */}
      <div className="w-72 border-l pl-4">
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
      </div>

      {/* Add Issue Modal */}
      {showModal && (
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
                    <th className="p-2 border">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.map((it) => (
                    <tr key={`sel-${it.id}`} className="text-center">
                      <td className="p-2 border">{it.itemCode}</td>
                      <td className="p-2 border">{it.itemName}</td>
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
      )}

      {/* View/Edit Issue Popup */}
      {view && (
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
                      <th className="p-2 border">Issued Qty</th>
                      <th className="p-2 border">Rate</th>
                      <th className="p-2 border">Total</th>
                      <th className="p-2 border">Issued Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewItems.map((it, idx) => (
                      <tr key={`view-${it.id}`} className="text-center hover:bg-gray-50">
                        <td className="p-2 border">{it.itemCode}</td>
                        <td className="p-2 border">{it.itemName}</td>
                        <td className="p-2 border">
                          <input type="number" value={it.issuedQuantity} min={0} onChange={(e) => changeViewItem(idx, 'issuedQuantity', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
                        </td>
                        <td className="p-2 border">
                          <input type="number" value={it.rate} min={0} onChange={(e) => changeViewItem(idx, 'rate', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
                        </td>
                        <td className="p-2 border">
                          <input type="number" value={it.total} min={0} onChange={(e) => changeViewItem(idx, 'total', Number(e.target.value))} className="border rounded px-2 py-1 w-24" />
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
      )}
    </div>
  );
};

export default StoreRequisitionItems;
