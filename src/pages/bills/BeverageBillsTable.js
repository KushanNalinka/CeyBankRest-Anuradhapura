import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BeverageBillsTable = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [filters, setFilters] = useState({ beverageBillId: '', roomNo: '', mealType: '', date: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBillId, setExpandedBillId] = useState(null);
  const billsPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/reservations/bills/beverages`);
        setBills(data);
        setFilteredBills(data);
      } catch (err) {
        console.error('Failed to fetch beverage bills:', err);
      }
    })();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const filtered = bills.filter((bill) =>
      (newFilters.beverageBillId ? bill.beverageBillId.toString() === newFilters.beverageBillId : true) &&
      (newFilters.roomNo ? bill.roomNo.includes(newFilters.roomNo) : true) &&
      (newFilters.mealType ? bill.mealType.toLowerCase().includes(newFilters.mealType.toLowerCase()) : true) &&
      (newFilters.date ? bill.date === newFilters.date : true)
    );

    setFilteredBills(filtered);
    setCurrentPage(1);
    setExpandedBillId(null);
  };

  const toggleExpand = (id) => {
    setExpandedBillId((prevId) => (prevId === id ? null : id));
  };

  // Pagination
  const indexOfLast = currentPage * billsPerPage;
  const indexOfFirst = indexOfLast - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-[#24256D] mb-6">🍹 Beverage Bills</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-[#F5F6FA] p-4 rounded-lg shadow">
        <input
          name="beverageBillId"
          type="text"
          placeholder="Filter by Bill ID"
          value={filters.beverageBillId}
          onChange={handleFilterChange}
          className="p-2 border rounded-md text-sm"
        />
        <input
          name="roomNo"
          type="text"
          placeholder="Filter by Room No"
          value={filters.roomNo}
          onChange={handleFilterChange}
          className="p-2 border rounded-md text-sm"
        />
        <input
          name="mealType"
          type="text"
          placeholder="Filter by Meal Type"
          value={filters.mealType}
          onChange={handleFilterChange}
          className="p-2 border rounded-md text-sm"
        />
        <input
          name="date"
          type="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border rounded-md text-sm"
        />
      </div>

      {/* Bills Display */}
      <div className="space-y-6">
        {currentBills.length === 0 ? (
          <p className="text-gray-500 italic">No bills found with the selected filters.</p>
        ) : (
          currentBills.map((bill) => (
            <div
              key={bill.beverageBillId}
              className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-[#E3E6F6] px-6 py-3 rounded-t-xl flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-[#28245F]">
                    Bill #{bill.beverageBillId} — {bill.mealType} on {bill.date}
                  </h3>
                  <p className="text-sm text-gray-600">Room No: {bill.roomNo}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-700 font-semibold mb-2">
                    Grand Total: Rs {bill.grandTotal.toFixed(2)}
                  </div>
                  <button
                    onClick={() => toggleExpand(bill.beverageBillId)}
                    className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1b1c50]"
                  >
                    {expandedBillId === bill.beverageBillId ? 'Hide Items' : 'View Items'}
                  </button>
                </div>
              </div>

              {expandedBillId === bill.beverageBillId && (
                <div className="px-6 py-4 border-t bg-[#FAFAFA]">
                  <ul className="divide-y divide-gray-200">
                    {bill.beverageBillItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-2 text-sm text-gray-700"
                      >
                        <div>
                          <span className="font-medium">{item.beverageName}</span> — {item.bottlesOrGlasses} bottle(s) / glass(es)
                        </div>
                        <div className="font-semibold">Rs {item.total.toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                currentPage === i + 1
                  ? 'bg-[#24256D] text-white'
                  : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeverageBillsTable;
