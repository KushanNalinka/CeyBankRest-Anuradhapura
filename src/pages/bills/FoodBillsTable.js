// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';

// // const API_URL = process.env.REACT_APP_API_URL;

// // const FoodBillsTable = () => {
// //   const [bills, setBills] = useState([]);
// //   const [filteredBills, setFilteredBills] = useState([]);
// //   const [filters, setFilters] = useState({ foodBillId: '', roomNo: '', mealType: '', date: '' });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [expandedBillId, setExpandedBillId] = useState(null);
// //   const billsPerPage = 5;

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         const { data } = await axios.get(`${API_URL}/reservations/bills/meals`);
// //         setBills(data);
// //         setFilteredBills(data);
// //       } catch (err) {
// //         console.error('Failed to fetch food bills:', err);
// //       }
// //     })();
// //   }, []);

// //   const handleFilterChange = (e) => {
// //     const { name, value } = e.target;
// //     const newFilters = { ...filters, [name]: value };
// //     setFilters(newFilters);

// //     const filtered = bills.filter((bill) =>
// //       (newFilters.foodBillId ? bill.foodBillId.toString() === newFilters.foodBillId : true) &&
// //       (newFilters.roomNo ? bill.roomNo.includes(newFilters.roomNo) : true) &&
// //       (newFilters.mealType ? bill.mealType.toLowerCase().includes(newFilters.mealType.toLowerCase()) : true) &&
// //       (newFilters.date ? bill.date === newFilters.date : true)
// //     );

// //     setFilteredBills(filtered);
// //     setCurrentPage(1);
// //     setExpandedBillId(null); // reset view state when filtering
// //   };

// //   const toggleExpand = (id) => {
// //     setExpandedBillId((prevId) => (prevId === id ? null : id));
// //   };

// //   // Pagination
// //   const indexOfLast = currentPage * billsPerPage;
// //   const indexOfFirst = indexOfLast - billsPerPage;
// //   const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(filteredBills.length / billsPerPage);

// //   const paginate = (pageNum) => setCurrentPage(pageNum);

// //   return (
// //     <div className="p-6 max-w-6xl mx-auto">
// //       <h2 className="text-2xl font-bold text-[#24256D] mb-6">🍽️ Food Bills</h2>

// //       {/* Filters */}
// //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-[#F5F6FA] p-4 rounded-lg shadow">
// //         <input
// //           name="foodBillId"
// //           type="text"
// //           placeholder="Filter by Bill ID"
// //           value={filters.foodBillId}
// //           onChange={handleFilterChange}
// //           className="p-2 border rounded-md text-sm"
// //         />
// //         <input
// //           name="roomNo"
// //           type="text"
// //           placeholder="Filter by Room No"
// //           value={filters.roomNo}
// //           onChange={handleFilterChange}
// //           className="p-2 border rounded-md text-sm"
// //         />
// //         <input
// //           name="mealType"
// //           type="text"
// //           placeholder="Filter by Meal Type"
// //           value={filters.mealType}
// //           onChange={handleFilterChange}
// //           className="p-2 border rounded-md text-sm"
// //         />
// //         <input
// //           name="date"
// //           type="date"
// //           value={filters.date}
// //           onChange={handleFilterChange}
// //           className="p-2 border rounded-md text-sm"
// //         />
// //       </div>

// //       {/* Bills */}
// //       <div className="space-y-6">
// //         {currentBills.length === 0 ? (
// //           <p className="text-gray-500 italic">No bills found with the selected filters.</p>
// //         ) : (
// //           currentBills.map((bill) => (
// //             <div
// //               key={bill.foodBillId}
// //               className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-shadow"
// //             >
// //               <div className="bg-[#E3E6F6] px-6 py-3 rounded-t-xl flex justify-between items-center">
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-[#28245F]">
// //                     Bill #{bill.foodBillId} — {bill.mealType} on {bill.date}
// //                   </h3>
// //                   <p className="text-sm text-gray-600">Room No: {bill.roomNo}</p>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className="text-sm text-gray-700 font-semibold mb-2">
// //                     Grand Total: Rs {bill.grandTotal.toFixed(2)}
// //                   </div>
// //                   <button
// //                     onClick={() => toggleExpand(bill.foodBillId)}
// //                     className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1b1c50]"
// //                   >
// //                     {expandedBillId === bill.foodBillId ? 'Hide Items' : 'View Items'}
// //                   </button>
// //                 </div>
// //               </div>

// //               {expandedBillId === bill.foodBillId && (
// //                 <div className="px-6 py-4 border-t bg-[#FAFAFA]">
// //                   <ul className="divide-y divide-gray-200">
// //                     {bill.foodBillItems.map((item) => (
// //                       <li
// //                         key={item.id}
// //                         className="flex justify-between items-center py-2 text-sm text-gray-700"
// //                       >
// //                         <div>
// //                           <span className="font-medium">{item.foodName}</span> — {item.portions} portion(s)
// //                         </div>
// //                         <div className="font-semibold">Rs {item.total.toFixed(2)}</div>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Pagination */}
// //       {totalPages > 1 && (
// //         <div className="flex justify-center mt-8 space-x-2">
// //           {Array.from({ length: totalPages }, (_, i) => (
// //             <button
// //               key={i + 1}
// //               onClick={() => paginate(i + 1)}
// //               className={`px-3 py-1 rounded-md text-sm font-medium ${
// //                 currentPage === i + 1
// //                   ? 'bg-[#24256D] text-white'
// //                   : 'bg-gray-200 text-[#24256D] hover:bg-gray-300'
// //               }`}
// //             >
// //               {i + 1}
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FoodBillsTable;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// const FoodBillsTable = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedBillId, setExpandedBillId] = useState(null);
//   const billsPerPage = 5;

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/reservations/bills/meals`);
//         setBills(data);
//         setFilteredBills(data);
//       } catch (err) {
//         console.error('Failed to fetch food bills:', err);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const term = searchTerm.toLowerCase();

//     const filtered = bills.filter((bill) => {
//       const matches =
//         bill.foodBillId.toString().includes(term) ||
//         bill.roomNo.toLowerCase().includes(term) ||
//         bill.mealType.toLowerCase().includes(term) ||
//         bill.date.toLowerCase().includes(term) ||
//         bill.foodBillItems?.some((item) =>
//           item.foodName.toLowerCase().includes(term) ||
//           item.total.toString().includes(term)
//         );

//       return matches;
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
//       <h2 className="text-2xl font-bold text-[#24256D] mb-6">🍽️ Food Bills</h2>

//       {/* Unified Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search by Bill ID, Room No, Meal Type, Date, Food Name or Amount"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 border rounded-md text-sm shadow-sm"
//         />
//       </div>

//       {/* Bills */}
//       <div className="space-y-6">
//         {currentBills.length === 0 ? (
//           <p className="text-gray-500 italic">No bills found with the search term.</p>
//         ) : (
//           currentBills.map((bill) => (
//             <div
//               key={bill.foodBillId}
//               className="bg-white rounded-xl border shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="bg-[#E3E6F6] px-6 py-3 rounded-t-xl flex justify-between items-center">
//                 <div>
//                   <h3 className="text-lg font-semibold text-[#28245F]">
//                     Bill #{bill.foodBillId} — {bill.mealType} on {bill.date}
//                   </h3>
//                   <p className="text-sm text-gray-600">Room No: {bill.roomNo}</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-sm text-gray-700 font-semibold mb-2">
//                     Grand Total: Rs {bill.grandTotal.toFixed(2)}
//                   </div>
//                   <button
//                     onClick={() => toggleExpand(bill.foodBillId)}
//                     className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1b1c50]"
//                   >
//                     {expandedBillId === bill.foodBillId ? 'Hide Items' : 'View Items'}
//                   </button>
//                 </div>
//               </div>

//               {expandedBillId === bill.foodBillId && (
//                 <div className="px-6 py-4 border-t bg-[#FAFAFA]">
//                   <ul className="divide-y divide-gray-200">
//                     {bill.foodBillItems.map((item) => (
//                       <li
//                         key={item.id}
//                         className="flex justify-between items-center py-2 text-sm text-gray-700"
//                       >
//                         <div>
//                           <span className="font-medium">{item.foodName}</span> — {item.portions} portion(s)
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

// export default FoodBillsTable;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const FoodBillsTable = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedBillId, setExpandedBillId] = useState(null);
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const billsPerPage = 5;

   const [reportStats, setReportStats] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
  });

  // ⭐ New Feature: Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    mealType: '',
    items: [],
  });


  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_URL}/reservations/bills/meals`);

        // 🔽 Sort bills by date (most recent first)
        data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBills(data);

        setFilteredBills(data);
      } catch (err) {
        console.error('Failed to fetch food bills:', err);
      }
    })();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = bills.filter((bill) => {
      const matches =
        bill.foodBillId.toString().includes(term) ||
        bill.roomNo.toLowerCase().includes(term) ||
        bill.mealType.toLowerCase().includes(term) ||
        bill.date.toLowerCase().includes(term) ||
        bill.foodBillItems?.some((item) =>
          item.foodName.toLowerCase().includes(term) ||
          item.total.toString().includes(term)
        );

      return matches;
    });

    setFilteredBills(filtered);
    setCurrentPage(1);
    setExpandedBillId(null);
  }, [searchTerm, bills]);

   useEffect(() => {
    const stats = { breakfast: 0, lunch: 0, dinner: 0 };
    bills.forEach((bill) => {
      if (bill.date === reportDate) {
        const meal = bill.mealType.toLowerCase();
        if (meal === 'breakfast') stats.breakfast++;
        else if (meal === 'lunch') stats.lunch++;
        else if (meal === 'dinner') stats.dinner++;
      }
    });
    setReportStats(stats);
  }, [reportDate, bills]);

  const toggleExpand = (id) => {
    setExpandedBillId((prevId) => (prevId === id ? null : id));
  };


  // ⭐ New Feature: Open Modal
  const openMealModal = (mealType) => {
    const items = [];

    bills.forEach((bill) => {
      if (bill.date === reportDate && bill.mealType.toLowerCase() === mealType) {
        bill.foodBillItems.forEach((item) => {
          items.push({ name: item.foodName, portions: item.portions });
        });
      }
    });

    setModalData({
      mealType,
      items,
    });
    setShowModal(true);
  };

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
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H9V9a1 1 0 012 0v3h.229l-.292-1.168A1 1 0 0111.618 10H12a1 1 0 110 2h-.382l-.724 2.894A1 1 0 0110 16H8a1 1 0 01-.894-.553l-.724-2.894A1 1 0 016.382 12H6a1 1 0 110-2h.618a1 1 0 01.618.553l.535 2.147z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Food Bills</h1>
                  <p className="text-gray-600">Track and manage meal billing records</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by Bill ID, Room, Meal Type, Date, or Food Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>


           {/* Report Box - New Feature */}
          {/* <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Order Summary</h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Select Date:</label>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 md:mt-0 w-full">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-blue-700">Breakfast</p>
                  <p className="text-xl font-bold text-blue-900">{reportStats.breakfast}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-green-700">Lunch</p>
                  <p className="text-xl font-bold text-green-900">{reportStats.lunch}</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg text-center">
                  <p className="text-sm font-medium text-orange-700">Dinner</p>
                  <p className="text-xl font-bold text-orange-900">{reportStats.dinner}</p>
                </div>
              </div>
            </div>
          </div> */}

           {/* Report Box */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Meal Order Summary</h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Select Date:</label>
                <input
                  type="date"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 md:mt-0 w-full">
                <div
                  className="bg-blue-100 p-4 rounded-lg text-center cursor-pointer hover:bg-blue-200 transition"
                  onClick={() => openMealModal('breakfast')}
                >
                  <p className="text-sm font-medium text-blue-700">Breakfast</p>
                  <p className="text-xl font-bold text-blue-900">{reportStats.breakfast}</p>
                </div>
                <div
                  className="bg-green-100 p-4 rounded-lg text-center cursor-pointer hover:bg-green-200 transition"
                  onClick={() => openMealModal('lunch')}
                >
                  <p className="text-sm font-medium text-green-700">Lunch</p>
                  <p className="text-xl font-bold text-green-900">{reportStats.lunch}</p>
                </div>
                <div
                  className="bg-orange-100 p-4 rounded-lg text-center cursor-pointer hover:bg-orange-200 transition"
                  onClick={() => openMealModal('dinner')}
                >
                  <p className="text-sm font-medium text-orange-700">Dinner</p>
                  <p className="text-xl font-bold text-orange-900">{reportStats.dinner}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal - Meal Items List */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="flex justify-between items-center border-b px-6 py-4">
                  <h4 className="text-lg font-semibold text-gray-900 capitalize">
                    {modalData.mealType} - {reportDate}
                  </h4>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    ×
                  </button>
                </div>
                <div className="p-6 max-h-[400px] overflow-y-auto">
                  {modalData.items.length === 0 ? (
                    <p className="text-sm text-gray-500">No items found for this meal.</p>
                  ) : (
                    <ul className="space-y-2">
                      {modalData.items.map((item, index) => (
                        <li key={index} className="flex justify-between border-b pb-2">
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <span className="text-sm text-purple-700 font-semibold">
                            {item.portions} portion{item.portions > 1 ? 's' : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="px-6 py-4 border-t text-right">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* Bills List */}
          <div className="space-y-4">
            {currentBills.map((bill) => (
              <div
                key={bill.foodBillId}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        #{bill.foodBillId}
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
                        onClick={() => toggleExpand(bill.foodBillId)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
                      >
                        {expandedBillId === bill.foodBillId ? (
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
                      <p className="text-lg font-bold text-blue-900">#{bill.foodBillId}</p>
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

                  {expandedBillId === bill.foodBillId && (
                    <div className="mt-4 bg-gray-50 border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5z" clipRule="evenodd" />
                        </svg>
                        Food Items
                      </h3>
                      
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead className="bg-blue-600">
                              <tr>
                                <th className="py-3 px-4 text-left text-white font-medium text-sm">Food Name</th>
                                <th className="py-3 px-4 text-center text-white font-medium text-sm">Portions</th>
                                <th className="py-3 px-4 text-right text-white font-medium text-sm">Amount</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {bill.foodBillItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="py-3 px-4">
                                    <span className="font-medium text-gray-900">{item.foodName}</span>
                                  </td>
                                  <td className="py-3 px-4 text-center">
                                    <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded">
                                      {item.portions}
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
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Food Bills Found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'No bills match your current search criteria.' : 'No food bills available at the moment.'}
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Food Bills Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5z" clipRule="evenodd" />
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

export default FoodBillsTable;