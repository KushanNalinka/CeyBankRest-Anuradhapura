
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// const BeverageBillsTable = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [filters, setFilters] = useState({ beverageBillId: '', roomNo: '', mealType: '', date: '' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedBillId, setExpandedBillId] = useState(null);
//   const billsPerPage = 3;

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/reservations/bills/beverages`);
//         setBills(data);
//         setFilteredBills(data);
//       } catch (err) {
//         console.error('Failed to fetch beverage bills:', err);
//       }
//     })();
//   }, []);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     const newFilters = { ...filters, [name]: value };
//     setFilters(newFilters);

//     const filtered = bills.filter((bill) =>
//       (newFilters.beverageBillId ? bill.beverageBillId.toString() === newFilters.beverageBillId : true) &&
//       (newFilters.roomNo ? bill.roomNo.includes(newFilters.roomNo) : true) &&
//       (newFilters.mealType ? bill.mealType.toLowerCase().includes(newFilters.mealType.toLowerCase()) : true) &&
//       (newFilters.date ? bill.date === newFilters.date : true)
//     );

//     setFilteredBills(filtered);
//     setCurrentPage(1);
//     setExpandedBillId(null);
//   };

//   const toggleExpand = (id) => {
//     setExpandedBillId((prevId) => (prevId === id ? null : id));
//   };

//   // Pagination
//   const indexOfLast = currentPage * billsPerPage;
//   const indexOfFirst = indexOfLast - billsPerPage;
//   const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBills.length / billsPerPage);

//   const paginate = (pageNum) => setCurrentPage(pageNum);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-[#24256D] mb-6">🍹 Beverage Bills</h2>

//       {/* Filters */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-[#F5F6FA] p-4 rounded-lg shadow">
//         <input
//           name="beverageBillId"
//           type="text"
//           placeholder="Filter by Bill ID"
//           value={filters.beverageBillId}
//           onChange={handleFilterChange}
//           className="p-2 border rounded-md text-sm"
//         />
//         <input
//           name="roomNo"
//           type="text"
//           placeholder="Filter by Room No"
//           value={filters.roomNo}
//           onChange={handleFilterChange}
//           className="p-2 border rounded-md text-sm"
//         />
//         <input
//           name="mealType"
//           type="text"
//           placeholder="Filter by Meal Type"
//           value={filters.mealType}
//           onChange={handleFilterChange}
//           className="p-2 border rounded-md text-sm"
//         />
//         <input
//           name="date"
//           type="date"
//           value={filters.date}
//           onChange={handleFilterChange}
//           className="p-2 border rounded-md text-sm"
//         />
//       </div>

//       {/* Bills Display */}
//       <div className="space-y-6">
//         {currentBills.length === 0 ? (
//           <p className="text-gray-500 italic">No bills found with the selected filters.</p>
//         ) : (
//           currentBills.map((bill) => (
//             <div
//               key={bill.beverageBillId}
//               className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="bg-[#E3E6F6] px-6 py-3 rounded-t-xl flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold text-[#28245F]">
//                     Bill #{bill.beverageBillId} — {bill.mealType} on {bill.date}
//                   </h3>
//                   <p className="text-sm text-gray-600">Room No: {bill.roomNo}</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm text-gray-700 font-semibold mb-2">
//                     Grand Total: Rs {bill.grandTotal.toFixed(2)}
//                   </div>
//                   <button
//                     onClick={() => toggleExpand(bill.beverageBillId)}
//                     className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1b1c50]"
//                   >
//                     {expandedBillId === bill.beverageBillId ? 'Hide Items' : 'View Items'}
//                   </button>
//                 </div>
//               </div>

//               {expandedBillId === bill.beverageBillId && (
//                 <div className="px-6 py-4 border-t bg-[#FAFAFA]">
//                   <ul className="divide-y divide-gray-200">
//                     {bill.beverageBillItems.map((item) => (
//                       <li
//                         key={item.id}
//                         className="flex justify-between items-center py-2 text-sm text-gray-700"
//                       >
//                         <div>
//                           <span className="font-medium">{item.beverageName}</span> — {item.bottlesOrGlasses} bottle(s) / glass(es)
//                         </div>
//                         <div className="font-semibold">Rs {item.total.toFixed(2)}</div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1 rounded-md text-sm font-medium ${
//                 currentPage === i + 1
//                   ? 'bg-[#24256D] text-white'
//                   : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BeverageBillsTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// const BeverageBillsTable = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedBillId, setExpandedBillId] = useState(null);
//   const billsPerPage = 3;

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/reservations/bills/beverages`);
//         setBills(data);
//         setFilteredBills(data);
//       } catch (err) {
//         console.error('Failed to fetch beverage bills:', err);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase();

//     const filtered = bills.filter((bill) => {
//       const billMatches =
//         bill.beverageBillId.toString().includes(term) ||
//         bill.roomNo.toLowerCase().includes(term) ||
//         bill.mealType.toLowerCase().includes(term) ||
//         bill.date.toLowerCase().includes(term) ||
//         bill.grandTotal.toString().includes(term) ||
//         bill.beverageBillItems?.some(
//           (item) =>
//             item.beverageName.toLowerCase().includes(term) ||
//             item.total.toString().includes(term)
//         );

//       return billMatches;
//     });

//     setFilteredBills(filtered);
//     setCurrentPage(1);
//     setExpandedBillId(null);
//   }, [searchTerm, bills]);

//   const toggleExpand = (id) => {
//     setExpandedBillId((prevId) => (prevId === id ? null : id));
//   };

//   // Pagination
//   const indexOfLast = currentPage * billsPerPage;
//   const indexOfFirst = indexOfLast - billsPerPage;
//   const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBills.length / billsPerPage);

//   const paginate = (pageNum) => setCurrentPage(pageNum);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold text-[#24256D] mb-6">🍹 Beverage Bills</h2>

//       {/* Unified Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Bill ID, Room No, Meal Type, Date, Beverage Name, or Amount"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 border rounded-md text-sm shadow-sm"
//         />
//       </div>

//       {/* Bills Display */}
//       <div className="space-y-6">
//         {currentBills.length === 0 ? (
//           <p className="text-gray-500 italic">No bills found matching the search.</p>
//         ) : (
//           currentBills.map((bill) => (
//             <div
//               key={bill.beverageBillId}
//               className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="bg-[#E3E6F6] px-6 py-3 rounded-t-xl flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold text-[#28245F]">
//                     Bill #{bill.beverageBillId} — {bill.mealType} on {bill.date}
//                   </h3>
//                   <p className="text-sm text-gray-600">Room No: {bill.roomNo}</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm text-gray-700 font-semibold mb-2">
//                     Grand Total: Rs {bill.grandTotal.toFixed(2)}
//                   </div>
//                   <button
//                     onClick={() => toggleExpand(bill.beverageBillId)}
//                     className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1b1c50]"
//                   >
//                     {expandedBillId === bill.beverageBillId ? 'Hide Items' : 'View Items'}
//                   </button>
//                 </div>
//               </div>

//               {expandedBillId === bill.beverageBillId && (
//                 <div className="px-6 py-4 border-t bg-[#FAFAFA]">
//                   <ul className="divide-y divide-gray-200">
//                     {bill.beverageBillItems.map((item) => (
//                       <li
//                         key={item.id}
//                         className="flex justify-between items-center py-2 text-sm text-gray-700"
//                       >
//                         <div>
//                           <span className="font-medium">{item.beverageName}</span> —{' '}
//                           {item.bottlesOrGlasses} bottle(s) / glass(es)
//                         </div>
//                         <div className="font-semibold">Rs {item.total.toFixed(2)}</div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1 rounded-md text-sm font-medium ${
//                 currentPage === i + 1
//                   ? 'bg-[#24256D] text-white'
//                   : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BeverageBillsTable;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BeverageBillsTable = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBillId, setExpandedBillId] = useState(null);
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [showReportItems, setShowReportItems] = useState(false);
  const billsPerPage = 3;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/reservations/bills/beverages`);

        // ✅ Sort by date descending (most recent first)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setBills(data);
        setFilteredBills(data);
      } catch (err) {
        console.error('Failed to fetch beverage bills:', err);
      }
    })();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = bills.filter((bill) => {
      const billMatches =
        bill.beverageBillId.toString().includes(term) ||
        bill.roomNo.toLowerCase().includes(term) ||
        bill.mealType.toLowerCase().includes(term) ||
        bill.date.toLowerCase().includes(term) ||
        bill.grandTotal.toString().includes(term) ||
        bill.beverageBillItems?.some(
          (item) =>
            item.beverageName.toLowerCase().includes(term) ||
            item.total.toString().includes(term)
        );

      return billMatches;
    });

    setFilteredBills(filtered);
    setCurrentPage(1);
    setExpandedBillId(null);
  }, [searchTerm, bills]);

  const toggleExpand = (id) => {
    setExpandedBillId((prevId) => (prevId === id ? null : id));
  };


  // 📦 Report data logic
  const reportBills = bills.filter((b) => b.date === reportDate);
  const beverageCount = reportBills.reduce((total, bill) => {
    return total + bill.beverageBillItems.reduce((sum, item) => sum + item.bottlesOrGlasses, 0);
  }, 0);

  const reportItemsMap = {};
  reportBills.forEach((bill) => {
    bill.beverageBillItems.forEach((item) => {
      if (!reportItemsMap[item.beverageName]) {
        reportItemsMap[item.beverageName] = 0;
      }
      reportItemsMap[item.beverageName] += item.bottlesOrGlasses;
    });
  });

  const reportItems = Object.entries(reportItemsMap).map(([name, quantity]) => ({ name, quantity }));

  // Pagination
  const indexOfLast = currentPage * billsPerPage;
  const indexOfFirst = indexOfLast - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Beverage Bills</h1>
                  <p className="text-gray-600">Track and manage beverage billing records</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by Bill ID, Room, Meal Type, Date, or Beverage Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>


          {/* 📊 Report Box */}
          <div className="mb-6 bg-white border border-blue-300 rounded-lg p-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="report-date" className="font-medium text-gray-700">Select Date:</label>
              <input
                id="report-date"
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 focus:ring focus:ring-blue-200 outline-none"
              />
            </div>
            <button
              onClick={() => setShowReportItems(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {`Total Beverage Items on ${reportDate}: ${beverageCount}`}
            </button>
          </div>

          {/* 🧾 Report Item Modal */}
          {showReportItems && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                  onClick={() => setShowReportItems(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Beverage Items on {reportDate}</h3>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {reportItems.length === 0 ? (
                    <li className="text-gray-500">No items found.</li>
                  ) : (
                    reportItems.map((item, index) => (
                      <li key={index} className="flex justify-between border-b pb-1">
                        <span className="font-medium text-gray-800">{item.name}</span>
                        <span className="text-gray-700">{item.quantity}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Bills List */}
          <div className="space-y-4">
            {currentBills.map((bill) => (
              <div
                key={bill.beverageBillId}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        #{bill.beverageBillId}
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {bill.mealType} - {bill.date}
                        </h2>
                        <p className="text-sm text-gray-600">Room: {bill.roomNo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-xl font-bold text-green-900">
                          Rs {bill.grandTotal.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleExpand(bill.beverageBillId)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
                      >
                        {expandedBillId === bill.beverageBillId ? (
                          <>
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                            Hide Items
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            View Items
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium">Bill ID</p>
                      <p className="text-lg font-bold text-blue-900">#{bill.beverageBillId}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">Meal Type</p>
                      <p className="text-lg font-bold text-purple-900">{bill.mealType}</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-600 font-medium">Date</p>
                      <p className="text-lg font-bold text-orange-900">{bill.date}</p>
                    </div>
                  </div>

                  {expandedBillId === bill.beverageBillId && (
                    <div className="mt-4 bg-gray-50 border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6z" clipRule="evenodd" />
                        </svg>
                        Beverage Items
                      </h3>
                      
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead className="bg-blue-600">
                              <tr>
                                <th className="py-3 px-4 text-left text-white font-medium text-sm">Beverage Name</th>
                                <th className="py-3 px-4 text-center text-white font-medium text-sm">Quantity</th>
                                <th className="py-3 px-4 text-right text-white font-medium text-sm">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {bill.beverageBillItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="py-3 px-4">
                                    <span className="font-medium text-gray-900">{item.beverageName}</span>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
                                      {item.bottlesOrGlasses}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <span className="font-bold text-green-900">
                                      Rs {item.total.toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentBills.length === 0 && (
            <div className="bg-white border rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Beverage Bills Found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'No bills match your current search criteria.' : 'No beverage bills available at the moment.'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
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

          {/* Summary Statistics */}
          {filteredBills.length > 0 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Beverage Bills Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Bills</p>
                      <p className="text-xl font-bold text-blue-900">{filteredBills.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Total Revenue</p>
                      <p className="text-xl font-bold text-green-900">
                        Rs {filteredBills.reduce((sum, bill) => sum + bill.grandTotal, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Meal Types</p>
                      <p className="text-xl font-bold text-purple-900">
                        {new Set(filteredBills.map(bill => bill.mealType)).size}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-orange-600">Avg Bill Amount</p>
                      <p className="text-xl font-bold text-orange-900">
                        Rs {filteredBills.length > 0 ? (filteredBills.reduce((sum, bill) => sum + bill.grandTotal, 0) / filteredBills.length).toFixed(2) : '0.00'}
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

export default BeverageBillsTable;