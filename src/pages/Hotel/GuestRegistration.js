

// import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import { addDays, differenceInCalendarDays, formatISO } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
// import { usePopup } from "../../context/PopupContext";
// import RoomChart from "./RoomChart";
// import GuestRegistrationNextForm from "./GuestRegistrationNextForm";

// // Constants
// const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"];
// const API_URL = process.env.REACT_APP_API_URL;  // build-time constant
// //const PAGE_SIZE = 10;

// const GuestRegistration = () => {
//   const today = new Date();

//   // Guest info states
//   const [guestType, setGuestType] = useState(GUEST_TYPES[0]);
//   const [pif, setPif] = useState(""); // PIF / NIC / Passport
//   const [roomTypeId, setRoomTypeId] = useState(null); // selected room type
//   const [roomTypes, setRoomTypes] = useState([]); // dropdown room types

//   // Date pickers
//   const [inDate, setInDate] = useState(today);
//   const [outDate, setOutDate] = useState(addDays(today, 1));

//   // Room & pagination data
//   const [rooms, setRooms] = useState([]);
//   const [statusMap] = useState({});
//   const [page, setPage] = useState(0);
//   const [hasNext, setHasNext] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const { isPopupOpen, openPopup, closePopup } = usePopup();

//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [step, setStep] = useState(1);

//   const nights = Math.max(1, differenceInCalendarDays(outDate, inDate) + 1);

//   // Fetch room types from API on first load
//   useEffect(() => {
//     const loadRoomTypes = async () => {
//       try {
//         const res = await fetch(`${API_URL}/room-types`);
//         const data = await res.json();
//         setRoomTypes(data);
//         if (data.length > 0) setRoomTypeId(data[0].roomTypeId);
//       } catch (e) {
//         console.error("Error fetching room types", e);
//       }
//     };
//     loadRoomTypes();
//   }, []);

//   // Fetch rooms when popup opens or dates / type / page changes
//   useEffect(() => {
//     if (!isPopupOpen || roomTypeId === null) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const startISO = formatISO(inDate, { representation: "date" });
//         const res = await fetch(
//           `${API_URL}/rooms/available-on-date-by-type?date=${startISO}&roomTypeId=${roomTypeId}`
//         );
//         const apiRooms = await res.json();
//         const convertedRooms = apiRooms.map((room, idx) => ({
//           id: idx + 1,
//           name: `Room ${room.roomNo}`,
//         }));
//         setRooms(convertedRooms);
//         setHasNext(false);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isPopupOpen, page, inDate, outDate, roomTypeId]);

//   const nextPage = () => hasNext && setPage(prev => prev + 1);
//   const prevPage = () => page > 0 && setPage(prev => prev - 1);

//   const toggleRoomSelection = roomName => {
//     setSelectedRooms(prev =>
//       prev.includes(roomName) ? prev.filter(r => r !== roomName) : [...prev, roomName]
//     );
//   };

//   return (
//     <>
//       {/* STEP 1 */}
//       {step === 1 && (
//         <div className="w-full max-w-6xl space-y-6 bg-white shadow-xl rounded-2xl p-8">
//           <h1 className="text-2xl font-semibold mb-4">Guest Registration</h1>

//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Guest Type */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Guest Type</label>
//               <select
//                 value={guestType}
//                 onChange={e => setGuestType(e.target.value)}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               >
//                 {GUEST_TYPES.map(t => (
//                   <option key={t} value={t}>
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* PIF / NIC / Passport */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">PIF / NIC / Passport</label>
//               <input
//                 type="text"
//                 value={pif}
//                 onChange={e => setPif(e.target.value)}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               />
//             </div>

//             {/* Room Type Dropdown */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Room Type</label>
//               <select
//                 value={roomTypeId ?? ""}
//                 onChange={e => setRoomTypeId(Number(e.target.value))}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               >
//                 {roomTypes.map(t => (
//                   <option key={t.roomTypeId} value={t.roomTypeId}>
//                     {t.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Dates */}
//           <div className="grid md:grid-cols-2 gap-6 mt-6">
//             {/* Arrival */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Arrival (Check-in)</label>
//               <DatePicker
//                 selected={inDate}
//                 onChange={date => date && setInDate(date)}
//                 selectsStart
//                 startDate={inDate}
//                 endDate={outDate}
//                 className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
//                 dateFormat="dd/MM/yyyy"
//               />
//             </div>

//             {/* Departure */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Departure (Check-out)</label>
//               <DatePicker
//                 selected={outDate}
//                 onChange={date => date && setOutDate(date)}
//                 selectsEnd
//                 startDate={inDate}
//                 endDate={outDate}
//                 minDate={inDate}
//                 className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
//                 dateFormat="dd/MM/yyyy"
//               />
//             </div>
//           </div>

//           {/* Select Room */}
//           <button
//             onClick={() => {
//               setPage(0);
//               openPopup();
//             }}
//             className="px-6 py-2 mt-6 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Select Room
//           </button>

//           {/* Selected Rooms */}
//           {selectedRooms.length > 0 && (
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold mb-2">Selected Rooms:</h2>
//               <div className="flex flex-wrap gap-2">
//                 {selectedRooms.map(room => (
//                   <div
//                     key={room}
//                     className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full"
//                   >
//                     <span>{room}</span>
//                     <button
//                       onClick={() => toggleRoomSelection(room)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <p className="mt-2 text-gray-600 text-sm">
//                 Selected for {nights} {nights === 1 ? "night" : "nights"}
//               </p>

//               <button
//                 onClick={() => setStep(2)}
//                 className="mt-6 px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {step === 2 && (
//         <GuestRegistrationNextForm
//           inDate={inDate}
//           outDate={outDate}
//           selectedRooms={selectedRooms}
//           nicPassportPf={pif}
//           durationOfStay={`${nights} ${nights === 1 ? "day" : "days"}`}
//           onBack={() => setStep(1)}
//         />
//       )}

//       {/* POPUP */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-lg w-[90%] max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
//             {/* Header */}
//             <div className="px-6 py-4 border-b flex justify-between items-center">
//               <h2 className="text-lg font-semibold">
//                 Room chart (
//                 {formatISO(inDate, { representation: "date" })} ➔{" "}
//                 {formatISO(outDate, { representation: "date" })})
//               </h2>
//               <button
//                 onClick={closePopup}
//                 className="text-gray-500 hover:text-gray-700 text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Body */}
//             <div className="flex-1 overflow-x-auto overflow-y-auto">
//               {loading ? (
//                 <div className="h-full flex items-center justify-center">
//                   <span className="animate-pulse text-gray-500">Loading…</span>
//                 </div>
//               ) : (
//                 <RoomChart
//                   start={inDate}
//                   end={outDate}
//                   rooms={rooms}
//                   statusMap={statusMap}
//                   selectedRooms={selectedRooms}
//                   onToggleRoom={toggleRoomSelection}
//                 />
//               )}
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-4 border-t flex items-center justify-between">
//               <button
//                 onClick={prevPage}
//                 disabled={page === 0}
//                 className={`px-4 py-1 rounded ${
//                   page === 0
//                     ? "bg-gray-200 text-gray-400"
//                     : "bg-indigo-600 text-white hover:bg-indigo-700"
//                 }`}
//               >
//                 Previous
//               </button>

//               <button
//                 onClick={closePopup}
//                 className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//               >
//                 Confirm Selection
//               </button>

//               <button
//                 onClick={nextPage}
//                 disabled={!hasNext}
//                 className={`px-4 py-1 rounded ${
//                   !hasNext
//                     ? "bg-gray-200 text-gray-400"
//                     : "bg-indigo-600 text-white hover:bg-indigo-700"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GuestRegistration;




// import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import { addDays, differenceInCalendarDays, formatISO } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
// import { usePopup } from "../../context/PopupContext";
// import RoomChart from "./RoomChart";
// import GuestRegistrationNextForm from "./GuestRegistrationNextForm";

// // Constants
// const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"];
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// const GuestRegistration = () => {
//   const today = new Date();

//   // Guest info states
//   const [guestType, setGuestType] = useState(GUEST_TYPES[0]);
//   const [pif, setPif] = useState(""); // PIF / NIC / Passport
//   const [roomTypeId, setRoomTypeId] = useState(null); // selected room type
//   const [roomTypes, setRoomTypes] = useState([]); // dropdown room types

//   // Date pickers
//   const [inDate, setInDate] = useState(today);
//   const [outDate, setOutDate] = useState(addDays(today, 1));

//   // Room Chart Data
//   const [roomData, setRoomData] = useState([]);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [dateRange, setDateRange] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedRoomType, setSelectedRoomType] = useState('');

//   const { isPopupOpen, openPopup, closePopup } = usePopup();

//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [step, setStep] = useState(1);

//   const nights = Math.max(1, differenceInCalendarDays(outDate, inDate));

//   // Fetch room types from API on first load
//   useEffect(() => {
//     const loadRoomTypes = async () => {
//       try {
//         const res = await fetch(`${API_URL}/room-types`);
//         const data = await res.json();
//         setRoomTypes(data);
//         if (data.length > 0) {
//           setRoomTypeId(data[0].roomTypeId);
//           setSelectedRoomType(data[0].name);
//         }
//       } catch (e) {
//         console.error("Error fetching room types", e);
//         setError("Failed to fetch room types. Please try again later.");
//       }
//     };
//     loadRoomTypes();
//   }, []);

//   // Build date range
//   const buildDateRange = (start, end) => {
//     const range = [];
//     let current = new Date(start);
//     const endDate = new Date(end);
    
//     // Create a range that includes start date up to but not including end date
//     while (current < endDate) {
//       range.push(new Date(current).toISOString().split('T')[0]);
//       current = new Date(current.setDate(current.getDate() + 1));
//     }
//     return range;
//   };

//   // Fetch rooms when popup opens
//   useEffect(() => {
//     if (!isPopupOpen) return;
    
//     fetchRoomData();
//   }, [isPopupOpen]);

//   // Fetch room availability data
//   const fetchRoomData = async () => {
//     if (!inDate || !outDate) {
//       return;
//     }
    
//     if (inDate >= outDate) {
//       setError("Check-out date must be after check-in date.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
    
//     const inDateStr = formatISO(inDate, { representation: 'date' });
//     const outDateStr = formatISO(outDate, { representation: 'date' });
    
//     try {
//       // Fetch data from the backend API
//       const response = await fetch(`${API_URL}/rooms/available-on-range?inDate=${inDateStr}&outDate=${outDateStr}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setRoomData(data);
      
//       // This will create a range from check-in date to the day before check-out date
//       const range = buildDateRange(inDate, outDate);
//       setDateRange(range);
      
//       // Fetch additional details for each room
//       await fetchRoomDetails(data);
//     } catch (err) {
//       console.error('Error fetching room availability:', err);
//       setError('Failed to fetch room data. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch room details for each room
//   const fetchRoomDetails = async (rooms) => {
//     setIsLoadingDetails(true);
//     const details = {};
    
//     try {
//       // Create an array of promises for fetching room details
//       const promises = rooms.map(room => 
//         fetch(`${API_URL}/rooms/${room.roomNo}`)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//           })
//           .then(data => {
//             details[room.roomNo] = data;
//           })
//           .catch(err => {
//             console.error(`Error fetching details for room ${room.roomNo}:`, err);
//             // Set a placeholder for failed requests
//             details[room.roomNo] = { 
//               roomNo: room.roomNo, 
//               roomType: { name: 'Unknown', currentRate: 'N/A' },
//               status: 'unknown'
//             };
//           })
//       );
      
//       // Wait for all promises to complete
//       await Promise.all(promises);
//       setRoomDetails(details);
      
//       // Filter rooms based on room type if selected
//       filterRooms(rooms, details, selectedRoomType);
//     } catch (err) {
//       console.error('Error fetching room details:', err);
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   // Filter rooms based on selected room type
//   const filterRooms = (rooms, details, roomType) => {
//     if (!roomType) {
//       return rooms;
//     }
    
//     return rooms.filter(room => {
//       return details[room.roomNo] && 
//              details[room.roomNo].roomType && 
//              details[room.roomNo].roomType.name === roomType;
//     });
//   };

//   // Handle room type selection change
//   const handleRoomTypeChange = (e) => {
//     const typeId = Number(e.target.value);
//     setRoomTypeId(typeId);
    
//     // Find the corresponding room type name
//     const roomType = roomTypes.find(type => type.roomTypeId === typeId);
//     setSelectedRoomType(roomType ? roomType.name : '');
//   };

//   // Toggle room selection
//   const toggleRoomSelection = (roomNo) => {
//     setSelectedRooms(prev =>
//       prev.includes(roomNo) ? prev.filter(r => r !== roomNo) : [...prev, roomNo]
//     );
//   };

//   return (
//     <>
//       {/* STEP 1 */}
//       {step === 1 && (
//         <div className="w-full max-w-6xl space-y-6 bg-white shadow-xl rounded-2xl p-8">
//           <h1 className="text-2xl font-semibold mb-4">Guest Registration</h1>

//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Guest Type */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Guest Type</label>
//               <select
//                 value={guestType}
//                 onChange={e => setGuestType(e.target.value)}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               >
//                 {GUEST_TYPES.map(t => (
//                   <option key={t} value={t}>
//                     {t.charAt(0).toUpperCase() + t.slice(1)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* PIF / NIC / Passport */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">PIF / NIC / Passport</label>
//               <input
//                 type="text"
//                 value={pif}
//                 onChange={e => setPif(e.target.value)}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               />
//             </div>

//             {/* Room Type Dropdown */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Room Type</label>
//               <select
//                 value={roomTypeId ?? ""}
//                 onChange={handleRoomTypeChange}
//                 className="border rounded-lg p-2 outline-none focus:ring focus:ring-indigo-300"
//               >
//                 {roomTypes.map(t => (
//                   <option key={t.roomTypeId} value={t.roomTypeId}>
//                     {t.name} ({t.currentRate})
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Dates */}
//           <div className="grid md:grid-cols-2 gap-6 mt-6">
//             {/* Arrival */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Arrival (Check-in)</label>
//               <DatePicker
//                 selected={inDate}
//                 onChange={date => date && setInDate(date)}
//                 selectsStart
//                 startDate={inDate}
//                 endDate={outDate}
//                 className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
//                 dateFormat="dd/MM/yyyy"
//               />
//             </div>

//             {/* Departure */}
//             <div className="flex flex-col">
//               <label className="mb-1 font-medium">Departure (Check-out)</label>
//               <DatePicker
//                 selected={outDate}
//                 onChange={date => date && setOutDate(date)}
//                 selectsEnd
//                 startDate={inDate}
//                 endDate={outDate}
//                 minDate={inDate}
//                 className="border rounded-lg p-2 w-full outline-none focus:ring focus:ring-indigo-300"
//                 dateFormat="dd/MM/yyyy"
//               />
//             </div>
//           </div>

//           {/* Select Room */}
//           <button
//             onClick={() => {
//               openPopup();
//               fetchRoomData();
//             }}
//             className="px-6 py-2 mt-6 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//           >
//             Select Room
//           </button>

//           {/* Selected Rooms */}
//           {selectedRooms.length > 0 && (
//             <div className="mt-6">
//               <h2 className="text-lg font-semibold mb-2">Selected Rooms:</h2>
//               <div className="flex flex-wrap gap-2">
//                 {selectedRooms.map(roomNo => (
//                   <div
//                     key={roomNo}
//                     className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full"
//                   >
//                     <span>Room {roomNo}</span>
//                     <button
//                       onClick={() => toggleRoomSelection(roomNo)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <p className="mt-2 text-gray-600 text-sm">
//                 Selected for {nights} {nights === 1 ? "night" : "nights"}
//               </p>

//               <button
//                 onClick={() => setStep(2)}
//                 className="mt-6 px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {step === 2 && (
//         <GuestRegistrationNextForm
//           inDate={inDate}
//           outDate={outDate}
//           selectedRooms={selectedRooms.map(roomNo => `Room ${roomNo}`)}
//           nicPassportPf={pif}
//           durationOfStay={`${nights} ${nights === 1 ? "day" : "days"}`}
//           onBack={() => setStep(1)}
//         />
//       )}

//       {/* POPUP */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//           <div className="bg-white rounded-lg w-[90%] max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
//             {/* Header */}
//             <div className="px-6 py-4 border-b flex justify-between items-center">
//               <h2 className="text-lg font-semibold">
//                 Room Availability (
//                 {formatISO(inDate, { representation: "date" })} ➔{" "}
//                 {formatISO(outDate, { representation: "date" })})
//               </h2>
//               <button
//                 onClick={closePopup}
//                 className="text-gray-500 hover:text-gray-700 text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Filter Section */}
//             <div className="px-6 py-3 border-b">
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm font-medium">Room Type:</span>
//                   <select
//                     value={selectedRoomType}
//                     onChange={e => setSelectedRoomType(e.target.value)}
//                     className="border rounded p-1 text-sm"
//                   >
//                     <option value="">All Room Types</option>
//                     {roomTypes.map(type => (
//                       <option key={type.roomTypeId} value={type.name}>
//                         {type.name} ({type.currentRate})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
                
//                 <div className="ml-auto flex items-center gap-2">
//                   <div className="flex items-center gap-1">
//                     <div className="w-4 h-4 bg-green-200 rounded"></div>
//                     <span className="text-xs">Available</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <div className="w-4 h-4 bg-red-200 rounded"></div>
//                     <span className="text-xs">Booked</span>
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <div className="w-4 h-4 bg-green-300 rounded"></div>
//                     <span className="text-xs">Selected</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="flex-1 overflow-x-auto overflow-y-auto">
//               {isLoading ? (
//                 <div className="h-full flex items-center justify-center">
//                   <span className="animate-pulse text-gray-500">Loading…</span>
//                 </div>
//               ) : error ? (
//                 <div className="bg-red-100 text-red-700 p-4 m-4 rounded">
//                   {error}
//                 </div>
//               ) : (
//                 <RoomChart
//                   dateRange={dateRange}
//                   roomData={filterRooms(roomData, roomDetails, selectedRoomType)}
//                   roomDetails={roomDetails}
//                   isLoadingDetails={isLoadingDetails}
//                   selectedRooms={selectedRooms}
//                   onToggleRoom={toggleRoomSelection}
//                 />
//               )}
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-4 border-t flex items-center justify-end">
//               <button
//                 onClick={closePopup}
//                 className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
//               >
//                 Confirm Selection ({selectedRooms.length} rooms)
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GuestRegistration;




// import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
// import { addDays, differenceInCalendarDays, formatISO } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
// import { usePopup } from "../../context/PopupContext";
// import RoomChart from "./RoomChart";
// import GuestRegistrationNextForm from "./GuestRegistrationNextForm";
// import { 
//   Calendar, Clock, User, CreditCard, Bed, HotelIcon, 
//   ChevronRight, X, Check, Filter
// } from "lucide-react";

// // Constants
// const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"];
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

// const GuestRegistration = () => {
//   const today = new Date();

//   // Guest info states
//   const [guestType, setGuestType] = useState(GUEST_TYPES[0]);
//   const [pif, setPif] = useState(""); // PIF / NIC / Passport
//   const [roomTypeId, setRoomTypeId] = useState(null); // selected room type
//   const [roomTypes, setRoomTypes] = useState([]); // dropdown room types

//   // Date pickers
//   const [inDate, setInDate] = useState(today);
//   const [outDate, setOutDate] = useState(addDays(today, 1));

//   // Room Chart Data
//   const [roomData, setRoomData] = useState([]);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [dateRange, setDateRange] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedRoomType, setSelectedRoomType] = useState('');

//   const { isPopupOpen, openPopup, closePopup } = usePopup();

//   const [selectedRooms, setSelectedRooms] = useState([]);
//   const [step, setStep] = useState(1);

//   const nights = Math.max(1, differenceInCalendarDays(outDate, inDate));

//   // Fetch room types from API on first load
//   useEffect(() => {
//     const loadRoomTypes = async () => {
//       try {
//         const res = await fetch(`${API_URL}/room-types`);
//         const data = await res.json();
//         setRoomTypes(data);
//         if (data.length > 0) {
//           setRoomTypeId(data[0].roomTypeId);
//           setSelectedRoomType(data[0].name);
//         }
//       } catch (e) {
//         console.error("Error fetching room types", e);
//         setError("Failed to fetch room types. Please try again later.");
//       }
//     };
//     loadRoomTypes();
//   }, []);

//   // Build date range
//   const buildDateRange = (start, end) => {
//     const range = [];
//     let current = new Date(start);
//     const endDate = new Date(end);
    
//     // Create a range that includes start date up to but not including end date
//     while (current < endDate) {
//       range.push(new Date(current).toISOString().split('T')[0]);
//       current = new Date(current.setDate(current.getDate() + 1));
//     }
//     return range;
//   };

//   // Fetch rooms when popup opens
//   useEffect(() => {
//     if (!isPopupOpen) return;
    
//     fetchRoomData();
//   }, [isPopupOpen]);

//   // Fetch room availability data
//   const fetchRoomData = async () => {
//     if (!inDate || !outDate) {
//       return;
//     }
    
//     if (inDate >= outDate) {
//       setError("Check-out date must be after check-in date.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
    
//     const inDateStr = formatISO(inDate, { representation: 'date' });
//     const outDateStr = formatISO(outDate, { representation: 'date' });
    
//     try {
//       // Fetch data from the backend API
//       const response = await fetch(`${API_URL}/rooms/available-on-range?inDate=${inDateStr}&outDate=${outDateStr}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setRoomData(data);
      
//       // This will create a range from check-in date to the day before check-out date
//       const range = buildDateRange(inDate, outDate);
//       setDateRange(range);
      
//       // Fetch additional details for each room
//       await fetchRoomDetails(data);
//     } catch (err) {
//       console.error('Error fetching room availability:', err);
//       setError('Failed to fetch room data. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch room details for each room
//   const fetchRoomDetails = async (rooms) => {
//     setIsLoadingDetails(true);
//     const details = {};
    
//     try {
//       // Create an array of promises for fetching room details
//       const promises = rooms.map(room => 
//         fetch(`${API_URL}/rooms/${room.roomNo}`)
//           .then(response => {
//             if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//           })
//           .then(data => {
//             details[room.roomNo] = data;
//           })
//           .catch(err => {
//             console.error(`Error fetching details for room ${room.roomNo}:`, err);
//             // Set a placeholder for failed requests
//             details[room.roomNo] = { 
//               roomNo: room.roomNo, 
//               roomType: { name: 'Unknown', currentRate: 'N/A' },
//               status: 'unknown'
//             };
//           })
//       );
      
//       // Wait for all promises to complete
//       await Promise.all(promises);
//       setRoomDetails(details);
      
//       // Filter rooms based on room type if selected
//       filterRooms(rooms, details, selectedRoomType);
//     } catch (err) {
//       console.error('Error fetching room details:', err);
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   // Filter rooms based on selected room type
//   const filterRooms = (rooms, details, roomType) => {
//     if (!roomType) {
//       return rooms;
//     }
    
//     return rooms.filter(room => {
//       return details[room.roomNo] && 
//              details[room.roomNo].roomType && 
//              details[room.roomNo].roomType.name === roomType;
//     });
//   };

//   // Handle room type selection change
//   const handleRoomTypeChange = (e) => {
//     const typeId = Number(e.target.value);
//     setRoomTypeId(typeId);
    
//     // Find the corresponding room type name
//     const roomType = roomTypes.find(type => type.roomTypeId === typeId);
//     setSelectedRoomType(roomType ? roomType.name : '');
//   };

//   // Toggle room selection
//   const toggleRoomSelection = (roomNo) => {
//     setSelectedRooms(prev =>
//       prev.includes(roomNo) ? prev.filter(r => r !== roomNo) : [...prev, roomNo]
//     );
//   };

//   const DatePickerInput = ({ icon, ...props }) => (
//     <div className="relative">
//       <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//         {icon}
//       </span>
//       <DatePicker
//         {...props}
//         className="pl-10 w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//       />
//     </div>
//   );

//   return (
//     <>
//       {/* STEP 1 */}
//       {step === 1 && (
//         <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-6">
//             <h1 className="text-2xl font-bold flex items-center gap-3">
//               <HotelIcon className="h-6 w-6" />
//               Guest Registration
//             </h1>
//             <p className="text-blue-100 mt-1">Complete the form below to register a new guest</p>
//           </div>

//           {/* Form Body */}
//           <div className="p-8">
//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Left Column */}
//               <div className="space-y-6">
//                 <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-100 pb-2">Guest Information</h2>
                
//                 {/* Guest Type */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     <div className="flex items-center gap-2 mb-1">
//                       <User className="h-4 w-4 text-blue-500" />
//                       Guest Type
//                     </div>
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={guestType}
//                       onChange={e => setGuestType(e.target.value)}
//                       className="block w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
//                     >
//                       {GUEST_TYPES.map(t => (
//                         <option key={t} value={t}>
//                           {t.charAt(0).toUpperCase() + t.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <ChevronRight className="h-4 w-4 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* PIF / NIC / Passport */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     <div className="flex items-center gap-2 mb-1">
//                       <CreditCard className="h-4 w-4 text-blue-500" /> 
//                       PIF / NIC / Passport
//                     </div>
//                   </label>
//                   <input
//                     type="text"
//                     value={pif}
//                     onChange={e => setPif(e.target.value)}
//                     placeholder="Enter ID number"
//                     className="block w-full h-12 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                   />
//                 </div>

//                 {/* Room Type Dropdown */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">
//                     <div className="flex items-center gap-2 mb-1">
//                       <Bed className="h-4 w-4 text-blue-500" />
//                       Room Type
//                     </div>
//                   </label>
//                   <div className="relative">
//                     <select
//                       value={roomTypeId ?? ""}
//                       onChange={handleRoomTypeChange}
//                       className="block w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
//                     >
//                       {roomTypes.map(t => (
//                         <option key={t.roomTypeId} value={t.roomTypeId}>
//                           {t.name} ({t.currentRate})
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                       <ChevronRight className="h-4 w-4 text-gray-400" />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-6">
//                 <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-100 pb-2">Stay Details</h2>
                
//                 {/* Date Pickers */}
//                 <div className="space-y-6">
//                   {/* Arrival */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       <div className="flex items-center gap-2 mb-1">
//                         <Calendar className="h-4 w-4 text-blue-500" />
//                         Arrival (Check-in)
//                       </div>
//                     </label>
//                     <DatePickerInput
//                       icon={<Calendar className="h-4 w-4" />}
//                       selected={inDate}
//                       onChange={date => date && setInDate(date)}
//                       selectsStart
//                       startDate={inDate}
//                       endDate={outDate}
//                       dateFormat="dd/MM/yyyy"
//                     />
//                   </div>

//                   {/* Departure */}
//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-700">
//                       <div className="flex items-center gap-2 mb-1">
//                         <Clock className="h-4 w-4 text-blue-500" />
//                         Departure (Check-out)
//                       </div>
//                     </label>
//                     <DatePickerInput
//                       icon={<Clock className="h-4 w-4" />}
//                       selected={outDate}
//                       onChange={date => date && setOutDate(date)}
//                       selectsEnd
//                       startDate={inDate}
//                       endDate={outDate}
//                       minDate={inDate}
//                       dateFormat="dd/MM/yyyy"
//                     />
//                   </div>
//                 </div>

//                 {/* Duration Display */}
//                 {nights > 0 && (
//                   <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
//                     <p className="text-sm text-blue-700 flex items-center gap-2">
//                       <Clock className="h-4 w-4" />
//                       Duration: <span className="font-semibold">{nights} {nights === 1 ? "night" : "nights"}</span>
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Select Room Button */}
//             <div className="mt-8">
//               <button
//                 onClick={() => {
//                   openPopup();
//                   fetchRoomData();
//                 }}
//                 className="flex items-center justify-center gap-2 w-full md:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transform hover:-translate-y-0.5 transition-all"
//               >
//                 <Bed className="h-5 w-5" />
//                 Select Room
//               </button>
//             </div>

//             {/* Selected Rooms Display */}
//             {selectedRooms.length > 0 && (
//               <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
//                   <Check className="h-5 w-5 text-green-500" />
//                   Selected Rooms
//                 </h2>
                
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {selectedRooms.map(roomNo => (
//                     <div
//                       key={roomNo}
//                       className="flex items-center gap-2 bg-white border border-green-200 text-green-800 px-4 py-2 rounded-lg shadow-sm"
//                     >
//                       <Bed className="h-4 w-4 text-green-500" />
//                       <span className="font-medium">Room {roomNo}</span>
//                       <button
//                         onClick={() => toggleRoomSelection(roomNo)}
//                         className="ml-2 rounded-full bg-red-50 p-1 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <p className="text-gray-600">
//                     <span className="font-medium text-gray-800">{selectedRooms.length}</span> rooms selected for {nights} {nights === 1 ? "night" : "nights"}
//                   </p>

//                   <button
//                     onClick={() => setStep(2)}
//                     className="flex items-center gap-2 h-12 px-6 rounded-xl bg-green-600 text-white font-medium shadow-lg shadow-green-100 hover:bg-green-700 transition-colors"
//                   >
//                     Continue to Guest Details
//                     <ChevronRight className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <GuestRegistrationNextForm
//           inDate={inDate}
//           outDate={outDate}
//           selectedRooms={selectedRooms.map(roomNo => `Room ${roomNo}`)}
//           nicPassportPf={pif}
//           durationOfStay={`${nights} ${nights === 1 ? "day" : "days"}`}
//           onBack={() => setStep(1)}
//         />
//       )}

//       {/* POPUP */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <div className="bg-white rounded-2xl w-[95%] max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col animate-scale-in">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex justify-between items-center">
//               <h2 className="text-lg font-semibold flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />
//                 Room Availability 
//                 <span className="bg-blue-500/30 rounded-lg px-3 py-1 text-sm ml-2">
//                   {formatISO(inDate, { representation: "date" })} → {formatISO(outDate, { representation: "date" })}
//                 </span>
//               </h2>
//               <button
//                 onClick={closePopup}
//                 className="rounded-full bg-blue-500/30 p-2 hover:bg-blue-500/50 transition-colors"
//               >
//                 <X className="h-4 w-4" />
//               </button>
//             </div>

//             {/* Filter Section */}
//             <div className="bg-gray-50 px-6 py-4 border-b">
//               <div className="flex flex-wrap items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <Filter className="h-4 w-4 text-gray-500" />
//                   <span className="text-sm font-medium text-gray-700">Filter by:</span>
//                 </div>
//                 <div className="relative">
//                   <select
//                     value={selectedRoomType}
//                     onChange={e => setSelectedRoomType(e.target.value)}
//                     className="h-10 pl-3 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
//                   >
//                     <option value="">All Room Types</option>
//                     {roomTypes.map(type => (
//                       <option key={type.roomTypeId} value={type.name}>
//                         {type.name} ({type.currentRate})
//                       </option>
//                     ))}
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                     <ChevronRight className="h-4 w-4 text-gray-400" />
//                   </div>
//                 </div>
                
//                 <div className="ml-auto flex flex-wrap items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-green-200 rounded"></div>
//                     <span className="text-xs text-gray-600">Available</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-red-200 rounded"></div>
//                     <span className="text-xs text-gray-600">Booked</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 bg-green-400 rounded"></div>
//                     <span className="text-xs text-gray-600">Selected</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Body */}
//             <div className="flex-1 overflow-x-auto overflow-y-auto">
//               {isLoading ? (
//                 <div className="h-64 flex items-center justify-center">
//                   <div className="flex flex-col items-center gap-3">
//                     <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//                     <span className="text-gray-500">Loading room availability...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="bg-red-50 text-red-700 p-6 m-4 rounded-xl border border-red-100 flex items-center gap-3">
//                   <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
//                     <X className="h-5 w-5 text-red-500" />
//                   </div>
//                   <div>
//                     <h3 className="font-medium">Error</h3>
//                     <p className="text-sm text-red-600">{error}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <RoomChart
//                   dateRange={dateRange}
//                   roomData={filterRooms(roomData, roomDetails, selectedRoomType)}
//                   roomDetails={roomDetails}
//                   isLoadingDetails={isLoadingDetails}
//                   selectedRooms={selectedRooms}
//                   onToggleRoom={toggleRoomSelection}
//                 />
//               )}
//             </div>

//             {/* Footer */}
//             <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
//               <div className="text-sm text-gray-600">
//                 <span className="font-medium text-gray-800">{selectedRooms.length}</span> rooms selected
//               </div>
//               <button
//                 onClick={closePopup}
//                 className="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium shadow hover:shadow-md transition-shadow"
//               >
//                 <Check className="h-5 w-5" />
//                 Confirm Selection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default GuestRegistration;

import { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { addDays, differenceInCalendarDays, formatISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { usePopup } from "../../context/PopupContext";
import RoomChart from "./RoomChart";
import GuestRegistrationNextForm from "./GuestRegistrationNextForm";
import { 
  Calendar, Clock, User, CreditCard, Bed, HotelIcon, 
  ChevronRight, X, Check, Filter
} from "lucide-react";

// Constants
const GUEST_TYPES = ["staff", "nonstaff", "pensioners", "clergy", "vip", "foreigners", "others"];
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const GuestRegistration = () => {
  const today = new Date();

  // Guest info states
  const [guestType, setGuestType] = useState(GUEST_TYPES[0]);
  const [pif, setPif] = useState(""); // PIF / NIC / Passport
  const [roomTypeId, setRoomTypeId] = useState(null); // selected room type
  const [roomTypes, setRoomTypes] = useState([]); // dropdown room types

  // Date pickers
  const [inDate, setInDate] = useState(today);
  const [outDate, setOutDate] = useState(addDays(today, 1));

  // Room Chart Data
  const [roomData, setRoomData] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [dateRange, setDateRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState('');

  const { isPopupOpen, openPopup, closePopup } = usePopup();

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [step, setStep] = useState(1);

  const nights = Math.max(1, differenceInCalendarDays(outDate, inDate));

  // Fetch room types from API on first load
  useEffect(() => {
    const loadRoomTypes = async () => {
      try {
        const res = await fetch(`${API_URL}/room-types`);
        const data = await res.json();
        setRoomTypes(data);
        if (data.length > 0) {
          setRoomTypeId(data[0].roomTypeId);
          setSelectedRoomType(data[0].name);
        }
      } catch (e) {
        console.error("Error fetching room types", e);
        setError("Failed to fetch room types. Please try again later.");
      }
    };
    loadRoomTypes();
  }, []);

  // Build date range - wrapped in useCallback
  const buildDateRange = useCallback((start, end) => {
    const range = [];
    let current = new Date(start);
    const endDate = new Date(end);
    
    // Create a range that includes start date up to but not including end date
    while (current < endDate) {
      range.push(new Date(current).toISOString().split('T')[0]);
      current = new Date(current.setDate(current.getDate() + 1));
    }
    return range;
  }, []);

  // Fetch room details for each room
  const fetchRoomDetails = async (rooms) => {
    setIsLoadingDetails(true);
    const details = {};
    
    try {
      // Create an array of promises for fetching room details
      const promises = rooms.map(room => 
        fetch(`${API_URL}/rooms/${room.roomNo}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            details[room.roomNo] = data;
          })
          .catch(err => {
            console.error(`Error fetching details for room ${room.roomNo}:`, err);
            // Set a placeholder for failed requests
            details[room.roomNo] = { 
              roomNo: room.roomNo, 
              roomType: { name: 'Unknown', currentRate: 'N/A' },
              status: 'unknown'
            };
          })
      );
      
      // Wait for all promises to complete
      await Promise.all(promises);
      setRoomDetails(details);
      
      // Filter rooms based on room type if selected
      filterRooms(rooms, details, selectedRoomType);
    } catch (err) {
      console.error('Error fetching room details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Filter rooms based on selected room type
  const filterRooms = (rooms, details, roomType) => {
    if (!roomType) {
      return rooms;
    }
    
    return rooms.filter(room => {
      return details[room.roomNo] && 
             details[room.roomNo].roomType && 
             details[room.roomNo].roomType.name === roomType;
    });
  };

  // Fetch room details for each room - wrapped in useCallback
  const fetchRoomDetails = useCallback(async (rooms) => {
    setIsLoadingDetails(true);
    const details = {};
    
    try {
      // Create an array of promises for fetching room details
      const promises = rooms.map(room => 
        fetch(`${API_URL}/rooms/${room.roomNo}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            details[room.roomNo] = data;
          })
          .catch(err => {
            console.error(`Error fetching details for room ${room.roomNo}:`, err);
            // Set a placeholder for failed requests
            details[room.roomNo] = { 
              roomNo: room.roomNo, 
              roomType: { name: 'Unknown', currentRate: 'N/A' },
              status: 'unknown'
            };
          })
      );
      
      // Wait for all promises to complete
      await Promise.all(promises);
      setRoomDetails(details);
      
      // Filter rooms based on room type if selected
      filterRooms(rooms, details, selectedRoomType);
    } catch (err) {
      console.error('Error fetching room details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  }, [selectedRoomType]);

  // Fetch room availability data - wrapped in useCallback
  const fetchRoomData = useCallback(async () => {
    if (!inDate || !outDate) {
      return;
    }
    
    if (inDate >= outDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const inDateStr = formatISO(inDate, { representation: 'date' });
    const outDateStr = formatISO(outDate, { representation: 'date' });
    
    try {
      // Fetch data from the backend API
      const response = await fetch(`${API_URL}/rooms/available-on-range?inDate=${inDateStr}&outDate=${outDateStr}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setRoomData(data);
      
      // This will create a range from check-in date to the day before check-out date
      const range = buildDateRange(inDate, outDate);
      setDateRange(range);
      
      // Fetch additional details for each room
      await fetchRoomDetails(data);
    } catch (err) {
      console.error('Error fetching room availability:', err);
      setError('Failed to fetch room data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [inDate, outDate, fetchRoomDetails]); // Added fetchRoomDetails as a dependency

  // Fetch rooms when popup opens
  useEffect(() => {
    if (!isPopupOpen) return;
    
    fetchRoomData();
  }, [isPopupOpen, fetchRoomData]);

  // Handle room type selection change
  const handleRoomTypeChange = (e) => {
    const typeId = Number(e.target.value);
    setRoomTypeId(typeId);
    
    // Find the corresponding room type name
    const roomType = roomTypes.find(type => type.roomTypeId === typeId);
    setSelectedRoomType(roomType ? roomType.name : '');
  };

  // Toggle room selection
  const toggleRoomSelection = (roomNo) => {
    setSelectedRooms(prev =>
      prev.includes(roomNo) ? prev.filter(r => r !== roomNo) : [...prev, roomNo]
    );
  };

  const DatePickerInput = ({ icon, ...props }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <DatePicker
        {...props}
        className="pl-10 w-full h-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
      />
    </div>
  );

  return (
    <>
      {/* STEP 1 */}
      {step === 1 && (
        <div className="w-full max-w-6xl bg-white shadow-xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-6">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <HotelIcon className="h-6 w-6" />
              Guest Registration
            </h1>
            <p className="text-blue-100 mt-1">Complete the form below to register a new guest</p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-100 pb-2">Guest Information</h2>
                
                {/* Guest Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-blue-500" />
                      Guest Type
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      value={guestType}
                      onChange={e => setGuestType(e.target.value)}
                      className="block w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                    >
                      {GUEST_TYPES.map(t => (
                        <option key={t} value={t}>
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* PIF / NIC / Passport */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-4 w-4 text-blue-500" /> 
                      PIF / NIC / Passport
                    </div>
                  </label>
                  <input
                    type="text"
                    value={pif}
                    onChange={e => setPif(e.target.value)}
                    placeholder="Enter ID number"
                    className="block w-full h-12 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Room Type Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <Bed className="h-4 w-4 text-blue-500" />
                      Room Type
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      value={roomTypeId ?? ""}
                      onChange={handleRoomTypeChange}
                      className="block w-full h-12 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                    >
                      {roomTypes.map(t => (
                        <option key={t.roomTypeId} value={t.roomTypeId}>
                          {t.name} ({t.currentRate})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-100 pb-2">Stay Details</h2>
                
                {/* Date Pickers */}
                <div className="space-y-6">
                  {/* Arrival */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        Arrival (Check-in)
                      </div>
                    </label>
                    <DatePickerInput
                      icon={<Calendar className="h-4 w-4" />}
                      selected={inDate}
                      onChange={date => date && setInDate(date)}
                      selectsStart
                      startDate={inDate}
                      endDate={outDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>

                  {/* Departure */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        Departure (Check-out)
                      </div>
                    </label>
                    <DatePickerInput
                      icon={<Clock className="h-4 w-4" />}
                      selected={outDate}
                      onChange={date => date && setOutDate(date)}
                      selectsEnd
                      startDate={inDate}
                      endDate={outDate}
                      minDate={inDate}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>

                {/* Duration Display */}
                {nights > 0 && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Duration: <span className="font-semibold">{nights} {nights === 1 ? "night" : "nights"}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Select Room Button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  openPopup();
                  fetchRoomData();
                }}
                className="flex items-center justify-center gap-2 w-full md:w-auto h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transform hover:-translate-y-0.5 transition-all"
              >
                <Bed className="h-5 w-5" />
                Select Room
              </button>
            </div>

            {/* Selected Rooms Display */}
            {selectedRooms.length > 0 && (
              <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Selected Rooms
                </h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRooms.map(roomNo => (
                    <div
                      key={roomNo}
                      className="flex items-center gap-2 bg-white border border-green-200 text-green-800 px-4 py-2 rounded-lg shadow-sm"
                    >
                      <Bed className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Room {roomNo}</span>
                      <button
                        onClick={() => toggleRoomSelection(roomNo)}
                        className="ml-2 rounded-full bg-red-50 p-1 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-800">{selectedRooms.length}</span> rooms selected for {nights} {nights === 1 ? "night" : "nights"}
                  </p>

                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 h-12 px-6 rounded-xl bg-green-600 text-white font-medium shadow-lg shadow-green-100 hover:bg-green-700 transition-colors"
                  >
                    Continue to Guest Details
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <GuestRegistrationNextForm
          inDate={inDate}
          outDate={outDate}
          selectedRooms={selectedRooms.map(roomNo => `Room ${roomNo}`)}
          nicPassportPf={pif}
          durationOfStay={`${nights} ${nights === 1 ? "day" : "days"}`}
          onBack={() => setStep(1)}
        />
      )}

      {/* POPUP */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-[95%] max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Room Availability 
                <span className="bg-blue-500/30 rounded-lg px-3 py-1 text-sm ml-2">
                  {formatISO(inDate, { representation: "date" })} → {formatISO(outDate, { representation: "date" })}
                </span>
              </h2>
              <button
                onClick={closePopup}
                className="rounded-full bg-blue-500/30 p-2 hover:bg-blue-500/50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Section */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter by:</span>
                </div>
                <div className="relative">
                  <select
                    value={selectedRoomType}
                    onChange={e => setSelectedRoomType(e.target.value)}
                    className="h-10 pl-3 pr-10 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option value="">All Room Types</option>
                    {roomTypes.map(type => (
                      <option key={type.roomTypeId} value={type.name}>
                        {type.name} ({type.currentRate})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="ml-auto flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span className="text-xs text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                    <span className="text-xs text-gray-600">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 rounded"></div>
                    <span className="text-xs text-gray-600">Selected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <span className="text-gray-500">Loading room availability...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-6 m-4 rounded-xl border border-red-100 flex items-center gap-3">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                    <X className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Error</h3>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              ) : (
                <RoomChart
                  dateRange={dateRange}
                  roomData={filterRooms(roomData, roomDetails, selectedRoomType)}
                  roomDetails={roomDetails}
                  isLoadingDetails={isLoadingDetails}
                  selectedRooms={selectedRooms}
                  onToggleRoom={toggleRoomSelection}
                />
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-800">{selectedRooms.length}</span> rooms selected
              </div>
              <button
                onClick={closePopup}
                className="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium shadow hover:shadow-md transition-shadow"
              >
                <Check className="h-5 w-5" />
                Confirm Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestRegistration;