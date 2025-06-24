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
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const term = searchTerm.toLowerCase();

    const filtered = bills.filter((bill) =>
      bill.inDate.toLowerCase().includes(term) ||
      bill.outDate.toLowerCase().includes(term) ||
      bill.nights.toString().includes(term) ||
      bill.rooms.some((room) => room.roomNo.toLowerCase().includes(term))
    );

    setFilteredBills(filtered);
    setCurrentPage(1);
    setExpandedId(null);
  }, [searchTerm, bills]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const indexOfLast = currentPage * billsPerPage;
  const indexOfFirst = indexOfLast - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[#24256D] mb-4">🏨 All Reservation Room Bills</h1>

      {/* Unified Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by In Date, Out Date, Room No, Nights"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded-md text-sm shadow-sm"
        />
      </div>

      {error && <p className="text-red-600 p-4">{error}</p>}
      {!filteredBills.length && !error && (
        <p className="text-gray-600 italic p-4">No matching results found.</p>
      )}

      {currentBills.map((bill) => (
        <div
          key={bill.reservationId}
          className="bg-white border rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#28245F]">
              Reservation #{bill.reservationId}
            </h2>
            <button
              onClick={() => toggleExpand(bill.reservationId)}
              className="px-4 py-1 text-sm bg-[#24256D] text-white rounded hover:bg-[#1c1d50]"
            >
              {expandedId === bill.reservationId ? 'Hide Rooms' : 'View Rooms'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 mb-2">
            <div><strong>In Date:</strong> {bill.inDate}</div>
            <div><strong>Out Date:</strong> {bill.outDate}</div>
            <div><strong>Nights:</strong> {bill.nights}</div>
            <div className="md:text-right font-bold text-[#28245F] col-span-2 md:col-span-1">
              Total: Rs {bill.roomTotal.toLocaleString()}
            </div>
          </div>

          {expandedId === bill.reservationId && (
            <div className="mt-4 bg-[#F9FAFB] p-4 rounded-lg border">
              <h3 className="text-md font-semibold text-[#24256D] mb-2">🛏️ Room Details</h3>
              <div className="grid grid-cols-3 text-sm font-semibold text-gray-600 border-b pb-2 mb-2">
                <span>Room No</span>
                <span>Room Type</span>
                <span className="text-right">Rate/Night</span>
              </div>
              {bill.rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 text-sm text-gray-700 py-2 border-b last:border-none"
                >
                  <span>{room.roomNo}</span>
                  <span>{room.roomType}</span>
                  <span className="text-right">Rs {room.ratePerNight.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
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

export default AllRoomBills;
