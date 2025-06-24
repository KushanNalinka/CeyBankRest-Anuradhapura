


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = process.env.REACT_APP_API_URL;

// const ReservationTable = () => {
//   const [reservations, setReservations] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_URL}/reservations/full-details`);
//         setReservations(data);
//       } catch (err) {
//         setError('Failed to load reservations.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   if (loading) return <p className="p-4">Loading…</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="min-w-[1200px] w-full text-sm border-collapse shadow-lg rounded-md">
//         <thead className="bg-[#E3E6F6] text-[#28245F]">
//           <tr>
//             <th className="py-2 px-3 text-left">Reservation ID</th>
//             <th className="py-2 px-3 text-left">Customer</th>
//             <th className="py-2 px-3">NIC / Passport</th>
//             <th className="py-2 px-3">In Date</th>
//             <th className="py-2 px-3">Out Date</th>
//             <th className="py-2 px-3">Days</th>
//             <th className="py-2 px-3">Guests</th>
//             <th className="py-2 px-3">Total (LKR)</th>
//             <th className="py-2 px-3">Advance</th>
//             <th className="py-2 px-3">Payment</th>
//             <th className="py-2 px-3">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {reservations.map((r) => (
//             <tr key={r.reservationId} className="hover:bg-gray-50 border-b">
//               <td className="py-2 px-3 font-medium">{r.reservationId}</td>
//               <td className="py-2 px-3">{r.customerName}</td>
//               <td className="py-2 px-3">{r.nicPassportPf}</td>
//               <td className="py-2 px-3">{r.inDate}</td>
//               <td className="py-2 px-3">{r.outDate}</td>
//               <td className="py-2 px-3 text-center">{r.days}</td>
//               <td className="py-2 px-3 text-center">{r.noOfGuests}</td>
//               <td className="py-2 px-3 text-right">{r.total.toLocaleString()}</td>
//               <td className="py-2 px-3 text-right">{r.advance.toLocaleString()}</td>
//               <td className="py-2 px-3">{r.modeOfPayment}</td>
//               <td className="py-2 px-3 text-center">
//                 <button
//                   onClick={() => navigate(`/bills/${r.reservationId}`)}
//                   className="bg-[#24256D] text-white px-3 py-1 text-xs rounded-md hover:bg-[#1c1d50] shadow-md"
//                 >
//                   BILLS
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = process.env.REACT_APP_API_URL;

// const ReservationTable = () => {
//   const [reservations, setReservations] = useState([]);
//   const [filteredReservations, setFilteredReservations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const reservationsPerPage = 8;
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_URL}/reservations/full-details`);
//         setReservations(data);
//         setFilteredReservations(data);
//       } catch (err) {
//         setError('Failed to load reservations.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const filtered = reservations.filter((r) =>
//       Object.values(r).some((val) =>
//         val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setFilteredReservations(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, reservations]);

//   const indexOfLast = currentPage * reservationsPerPage;
//   const indexOfFirst = indexOfLast - reservationsPerPage;
//   const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

//   const paginate = (pageNum) => setCurrentPage(pageNum);

//   if (loading) return <p className="p-4 text-gray-600">Loading…</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="mb-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-[#24256D]">📋 Reservation List</h1>
//         <input
//           type="text"
//           placeholder="Search any field..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border border-gray-300 rounded-md shadow-sm text-sm w-64"
//         />
//       </div>

//       <div className="overflow-x-auto shadow rounded-md">
//         <table className="min-w-[1200px] w-full text-sm border-collapse">
//           <thead className="bg-[#E3E6F6] text-[#28245F]">
//             <tr>
//               <th className="py-2 px-3 text-left">Reservation ID</th>
//               <th className="py-2 px-3 text-left">Customer</th>
//               <th className="py-2 px-3">NIC / Passport</th>
//               <th className="py-2 px-3">In Date</th>
//               <th className="py-2 px-3">Out Date</th>
//               <th className="py-2 px-3">Days</th>
//               <th className="py-2 px-3">Guests</th>
//               <th className="py-2 px-3">Total (LKR)</th>
//               <th className="py-2 px-3">Advance</th>
//               <th className="py-2 px-3">Payment</th>
//               <th className="py-2 px-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentReservations.map((r) => (
//               <tr key={r.reservationId} className="hover:bg-gray-50 border-b">
//                 <td className="py-2 px-3 font-medium">{r.reservationId}</td>
//                 <td className="py-2 px-3">{r.customerName}</td>
//                 <td className="py-2 px-3">{r.nicPassportPf}</td>
//                 <td className="py-2 px-3">{r.inDate}</td>
//                 <td className="py-2 px-3">{r.outDate}</td>
//                 <td className="py-2 px-3 text-center">{r.days}</td>
//                 <td className="py-2 px-3 text-center">{r.noOfGuests}</td>
//                 <td className="py-2 px-3 text-right">{r.total.toLocaleString()}</td>
//                 <td className="py-2 px-3 text-right">{r.advance.toLocaleString()}</td>
//                 <td className="py-2 px-3">{r.modeOfPayment}</td>
//                 <td className="py-2 px-3 text-center">
//                   <button
//                     onClick={() => navigate(`/bills/${r.reservationId}`)}
//                     className="bg-[#24256D] text-white px-3 py-1 text-xs rounded-md hover:bg-[#1c1d50] shadow-md"
//                   >
//                     BILLS
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1 rounded text-sm font-medium ${
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

// export default ReservationTable;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = process.env.REACT_APP_API_URL;

// const ReservationTable = () => {
//   const [reservations, setReservations] = useState([]);
//   const [filteredReservations, setFilteredReservations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const reservationsPerPage = 8;
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const { data } = await axios.get(`${API_URL}/reservations/full-details`);

//        const today = new Date();

//       // Sort by proximity to today's date (nearest first)
//       const sorted = [...data].sort((a, b) => {
//         const aDate = new Date(a.inDate);
//         const bDate = new Date(b.inDate);
//         return Math.abs(aDate - today) - Math.abs(bDate - today);
//       });

//       setReservations(sorted);
//       setFilteredReservations(sorted);
//       } catch (err) {
//         setError('Failed to load reservations.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const filtered = reservations.filter((r) =>
//       Object.values(r).some((val) =>
//         val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//     setFilteredReservations(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, reservations]);

//   const indexOfLast = currentPage * reservationsPerPage;
//   const indexOfFirst = indexOfLast - reservationsPerPage;
//   const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

//   const paginate = (pageNum) => setCurrentPage(pageNum);

//   if (loading) return <p className="p-4 text-gray-600">Loading…</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="mb-4 flex justify-between items-center">
//         <h1 className="text-3xl font-extrabold text-[#24256D] tracking-wide">
//           📅 Upcoming Reservations
//         </h1>
//         <input
//           type="text"
//           placeholder="🔍 Search any field..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="p-2 border border-gray-300 rounded-md shadow-sm text-sm w-64"
//         />
//       </div>

//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-[1200px] w-full text-sm border-collapse">
//           <thead className="bg-[#E3E6F6] text-[#28245F]">
//             <tr>
//               <th className="py-2 px-3 text-left">🆔  ID</th>
//               <th className="py-2 px-3 text-left">👤 Customer</th>
//               <th className="py-2 px-3">🪪 NIC / Passport</th>
//               <th className="py-2 px-3">📆 In Date</th>
//               <th className="py-2 px-3">📆 Out Date</th>
//               <th className="py-2 px-3">📅 Days</th>
//               <th className="py-2 px-3">👥 Guests</th>
//               <th className="py-2 px-3">🛏️ Rooms</th>
//               <th className="py-2 px-3">⚙️ Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentReservations.map((r) => (
//               <tr key={r.reservationId} className="hover:bg-gray-50 border-b">
//                 <td className="py-2 px-3 font-medium">{r.reservationId}</td>
//                 <td className="py-2 px-3">{r.customerName}</td>
//                 <td className="py-2 px-3">{r.nicPassportPf}</td>
//                 <td className="py-2 px-3">{r.inDate}</td>
//                 <td className="py-2 px-3">{r.outDate}</td>
//                 <td className="py-2 px-3 text-center">{r.days}</td>
//                 <td className="py-2 px-3 text-center">{r.noOfGuests}</td>
//                 <td className="py-2 px-3 text-center">
//                   {r.rooms?.map(room => room.roomNo).join(', ')}
//                 </td>
//                 <td className="py-2 px-3 text-center">
//                   <button
//                     onClick={() => navigate(`/bills/${r.reservationId}`)}
//                     className="bg-[#24256D] text-white px-3 py-1 text-xs rounded-md hover:bg-[#1c1d50] shadow-md"
//                   >
//                     📄 BILLS
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => (
//             <button
//               key={i + 1}
//               onClick={() => paginate(i + 1)}
//               className={`px-3 py-1 rounded text-sm font-medium transition shadow-sm ${
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

// export default ReservationTable;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/reservations/full-details`);

        const today = new Date();

        // Sort by proximity to today's date (nearest first)
        const sorted = [...data].sort((a, b) => {
          const aDate = new Date(a.inDate);
          const bDate = new Date(b.inDate);
          return Math.abs(aDate - today) - Math.abs(bDate - today);
        });

        setReservations(sorted);
        setFilteredReservations(sorted);
      } catch (err) {
        setError('Failed to load reservations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const filtered = reservations.filter((r) =>
      Object.values(r).some((val) =>
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredReservations(filtered);
    setCurrentPage(1);
  }, [searchTerm, reservations]);

  const indexOfLast = currentPage * reservationsPerPage;
  const indexOfFirst = indexOfLast - reservationsPerPage;
  const currentReservations = filteredReservations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading reservations...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-md">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Upcoming Reservations</h1>
                  <p className="text-gray-600">Manage guest bookings and stays</p>
                </div>
              </div>
              
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="Search reservations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full">
                {/* Table Header */}
                <thead className="bg-blue-600">
                  <tr>
                    <th className="py-3 px-4 text-left text-white font-medium text-sm">ID</th>
                    <th className="py-3 px-4 text-left text-white font-medium text-sm">Customer</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">NIC / Passport</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">In Date</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Out Date</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Days</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Guests</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Rooms</th>
                    <th className="py-3 px-4 text-center text-white font-medium text-sm">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentReservations.map((r) => (
                    <tr key={r.reservationId} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                          {r.reservationId}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{r.customerName}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-gray-700">{r.nicPassportPf}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                          {r.inDate}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                          {r.outDate}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full">
                          {r.days}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 8a2 2 0 11-4 0 2 2 0 014 0zM12 8a2 2 0 11-4 0 2 2 0 014 0zM21 8a2 2 0 11-4 0 2 2 0 014 0zM13 14a5.989 5.989 0 00-4-2.286A5.989 5.989 0 005 14v4h8v-4z" />
                          </svg>
                          <span className="font-medium text-gray-900">{r.noOfGuests}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {r.rooms?.map((room, idx) => (
                            <span key={idx} className="inline-block bg-gray-100 border text-gray-700 px-2 py-1 rounded text-xs font-medium">
                              Room {room.roomNo}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => navigate(`/bills/${r.reservationId}`)}
                          className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Bills
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-gray-50 border-t px-6 py-3">
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
          </div>

          {/* Empty State */}
          {filteredReservations.length === 0 && !loading && (
            <div className="bg-white border rounded-lg p-12 text-center mt-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reservations Found</h3>
              <p className="text-gray-500">
                {searchTerm ? 'Try adjusting your search criteria.' : 'No reservations have been made yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationTable;
