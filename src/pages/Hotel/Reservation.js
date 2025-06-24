


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
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-blue-500/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-yellow-400 rounded-full animate-spin animation-delay-500"></div>
              </div>
              <span className="text-gray-700 font-medium">Loading reservations...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="backdrop-blur-md bg-red-50/80 border border-red-200/50 rounded-2xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-blue-500/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-300/8 to-yellow-400/8 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl p-6 shadow-xl"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    📅 Upcoming Reservations
                  </h1>
                  <p className="text-gray-600 font-medium">Manage guest bookings and stays</p>
                </div>
              </div>
              
              <div className="relative group">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 group-focus-within:text-blue-600 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  placeholder="🔍 Search any field..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-64 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/80"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-yellow-400/0 group-focus-within:from-blue-400/5 group-focus-within:to-yellow-400/5 pointer-events-none transition-all duration-300"></div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl overflow-hidden shadow-xl"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-sm">
                {/* Table Header */}
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <tr>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center">
                          <span className="text-blue-900 font-bold text-xs">🆔</span>
                        </div>
                        ID
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-white font-semibold">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👤</span>
                        Customer
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">🪪</span>
                        NIC / Passport
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">📆</span>
                        In Date
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">📆</span>
                        Out Date
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">📅</span>
                        Days
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">👥</span>
                        Guests
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">🛏️</span>
                        Rooms
                      </div>
                    </th>
                    <th className="py-4 px-6 text-center text-white font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">⚙️</span>
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white/40 backdrop-blur-sm">
                  {currentReservations.map((r) => (
                    <tr key={r.reservationId} className="border-b border-white/30 hover:bg-white/20 transition-all duration-300 group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{r.reservationId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-800">{r.customerName}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-gray-700 font-medium">{r.nicPassportPf}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="backdrop-blur-sm bg-blue-50/60 border border-blue-200/50 rounded-lg px-3 py-2 inline-block">
                          <span className="text-blue-700 font-medium text-sm">{r.inDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="backdrop-blur-sm bg-blue-50/60 border border-blue-200/50 rounded-lg px-3 py-2 inline-block">
                          <span className="text-blue-700 font-medium text-sm">{r.outDate}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-gray-800 font-bold">{r.days}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <svg className="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 8a2 2 0 11-4 0 2 2 0 014 0zM12 8a2 2 0 11-4 0 2 2 0 014 0zM21 8a2 2 0 11-4 0 2 2 0 014 0zM13 14a5.989 5.989 0 00-4-2.286A5.989 5.989 0 005 14v4h8v-4z" />
                          </svg>
                          <span className="font-semibold text-gray-800">{r.noOfGuests}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {r.rooms?.map((room, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 bg-white/60 border border-gray-200/50 rounded-lg px-2 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm">
                              🛏️ {room.roomNo}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => navigate(`/bills/${r.reservationId}`)}
                          className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <span className="text-sm">📄</span>
                          BILLS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white/60 backdrop-blur-sm border-t border-white/30 px-6 py-4">
                <div className="flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                          : 'bg-white/60 border border-gray-200/50 text-blue-600 hover:bg-white/80'
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
            <div className="backdrop-blur-xl bg-white/80 border border-white/40 rounded-3xl p-12 text-center shadow-xl mt-8">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Reservations Found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria.' : 'No reservations have been made yet.'}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ReservationTable;

