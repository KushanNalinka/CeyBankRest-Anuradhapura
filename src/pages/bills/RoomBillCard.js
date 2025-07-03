// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// const AllRoomBills = () => {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]);
//   const [filters, setFilters] = useState({ inDate: '', outDate: '', roomNo: '' });
//   const [expandedId, setExpandedId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const billsPerPage = 4;
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAllRoomBills = async () => {
//       try {
//         const { data } = await axios.get(`${API_URL}/reservations/room-bill`);
//         setBills(data);
//         setFilteredBills(data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load room bills.');
//       }
//     };

//     fetchAllRoomBills();
//   }, []);

//   const toggleExpand = (id) => {
//     setExpandedId((prev) => (prev === id ? null : id));
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     const updatedFilters = { ...filters, [name]: value };
//     setFilters(updatedFilters);

//     const filtered = bills.filter((bill) =>
//       (!updatedFilters.inDate || bill.inDate === updatedFilters.inDate) &&
//       (!updatedFilters.outDate || bill.outDate === updatedFilters.outDate) &&
//       (!updatedFilters.roomNo || bill.rooms.some(r => r.roomNo.includes(updatedFilters.roomNo)))
//     );

//     setFilteredBills(filtered);
//     setCurrentPage(1);
//     setExpandedId(null);
//   };

//   const indexOfLast = currentPage * billsPerPage;
//   const indexOfFirst = indexOfLast - billsPerPage;
//   const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBills.length / billsPerPage);

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
//       <h1 className="text-2xl font-bold text-[#24256D] mb-4">🏨 All Reservation Room Bills</h1>

//       {/* Filters */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-[#F5F6FA] p-4 rounded-lg shadow">
//         <input
//           name="inDate"
//           type="date"
//           value={filters.inDate}
//           onChange={handleFilterChange}
//           className="p-2 border rounded text-sm"
//           placeholder="In Date"
//         />
//         <input
//           name="outDate"
//           type="date"
//           value={filters.outDate}
//           onChange={handleFilterChange}
//           className="p-2 border rounded text-sm"
//           placeholder="Out Date"
//         />
//         <input
//           name="roomNo"
//           type="text"
//           value={filters.roomNo}
//           onChange={handleFilterChange}
//           className="p-2 border rounded text-sm"
//           placeholder="Room No"
//         />
//       </div>

//       {error && <p className="text-red-600 p-4">{error}</p>}
//       {!filteredBills.length && !error && (
//         <p className="text-gray-600 italic p-4">No matching results found.</p>
//       )}

//       {currentBills.map((bill) => (
//         <div
//           key={bill.reservationId}
//           className="bg-white border rounded-xl shadow-md p-6"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-[#28245F]">
//               Reservation #{bill.reservationId}
//             </h2>
//             <button
//               onClick={() => toggleExpand(bill.reservationId)}
//               className="px-4 py-1 text-sm bg-[#24256D] text-white rounded hover:bg-[#1c1d50]"
//             >
//               {expandedId === bill.reservationId ? 'Hide Rooms' : 'View Rooms'}
//             </button>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 mb-2">
//             <div><strong>In Date:</strong> {bill.inDate}</div>
//             <div><strong>Out Date:</strong> {bill.outDate}</div>
//             <div><strong>Nights:</strong> {bill.nights}</div>
//             <div className="md:text-right font-bold text-[#28245F] col-span-2 md:col-span-1">
//               Total: Rs {bill.roomTotal.toLocaleString()}
//             </div>
//           </div>

//           {expandedId === bill.reservationId && (
//             <div className="mt-4 bg-[#F9FAFB] p-4 rounded-lg border">
//               <h3 className="text-md font-semibold text-[#24256D] mb-2">🛏️ Room Details</h3>
//               <div className="grid grid-cols-3 text-sm font-semibold text-gray-600 border-b pb-2 mb-2">
//                 <span>Room No</span>
//                 <span>Room Type</span>
//                 <span className="text-right">Rate/Night</span>
//               </div>
//               {bill.rooms.map((room, idx) => (
//                 <div
//                   key={idx}
//                   className="grid grid-cols-3 text-sm text-gray-700 py-2 border-b last:border-none"
//                 >
//                   <span>{room.roomNo}</span>
//                   <span>{room.roomType}</span>
//                   <span className="text-right">Rs {room.ratePerNight.toLocaleString()}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-8 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => setCurrentPage(i + 1)}
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

// export default AllRoomBills;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const AllRoomBills = () => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [filters, setFilters] = useState({ inDate: '', outDate: '', roomNo: '' });
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 4;
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllRoomBills = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/reservations/room-bill`);
        setBills(data);
        setFilteredBills(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load room bills.');
      }
    };

    fetchAllRoomBills();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = bills.filter((bill) =>
      (!updatedFilters.inDate || bill.inDate === updatedFilters.inDate) &&
      (!updatedFilters.outDate || bill.outDate === updatedFilters.outDate) &&
      (!updatedFilters.roomNo || bill.rooms.some(r => r.roomNo.includes(updatedFilters.roomNo)))
    );

    setFilteredBills(filtered);
    setCurrentPage(1);
    setExpandedId(null);
  };

  const indexOfLast = currentPage * billsPerPage;
  const indexOfFirst = indexOfLast - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Reservation Room Bills</h1>
                  <p className="text-gray-600">View and manage all reservation billing details</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Bills</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <input
                  name="inDate"
                  type="date"
                  value={filters.inDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <input
                  name="outDate"
                  type="date"
                  value={filters.outDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <input
                  name="roomNo"
                  type="text"
                  value={filters.roomNo}
                  onChange={handleFilterChange}
                  placeholder="Search by room number..."
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bills List */}
          <div className="space-y-4">
            {currentBills.map((bill) => (
              <div
                key={bill.reservationId}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        #{bill.reservationId}
                      </span>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Reservation Bill
                      </h2>
                    </div>
                    <button
                      onClick={() => toggleExpand(bill.reservationId)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
                    >
                      {expandedId === bill.reservationId ? (
                        <>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                          Hide Details
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          View Details
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium">Check-in Date</p>
                      <p className="text-lg font-bold text-blue-900">{bill.inDate}</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium">Check-out Date</p>
                      <p className="text-lg font-bold text-blue-900">{bill.outDate}</p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium">Total Nights</p>
                      <p className="text-lg font-bold text-purple-900">{bill.nights}</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-600 font-medium">Total Amount</p>
                      <p className="text-lg font-bold text-green-900">Rs {bill.roomTotal.toLocaleString()}</p>
                    </div>
                  </div>

                  {expandedId === bill.reservationId && (
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                        Room Details
                      </h3>
                      
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead className="bg-blue-600">
                              <tr>
                                <th className="py-3 px-4 text-left text-white font-medium text-sm">Room Number</th>
                                <th className="py-3 px-4 text-left text-white font-medium text-sm">Room Type</th>
                                <th className="py-3 px-4 text-right text-white font-medium text-sm">Rate per Night</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {bill.rooms.map((room, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                  <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                                      {room.roomNo}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                                      {room.roomType}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right">
                                    <span className="font-medium text-gray-900">
                                      Rs {room.ratePerNight.toLocaleString()}
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
          {filteredBills.length === 0 && !error && (
            <div className="bg-white border rounded-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Room Bills Found</h3>
              <p className="text-gray-500">No bills match your current search criteria. Try adjusting your filters.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Reservations</p>
                      <p className="text-xl font-bold text-blue-900">{filteredBills.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Total Nights</p>
                      <p className="text-xl font-bold text-purple-900">
                        {filteredBills.reduce((sum, bill) => sum + bill.nights, 0)}
                      </p>
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
                        Rs {filteredBills.reduce((sum, bill) => sum + bill.roomTotal, 0).toLocaleString()}
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

export default AllRoomBills;







