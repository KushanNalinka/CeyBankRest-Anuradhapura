// import React, { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { products } from '../../Beverages';
// import CartItem from './CartItem';

// const CartTab = () => {
//   const { items, clearCart } = useCart(); // ❌ removed statusTab
//   const [serviceNumber, setServiceNumber] = useState('');

//   const totalAmount = items.reduce((total, item) => {
//     const product = products.find(p => p.id === item.productId);
//     return total + (product?.price ?? 0) * item.quantity;
//   }, 0);

//   const handleCheckout = () => {
//     const purchaseData = items.map(item => {
//       const product = products.find(p => p.id === item.productId);
//       return {
//         ...item,
//         name: product?.name ?? 'Unknown'
//       };
//     });

//     console.log("Inserting data into the database:", {
//       items: purchaseData,
//       totalAmount,
//       serviceNumber
//     });

//     clearCart();
//     setServiceNumber('');
//   };

//   return (
//     <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//       <div className='bg-[#E3E6F6] shadow-sm'>
//         <h2 className='p-5 text-[#28245F] font-black text-2xl text-center h-16'>SHOPPING CART</h2>
//       </div>
//       <div className='p-5 flex-grow overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
//         {items.map((item, key) => <CartItem key={key} data={item} />)}
//       </div>
//       <div className='bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0'>
//         <div className='p-3 text-[#4E4E4E] font-bold'>
//           <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
//         </div>
//         <div className='p-3 font-semibold'>
//           <input
//             type="text"
//             placeholder="Enter Service Number"
//             value={serviceNumber}
//             onChange={(e) => setServiceNumber(e.target.value)}
//             className='w-full p-2 mb-2 rounded-md'
//           />
//         </div>
//         <div className='grid grid-cols-2 gap-2 p-2'>
//           <button className='bg-[#24256D] text-white font-bold px-5 py-3 text-lg rounded-md shadow-md'>Pay Here</button>
//           <button className='bg-[#FFC10C] text-white font-bold px-5 py-3 text-lg rounded-md shadow-md' onClick={handleCheckout}>Check Out</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartTab;

// import React, { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { products } from '../../Beverages'; // Ensure this refers to beverage list
// import CartItem from './CartItem';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const CartTab = () => {
//   const { items, clearCart, updateItemQuantity } = useCart();
//   const [roomNumber, setRoomNumber] = useState('');
//   const [reservation, setReservation] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const { meal } = useParams();

//   const today = new Date();
//   const formattedDate = today.toISOString().split('T')[0];
//   const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   const totalAmount = items.reduce((total, item) => {
//     const product = products.find(p => p.id === item.productId);
//     return total + (product?.price ?? 0) * item.quantity;
//   }, 0);

//   const fetchReservation = async () => {
//     if (!roomNumber.trim()) return;
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:8080/api/reservations/active?roomNo=${roomNumber}&date=${formattedDate}`);
//       setReservation(response.data);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Reservation not found", error);
//       setReservation(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     const payload = {
//       roomNo: roomNumber,
//       reservationId: reservation.reservationId,
//       orderDate: formattedDate,
//       mealType: meal?.toUpperCase() || '',
//       items: items.map(item => ({
//         beverageId: item.productId,
//         bottlesOrGlasses: item.quantity
//       }))
//     };

//     try {
//       await axios.post(`http://localhost:8080/api/beverage-orders/place`, payload);
//       console.log("Beverage order placed successfully", payload);
//       alert('Beverage order placed successfully!');
//       clearCart();
//       setRoomNumber('');
//       setReservation(null);
//       setConfirmed(false);
//       setShowPopup(false);
//     } catch (err) {
//       console.error("Beverage order failed", err);
//       alert('Failed to place beverage order.');
//     }
//   };

//   const handleQuantityChange = (productId: number, newQuantity: number) => {
//     updateItemQuantity(productId, newQuantity);
//   };

//   const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       fetchReservation();
//     }
//   };

//   return (
//     <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//       <div className='bg-[#E3E6F6] shadow-sm'>
//         <h2 className='p-5 text-[#28245F] font-black text-2xl text-center h-16'>SHOPPING CART</h2>
//       </div>

//       <div className='p-5 flex-grow overflow-y-auto' style={{ maxHeight: 'calc(100vh - 300px)' }}>
//         {items.map((item, key) => <CartItem key={key} data={item} />)}
//       </div>

//       <div className='bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0'>
//         <div className='p-3 text-[#4E4E4E] font-bold'>
//           <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
//           <p className='text-sm'>Date: {formattedDate} | Time: {formattedTime}</p>
//           <p className='text-sm'>Meal Type: {meal?.toUpperCase()}</p>
//         </div>

//         <div className='p-3 font-semibold'>
//           <input
//             type="text"
//             placeholder="Enter Room Number"
//             value={roomNumber}
//             onChange={(e) => setRoomNumber(e.target.value)}
//             onKeyDown={handleEnterKey}
//             className='w-full p-2 mb-2 rounded-md'
//           />
//         </div>

//         <div className='grid grid-cols-1 p-3'>
//           <button
//             className={`${
//               confirmed ? 'bg-[#FFC10C] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
//             } text-white font-bold px-5 py-3 text-lg rounded-md shadow-md`}
//             onClick={handlePlaceOrder}
//             disabled={!confirmed}
//           >
//             Place Beverage Order
//           </button>
//         </div>
//       </div>

//       {/* Popup Modal */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg">
//             <h3 className="text-xl font-bold text-[#28245F] mb-4">Confirm Beverage Order</h3>

//             {reservation && (
//               <div className="mb-4 text-sm">
//                 <p><strong>Meal Type:</strong> {meal?.toUpperCase()}</p>
//                 <p><strong>Date:</strong> {formattedDate}</p>
//                 <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
//                 <p><strong>Name:</strong> {reservation.name}</p>
//                 <p><strong>NIC:</strong> {reservation.nicPassportPf}</p>
//               </div>
//             )}

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Order Items</h4>
//               {items.map(item => {
//                 const product = products.find(p => p.id === item.productId);
//                 return (
//                   <div key={item.productId} className="flex justify-between items-center mb-2">
//                     <span>{product?.name}</span>
//                     <input
//                       type="number"
//                       min={1}
//                       value={item.quantity}
//                       onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//                       className="w-16 p-1 border rounded text-center"
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={confirmed}
//                   onChange={() => setConfirmed(!confirmed)}
//                 />
//                 <span className='text-sm font-semibold'>Confirm all details</span>
//               </label>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="text-sm text-gray-500 underline"
//               >
//                 Cancel
//               </button>
//             </div>

//             <button
//               className="mt-4 w-full bg-[#24256D] text-white font-bold py-2 rounded-md shadow-md"
//               onClick={() => setShowPopup(false)}
//             >
//               Confirm Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartTab;

// import  { useState } from "react";
// import { useCart } from "../../context/CartContext";
// import { products } from "../../Beverages"; // beverage list
// import CartItem from "./CartItem";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const CartTab = () => {
//   const { items, clearCart, updateItemQuantity } = useCart();
//   const [roomNumber, setRoomNumber] = useState("");
//   const [reservation, setReservation] = useState(null);
//   // const [ setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const { meal } = useParams();

//   const today = new Date();
//   const formattedDate = today.toISOString().split("T")[0];
//   const formattedTime = today.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const totalAmount = items.reduce((total, item) => {
//     const product = products.find((p) => p.id === item.productId);
//     return total + (product?.price ?? 0) * item.quantity;
//   }, 0);

//   const fetchReservation = async () => {
//     if (!roomNumber.trim()) return;
//     try {
//       // setLoading(true);
//       const response = await axios.get(
//         `http://localhost:8080/api/reservations/active?roomNo=${roomNumber}&date=${formattedDate}`
//       );
//       setReservation(response.data);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Reservation not found", error);
//       setReservation(null);
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   const handlePlaceOrder = async () => {
//     const payload = {
//       roomNo: roomNumber,
//       reservationId: reservation?.reservationId,
//       orderDate: formattedDate,
//       mealType: meal?.toUpperCase() || "",
//       items: items.map((item) => ({
//         beverageId: item.productId,
//         bottlesOrGlasses: item.quantity,
//       })),
//     };

//     try {
//       await axios.post(
//         `http://localhost:8080/api/beverage-orders/place`,
//         payload
//       );
//       console.log("Beverage order placed successfully", payload);
//       alert("Beverage order placed successfully!");
//       clearCart();
//       setRoomNumber("");
//       setReservation(null);
//       setConfirmed(false);
//       setShowPopup(false);
//     } catch (err) {
//       console.error("Beverage order failed", err);
//       alert("Failed to place beverage order.");
//     }
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     updateItemQuantity(productId, newQuantity);
//   };

//   const handleEnterKey = (e) => {
//     if (e.key === "Enter") {
//       fetchReservation();
//     }
//   };

//   return (
//     <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//       {/* Header */}
//       <div className="bg-[#E3E6F6] shadow-sm">
//         <h2 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">
//           SHOPPING CART
//         </h2>
//       </div>

//       {/* Cart items */}
//       <div
//         className="p-5 flex-grow overflow-y-auto"
//         style={{ maxHeight: "calc(100vh - 300px)" }}
//       >
//         {items.map((item, key) => (
//           <CartItem key={key} data={item} />
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0">
//         <div className="p-3 text-[#4E4E4E] font-bold">
//           <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
//           <p className="text-sm">
//             Date: {formattedDate} | Time: {formattedTime}
//           </p>
//           <p className="text-sm">Meal Type: {meal?.toUpperCase()}</p>
//         </div>

//         {/* Room number input */}
//         <div className="p-3 font-semibold">
//           <input
//             type="text"
//             placeholder="Enter Room Number"
//             value={roomNumber}
//             onChange={(e) => setRoomNumber(e.target.value)}
//             onKeyDown={handleEnterKey}
//             className="w-full p-2 mb-2 rounded-md"
//           />
//         </div>

//         {/* Place order button */}
//         <div className="grid grid-cols-1 p-3">
//           <button
//             className={`${
//               confirmed
//                 ? "bg-[#FFC10C] cursor-pointer"
//                 : "bg-gray-400 cursor-not-allowed"
//             } text-white font-bold px-5 py-3 text-lg rounded-md shadow-md`}
//             onClick={handlePlaceOrder}
//             disabled={!confirmed}
//           >
//             Place Beverage Order
//           </button>
//         </div>
//       </div>

//       {/* Popup modal */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg">
//             <h3 className="text-xl font-bold text-[#28245F] mb-4">
//               Confirm Beverage Order
//             </h3>

//             {reservation && (
//               <div className="mb-4 text-sm">
//                 <p>
//                   <strong>Meal Type:</strong> {meal?.toUpperCase()}
//                 </p>
//                 <p>
//                   <strong>Date:</strong> {formattedDate}
//                 </p>
//                 <p>
//                   <strong>Reservation ID:</strong> {reservation.reservationId}
//                 </p>
//                 <p>
//                   <strong>Name:</strong> {reservation.name}
//                 </p>
//                 <p>
//                   <strong>NIC:</strong> {reservation.nicPassportPf}
//                 </p>
//               </div>
//             )}

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Order Items</h4>
//               {items.map((item) => {
//                 const product = products.find((p) => p.id === item.productId);
//                 return (
//                   <div
//                     key={item.productId}
//                     className="flex justify-between items-center mb-2"
//                   >
//                     <span>{product?.name}</span>
//                     <input
//                       type="number"
//                       min={1}
//                       value={item.quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(
//                           item.productId,
//                           parseInt(e.target.value, 10)
//                         )
//                       }
//                       className="w-16 p-1 border rounded text-center"
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={confirmed}
//                   onChange={() => setConfirmed(!confirmed)}
//                 />
//                 <span className="text-sm font-semibold">Confirm all details</span>
//               </label>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="text-sm text-gray-500 underline"
//               >
//                 Cancel
//               </button>
//             </div>

//             <button
//               className="mt-4 w-full bg-[#24256D] text-white font-bold py-2 rounded-md shadow-md"
//               onClick={() => setShowPopup(false)}
//             >
//               Confirm Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartTab;

// import React, { useState } from "react";
// import { useCart } from "../../context/CartContext";
// import { products } from "../../Beverages"; // beverage list
// import CartItem from "./CartItem";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const CartTab = () => {
//   const API_URL = process.env.REACT_APP_API_URL;  // build-time constant
//   const { items, clearCart, changeQuantity } = useCart();
//   const [roomNumber, setRoomNumber] = useState("");
//   const [reservation, setReservation] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const { meal } = useParams();

//   const today = new Date();
//   const formattedDate = today.toISOString().split("T")[0];
//   const formattedTime = today.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });

//   const totalAmount = items.reduce((total, item) => {
//     const product = products.find((p) => p.id === item.productId);
//     return total + (product?.price ?? 0) * item.quantity;
//   }, 0);

//   const fetchReservation = async () => {
//     if (!roomNumber.trim()) return;
//     try {
//       const response = await axios.get(
//         `${API_URL}/reservations/active?roomNo=${roomNumber}&date=${formattedDate}`
//       );
//       setReservation(response.data);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Reservation not found", error);
//       setReservation(null);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!reservation) return;

//     const payload = {
//       roomNo: roomNumber,
//       reservationId: reservation.reservationId,
//       orderDate: formattedDate,
//       mealType: meal?.toUpperCase() || "",
//       items: items.map((item) => ({
//         beverageId: item.productId,
//         bottlesOrGlasses: item.quantity,
//       })),
//     };

//     try {
//       await axios.post(`${API_URL}/beverage-orders/place`, payload);
//       alert("Beverage order placed successfully!");
//       clearCart();
//       setRoomNumber("");
//       setReservation(null);
//       setConfirmed(false);
//       setShowPopup(false);
//     } catch (err) {
//       console.error("Beverage order failed", err);
//       alert("Failed to place beverage order.");
//     }
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     changeQuantity(productId, newQuantity);
//   };

//   const handleEnterKey = (e) => {
//     if (e.key === "Enter") {
//       fetchReservation();
//     }
//   };

//   return (
//     <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//       {/* Header */}
//       <div className="bg-[#E3E6F6] shadow-sm">
//         <h2 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">
//           BEVERAGE CART
//         </h2>
//       </div>

//       {/* Cart items */}
//       <div className="p-5 flex-grow overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
//         {items.map((item, key) => (
//           <CartItem key={key} data={item} />
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0">
//         <div className="p-3 text-[#4E4E4E] font-bold">
//           <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
//           <p className="text-sm">Date: {formattedDate} | Time: {formattedTime}</p>
//           <p className="text-sm">Meal Type: {meal?.toUpperCase()}</p>
//         </div>

//         <div className="p-3 font-semibold">
//           <input
//             type="text"
//             placeholder="Enter Room Number"
//             value={roomNumber}
//             onChange={(e) => setRoomNumber(e.target.value)}
//             onKeyDown={handleEnterKey}
//             className="w-full p-2 mb-2 rounded-md"
//           />
//         </div>

//         <div className="grid grid-cols-1 p-3">
//           <button
//             className={`${
//               confirmed ? "bg-[#FFC10C] cursor-pointer" : "bg-gray-400 cursor-not-allowed"
//             } text-white font-bold px-5 py-3 text-lg rounded-md shadow-md`}
//             onClick={handlePlaceOrder}
//             disabled={!confirmed}
//           >
//             Place Beverage Order
//           </button>
//         </div>
//       </div>

//       {/* Popup modal */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg">
//             <h3 className="text-xl font-bold text-[#28245F] mb-4">
//               Confirm Beverage Order
//             </h3>

//             {reservation && (
//               <div className="mb-4 text-sm">
//                 <p><strong>Meal Type:</strong> {meal?.toUpperCase()}</p>
//                 <p><strong>Date:</strong> {formattedDate}</p>
//                 <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
//                 <p><strong>Name:</strong> {reservation.name}</p>
//                 <p><strong>NIC:</strong> {reservation.nicPassportPf}</p>
//               </div>
//             )}

//             <div className="mb-4">
//               <h4 className="font-semibold mb-2">Order Items</h4>
//               {items.map((item) => {
//                 const product = products.find((p) => p.id === item.productId);
//                 return (
//                   <div key={item.productId} className="flex justify-between items-center mb-2">
//                     <span>{product?.name}</span>
//                     <input
//                       type="number"
//                       min={1}
//                       value={item.quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(item.productId, parseInt(e.target.value, 10))
//                       }
//                       className="w-16 p-1 border rounded text-center"
//                     />
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-between items-center mt-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={confirmed}
//                   onChange={() => setConfirmed(!confirmed)}
//                 />
//                 <span className="text-sm font-semibold">Confirm all details</span>
//               </label>
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="text-sm text-gray-500 underline"
//               >
//                 Cancel
//               </button>
//             </div>

//             <button
//               className="mt-4 w-full bg-[#24256D] text-white font-bold py-2 rounded-md shadow-md"
//               onClick={() => setShowPopup(false)}
//             >
//               Confirm Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartTab;


// import React, { useState } from 'react';
// import { useCart } from '../../context/CartContext';
// import { products } from '../../Beverages';
// import CartItem from './CartItem';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const CartTab = () => {
//   const API_URL = process.env.REACT_APP_API_URL;          // build-time constant
//   const { items, clearCart, changeQuantity } = useCart();

//   // ─────────────────────────────────────
//   // EXTENDED STATE
//   // ─────────────────────────────────────
//   const [roomNumber, setRoomNumber] = useState('');
//   const [reservations, setReservations] = useState([]);   // list from API
//   const [reservation, setReservation] = useState(null);   // chosen one
//   const [showPopup, setShowPopup] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);

//   // NEW: message state for success / error notices
//   const [msg, setMsg] = useState('');
//   const [msgType, setMsgType] = useState('success');      // 'success' | 'error'

//   const { meal } = useParams();

//   const today = new Date();
//   const formattedDate = today.toISOString().split('T')[0];
//   const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   const totalAmount = items.reduce((t, item) => {
//     const product = products.find((p) => p.id === item.productId);
//     return t + (product?.price ?? 0) * item.quantity;
//   }, 0);

//   // helper to show message + auto-dismiss
//   const showMessage = (text, type = 'success') => {
//     setMsg(text);
//     setMsgType(type);
//     setTimeout(() => setMsg(''), 3000);
//   };

//   // ─────────────────────────────────────
//   // FETCH reservations for room + date
//   // ─────────────────────────────────────
//   const fetchReservation = async () => {
//     if (!roomNumber.trim()) return;
//     try {
//       const res = await axios.get(
//         `${API_URL}/reservations/active?roomNo=${roomNumber}&date=${formattedDate}`
//       );
//       const list = Array.isArray(res.data) ? res.data : [res.data];
//       if (!list.length) {
//         showMessage('No active reservation found for this room.', 'error');
//         return;
//       }
//       setReservations(list);
//       setReservation(list[0] || null);
//       setShowPopup(true);
//       setMsg('');
//     } catch (err) {
//       console.error('Reservation(s) not found', err);
//       showMessage('Invalid room number or no reservation today.', 'error');
//       setReservations([]);
//       setReservation(null);
//       setShowPopup(false);
//     }
//   };

//   const handlePlaceOrder = async () => {
//     if (!reservation) return;
//     const payload = {
//       roomNo: roomNumber,
//       reservationId: reservation.reservationId,
//       orderDate: formattedDate,
//       mealType: meal?.toUpperCase() || '',
//       items: items.map((i) => ({  beverageId: i.productId,
//         bottlesOrGlasses: i.quantity, })),
//     };
//     try {
//       await axios.post(`${API_URL}/beverage-orders/place`, payload);
//       showMessage('Beverage Order placed successfully!');
//       clearCart();
//       setRoomNumber('');
//       setReservations([]);
//       setReservation(null);
//       setConfirmed(false);
//       setShowPopup(false);
//     } catch (err) {
//       console.error('Beverage Order failed', err);
//       showMessage('Failed to place order.', 'error');
//     }
//   };

//   const handleQuantityChange = (pid, q) => changeQuantity(pid, q);
//   const handleEnterKey = (e) => e.key === 'Enter' && fetchReservation();

//   return (
//     <>
//       {/* floating success / error message */}
//       {msg && (
//         <div
//           className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold ${
//             msgType === 'error' ? 'bg-red-600' : 'bg-green-600'
//           }`}
//         >
//           {msg}
//         </div>
//       )}

//       <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
//         {/* ─────────── Header ─────────── */}
//         <div className="bg-[#E3E6F6] shadow-sm">
//           <h2 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">SHOPPING CART</h2>
//         </div>

//         {/* ─────────── Items list ─────────── */}
//         <div className="p-5 flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
//           {items.map((item) => (
//             <CartItem key={item.productId} data={item} />
//           ))}
//         </div>

//         {/* ─────────── Footer ─────────── */}
//         <div className="bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0">
//           <div className="p-3 text-[#4E4E4E] font-bold">
//             <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
//             <p className="text-sm">Date: {formattedDate} | Time: {formattedTime}</p>
//             <p className="text-sm">Meal Type: {meal?.toUpperCase()}</p>
//           </div>
//           <div className="p-3 font-semibold">
//             <input
//               type="text"
//               placeholder="Enter Room Number"
//               value={roomNumber}
//               onChange={(e) => setRoomNumber(e.target.value)}
//               onKeyDown={handleEnterKey}
//               className="w-full p-2 mb-2 rounded-md"
//             />
//           </div>
//         </div>

//         {/* ─────────── Confirmation popup ─────────── */}
//         {showPopup && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg relative">
//               {/* Large room number */}
//               <h2 className="text-3xl font-extrabold text-center mb-2 text-[#24256D]">
//                 Room {roomNumber}
//               </h2>

//               {/* X mark to close */}
//               <button
//                 onClick={() => setShowPopup(false)}
//                 className="absolute top-4 right-4 text-2xl text-gray-500"
//                 aria-label="Close"
//               >
//                 &times;
//               </button>

//               <h3 className="text-xl font-bold text-[#28245F] mb-4 mt-2">Confirm Order</h3>

//               {/* Dropdowns */}
//               {reservations.length > 0 && (
//                 <div className="mb-4">
//                   <div className="mb-3">
//                     <label className="block text-sm font-semibold mb-1">Name</label>
//                     <select
//                       className="w-full border rounded p-2"
//                       value={reservation?.reservationId ?? ''}
//                       onChange={(e) => {
//                         const id = parseInt(e.target.value, 10);
//                         setReservation(reservations.find((r) => r.reservationId === id) || null);
//                       }}
//                     >
//                       {reservations.map((r) => (
//                         <option key={r.reservationId} value={r.reservationId}>
//                           {r.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold mb-1">NIC / Passport</label>
//                     <select
//                       className="w-full border rounded p-2"
//                       value={reservation?.reservationId ?? ''}
//                       onChange={(e) => {
//                         const id = parseInt(e.target.value, 10);
//                         setReservation(reservations.find((r) => r.reservationId === id) || null);
//                       }}
//                     >
//                       {reservations.map((r) => (
//                         <option key={r.reservationId} value={r.reservationId}>
//                           {r.nicPassportPf}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {/* Selected reservation details */}
//               {reservation && (
//                 <div className="mb-4 text-sm">
//                   <p>
//                     <strong>Meal Type:</strong> {meal?.toUpperCase()}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {formattedDate}
//                   </p>
//                   <p>
//                     <strong>Reservation ID:</strong> {reservation.reservationId}
//                   </p>
//                   <p>
//                     <strong>Name:</strong> {reservation.name}
//                   </p>
//                   <p>
//                     <strong>NIC:</strong> {reservation.nicPassportPf}
//                   </p>
//                 </div>
//               )}

//               {/* Items + quantity control */}
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2">Order Items</h4>
//                 {items.map((item) => {
//                   const product = products.find((p) => p.id === item.productId);
//                   return (
//                     <div key={item.productId} className="flex justify-between items-center mb-2">
//                       <span>{product?.name}</span>
//                       <input
//                         type="number"
//                         min={1}
//                         value={item.quantity}
//                         onChange={(e) =>
//                           handleQuantityChange(item.productId, parseInt(e.target.value, 10))
//                         }
//                         className="w-16 p-1 border rounded text-center"
//                       />
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Confirm-details checkbox */}
//               <div className="flex items-center space-x-2 mb-4">
//                 <input
//                   type="checkbox"
//                   checked={confirmed}
//                   onChange={() => setConfirmed(!confirmed)}
//                 />
//                 <span className="text-sm font-semibold">Confirm all details</span>
//               </div>

//               {/* Add-order button */}
//               <button
//                 className={`w-full py-2 rounded-md shadow-md text-white font-bold ${
//                   confirmed ? 'bg-[#24256D]' : 'bg-gray-400 cursor-not-allowed'
//                 }`}
//                 disabled={!confirmed}
//                 onClick={() => confirmed && handlePlaceOrder()}
//               >
//                 Add this order to Room {roomNumber}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartTab;


import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { products } from '../../Beverages';
import CartItem from './CartItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CartTab = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { items, clearCart, changeQuantity } = useCart();
  const { meal } = useParams();

  const [roomNumber, setRoomNumber] = useState('');
  const [reservations, setReservations] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const totalAmount = items.reduce((t, item) => {
    const product = products.find((p) => p.id === item.productId);
    return t + (product?.price ?? 0) * item.quantity;
  }, 0);

  const showMessage = (text, type = 'success') => {
    setMsg(text);
    setMsgType(type);
    setTimeout(() => setMsg(''), 3000);
  };

  const fetchReservation = async () => {
    if (!roomNumber.trim()) return;
    try {
      const res = await axios.get(
        `${API_URL}/reservations/active?roomNo=${roomNumber}&date=${formattedDate}`
      );
      const list = Array.isArray(res.data) ? res.data : [res.data];
      if (!list.length) {
        showMessage('No active reservation found for this room.', 'error');
        return;
      }
      setReservations(list);
      setReservation(list[0] || null);
      setShowPopup(true);
      setMsg('');
    } catch (err) {
      console.error('Reservation(s) not found', err);
      showMessage('Invalid room number or no reservation today.', 'error');
      setReservations([]);
      setReservation(null);
      setShowPopup(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!reservation) return;
    const payload = {
      roomNo: roomNumber,
      reservationId: reservation.reservationId,
      orderDate: formattedDate,
      mealType: meal?.toUpperCase() || '',
      items: items.map((i) => ({ beverageId: i.productId, bottlesOrGlasses: i.quantity })),
    };
    try {
      await axios.post(`${API_URL}/beverage-orders/place`, payload);
      showMessage('Beverage Order placed successfully!');
      clearCart();
      setRoomNumber('');
      setReservations([]);
      setReservation(null);
      setConfirmed(false);
      setShowPopup(false);
    } catch (err) {
      console.error('Beverage Order failed', err);
      showMessage('Failed to place order.', 'error');
    }
  };

  const handleQuantityChange = (pid, q) => changeQuantity(pid, q);
  const handleEnterKey = (e) => e.key === 'Enter' && fetchReservation();

  return (
    <>
      {msg && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold ${
            msgType === 'error' ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {msg}
        </div>
      )}

      <div className="fixed top-0 right-0 bg-white shadow-2xl w-96 h-full flex flex-col z-40">
        <div className="bg-[#E3E6F6] shadow-sm">
          <h2 className="p-5 text-[#28245F] font-black text-2xl text-center h-16">SHOPPING CART</h2>
        </div>

        <div className="p-5 flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          {items.map((item) => (
            <CartItem key={item.productId} data={item} />
          ))}
        </div>

        <div className="bg-[#E3E6F6] shadow-lg absolute bottom-0 left-0 right-0">
          <div className="p-3 text-[#4E4E4E] font-bold">
            <h3>Total Amount: Rs {totalAmount.toFixed(2)}</h3>
            <p className="text-sm">Date: {formattedDate} | Time: {formattedTime}</p>
            <p className="text-sm">Meal Type: {meal?.toUpperCase()}</p>
          </div>
          <div className="p-3 font-semibold">
            <input
              type="text"
              placeholder="Enter Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              onKeyDown={handleEnterKey}
              className="w-full p-2 mb-2 rounded-md"
            />
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 max-w-lg p-6 rounded-xl shadow-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-extrabold text-center mb-2 text-[#24256D]">
              Room {roomNumber}
            </h2>

            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-[#28245F] mb-4 mt-2">Confirm Order</h3>

            {reservations.length > 0 && (
              <div className="mb-4">
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1">Name</label>
                  <select
                    className="w-full border rounded p-2"
                    value={reservation?.reservationId ?? ''}
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      setReservation(reservations.find((r) => r.reservationId === id) || null);
                    }}
                  >
                    {reservations.map((r) => (
                      <option key={r.reservationId} value={r.reservationId}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">NIC / Passport</label>
                  <select
                    className="w-full border rounded p-2"
                    value={reservation?.reservationId ?? ''}
                    onChange={(e) => {
                      const id = parseInt(e.target.value, 10);
                      setReservation(reservations.find((r) => r.reservationId === id) || null);
                    }}
                  >
                    {reservations.map((r) => (
                      <option key={r.reservationId} value={r.reservationId}>
                        {r.nicPassportPf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {reservation && (
              <div className="mb-4 text-sm">
                <p><strong>Meal Type:</strong> {meal?.toUpperCase()}</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Reservation ID:</strong> {reservation.reservationId}</p>
                <p><strong>Name:</strong> {reservation.name}</p>
                <p><strong>NIC:</strong> {reservation.nicPassportPf}</p>
              </div>
            )}

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Order Items</h4>
              {items.map((item) => {
                const product = products.find((p) => p.id === item.productId);
                return (
                  <div key={item.productId} className="flex justify-between items-center mb-2">
                    <span>{product?.name}</span>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId, parseInt(e.target.value, 10))
                      }
                      className="w-16 p-1 border rounded text-center"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={() => setConfirmed(!confirmed)}
              />
              <span className="text-sm font-semibold">Confirm all details</span>
            </div>

            <button
              className={`w-full py-2 rounded-md shadow-md text-white font-bold ${
                confirmed ? 'bg-[#24256D]' : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!confirmed}
              onClick={handlePlaceOrder}
            >
              Add this order to Room {roomNumber}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartTab;
