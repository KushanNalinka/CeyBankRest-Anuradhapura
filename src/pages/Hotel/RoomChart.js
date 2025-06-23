

// import React from "react";
// import { addDays, differenceInCalendarDays, format, isSameDay } from "date-fns";

// export interface Room {
//   id: number;
//   name: string;
// }

// export type RoomStatus = "available" | "booked" | "maintenance";

// export interface StatusEntry {
//   date: string;
//   status: RoomStatus;
// }

// export type StatusMap = Record<string, StatusEntry[]>;

// interface Props {
//   start: Date;
//   end: Date;
//   rooms: Room[];
//   statusMap: StatusMap;
//   selectedRooms: string[];
//   onToggleRoom: (roomName: string) => void;
// }

// const enumerateDates = (start: Date, end: Date) => {
//   const list: Date[] = [];
//   for (let d = new Date(start); d <= end; d = addDays(d, 1)) list.push(new Date(d));
//   return list;
// };

// const StatusBadge: React.FC<{ status: RoomStatus }> = ({ status }) => {
//   const base = "px-4 py-1 rounded-full text-xs font-semibold";
//   const colour =
//     status === "booked"
//       ? "bg-red-500 text-white"
//       : status === "maintenance"
//       ? "bg-amber-400 text-white"
//       : "bg-green-600 text-white";

//   return (
//     <span className={`${base} ${colour}`}>
//       {status[0].toUpperCase() + status.slice(1)}
//     </span>
//   );
// };

// const RoomChart: React.FC<Props> = ({
//   start,
//   end,
//   rooms,
//   statusMap,
//   selectedRooms,
//   onToggleRoom,
// }) => {
//   const days = enumerateDates(start, end);
//   const nights = Math.max(1, differenceInCalendarDays(end, start) + 1);
//   const gridCols = `150px repeat(${days.length}, 120px)`;

//   const getStatus = (roomName: string, date: Date) => {
//     const entry = statusMap[roomName]?.find((s) => isSameDay(date, new Date(s.date)));
//     return entry?.status ?? "available";
//   };

//   return (
//     <div className="h-full w-full overflow-x-auto overflow-y-auto">
//       <div className="inline-grid min-w-max" style={{ gridTemplateColumns: gridCols }}>
//         {/* header */}
//         <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10">
//           Room / Date
//         </div>
//         {days.map((d) => (
//           <div key={`h-${d}`} className="border font-semibold text-center bg-gray-100">
//             {format(d, "d MMM")}
//           </div>
//         ))}

//         {/* rooms */}
//         {rooms.flatMap(({ name }) => [
//           <div
//             key={`label-${name}`}
//             onClick={() => onToggleRoom(name)}
//             className={`border font-medium flex items-center justify-center sticky left-0 z-10 cursor-pointer ${
//               selectedRooms.includes(name) ? "bg-indigo-100" : "bg-white"
//             }`}
//           >
//             {name}
//           </div>,
//           ...days.map((d) => (
//             <div key={`${name}-${d.toISOString()}`} className="border w-[120px] h-16 flex items-center justify-center">
//               <StatusBadge status={getStatus(name, d)} />
//             </div>
//           )),
//         ])}
//       </div>

//       <p className="text-xs text-gray-500 mt-2">
//         Showing {rooms.length} rooms × {nights} night{nights > 1 && "s"}.
//       </p>
//     </div>
//   );
// };

// export default RoomChart;






// import React from "react";
// import { addDays, differenceInCalendarDays, format, isSameDay } from "date-fns";

// const enumerateDates = (start, end) => {
//   const list = [];
//   for (let d = new Date(start); d <= end; d = addDays(d, 1)) list.push(new Date(d));
//   return list;
// };

// const StatusBadge = ({ status }) => {
//   const base = "px-4 py-1 rounded-full text-xs font-semibold";
//   const colour =
//     status === "booked"
//       ? "bg-red-500 text-white"
//       : status === "maintenance"
//       ? "bg-amber-400 text-white"
//       : "bg-green-600 text-white";

//   return (
//     <span className={`${base} ${colour}`}>
//       {status[0].toUpperCase() + status.slice(1)}
//     </span>
//   );
// };

// const RoomChart = ({
//   start,
//   end,
//   rooms,
//   statusMap,
//   selectedRooms,
//   onToggleRoom,
// }) => {
//   const days = enumerateDates(start, end);
//   const nights = Math.max(1, differenceInCalendarDays(end, start) + 1);
//   const gridCols = `150px repeat(${days.length}, 120px)`;

//   const getStatus = (roomName, date) => {
//     const entry = statusMap[roomName]?.find((s) =>
//       isSameDay(date, new Date(s.date))
//     );
//     return entry?.status ?? "available";
//   };

//   return (
//     <div className="h-full w-full overflow-x-auto overflow-y-auto">
//       <div
//         className="inline-grid min-w-max"
//         style={{ gridTemplateColumns: gridCols }}
//       >
//         {/* header */}
//         <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10">
//           Room / Date
//         </div>
//         {days.map((d) => (
//           <div
//             key={`h-${d}`}
//             className="border font-semibold text-center bg-gray-100"
//           >
//             {format(d, "d MMM")}
//           </div>
//         ))}

//         {/* rooms */}
//         {rooms.flatMap(({ name }) => [
//           <div
//             key={`label-${name}`}
//             onClick={() => onToggleRoom(name)}
//             className={`border font-medium flex items-center justify-center sticky left-0 z-10 cursor-pointer ${
//               selectedRooms.includes(name) ? "bg-indigo-100" : "bg-white"
//             }`}
//           >
//             {name}
//           </div>,
//           ...days.map((d) => (
//             <div
//               key={`${name}-${d.toISOString()}`}
//               className="border w-[120px] h-16 flex items-center justify-center"
//             >
//               <StatusBadge status={getStatus(name, d)} />
//             </div>
//           )),
//         ])}
//       </div>

//       <p className="text-xs text-gray-500 mt-2">
//         Showing {rooms.length} rooms × {nights} night{nights > 1 && "s"}.
//       </p>
//     </div>
//   );
// };

// export default RoomChart;






// import React from "react";
// import { format } from "date-fns";

// const RoomChart = ({
//   dateRange,
//   roomData,
//   roomDetails,
//   isLoadingDetails,
//   selectedRooms,
//   onToggleRoom
// }) => {
//   // Calculate grid columns based on date range length
//   const gridCols = `200px 150px 100px repeat(${dateRange.length}, 120px)`;

//   return (
//     <div className="h-full w-full overflow-x-auto overflow-y-auto p-4">
//       {isLoadingDetails && (
//         <div className="text-center py-2 text-blue-600">Loading room details...</div>
//       )}
      
//       <div
//         className="inline-grid min-w-max"
//         style={{ gridTemplateColumns: gridCols }}
//       >
//         {/* Header */}
//         <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10 p-2">
//           Room No
//         </div>
//         <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10 p-2">
//           Room Type
//         </div>
//         <div className="border font-semibold flex items-center justify-center bg-gray-100 sticky left-0 z-10 p-2">
//           Rate
//         </div>
//         {dateRange.map((date) => (
//           <div
//             key={`header-${date}`}
//             className="border font-semibold text-center bg-gray-100 p-2"
//           >
//             {format(new Date(date), "dd MMM")}
//           </div>
//         ))}

//         {/* Room rows */}
//         {roomData.flatMap(({ roomNo, availableDates }) => [
//           // Room number cell
//           <div
//             key={`room-${roomNo}`}
//             onClick={() => onToggleRoom(roomNo)}
//             className={`border font-medium flex items-center justify-center sticky left-0 z-10 cursor-pointer p-2 ${
//               selectedRooms.includes(roomNo) ? "bg-indigo-100" : "bg-white"
//             }`}
//           >
//             Room {roomNo}
//           </div>,
          
//           // Room type cell
//           <div 
//             key={`type-${roomNo}`}
//             className="border px-4 py-2"
//           >
//             {roomDetails[roomNo] ? 
//               roomDetails[roomNo].roomType.name : 
//               <span className="text-gray-400 italic">Loading...</span>
//             }
//           </div>,
          
//           // Rate cell
//           <div 
//             key={`rate-${roomNo}`}
//             className="border px-4 py-2 text-right"
//           >
//             {roomDetails[roomNo] && roomDetails[roomNo].roomType ? 
//               `${roomDetails[roomNo].roomType.currentRate}` : 
//               <span className="text-gray-400 italic">Loading...</span>
//             }
//           </div>,
          
//           // Date availability cells
//           ...dateRange.map((date) => {
//             const isAvailable = availableDates.includes(date);
//             return (
//               <div
//                 key={`${roomNo}-${date}`}
//                 onClick={() => isAvailable && onToggleRoom(roomNo)}
//                 className={`border h-12 flex items-center justify-center cursor-pointer ${
//                   isAvailable 
//                     ? selectedRooms.includes(roomNo)
//                       ? "bg-green-300" 
//                       : "bg-green-200"
//                     : "bg-red-200 cursor-not-allowed"
//                 }`}
//               >
//                 {isAvailable ? 'Available' : 'Booked'}
//               </div>
//             );
//           }),
//         ])}
//       </div>
      
//       {roomData.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           No room data available for the selected dates
//         </div>
//       )}
      
//       {selectedRooms.length > 0 && (
//         <div className="mt-4 text-sm text-gray-700">
//           Selected: {selectedRooms.map(roomNo => `Room ${roomNo}`).join(', ')}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomChart;




// import React from "react";
// import { format } from "date-fns";

// const RoomChart = ({ dateRange, roomData, roomDetails, isLoadingDetails, selectedRooms, onToggleRoom }) => {
//   // Calculate grid columns based on date range length
//   const gridCols = `220px 180px 120px repeat(${dateRange.length}, 120px)`;
  
//   // Status indicators with tooltips
//   const StatusIndicator = ({ isAvailable, isSelected }) => {
//     if (isAvailable) {
//       return (
//         <div className={`h-full w-full flex items-center justify-center ${
//           isSelected ? "bg-green-400 hover:bg-green-500" : "bg-green-100 hover:bg-green-200"
//         } transition-colors duration-200`}>
//           <div className="relative group">
//             <span className={`text-xs font-medium ${isSelected ? "text-green-900" : "text-green-800"}`}>
//               {isSelected ? "Selected" : "Available"}
//             </span>
//             <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
//               <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
//                 {isSelected ? "Click to unselect" : "Click to select"}
//               </div>
//               <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="h-full w-full flex items-center justify-center bg-red-100">
//         <div className="relative group">
//           <span className="text-xs font-medium text-red-800">Booked</span>
//           <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-20">
//             <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
//               Not available
//             </div>
//             <div className="w-2 h-2 bg-gray-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   return (
//     <div className="h-full w-full overflow-x-auto overflow-y-auto p-4">
//       {isLoadingDetails && (
//         <div className="sticky top-0 z-20 text-center py-2 px-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg mx-4 mb-4 flex items-center justify-center">
//           <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//           </svg>
//           Loading room details...
//         </div>
//       )}

//       <div className="inline-grid min-w-max shadow-sm" style={{ gridTemplateColumns: gridCols }}>
//         {/* Header */}
//         <div className="border-b border-r border-gray-200 bg-gray-100 font-semibold flex items-center justify-center sticky left-0 z-10 p-3 text-gray-700">
//           Room Number
//         </div>
        
//         <div className="border-b border-r border-gray-200 bg-gray-100 font-semibold flex items-center justify-center sticky left-0 z-10 p-3 text-gray-700">
//           Room Type
//         </div>
        
//         <div className="border-b border-r border-gray-200 bg-gray-100 font-semibold flex items-center justify-center sticky left-0 z-10 p-3 text-gray-700">
//           Rate
//         </div>
        
//         {dateRange.map((date) => (
//           <div 
//             key={`header-${date}`} 
//             className="border-b border-r border-gray-200 bg-gray-100 font-semibold text-center p-3 text-gray-700"
//           >
//             <div className="flex flex-col">
//               <span className="text-xs text-gray-500">{format(new Date(date), "EEE")}</span>
//               <span>{format(new Date(date), "dd MMM")}</span>
//             </div>
//           </div>
//         ))}

//         {/* Room rows */}
//         {roomData.flatMap(({ roomNo, availableDates }) => [
//           // Room number cell
//           <div
//             key={`room-${roomNo}`}
//             onClick={() => onToggleRoom(roomNo)}
//             className={`border-b border-r border-gray-200 font-medium flex items-center justify-center sticky left-0 z-10 cursor-pointer p-3 transition-colors duration-200 ${
//               selectedRooms.includes(roomNo) ? "bg-blue-50 text-blue-800" : "bg-white hover:bg-gray-50"
//             }`}
//           >
//             <div className="flex items-center">
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className={`h-5 w-5 mr-2 ${selectedRooms.includes(roomNo) ? "text-blue-500" : "text-gray-400"}`} 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={2} 
//                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
//                 />
//               </svg>
//               <span>Room {roomNo}</span>
//             </div>
//           </div>,

//           // Room type cell
//           <div 
//             key={`type-${roomNo}`} 
//             className="border-b border-r border-gray-200 p-3 text-gray-700"
//           >
//             {roomDetails[roomNo] ? (
//               <div className="font-medium">
//                 {roomDetails[roomNo].roomType.name}
//               </div>
//             ) : (
//               <div className="flex items-center text-gray-400 italic">
//                 <svg className="animate-spin h-3 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Loading...
//               </div>
//             )}
//           </div>,

//           // Rate cell
//           <div 
//             key={`rate-${roomNo}`} 
//             className="border-b border-r border-gray-200 p-3 text-right text-gray-700 font-medium"
//           >
//             {roomDetails[roomNo] && roomDetails[roomNo].roomType ? (
//               roomDetails[roomNo].roomType.currentRate
//             ) : (
//               <div className="flex items-center justify-end text-gray-400 italic">
//                 <svg className="animate-spin h-3 w-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Loading...
//               </div>
//             )}
//           </div>,

//           // Date availability cells
//           ...dateRange.map((date) => {
//             const isAvailable = availableDates.includes(date);
//             return (
//               <div
//                 key={`${roomNo}-${date}`}
//                 onClick={() => isAvailable && onToggleRoom(roomNo)}
//                 className={`border-b border-r border-gray-200 h-14 cursor-${isAvailable ? "pointer" : "not-allowed"}`}
//               >
//                 <StatusIndicator 
//                   isAvailable={isAvailable} 
//                   isSelected={isAvailable && selectedRooms.includes(roomNo)} 
//                 />
//               </div>
//             );
//           }),
//         ])}
//       </div>

//       {roomData.length === 0 && (
//         <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-gray-50 rounded-lg border border-gray-200 m-4">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//           </svg>
//           <p className="text-lg font-medium mb-2">No rooms available</p>
//           <p className="text-sm">Try different dates or room types</p>
//         </div>
//       )}

//       {selectedRooms.length > 0 && (
//         <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//           <h3 className="text-blue-800 font-medium mb-2 flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 14a1 1 0 001-1V6a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1h12z" clipRule="evenodd" />
//             </svg>
//             Reservation Summary
//           </h3>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {selectedRooms.map(roomNo => (
//               <div
//                 key={`summary-${roomNo}`}
//                 className="flex items-center gap-2 bg-white px-3 py-1 rounded border border-blue-200"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                 </svg>
//                 <span className="text-sm font-medium">Room {roomNo}</span>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onToggleRoom(roomNo);
//                   }}
//                   className="ml-1 text-gray-400 hover:text-red-600 transition-colors focus:outline-none"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomChart;



import React from 'react';
import { Home, Bed, Check, X } from 'lucide-react';

const RoomChart = ({
  dateRange,
  roomData,
  roomDetails,
  isLoadingDetails,
  selectedRoomDates,
  onToggleRoomDate,
  onToggleRoom,
  isRoomDateSelected,
  isRoomFullySelected
}) => {
  
  // Format date for display
  const formatDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return { day, dayNum, month };
  };

  // Check if room is available for specific date
  const isRoomAvailable = (roomNo, date) => {
    const room = roomData.find(r => r.roomNo === roomNo);
    return room && room.availableDates.includes(date);
  };

  // Get cell class based on availability and selection
  const getCellClass = (roomNo, date, isAvailable) => {
    const baseClass = "h-12 border border-gray-200 cursor-pointer transition-all duration-150 flex items-center justify-center text-sm font-medium";
    
    if (!isAvailable) {
      return `${baseClass} bg-red-100 text-red-700 cursor-not-allowed`;
    }
    
    if (isRoomDateSelected(roomNo, date)) {
      return `${baseClass} bg-green-400 text-white hover:bg-green-500`;
    }
    
    return `${baseClass} bg-green-100 text-green-700 hover:bg-green-200`;
  };

  // Handle cell click
  const handleCellClick = (roomNo, date) => {
    if (isRoomAvailable(roomNo, date)) {
      onToggleRoomDate(roomNo, date);
    }
  };

  // Get room rate safely
  const getRoomRate = (roomNo) => {
    const details = roomDetails[roomNo];
    if (!details || !details.roomType) return 'N/A';
    return details.roomType.currentRate || 'N/A';
  };

  // Get room type safely
  const getRoomType = (roomNo) => {
    const details = roomDetails[roomNo];
    if (!details || !details.roomType) return 'Unknown';
    return details.roomType.name || 'Unknown';
  };

  if (isLoadingDetails) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-500">Loading room details...</span>
        </div>
      </div>
    );
  }

  if (!roomData || roomData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <Home className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No rooms available for the selected dates</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {/* Table Header */}
        <div className="grid grid-cols-[200px_150px_100px_repeat(auto-fit,_120px)] gap-0 bg-gray-50 border-b border-gray-200">
          {/* Room Number Column Header */}
          <div className="h-16 flex items-center justify-center bg-gray-100 border-r border-gray-200 font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Room Number
            </div>
          </div>
          
          {/* Room Type Column Header */}
          <div className="h-16 flex items-center justify-center bg-gray-100 border-r border-gray-200 font-semibold text-gray-700">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              Room Type
            </div>
          </div>
          
          {/* Rate Column Header */}
          <div className="h-16 flex items-center justify-center bg-gray-100 border-r border-gray-200 font-semibold text-gray-700">
            Rate
          </div>
          
          {/* Date Headers */}
          {dateRange.map(date => {
            const { day, dayNum, month } = formatDateHeader(date);
            return (
              <div key={date} className="h-16 flex flex-col items-center justify-center bg-gray-100 border-r border-gray-200 text-center">
                <div className="text-xs text-gray-500 font-medium">{day}</div>
                <div className="text-lg font-bold text-gray-700">{dayNum}</div>
                <div className="text-xs text-gray-500">{month}</div>
              </div>
            );
          })}
        </div>

        {/* Table Body */}
        <div className="bg-white">
          {roomData.map((room) => (
            <div key={room.roomNo} className="grid grid-cols-[200px_150px_100px_repeat(auto-fit,_120px)] gap-0 border-b border-gray-100 hover:bg-gray-50/50">
              {/* Room Number */}
              <div className="h-12 flex items-center justify-between px-4 border-r border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-gray-800">Room {room.roomNo}</span>
                </div>
                <button
                  onClick={() => onToggleRoom(room.roomNo)}
                  className={`p-1 rounded transition-colors ${
                    isRoomFullySelected(room.roomNo)
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  title={isRoomFullySelected(room.roomNo) ? 'Deselect all dates' : 'Select all available dates'}
                >
                  <Check className="h-4 w-4" />
                </button>
              </div>
              
              {/* Room Type */}
              <div className="h-12 flex items-center justify-center px-3 border-r border-gray-200 bg-white text-sm text-gray-600">
                {getRoomType(room.roomNo)}
              </div>
              
              {/* Rate */}
              <div className="h-12 flex items-center justify-center px-2 border-r border-gray-200 bg-white text-sm font-medium text-gray-800">
                {getRoomRate(room.roomNo)}
              </div>
              
              {/* Date Cells */}
              {dateRange.map(date => {
                const isAvailable = isRoomAvailable(room.roomNo, date);
                const isSelected = isRoomDateSelected(room.roomNo, date);
                
                return (
                  <div
                    key={`${room.roomNo}-${date}`}
                    className={getCellClass(room.roomNo, date, isAvailable)}
                    onClick={() => handleCellClick(room.roomNo, date)}
                    title={
                      !isAvailable 
                        ? 'Not available' 
                        : isSelected 
                          ? 'Click to deselect' 
                          : 'Click to select'
                    }
                  >
                    {!isAvailable ? (
                      <X className="h-4 w-4" />
                    ) : isSelected ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <div className="w-4 h-4 rounded border-2 border-current opacity-50"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Summary Section */}
      {roomData.length > 0 && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded"></div>
                <span className="text-gray-600">Available ({
                  roomData.reduce((total, room) => total + room.availableDates.length, 0)
                } slots)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded"></div>
                <span className="text-gray-600">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-gray-600">Selected ({selectedRoomDates.size} slots)</span>
              </div>
            </div>
            <div className="text-blue-700 font-medium">
              {roomData.length} rooms shown
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomChart;