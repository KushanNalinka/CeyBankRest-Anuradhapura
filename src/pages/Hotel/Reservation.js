


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

  if (loading) return <p className="p-4 text-gray-600">Loading…</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-[#24256D] tracking-wide">
          📅 Upcoming Reservations
        </h1>
        <input
          type="text"
          placeholder="🔍 Search any field..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md shadow-sm text-sm w-64"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-[1200px] w-full text-sm border-collapse">
          <thead className="bg-[#E3E6F6] text-[#28245F]">
            <tr>
              <th className="py-2 px-3 text-left">🆔 Reservation ID</th>
              <th className="py-2 px-3 text-left">👤 Customer</th>
              <th className="py-2 px-3">🪪 NIC / Passport</th>
              <th className="py-2 px-3">📆 In Date</th>
              <th className="py-2 px-3">📆 Out Date</th>
              <th className="py-2 px-3">📅 Days</th>
              <th className="py-2 px-3">👥 Guests</th>
              {/* <th className="py-2 px-3">💰 Total (LKR)</th>
              <th className="py-2 px-3">💸 Advance</th>
              <th className="py-2 px-3">💳 Payment</th> */}
              <th className="py-2 px-3">⚙️ Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentReservations.map((r) => (
              <tr key={r.reservationId} className="hover:bg-gray-50 border-b">
                <td className="py-2 px-3 font-medium">{r.reservationId}</td>
                <td className="py-2 px-3">{r.customerName}</td>
                <td className="py-2 px-3">{r.nicPassportPf}</td>
                <td className="py-2 px-3">{r.inDate}</td>
                <td className="py-2 px-3">{r.outDate}</td>
                <td className="py-2 px-3 text-center">{r.days}</td>
                <td className="py-2 px-3 text-center">{r.noOfGuests}</td>
                {/* <td className="py-2 px-3 text-right">{r.total.toLocaleString()}</td>
                <td className="py-2 px-3 text-right">{r.advance.toLocaleString()}</td>
                <td className="py-2 px-3">{r.modeOfPayment}</td> */}
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => navigate(`/bills/${r.reservationId}`)}
                    className="bg-[#24256D] text-white px-3 py-1 text-xs rounded-md hover:bg-[#1c1d50] shadow-md"
                  >
                    📄 BILLS
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 rounded text-sm font-medium transition shadow-sm ${
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

export default ReservationTable;
