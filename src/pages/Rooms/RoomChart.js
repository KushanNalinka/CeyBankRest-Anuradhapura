
// import React, { useState, useEffect } from 'react';

// const RoomChart = () => {
//   const API_URL = 'http://localhost:8080/api/rooms/available-on-range';
//   const ROOM_DETAILS_URL = 'http://localhost:8080/api/rooms/';
  
//   const [inDate, setInDate] = useState(null);
//   const [outDate, setOutDate] = useState(null);
//   const [roomData, setRoomData] = useState([]);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [dateRange, setDateRange] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);

//   // Build date range correctly - exclude the checkout date
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

//   // Fetch room details for each room
//   const fetchRoomDetails = async (rooms) => {
//     setIsLoadingDetails(true);
//     const details = {};
    
//     try {
//       // Create an array of promises for fetching room details
//       const promises = rooms.map(room => 
//         fetch(`${ROOM_DETAILS_URL}${room.roomNo}`)
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
//               roomType: { name: 'Unknown' },
//               status: 'unknown'
//             };
//           })
//       );
      
//       // Wait for all promises to complete
//       await Promise.all(promises);
//       setRoomDetails(details);
//     } catch (err) {
//       console.error('Error fetching room details:', err);
//     } finally {
//       setIsLoadingDetails(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!inDate || !outDate) {
//       alert("Please select both check-in and check-out dates.");
//       return;
//     }
    
//     if (inDate >= outDate) {
//       alert("Check-out date must be after check-in date.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSearched(true);
    
//     const inDateStr = inDate.toISOString().split('T')[0];
//     const outDateStr = outDate.toISOString().split('T')[0];
    
//     try {
//       // Fetch data from the backend API
//       const response = await fetch(`${API_URL}?inDate=${inDateStr}&outDate=${outDateStr}`);
      
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

//   // Format date as YYYY-MM-DD
//   const formatDate = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     return d.toISOString().split('T')[0];
//   };

//   // Handle date change for the date inputs
//   const handleDateChange = (e, setter) => {
//     const date = e.target.value ? new Date(e.target.value) : null;
//     setter(date);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Room Availability Chart</h2>

//       <div className="flex items-center gap-4 mb-6">
//         <div>
//           <label className="block font-medium">Check-in Date</label>
//           <input
//             type="date"
//             value={formatDate(inDate)}
//             onChange={(e) => handleDateChange(e, setInDate)}
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Check-out Date</label>
//           <input
//             type="date"
//             value={formatDate(outDate)}
//             onChange={(e) => handleDateChange(e, setOutDate)}
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Loading...' : 'Search'}
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
//           {error}
//         </div>
//       )}

//       {isLoading ? (
//         <div className="text-center py-6">Loading room availability data...</div>
//       ) : searched && dateRange.length > 0 && (
//         <div className="overflow-auto">
//           {isLoadingDetails && (
//             <div className="text-center py-2 text-blue-600">Loading room details...</div>
//           )}
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2">Room No</th>
//                 <th className="border px-4 py-2">Room Type</th>
//                 {dateRange.map((date) => (
//                   <th key={date} className="border px-4 py-2">{date}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {roomData.length > 0 ? (
//                 roomData.map(({ roomNo, availableDates }) => (
//                   <tr key={roomNo}>
//                     <td className="border px-4 py-2 font-semibold">{roomNo}</td>
//                     <td className="border px-4 py-2">
//                       {roomDetails[roomNo] ? 
//                         roomDetails[roomNo].roomType.name : 
//                         <span className="text-gray-400 italic">Loading...</span>
//                       }
//                     </td>
//                     {dateRange.map((date) => {
//                       const isAvailable = availableDates.includes(date);
//                       return (
//                         <td
//                           key={date}
//                           className={`border px-4 py-2 text-center ${
//                             isAvailable ? 'bg-green-200' : 'bg-red-200'
//                           }`}
//                         >
//                           {isAvailable ? 'Available' : 'Booked'}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={dateRange.length + 2} className="border px-4 py-2 text-center">
//                     No room data available for the selected dates
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
      
//       {!searched && !isLoading && (
//         <div className="text-center py-8 text-gray-500">
//           Please select dates and click Search to view room availability
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomChart;



// import React, { useState, useEffect } from 'react';

// const RoomChart = () => {
//   const API_URL = 'http://localhost:8080/api/rooms/available-on-range';
//   const ROOM_DETAILS_URL = 'http://localhost:8080/api/rooms/';
//   const ROOM_TYPES_URL = 'http://localhost:8080/api/room-types';
  
//   const [inDate, setInDate] = useState(null);
//   const [outDate, setOutDate] = useState(null);
//   const [roomData, setRoomData] = useState([]);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [dateRange, setDateRange] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(false);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState('');
//   const [filteredRoomData, setFilteredRoomData] = useState([]);

//   // Fetch room types when component mounts
//   useEffect(() => {
//     fetchRoomTypes();
//   }, []);

//   // Fetch room types
//   const fetchRoomTypes = async () => {
//     setIsLoadingRoomTypes(true);
//     try {
//       const response = await fetch(ROOM_TYPES_URL);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setRoomTypes(data);
//     } catch (err) {
//       console.error('Error fetching room types:', err);
//       setError('Failed to fetch room types. Please try again later.');
//     } finally {
//       setIsLoadingRoomTypes(false);
//     }
//   };

//   // Build date range correctly - exclude the checkout date
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

//   // Fetch room details for each room
//   const fetchRoomDetails = async (rooms) => {
//     setIsLoadingDetails(true);
//     const details = {};
    
//     try {
//       // Create an array of promises for fetching room details
//       const promises = rooms.map(room => 
//         fetch(`${ROOM_DETAILS_URL}${room.roomNo}`)
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
//               roomType: { name: 'Unknown' },
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
//       setFilteredRoomData(rooms);
//       return;
//     }
    
//     const filtered = rooms.filter(room => {
//       return details[room.roomNo] && 
//              details[room.roomNo].roomType && 
//              details[room.roomNo].roomType.name === roomType;
//     });
    
//     setFilteredRoomData(filtered);
//   };

//   const handleSearch = async () => {
//     if (!inDate || !outDate) {
//       alert("Please select both check-in and check-out dates.");
//       return;
//     }
    
//     if (inDate >= outDate) {
//       alert("Check-out date must be after check-in date.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSearched(true);
    
//     const inDateStr = inDate.toISOString().split('T')[0];
//     const outDateStr = outDate.toISOString().split('T')[0];
    
//     try {
//       // Fetch data from the backend API
//       const response = await fetch(`${API_URL}?inDate=${inDateStr}&outDate=${outDateStr}`);
      
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

//   // Handle room type selection change
//   const handleRoomTypeChange = (e) => {
//     const roomType = e.target.value;
//     setSelectedRoomType(roomType);
//     if (roomDetails && Object.keys(roomDetails).length > 0) {
//       filterRooms(roomData, roomDetails, roomType);
//     }
//   };

//   // Format date as YYYY-MM-DD
//   const formatDate = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     return d.toISOString().split('T')[0];
//   };

//   // Handle date change for the date inputs
//   const handleDateChange = (e, setter) => {
//     const date = e.target.value ? new Date(e.target.value) : null;
//     setter(date);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Room Availability Chart</h2>

//       <div className="flex flex-wrap items-end gap-4 mb-6">
//         <div>
//           <label className="block font-medium mb-1">Check-in Date</label>
//           <input
//             type="date"
//             value={formatDate(inDate)}
//             onChange={(e) => handleDateChange(e, setInDate)}
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Check-out Date</label>
//           <input
//             type="date"
//             value={formatDate(outDate)}
//             onChange={(e) => handleDateChange(e, setOutDate)}
//             className="border px-3 py-2 rounded"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Room Type</label>
//           <select
//             value={selectedRoomType}
//             onChange={handleRoomTypeChange}
//             className="border px-3 py-2 rounded"
//             disabled={isLoadingRoomTypes}
//           >
//             <option value="">All Room Types</option>
//             {roomTypes.map(type => (
//               <option key={type.roomTypeId} value={type.name}>
//                 {type.name} ({type.currentRate} LKR)
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={handleSearch}
//           className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Loading...' : 'Search'}
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
//           {error}
//         </div>
//       )}

//       {isLoading ? (
//         <div className="text-center py-6">Loading room availability data...</div>
//       ) : searched && dateRange.length > 0 && (
//         <div className="overflow-auto">
//           {isLoadingDetails && (
//             <div className="text-center py-2 text-blue-600">Loading room details...</div>
//           )}
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2">Room No</th>
//                 <th className="border px-4 py-2">Room Type</th>
//                 <th className="border px-4 py-2">Rate/Night</th>
//                 {dateRange.map((date) => (
//                   <th key={date} className="border px-4 py-2">{date}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filteredRoomData.length > 0 ? (
//                 filteredRoomData.map(({ roomNo, availableDates }) => (
//                   <tr key={roomNo}>
//                     <td className="border px-4 py-2 font-semibold">{roomNo}</td>
//                     <td className="border px-4 py-2">
//                       {roomDetails[roomNo] ? 
//                         roomDetails[roomNo].roomType.name : 
//                         <span className="text-gray-400 italic">Loading...</span>
//                       }
//                     </td>
//                     <td className="border px-4 py-2">
//                       {roomDetails[roomNo] && roomDetails[roomNo].roomType ? 
//                         `${roomDetails[roomNo].roomType.currentRate}` : 
//                         <span className="text-gray-400 italic">Loading...</span>
//                       }
//                     </td>
//                     {dateRange.map((date) => {
//                       const isAvailable = availableDates.includes(date);
//                       return (
//                         <td
//                           key={date}
//                           className={`border px-4 py-2 text-center ${
//                             isAvailable ? 'bg-green-200' : 'bg-red-200'
//                           }`}
//                         >
//                           {isAvailable ? 'Available' : 'Booked'}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={dateRange.length + 3} className="border px-4 py-2 text-center">
//                     {roomData.length > 0 ? 
//                       'No rooms match the selected room type' : 
//                       'No room data available for the selected dates'}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
      
//       {!searched && !isLoading && (
//         <div className="text-center py-8 text-gray-500">
//           Please select dates and room type (optional), then click Search to view room availability
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomChart;


// import React, { useState, useEffect } from 'react';
// import { Calendar, ChevronDown, CheckCircle, XCircle, Loader2, Search, Hotel, CalendarDays } from 'lucide-react';

// const RoomChart = () => {
//   const API_URL = 'http://localhost:8080/api/rooms/available-on-range';
//   const ROOM_DETAILS_URL = 'http://localhost:8080/api/rooms/';
//   const ROOM_TYPES_URL = 'http://localhost:8080/api/room-types';
  
//   const [inDate, setInDate] = useState(null);
//   const [outDate, setOutDate] = useState(null);
//   const [roomData, setRoomData] = useState([]);
//   const [roomDetails, setRoomDetails] = useState({});
//   const [dateRange, setDateRange] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isLoadingDetails, setIsLoadingDetails] = useState(false);
//   const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(false);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);
//   const [roomTypes, setRoomTypes] = useState([]);
//   const [selectedRoomType, setSelectedRoomType] = useState('');
//   const [filteredRoomData, setFilteredRoomData] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Fetch room types when component mounts
//   useEffect(() => {
//     fetchRoomTypes();
//   }, []);

//   // Fetch room types
//   const fetchRoomTypes = async () => {
//     setIsLoadingRoomTypes(true);
//     try {
//       const response = await fetch(ROOM_TYPES_URL);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setRoomTypes(data);
//     } catch (err) {
//       console.error('Error fetching room types:', err);
//       setError('Failed to fetch room types. Please try again later.');
//     } finally {
//       setIsLoadingRoomTypes(false);
//     }
//   };

//   // Build date range correctly - exclude the checkout date
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

//   // Fetch room details for each room
//   const fetchRoomDetails = async (rooms) => {
//     setIsLoadingDetails(true);
//     const details = {};
    
//     try {
//       // Create an array of promises for fetching room details
//       const promises = rooms.map(room => 
//         fetch(`${ROOM_DETAILS_URL}${room.roomNo}`)
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
//               roomType: { name: 'Unknown' },
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
//       setFilteredRoomData(rooms);
//       return;
//     }
    
//     const filtered = rooms.filter(room => {
//       return details[room.roomNo] && 
//              details[room.roomNo].roomType && 
//              details[room.roomNo].roomType.name === roomType;
//     });
    
//     setFilteredRoomData(filtered);
//   };

//   const handleSearch = async () => {
//     if (!inDate || !outDate) {
//       setError("Please select both check-in and check-out dates.");
//       return;
//     }
    
//     if (inDate >= outDate) {
//       setError("Check-out date must be after check-in date.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);
//     setSearched(true);
    
//     const inDateStr = inDate.toISOString().split('T')[0];
//     const outDateStr = outDate.toISOString().split('T')[0];
    
//     try {
//       // Fetch data from the backend API
//       const response = await fetch(`${API_URL}?inDate=${inDateStr}&outDate=${outDateStr}`);
      
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

//   // Handle room type selection change
//   const handleRoomTypeChange = (roomType) => {
//     setSelectedRoomType(roomType);
//     setDropdownOpen(false);
//     if (roomDetails && Object.keys(roomDetails).length > 0) {
//       filterRooms(roomData, roomDetails, roomType);
//     }
//   };

//   // Format date as YYYY-MM-DD
//   const formatDate = (date) => {
//     if (!date) return '';
//     const d = new Date(date);
//     return d.toISOString().split('T')[0];
//   };

//   // Format display date
//   const formatDisplayDate = (date) => {
//     if (!date) return '';
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(date).toLocaleDateString(undefined, options);
//   };

//   // Handle date change for the date inputs
//   const handleDateChange = (e, setter) => {
//     const date = e.target.value ? new Date(e.target.value) : null;
//     setter(date);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <div className="flex items-center mb-6">
//             <Hotel size={24} className="text-blue-600 mr-2" />
//             <h2 className="text-2xl font-bold text-gray-800">Room Availability Chart</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <div className="relative">
//               <div className="absolute left-3 top-9 text-gray-400">
//                 <CalendarDays size={18} />
//               </div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
//               <input
//                 type="date"
//                 value={formatDate(inDate)}
//                 onChange={(e) => handleDateChange(e, setInDate)}
//                 className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               {inDate && (
//                 <div className="text-xs text-gray-500 mt-1">{formatDisplayDate(inDate)}</div>
//               )}
//             </div>

//             <div className="relative">
//               <div className="absolute left-3 top-9 text-gray-400">
//                 <CalendarDays size={18} />
//               </div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
//               <input
//                 type="date"
//                 value={formatDate(outDate)}
//                 onChange={(e) => handleDateChange(e, setOutDate)}
//                 className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               {outDate && (
//                 <div className="text-xs text-gray-500 mt-1">{formatDisplayDate(outDate)}</div>
//               )}
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center justify-between w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                   disabled={isLoadingRoomTypes}
//                 >
//                   <span className="truncate">
//                     {isLoadingRoomTypes ? 'Loading...' : selectedRoomType || 'All Room Types'}
//                   </span>
//                   <ChevronDown size={16} className="ml-2 text-gray-400" />
//                 </button>
                
//                 {dropdownOpen && (
//                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
//                     <div 
//                       className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                       onClick={() => handleRoomTypeChange('')}
//                     >
//                       All Room Types
//                     </div>
                    
//                     {roomTypes.map(type => (
//                       <div 
//                         key={type.roomTypeId} 
//                         className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
//                         onClick={() => handleRoomTypeChange(type.name)}
//                       >
//                         <div className="font-medium">{type.name}</div>
//                         <div className="text-sm text-gray-500">{type.currentRate} LKR per night</div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={handleSearch}
//                 className="flex items-center justify-center w-full bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <><Loader2 size={18} className="mr-2 animate-spin" /> Searching...</>
//                 ) : (
//                   <><Search size={18} className="mr-2" /> Search Availability</>
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
//               <div className="flex">
//                 <XCircle size={20} className="mr-2" />
//                 <span>{error}</span>
//               </div>
//             </div>
//           )}
//         </div>

//         {isLoading ? (
//           <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//             <Loader2 size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
//             <p className="text-gray-600">Loading room availability data...</p>
//           </div>
//         ) : searched && dateRange.length > 0 && (
//           <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
//             {isLoadingDetails && (
//               <div className="flex items-center justify-center py-3 text-blue-600 mb-4 bg-blue-50 rounded-lg">
//                 <Loader2 size={18} className="animate-spin mr-2" />
//                 <span>Loading room details...</span>
//               </div>
//             )}
            
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50">
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Room No</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Room Type</th>
//                     <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b">Rate/Night</th>
//                     {dateRange.map((date) => (
//                       <th key={date} className="px-4 py-3 text-center text-sm font-semibold text-gray-600 border-b">
//                         <div>{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
//                         <div className="text-xs font-normal">{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</div>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRoomData.length > 0 ? (
//                     filteredRoomData.map(({ roomNo, availableDates }, index) => (
//                       <tr key={roomNo} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                         <td className="px-4 py-3 border-b border-gray-200 font-medium text-gray-800">{roomNo}</td>
//                         <td className="px-4 py-3 border-b border-gray-200">
//                           {roomDetails[roomNo] ? 
//                             <span className="font-medium text-gray-700">{roomDetails[roomNo].roomType.name}</span> : 
//                             <div className="flex items-center">
//                               <Loader2 size={14} className="animate-spin mr-2 text-blue-500" />
//                               <span className="text-gray-400 text-sm">Loading...</span>
//                             </div>
//                           }
//                         </td>
//                         <td className="px-4 py-3 border-b border-gray-200">
//                           {roomDetails[roomNo] && roomDetails[roomNo].roomType ? 
//                             <span className="font-medium text-gray-900">{roomDetails[roomNo].roomType.currentRate} LKR</span> : 
//                             <div className="flex items-center">
//                               <Loader2 size={14} className="animate-spin mr-2 text-blue-500" />
//                               <span className="text-gray-400 text-sm">Loading...</span>
//                             </div>
//                           }
//                         </td>
//                         {dateRange.map((date) => {
//                           const isAvailable = availableDates.includes(date);
//                           return (
//                             <td
//                               key={date}
//                               className="px-2 py-3 border-b border-gray-200 text-center"
//                             >
//                               {isAvailable ? (
//                                 <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
//                                   <CheckCircle size={14} className="mr-1" />
//                                   <span>Available</span>
//                                 </div>
//                               ) : (
//                                 <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
//                                   <XCircle size={14} className="mr-1" />
//                                   <span>Booked</span>
//                                 </div>
//                               )}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={dateRange.length + 3} className="border-b border-gray-200 px-4 py-8 text-center">
//                         <div className="flex flex-col items-center justify-center text-gray-500">
//                           <Search size={40} className="text-gray-300 mb-3" />
//                           {roomData.length > 0 ? 
//                             'No rooms match the selected room type' : 
//                             'No room data available for the selected dates'}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
        
//         {!searched && !isLoading && (
//           <div className="bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-12">
//             <Calendar size={64} className="text-blue-200 mb-4" />
//             <p className="text-gray-500 text-center mb-1">Select dates and room type (optional)</p>
//             <p className="text-gray-400 text-sm text-center">Then click Search to view room availability</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomChart;


import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, CheckCircle, XCircle, Loader2, Search, Hotel, CalendarDays } from 'lucide-react';

const RoomChart = () => {
  const API_URL = 'http://localhost:8080/api/rooms/available-on-range';
  const ROOM_DETAILS_URL = 'http://localhost:8080/api/rooms/';
  const ROOM_TYPES_URL = 'http://localhost:8080/api/room-types';
  
  const [inDate, setInDate] = useState(null);
  const [outDate, setOutDate] = useState(null);
  const [roomData, setRoomData] = useState([]);
  const [roomDetails, setRoomDetails] = useState({});
  const [dateRange, setDateRange] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingRoomTypes, setIsLoadingRoomTypes] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [filteredRoomData, setFilteredRoomData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch room types when component mounts
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  // Fetch room types
  const fetchRoomTypes = async () => {
    setIsLoadingRoomTypes(true);
    try {
      const response = await fetch(ROOM_TYPES_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setRoomTypes(data);
    } catch (err) {
      console.error('Error fetching room types:', err);
      setError('Failed to fetch room types. Please try again later.');
    } finally {
      setIsLoadingRoomTypes(false);
    }
  };

  // Build date range correctly - exclude the checkout date
  const buildDateRange = (start, end) => {
    const range = [];
    let current = new Date(start);
    const endDate = new Date(end);
    
    // Create a range that includes start date up to but not including end date
    while (current < endDate) {
      range.push(new Date(current).toISOString().split('T')[0]);
      current = new Date(current.setDate(current.getDate() + 1));
    }
    return range;
  };

  // Fetch room details for each room
  const fetchRoomDetails = async (rooms) => {
    setIsLoadingDetails(true);
    const details = {};
    
    try {
      // Create an array of promises for fetching room details
      const promises = rooms.map(room => 
        fetch(`${ROOM_DETAILS_URL}${room.roomNo}`)
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
              roomType: { name: 'Unknown' },
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
      setFilteredRoomData(rooms);
      return;
    }
    
    const filtered = rooms.filter(room => {
      return details[room.roomNo] && 
             details[room.roomNo].roomType && 
             details[room.roomNo].roomType.name === roomType;
    });
    
    setFilteredRoomData(filtered);
  };

  const handleSearch = async () => {
    if (!inDate || !outDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    
    if (inDate >= outDate) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearched(true);
    
    const inDateStr = inDate.toISOString().split('T')[0];
    const outDateStr = outDate.toISOString().split('T')[0];
    
    try {
      // Fetch data from the backend API
      const response = await fetch(`${API_URL}?inDate=${inDateStr}&outDate=${outDateStr}`);
      
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
  };

  // Handle room type selection change
  const handleRoomTypeChange = (roomType) => {
    setSelectedRoomType(roomType);
    setDropdownOpen(false);
    if (roomDetails && Object.keys(roomDetails).length > 0) {
      filterRooms(roomData, roomDetails, roomType);
    }
  };

  // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  // Format display date
  const formatDisplayDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Handle date change for the date inputs
  const handleDateChange = (e, setter) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setter(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg border bg-red-50 border-red-200 text-red-800">
              <div className="flex items-center">
                <XCircle size={20} className="mr-2" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-6 bg-white border rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Hotel size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Room Availability Chart</h1>
                <p className="text-gray-600">Check room availability across date ranges</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    value={formatDate(inDate)}
                    onChange={(e) => handleDateChange(e, setInDate)}
                    className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {inDate && (
                  <div className="text-xs text-gray-500 mt-1">{formatDisplayDate(inDate)}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out Date</label>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="date"
                    value={formatDate(outDate)}
                    onChange={(e) => handleDateChange(e, setOutDate)}
                    className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                {outDate && (
                  <div className="text-xs text-gray-500 mt-1">{formatDisplayDate(outDate)}</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isLoadingRoomTypes}
                  >
                    <span className="truncate">
                      {isLoadingRoomTypes ? 'Loading...' : selectedRoomType || 'All Room Types'}
                    </span>
                    <ChevronDown size={16} className="ml-2 text-gray-400" />
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                      <div 
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                        onClick={() => handleRoomTypeChange('')}
                      >
                        All Room Types
                      </div>
                      
                      {roomTypes.map(type => (
                        <div 
                          key={type.roomTypeId} 
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                          onClick={() => handleRoomTypeChange(type.name)}
                        >
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-gray-500">{type.currentRate} LKR per night</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm w-full justify-center disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      Search Availability
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white border rounded-lg p-8 text-center shadow-sm">
              <Loader2 size={40} className="animate-spin mx-auto text-blue-600 mb-4" />
              <p className="text-gray-600">Loading room availability data...</p>
            </div>
          )}

          {/* Results Table */}
          {searched && dateRange.length > 0 && !isLoading && (
            <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
              {isLoadingDetails && (
                <div className="flex items-center justify-center py-3 text-blue-600 bg-blue-50 border-b">
                  <Loader2 size={18} className="animate-spin mr-2" />
                  <span>Loading room details...</span>
                </div>
              )}
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-blue-600">
                    <tr>
                      <th className="py-3 px-4 text-left text-white font-medium text-sm">Room No</th>
                      <th className="py-3 px-4 text-left text-white font-medium text-sm">Room Type</th>
                      <th className="py-3 px-4 text-left text-white font-medium text-sm">Rate/Night</th>
                      {dateRange.map((date) => (
                        <th key={date} className="py-3 px-4 text-center text-white font-medium text-sm min-w-[100px]">
                          <div>{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                          <div className="text-xs font-normal opacity-90">{new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRoomData.length > 0 ? (
                      filteredRoomData.map(({ roomNo, availableDates }, index) => (
                        <tr key={roomNo} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                              {roomNo}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {roomDetails[roomNo] ? 
                              <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                                {roomDetails[roomNo].roomType.name}
                              </span> : 
                              <div className="flex items-center">
                                <Loader2 size={14} className="animate-spin mr-2 text-blue-500" />
                                <span className="text-gray-400 text-sm">Loading...</span>
                              </div>
                            }
                          </td>
                          <td className="py-3 px-4">
                            {roomDetails[roomNo] && roomDetails[roomNo].roomType ? 
                              <span className="font-medium text-gray-900">{roomDetails[roomNo].roomType.currentRate} LKR</span> : 
                              <div className="flex items-center">
                                <Loader2 size={14} className="animate-spin mr-2 text-blue-500" />
                                <span className="text-gray-400 text-sm">Loading...</span>
                              </div>
                            }
                          </td>
                          {dateRange.map((date) => {
                            const isAvailable = availableDates.includes(date);
                            return (
                              <td key={date} className="py-3 px-4 text-center">
                                {isAvailable ? (
                                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                    <CheckCircle size={12} className="mr-1" />
                                    Available
                                  </div>
                                ) : (
                                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
                                    <XCircle size={12} className="mr-1" />
                                    Booked
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={dateRange.length + 3} className="py-12 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <Search size={40} className="text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Rooms Found</h3>
                            <p className="text-gray-500">
                              {roomData.length > 0 ? 
                                'No rooms match the selected room type' : 
                                'No room data available for the selected dates'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Initial State */}
          {!searched && !isLoading && (
            <div className="bg-white border rounded-lg p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Room Availability Search</h3>
              <p className="text-gray-500 mb-1">Select check-in and check-out dates to view room availability</p>
              <p className="text-gray-400 text-sm">Optionally filter by room type for more specific results</p>
            </div>
          )}

          {/* Summary Statistics */}
          {searched && filteredRoomData.length > 0 && !isLoading && (
            <div className="mt-6 bg-white border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Availability Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <Hotel size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600">Total Rooms</p>
                      <p className="text-xl font-bold text-blue-900">{filteredRoomData.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-green-600">Available Slots</p>
                      <p className="text-xl font-bold text-green-900">
                        {filteredRoomData.reduce((sum, room) => sum + room.availableDates.length, 0)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <Calendar size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Date Range</p>
                      <p className="text-xl font-bold text-purple-900">{dateRange.length} Days</p>
                    </div>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                      <Search size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-orange-600">Room Types</p>
                      <p className="text-xl font-bold text-orange-900">
                        {selectedRoomType ? '1' : new Set(Object.values(roomDetails).map(room => room.roomType?.name)).size}
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

export default RoomChart;