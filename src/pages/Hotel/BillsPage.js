// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL;

// const BillsPage = () => {
//   const { reservationId } = useParams();
//   const [roomBills, setRoomBills] = useState([]);
//   const [finalBill, setFinalBill] = useState(null);
//   const [additional, setAdditional] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [billState, setBillState] = useState('Not Closed');

//   const [roomChargeBill, setRoomChargeBill] = useState(null);
//   const [roomChargeExpanded, setRoomChargeExpanded] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const printRef = useRef();

//   useEffect(() => {
//     const fetchBills = async () => {
//       try {
//         const [roomRes, finalRes, roomChargeRes] = await Promise.all([
//           axios.get(`${API_URL}/reservations/${reservationId}/bills`),
//           axios.get(`${API_URL}/reservations/${reservationId}/final-bill`),
//           axios.get(`${API_URL}/reservations/${reservationId}/room-bill`)
//         ]);

//         setRoomBills(roomRes.data.roomBillsList);
//         setFinalBill(finalRes.data);
//         setRoomChargeBill(roomChargeRes.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch bills.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBills();
//   }, [reservationId]);

//   const handlePrint = () => {
//   const printWindow = window.open('', '_blank', 'width=600,height=800');
//   printWindow.document.write(`
//     <html>
//       <head>
//         <title>Print Bill</title>
//         <style>
//           body {
//             font-family: monospace;
//             font-size: 13px;
//             padding: 20px;
//             white-space: pre-wrap;
//           }
//           hr {
//             border: none;
//             border-top: 1px dashed #000;
//             margin: 10px 0;
//           }
//           p {
//             margin: 4px 0;
//           }
//         </style>
//       </head>
//       <body>
//         ${printRef.current.innerHTML}
//       </body>
//     </html>
//   `);
//   printWindow.document.close();
//   printWindow.focus();
//   printWindow.print();
//   printWindow.close();
// };


//   const handleViewItems = async (billId, type, roomIndex) => {
//     try {
//       const res = await axios.get(`${API_URL}/reservations/bills/${type}/${billId}`);
//       const updatedRoomBills = [...roomBills];
//       const bills = updatedRoomBills[roomIndex][type === 'meals' ? 'foodBills' : 'beverageBills'];
//       const updatedBills = bills.map(b =>
//         b.billId === billId
//           ? { ...b, expanded: !b.expanded, items: res.data[type === 'meals' ? 'foodBillItems' : 'beverageBillItems'] }
//           : b
//       );
//       updatedRoomBills[roomIndex][type === 'meals' ? 'foodBills' : 'beverageBills'] = updatedBills;
//       setRoomBills(updatedRoomBills);
//     } catch (err) {
//       console.error('Error loading bill items:', err);
//     }
//   };

//   if (loading) return <p className="p-4">Loading…</p>;
//   if (error) return <p className="p-4 text-red-600">{error}</p>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-3xl font-extrabold text-[#24256D] border-b pb-2">
//           🧾 Reservation #{reservationId} — Bills Summary
//         </h2>
//         <button
//           onClick={handlePrint}
//           className="bg-[#FFC10C] text-[#24256D] px-4 py-2 rounded-md font-semibold shadow hover:brightness-90"
//         >
//           🖨️ Print Summary
//         </button>
//       </div>

//       <div ref={printRef}>

//          {roomChargeBill && (
//           <div className="mb-8 bg-white border shadow rounded-xl p-6">
//             <div className="flex justify-between items-center mb-3">
//               <div className="text-sm text-gray-700">
//                 <p><strong>Reservation ID:</strong> {roomChargeBill.reservationId}</p>
//                  <p><strong>NIC : </strong> {roomChargeBill.nicPassportPf}</p>
//                 <p><strong>Name : </strong> {roomChargeBill.customerName}</p>
//                 <p><strong>In : </strong> {roomChargeBill.inDate}</p>
//                 <p><strong>Out : </strong> {roomChargeBill.outDate}</p>
//                 <p><strong>Nights : </strong> {roomChargeBill.nights}</p>
//               </div>
//               <div className="text-right font-bold text-lg text-[#28245F]">
//                 Room Total: Rs {roomChargeBill.roomTotal.toLocaleString()}
//               </div>
//             </div>
//             <button
//               onClick={() => setRoomChargeExpanded(!roomChargeExpanded)}
//               className="text-sm bg-[#24256D] text-white px-4 py-1 rounded hover:bg-[#1c1d50]"
//             >
//               {roomChargeExpanded ? 'Hide Room Charges' : 'View Room Charges'}
//             </button>

//             {roomChargeExpanded && (
//               <div className="mt-4 bg-[#F9FAFB] p-4 rounded-lg border">
//                 <h4 className="font-semibold mb-3 text-[#28245F]">🛏️ Room Details</h4>
//                 <div className="grid grid-cols-4 font-semibold text-sm text-gray-600 border-b pb-2 mb-2">
//                   <span>Room No</span>
//                   <span>Room Type</span>
//                   <span className="text-right">Rate Per Night</span>
//                   <span className="text-right">Total Room Charges</span>
//                 </div>
//                 {roomChargeBill.rooms.map((room, idx) => (
//                   <div key={idx} className="grid grid-cols-4 py-2 text-sm text-gray-700 border-b last:border-none">
//                     <span>{room.roomNo}</span>
//                     <span>{room.roomType}</span>
//                     <span className="text-right">Rs {room.ratePerNight.toLocaleString()}</span>
//                     <span className="text-right">
//                       Rs {(room.ratePerNight * roomChargeBill.nights).toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Room Bills */}
//         <div className="space-y-6">
//           {roomBills.map((room, roomIndex) => (
//             <div
//               key={roomIndex}
//               className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
//             >
//               <div className="bg-[#F5F6FA] px-6 py-4 rounded-t-xl flex justify-between items-center">
//                 <h3 className="text-xl font-semibold text-[#28245F]">
//                   Room No: <span className="text-[#444]">{room.roomNo}</span>
//                 </h3>
//                 <span className="text-sm bg-[#24256D] text-white px-3 py-1 rounded-full">
//                   Room Bill Summary
//                 </span>
//               </div>

//               <div className="px-6 py-4">
//                 {/* Food Bills */}
//                 <div className="mb-4">
//                   <h4 className="text-lg font-medium text-gray-700 mb-2">🍽️ Food Bills</h4>
//                   {room.foodBills.length > 0 ? (
//                     <div className="space-y-2">
//                       {room.foodBills.map((bill) => (
//                         <div key={bill.billId} className="bg-[#F9FAFB] p-3 rounded-md border text-sm text-gray-700">
//                           <div className="flex justify-between items-center">
//                             <span>
//                               <span className="font-semibold text-[#24256D]">#{bill.billId}</span> • {bill.mealType} • {bill.date}
//                             </span>
//                             <div className="text-right space-x-2">
//                               <span className="font-bold">Rs {bill.grandTotal.toFixed(2)}</span>
//                               <button
//                                 onClick={() => handleViewItems(bill.billId, 'meals', roomIndex)}
//                                 className="text-xs bg-[#24256D] text-white px-3 py-1 rounded hover:bg-[#1b1c50]"
//                               >
//                                 {bill.expanded ? 'Hide Items' : 'View Items'}
//                               </button>
//                             </div>
//                           </div>
//                           {bill.expanded && bill.items && (
//                             <ul className="mt-2 divide-y divide-gray-200">
//                               {bill.items.map((item) => (
//                                 <li key={item.id} className="py-2 flex justify-between">
//                                   <span>{item.foodName} — {item.portions} portion(s)</span>
//                                   <span className="font-semibold">Rs {item.total.toFixed(2)}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ) : <p className="text-sm italic text-gray-500">No food bills found.</p>}
//                 </div>

//                 {/* Beverage Bills */}
//                 <div>
//                   <h4 className="text-lg font-medium text-gray-700 mb-2">🍷 Beverage Bills</h4>
//                   {room.beverageBills.length > 0 ? (
//                     <div className="space-y-2">
//                       {room.beverageBills.map((bill) => (
//                         <div key={bill.billId} className="bg-[#F9FAFB] p-3 rounded-md border text-sm text-gray-700">
//                           <div className="flex justify-between items-center">
//                             <span>
//                               <span className="font-semibold text-[#24256D]">#{bill.billId}</span> • {bill.mealType || '—'} • {bill.date}
//                             </span>
//                             <div className="text-right space-x-2">
//                               <span className="font-bold">Rs {bill.grandTotal.toFixed(2)}</span>
//                               <button
//                                 onClick={() => handleViewItems(bill.billId, 'beverages', roomIndex)}
//                                 className="text-xs bg-[#24256D] text-white px-3 py-1 rounded hover:bg-[#1b1c50]"
//                               >
//                                 {bill.expanded ? 'Hide Items' : 'View Items'}
//                               </button>
//                             </div>
//                           </div>
//                           {bill.expanded && bill.items && (
//                             <ul className="mt-2 divide-y divide-gray-200">
//                               {bill.items.map((item) => (
//                                 <li key={item.id} className="py-2 flex justify-between">
//                                   <span>{item.beverageName} — {item.bottlesOrGlasses} glass(es)</span>
//                                   <span className="font-semibold">Rs {item.total.toFixed(2)}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ) : <p className="text-sm italic text-gray-500">No beverage bills found.</p>}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
      
//         {/* Final Bill Section */}
// {finalBill && (
//   <div className="bg-[#E3E6F6] mt-10 p-6 rounded-xl shadow-lg">
//     <h3 className="text-2xl font-bold text-[#24256D] mb-4">💰 Final Bill Summary</h3>

//     <div className="grid grid-cols-2 gap-4 text-base text-gray-700 mb-4">
//       <div><strong>Room Charges:</strong> Rs {finalBill.roomCharges.toLocaleString()}</div>
//       <div><strong>Food Total:</strong> Rs {finalBill.foodTotal.toLocaleString()}</div>
//       <div><strong>Beverage Total:</strong> Rs {finalBill.beverageTotal.toLocaleString()}</div>
//       <div><strong>Advance Paid:</strong> Rs {finalBill.advance.toLocaleString()}</div>
//     </div>

//     {/* Additional Fields */}
//     <div className="grid grid-cols-2 gap-4 mb-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">➕ Additional Charges</label>
//         <input
//           type="number"
//           min={0}
//           defaultValue={0}
//           onChange={(e) => setAdditional(+e.target.value || 0)}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">➖ Discount</label>
//         <input
//           type="number"
//           min={0}
//           defaultValue={0}
//           onChange={(e) => setDiscount(+e.target.value || 0)}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">📄 Bill State</label>
//         <select
//           value={billState}
//           onChange={(e) => setBillState(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="Not Closed">Not Closed</option>
//           <option value="Closed">Closed</option>
//         </select>
//       </div>
//     </div>

//     <div className="col-span-2 mt-4 text-lg font-bold text-[#28245F] border-t pt-2">
//       Final Total:&nbsp;
//       Rs {(
//         finalBill.finalTotal +
//         (additional || 0) -
//         (discount || 0)
//       ).toLocaleString()}
//       &nbsp;({billState})
//     </div>
//   </div>
// )}


//       </div>

//       <div className="mt-8">
//         <Link to="/reservations" className="inline-block bg-[#24256D] text-white px-4 py-2 rounded shadow hover:bg-[#1b1c50]">
//           ← Back to Reservations
//         </Link>
//       </div>


// {/* Hidden Printable Bill Format */}
// <div ref={printRef} style={{ display: 'none' }}>
//   <div style={{ fontFamily: 'monospace', fontSize: '13px', padding: '20px' }}>
//     <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>HOTEL FINAL BILL</h3>
//     <p>Reservation ID: #{roomChargeBill?.reservationId}</p>
//     <p>Customer: {roomChargeBill?.customerName}</p>
//     <p>NIC: {roomChargeBill?.nicPassportPf}</p>
//     <p>In: {roomChargeBill?.inDate}</p>
//     <p>Out: {roomChargeBill?.outDate}</p>
//     <p>Nights: {roomChargeBill?.nights}</p>
//     <hr />

//     {/* Room Details */}
//     {roomChargeBill?.rooms.map((room, i) => (
//       <div key={i}>
//         <p>Room {room.roomNo} - {room.roomType}</p>
//         <p>Rate: Rs {room.ratePerNight.toLocaleString()}</p>
//         <p>Total: Rs {(room.ratePerNight * roomChargeBill.nights).toLocaleString()}</p>
//         <hr />
//       </div>
//     ))}

//     {/* Food & Beverage Bills */}
//     {roomBills.map((room, i) => (
//       <div key={i}>
//         <p>--- Room {room.roomNo} ---</p>

//         {room.foodBills.map((bill) => (
//           <div key={bill.billId}>
//             <p>🍽 Food #{bill.billId} ({bill.date})</p>
//             {bill.items?.map((item, j) => (
//               <p key={j}>{item.foodName} x {item.portions} = Rs {item.total.toFixed(2)}</p>
//             ))}
//           </div>
//         ))}

//         {room.beverageBills.map((bill) => (
//           <div key={bill.billId}>
//             <p>🍷 Beverage #{bill.billId} ({bill.date})</p>
//             {bill.items?.map((item, j) => (
//               <p key={j}>{item.beverageName} x {item.bottlesOrGlasses} = Rs {item.total.toFixed(2)}</p>
//             ))}
//           </div>
//         ))}

//         <hr />
//       </div>
//     ))}

//     {/* Final Summary */}
//     <p>Room Charges: Rs {finalBill?.roomCharges.toLocaleString()}</p>
//     <p>Food Total: Rs {finalBill?.foodTotal.toLocaleString()}</p>
//     <p>Beverage Total: Rs {finalBill?.beverageTotal.toLocaleString()}</p>
//     <p>Advance Paid: Rs {finalBill?.advance.toLocaleString()}</p>
//     <p>Additional: Rs {additional}</p>
//     <p>Discount: Rs {discount}</p>
//     <p style={{ fontWeight: 'bold' }}>
//       FINAL TOTAL: Rs {(finalBill?.finalTotal + additional - discount).toLocaleString()} ({billState})
//     </p>
//     <p style={{ textAlign: 'center', marginTop: '20px' }}>Thank you for your stay!</p>
//   </div>
// </div>


//     </div>
//   );
// };

// export default BillsPage;


import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BillsPage = () => {
  const { reservationId } = useParams();
  const [roomBills, setRoomBills] = useState([]);
  const [finalBill, setFinalBill] = useState(null);
  const [additional, setAdditional] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [billState, setBillState] = useState('Not Closed');

  const [roomChargeBill, setRoomChargeBill] = useState(null);
  const [roomChargeExpanded, setRoomChargeExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const printRef = useRef();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const [roomRes, finalRes, roomChargeRes] = await Promise.all([
          axios.get(`${API_URL}/reservations/${reservationId}/bills`),
          axios.get(`${API_URL}/reservations/${reservationId}/final-bill`),
          axios.get(`${API_URL}/reservations/${reservationId}/room-bill`)
        ]);

        setRoomBills(roomRes.data.roomBillsList);
        setFinalBill(finalRes.data);
        setRoomChargeBill(roomChargeRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch bills.');
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [reservationId]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=600,height=800');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body {
              font-family: monospace;
              font-size: 13px;
              padding: 20px;
              white-space: pre-wrap;
            }
            hr {
              border: none;
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            p {
              margin: 4px 0;
            }
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleViewItems = async (billId, type, roomIndex) => {
    try {
      const res = await axios.get(`${API_URL}/reservations/bills/${type}/${billId}`);
      const updatedRoomBills = [...roomBills];
      const bills = updatedRoomBills[roomIndex][type === 'meals' ? 'foodBills' : 'beverageBills'];
      const updatedBills = bills.map(b =>
        b.billId === billId
          ? { ...b, expanded: !b.expanded, items: res.data[type === 'meals' ? 'foodBillItems' : 'beverageBillItems'] }
          : b
      );
      updatedRoomBills[roomIndex][type === 'meals' ? 'foodBills' : 'beverageBills'] = updatedBills;
      setRoomBills(updatedRoomBills);
    } catch (err) {
      console.error('Error loading bill items:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading bills...</span>
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
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Bills</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Bills Summary</h1>
                <p className="text-gray-600">Reservation #{reservationId}</p>
              </div>
            </div>
            
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Print Summary
            </button>
          </div>
        </div>

        {/* Room Charges Section */}
        {roomChargeBill && (
          <div className="mb-6 bg-white border rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="grid grid-cols-3 gap-8 flex-1 text-sm">
                  <div>
                    <span className="text-gray-500">Reservation ID:</span>
                    <p className="font-medium text-gray-900">{roomChargeBill.reservationId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Customer:</span>
                    <p className="font-medium text-gray-900">{roomChargeBill.customerName}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">NIC/Passport:</span>
                    <p className="font-medium text-gray-900">{roomChargeBill.nicPassportPf}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Check In:</span>
                    <p className="font-medium text-gray-900">{roomChargeBill.inDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Check Out:</span>
                    <p className="font-medium text-gray-900">{roomChargeBill.outDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Nights:</span>
                    <p className="font-medium text-gray-900">{roomChargeBill.nights}</p>
                  </div>
                </div>
                <div className="text-right ml-8">
                  <span className="text-sm text-gray-500">Room Total</span>
                  <p className="text-xl font-bold text-blue-600">Rs {roomChargeBill.roomTotal.toLocaleString()}</p>
                </div>
              </div>
              
              <button
                onClick={() => setRoomChargeExpanded(!roomChargeExpanded)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                {roomChargeExpanded ? 'Hide Room Details' : 'View Room Details'}
              </button>

              {roomChargeExpanded && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Room Details</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 text-sm font-medium text-gray-500">Room No</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-500">Room Type</th>
                          <th className="text-right py-2 text-sm font-medium text-gray-500">Rate Per Night</th>
                          <th className="text-right py-2 text-sm font-medium text-gray-500">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {roomChargeBill.rooms.map((room, idx) => (
                          <tr key={idx}>
                            <td className="py-2 text-sm text-gray-900">{room.roomNo}</td>
                            <td className="py-2 text-sm text-gray-700">{room.roomType}</td>
                            <td className="py-2 text-sm text-gray-700 text-right">Rs {room.ratePerNight.toLocaleString()}</td>
                            <td className="py-2 text-sm font-medium text-gray-900 text-right">
                              Rs {(room.ratePerNight * roomChargeBill.nights).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Room Bills */}
        <div className="space-y-6 mb-6">
          {roomBills.map((room, roomIndex) => (
            <div key={roomIndex} className="bg-white border rounded-lg shadow-sm">
              <div className="bg-gray-50 px-6 py-4 rounded-t-lg border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Room {room.roomNo}</h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Room Bills
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Food Bills */}
                <div className="mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Food Bills
                  </h4>
                  {room.foodBills.length > 0 ? (
                    <div className="space-y-3">
                      {room.foodBills.map((bill) => (
                        <div key={bill.billId} className="bg-gray-50 border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="font-medium text-blue-600">#{bill.billId}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-700">{bill.mealType}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-600">{bill.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-gray-900">Rs {bill.grandTotal.toFixed(2)}</span>
                              <button
                                onClick={() => handleViewItems(bill.billId, 'meals', roomIndex)}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                {bill.expanded ? 'Hide Items' : 'View Items'}
                              </button>
                            </div>
                          </div>
                          {bill.expanded && bill.items && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="space-y-2">
                                {bill.items.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{item.foodName} × {item.portions}</span>
                                    <span className="font-medium text-gray-900">Rs {item.total.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No food bills found.</p>
                  )}
                </div>

                {/* Beverage Bills */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Beverage Bills
                  </h4>
                  {room.beverageBills.length > 0 ? (
                    <div className="space-y-3">
                      {room.beverageBills.map((bill) => (
                        <div key={bill.billId} className="bg-gray-50 border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="font-medium text-blue-600">#{bill.billId}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-700">{bill.mealType || '—'}</span>
                              <span className="text-gray-500 mx-2">•</span>
                              <span className="text-gray-600">{bill.date}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-gray-900">Rs {bill.grandTotal.toFixed(2)}</span>
                              <button
                                onClick={() => handleViewItems(bill.billId, 'beverages', roomIndex)}
                                className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              >
                                {bill.expanded ? 'Hide Items' : 'View Items'}
                              </button>
                            </div>
                          </div>
                          {bill.expanded && bill.items && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="space-y-2">
                                {bill.items.map((item) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span className="text-gray-700">{item.beverageName} × {item.bottlesOrGlasses}</span>
                                    <span className="font-medium text-gray-900">Rs {item.total.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No beverage bills found.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Bill Section */}
        {finalBill && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
              Final Bill Summary
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border">
                <span className="text-sm text-gray-500">Room Charges</span>
                <p className="text-lg font-bold text-gray-900">Rs {finalBill.roomCharges.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <span className="text-sm text-gray-500">Food Total</span>
                <p className="text-lg font-bold text-gray-900">Rs {finalBill.foodTotal.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <span className="text-sm text-gray-500">Beverage Total</span>
                <p className="text-lg font-bold text-gray-900">Rs {finalBill.beverageTotal.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <span className="text-sm text-gray-500">Advance Paid</span>
                <p className="text-lg font-bold text-gray-900">Rs {finalBill.advance.toLocaleString()}</p>
              </div>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Charges</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  onChange={(e) => setAdditional(+e.target.value || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                <input
                  type="number"
                  min={0}
                  defaultValue={0}
                  onChange={(e) => setDiscount(+e.target.value || 0)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bill Status</label>
                <select
                  value={billState}
                  onChange={(e) => setBillState(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="Not Closed">Not Closed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Final Total:</span>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    Rs {(finalBill.finalTotal + (additional || 0) - (discount || 0)).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">({billState})</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-8">
          <Link 
            to="/reservations" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Reservations
          </Link>
        </div>

        {/* Hidden Printable Bill Format */}
        <div ref={printRef} style={{ display: 'none' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '13px', padding: '20px' }}>
            <h3 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>HOTEL FINAL BILL</h3>
            <p>Reservation ID: #{roomChargeBill?.reservationId}</p>
            <p>Customer: {roomChargeBill?.customerName}</p>
            <p>NIC: {roomChargeBill?.nicPassportPf}</p>
            <p>In: {roomChargeBill?.inDate}</p>
            <p>Out: {roomChargeBill?.outDate}</p>
            <p>Nights: {roomChargeBill?.nights}</p>
            <hr />

            {/* Room Details */}
            {roomChargeBill?.rooms.map((room, i) => (
              <div key={i}>
                <p>Room {room.roomNo} - {room.roomType}</p>
                <p>Rate: Rs {room.ratePerNight.toLocaleString()}</p>
                <p>Total: Rs {(room.ratePerNight * roomChargeBill.nights).toLocaleString()}</p>
                <hr />
              </div>
            ))}

            {/* Food & Beverage Bills */}
            {roomBills.map((room, i) => (
              <div key={i}>
                <p>--- Room {room.roomNo} ---</p>

                {room.foodBills.map((bill) => (
                  <div key={bill.billId}>
                    <p>Food #{bill.billId} ({bill.date})</p>
                    {bill.items?.map((item, j) => (
                      <p key={j}>{item.foodName} x {item.portions} = Rs {item.total.toFixed(2)}</p>
                    ))}
                  </div>
                ))}

                {room.beverageBills.map((bill) => (
                  <div key={bill.billId}>
                    <p>Beverage #{bill.billId} ({bill.date})</p>
                    {bill.items?.map((item, j) => (
                      <p key={j}>{item.beverageName} x {item.bottlesOrGlasses} = Rs {item.total.toFixed(2)}</p>
                    ))}
                  </div>
                ))}

                <hr />
              </div>
            ))}

            {/* Final Summary */}
            <p>Room Charges: Rs {finalBill?.roomCharges.toLocaleString()}</p>
            <p>Food Total: Rs {finalBill?.foodTotal.toLocaleString()}</p>
            <p>Beverage Total: Rs {finalBill?.beverageTotal.toLocaleString()}</p>
            <p>Advance Paid: Rs {finalBill?.advance.toLocaleString()}</p>
            <p>Additional: Rs {additional}</p>
            <p>Discount: Rs {discount}</p>
            <p style={{ fontWeight: 'bold' }}>
              FINAL TOTAL: Rs {(finalBill?.finalTotal + additional - discount).toLocaleString()} ({billState})
            </p>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Thank you for your stay!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillsPage;
