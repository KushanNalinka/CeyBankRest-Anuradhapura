// import React, { useState } from "react";

// interface Props {
//   inDate: Date;
//   outDate: Date;
//   selectedRooms: string[];
//   nicPassportPf: string;
//   durationOfStay: string;
//   onBack: () => void;
// }

// const GuestRegistrationNextForm: React.FC<Props> = ({
//   inDate,
//   outDate,
//   selectedRooms,
//   nicPassportPf,
//   durationOfStay,
//   onBack,
// }) => {
//   const [form, setForm] = useState({
//     title: "Mr",
//     nameWithInitials: "",
//     nameInFull: "",
//     nationality: "",
//     telNo: "",
//     officeTel: "",
//     homeAddress: "",
//     officeAddress: "",
//     advance: 0,
//     noOfGuests: 1,
//     adults: 1,
//     children: 0,
//     modeOfPayment: "Cash",
//     vehicleNos: "",
//     billNos: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setMessage("");

//     const payload = {
//       ...form,
//       nicPassportPf: nicPassportPf,
//       durationOfStay: durationOfStay,
//       inDate: inDate.toISOString().split("T")[0],
//       outDate: outDate.toISOString().split("T")[0],
//       roomNos: selectedRooms.map((r) => r.replace("Room ", "")),
//     };

//     try {
//       const res = await fetch("http://localhost:8080/api/reservations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setMessage("Reservation created successfully.");
//       } else {
//         setMessage("Failed to create reservation.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Error occurred during reservation.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10 space-y-5">
//       <h2 className="text-2xl font-semibold">Guest Details</h2>

//       {/* Basic info */}
//       <div>
//         <label className="block font-medium mb-1">Title & Name with Initials</label>
//         <div className="flex gap-4">
//           <select name="title" value={form.title} onChange={handleChange} className="p-2 border rounded">
//             <option>Mr</option>
//             <option>Mrs</option>
//             <option>Miss</option>
//           </select>
//           <input
//             name="nameWithInitials"
//             value={form.nameWithInitials}
//             onChange={handleChange}
//             className="flex-1 p-2 border rounded"
//             placeholder="Name with Initials"
//           />
//         </div>
//       </div>

//       <div>
//         <label className="block font-medium mb-1">Full Name</label>
//         <input
//           name="nameInFull"
//           value={form.nameInFull}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Full Name"
//         />
//       </div>

//       <div>
//         <label className="block font-medium mb-1">NIC / Passport / PIF</label>
//         <input
//           value={nicPassportPf}
//           disabled
//           className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//         />
//       </div>

//       <div>
//         <label className="block font-medium mb-1">Nationality</label>
//         <input
//           name="nationality"
//           value={form.nationality}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Nationality"
//         />
//       </div>

//       {/* Contact info */}
//       <div>
//         <label className="block font-medium mb-1">Contact Numbers</label>
//         <input
//           name="telNo"
//           value={form.telNo}
//           onChange={handleChange}
//           className="w-full p-2 mb-2 border rounded"
//           placeholder="Mobile / Personal"
//         />
//         <input
//           name="officeTel"
//           value={form.officeTel}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Office Telephone"
//         />
//       </div>

//       {/* Address info */}
//       <div>
//         <label className="block font-medium mb-1">Addresses</label>
//         <input
//           name="homeAddress"
//           value={form.homeAddress}
//           onChange={handleChange}
//           className="w-full p-2 mb-2 border rounded"
//           placeholder="Home Address"
//         />
//         <input
//           name="officeAddress"
//           value={form.officeAddress}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Office Address"
//         />
//       </div>

//       {/* Stay and people */}
//       <div>
//         <label className="block font-medium mb-1">Duration of Stay</label>
//         <input
//           value={durationOfStay}
//           disabled
//           className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//         />
//       </div>

//       <div>
//         <label className="block font-medium mb-1">Guests</label>
//         <div className="grid grid-cols-3 gap-4">
//           <input
//             name="noOfGuests"
//             type="number"
//             value={form.noOfGuests}
//             onChange={handleChange}
//             className="p-2 border rounded"
//             placeholder="Total Guests"
//           />
//           <input
//             name="adults"
//             type="number"
//             value={form.adults}
//             onChange={handleChange}
//             className="p-2 border rounded"
//             placeholder="Adults"
//           />
//           <input
//             name="children"
//             type="number"
//             value={form.children}
//             onChange={handleChange}
//             className="p-2 border rounded"
//             placeholder="Children"
//           />
//         </div>
//       </div>

//       {/* Billing */}
//       <div>
//         <label className="block font-medium mb-1">Billing Info</label>
//         <input
//           name="advance"
//           type="number"
//           value={form.advance}
//           onChange={handleChange}
//           className="w-full p-2 mb-2 border rounded"
//           placeholder="Advance Payment"
//         />
//         <input
//           name="billNos"
//           value={form.billNos}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Bill No(s)"
//         />
//       </div>

//       {/* Payment & Vehicle */}
//       <div>
//         <label className="block font-medium mb-1">Payment & Vehicle</label>
//         <select
//           name="modeOfPayment"
//           value={form.modeOfPayment}
//           onChange={handleChange}
//           className="w-full p-2 mb-2 border rounded"
//         >
//           <option>Cash</option>
//           <option>Card</option>
//           <option>Online</option>
//         </select>
//         <input
//           name="vehicleNos"
//           value={form.vehicleNos}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           placeholder="Vehicle No(s)"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between mt-4">
//         <button onClick={onBack} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Back</button>
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//         >
//           {loading ? "Submitting..." : "Submit Reservation"}
//         </button>
//       </div>

//       {message && <p className="text-center mt-2 text-sm text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default GuestRegistrationNextForm;

// import React, { useState } from "react";

// interface Props {
//   inDate: Date;
//   outDate: Date;
//   selectedRooms: string[];
//   nicPassportPf: string;
//   durationOfStay: string;
//   onBack: () => void;
// }

// const GuestRegistrationNextForm: React.FC<Props> = ({
//   inDate,
//   outDate,
//   selectedRooms,
//   nicPassportPf,
//   durationOfStay,
//   onBack,
// }) => {
//   const [form, setForm] = useState({
//     title: "Mr",
//     nameWithInitials: "",
//     nameInFull: "",
//     nationality: "",
//     telNo: "",
//     officeTel: "",
//     homeAddress: "",
//     officeAddress: "",
//     advance: 0,
//     noOfGuests: 1,
//     adults: 1,
//     children: 0,
//     modeOfPayment: "Cash",
//     vehicleNos: "",
//     billNos: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setMessage("");

//     const payload = {
//       ...form,
//       nicPassportPf,
//       durationOfStay,
//       inDate: inDate.toISOString().split("T")[0],
//       outDate: outDate.toISOString().split("T")[0],
//       roomNos: selectedRooms.map((r) => r.replace("Room ", "")),
//     };

//     try {
//       const res = await fetch("http://localhost:8080/api/reservations", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setMessage("Reservation created successfully.");
//       } else {
//         setMessage("Failed to create reservation.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Error occurred during reservation.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-6">Guest Details</h2>

//       <div className="grid grid-cols-2 gap-6">
//         {/* Title & Initials */}
//         <div>
//           <label htmlFor="title" className="block font-medium mb-1">Title</label>
//           <select
//             id="title"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option>Mr</option>
//             <option>Mrs</option>
//             <option>Miss</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="nameWithInitials" className="block font-medium mb-1">Name with Initials</label>
//           <input
//             id="nameWithInitials"
//             name="nameWithInitials"
//             value={form.nameWithInitials}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. A. B. Silva"
//           />
//         </div>

//         {/* Full Name */}
//         <div>
//           <label htmlFor="nameInFull" className="block font-medium mb-1">Full Name</label>
//           <input
//             id="nameInFull"
//             name="nameInFull"
//             value={form.nameInFull}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. Ajith Silva"
//           />
//         </div>

//         {/* NIC / Passport */}
//         <div>
//           <label className="block font-medium mb-1">NIC / Passport / PIF</label>
//           <input
//             value={nicPassportPf}
//             disabled
//             className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//           />
//         </div>

//         {/* Nationality */}
//         <div>
//           <label htmlFor="nationality" className="block font-medium mb-1">Nationality</label>
//           <input
//             id="nationality"
//             name="nationality"
//             value={form.nationality}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. Sri Lankan"
//           />
//         </div>

//         {/* Contact Numbers */}
//         <div className="col-span-2">
//           <label className="block font-medium mb-1">Contact Numbers</label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="telNo"
//               value={form.telNo}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Mobile / Personal"
//             />
//             <input
//               name="officeTel"
//               value={form.officeTel}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Office Telephone"
//             />
//           </div>
//         </div>

//         {/* Addresses */}
//         <div className="col-span-2">
//           <label className="block font-medium mb-1">Addresses</label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="homeAddress"
//               value={form.homeAddress}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Home Address"
//             />
//             <input
//               name="officeAddress"
//               value={form.officeAddress}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Office Address"
//             />
//           </div>
//         </div>

//         {/* Duration & Guests */}
//         <div>
//           <label className="block font-medium mb-1">Duration of Stay</label>
//           <input
//             value={durationOfStay}
//             disabled
//             className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Room Nos</label>
//           <input
//             value={selectedRooms.join(", ")}
//             disabled
//             className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//           />
//         </div>

//         {/* Guests breakdown */}
//         <div>
//           <label className="block font-medium mb-1">Total Guests</label>
//           <input
//             name="noOfGuests"
//             type="number"
//             value={form.noOfGuests}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Adults</label>
//           <input
//             name="adults"
//             type="number"
//             value={form.adults}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Children</label>
//           <input
//             name="children"
//             type="number"
//             value={form.children}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Billing */}
//         <div>
//           <label className="block font-medium mb-1">Advance Payment</label>
//           <input
//             name="advance"
//             type="number"
//             value={form.advance}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Bill No(s)</label>
//           <input
//             name="billNos"
//             value={form.billNos}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Payment & Vehicle */}
//         <div>
//           <label htmlFor="modeOfPayment" className="block font-medium mb-1">Mode of Payment</label>
//           <select
//             id="modeOfPayment"
//             name="modeOfPayment"
//             value={form.modeOfPayment}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option>Cash</option>
//             <option>Card</option>
//             <option>Online</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Vehicle No(s)</label>
//           <input
//             name="vehicleNos"
//             value={form.vehicleNos}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. WP-1234"
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//         >
//           {loading ? "Submitting..." : "Submit Reservation"}
//         </button>
//       </div>

//       {message && <p className="text-center mt-4 text-sm text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default GuestRegistrationNextForm;









// import React, { useState } from "react";

// const GuestRegistrationNextForm = ({
//   inDate,
//   outDate,
//   selectedRooms,
//   nicPassportPf,
//   durationOfStay,
//   onBack,
// }) => {
//   const [form, setForm] = useState({
//     title: "Mr",
//     nameWithInitials: "",
//     nameInFull: "",
//     nationality: "",
//     telNo: "",
//     officeTel: "",
//     homeAddress: "",
//     officeAddress: "",
//     advance: 0,
//     noOfGuests: 1,
//     adults: 1,
//     children: 0,
//     modeOfPayment: "Cash",
//     vehicleNos: "",
//     billNos: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };
//   const API_URL = process.env.REACT_APP_API_URL;

//   const handleSubmit = async () => {
//     setLoading(true);
//     setMessage("");

//     const payload = {
//       ...form,
//       nicPassportPf,
//       durationOfStay,
//       inDate: inDate.toISOString().split("T")[0],
//       outDate: outDate.toISOString().split("T")[0],
//       roomNos: selectedRooms.map((r) => r.replace("Room ", "")),
//     };

//     try {
//       const res = await fetch(`${API_URL}/reservations`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setMessage("Reservation created successfully.");
//       } else {
//         setMessage("Failed to create reservation.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Error occurred during reservation.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10">
//       <h2 className="text-2xl font-semibold mb-6">Guest Details</h2>

//       <div className="grid grid-cols-2 gap-6">
//         {/* Title & Initials */}
//         <div>
//           <label htmlFor="title" className="block font-medium mb-1">Title</label>
//           <select
//             id="title"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option>Mr</option>
//             <option>Mrs</option>
//             <option>Miss</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="nameWithInitials" className="block font-medium mb-1">Name with Initials</label>
//           <input
//             id="nameWithInitials"
//             name="nameWithInitials"
//             value={form.nameWithInitials}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. A. B. Silva"
//           />
//         </div>

//         {/* Full Name */}
//         <div>
//           <label htmlFor="nameInFull" className="block font-medium mb-1">Full Name</label>
//           <input
//             id="nameInFull"
//             name="nameInFull"
//             value={form.nameInFull}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. Ajith Silva"
//           />
//         </div>

//         {/* NIC / Passport */}
//         <div>
//           <label className="block font-medium mb-1">NIC / Passport / PIF</label>
//           <input
//             value={nicPassportPf}
//             disabled
//             className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//           />
//         </div>

//         {/* Nationality */}
//         <div>
//           <label htmlFor="nationality" className="block font-medium mb-1">Nationality</label>
//           <input
//             id="nationality"
//             name="nationality"
//             value={form.nationality}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. Sri Lankan"
//           />
//         </div>

//         {/* Contact Numbers */}
//         <div className="col-span-2">
//           <label className="block font-medium mb-1">Contact Numbers</label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="telNo"
//               value={form.telNo}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Mobile / Personal"
//             />
//             <input
//               name="officeTel"
//               value={form.officeTel}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Office Telephone"
//             />
//           </div>
//         </div>

//         {/* Addresses */}
//         <div className="col-span-2">
//           <label className="block font-medium mb-1">Addresses</label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="homeAddress"
//               value={form.homeAddress}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Home Address"
//             />
//             <input
//               name="officeAddress"
//               value={form.officeAddress}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               placeholder="Office Address"
//             />
//           </div>
//         </div>

//         {/* Duration & Guests */}
//         <div>
//           <label className="block font-medium mb-1">Duration of Stay</label>
//           <input
//             value={durationOfStay}
//             disabled
//             className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Room Nos</label>
//           <input
//             value={selectedRooms.join(", ")}
//             disabled
//             className="w-full p-2 border rounded bg-gray-100 text-gray-700"
//           />
//         </div>

//         {/* Guests breakdown */}
//         <div>
//           <label className="block font-medium mb-1">Total Guests</label>
//           <input
//             name="noOfGuests"
//             type="number"
//             value={form.noOfGuests}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Adults</label>
//           <input
//             name="adults"
//             type="number"
//             value={form.adults}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Children</label>
//           <input
//             name="children"
//             type="number"
//             value={form.children}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Billing */}
//         <div>
//           <label className="block font-medium mb-1">Advance Payment</label>
//           <input
//             name="advance"
//             type="number"
//             value={form.advance}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Bill No(s)</label>
//           <input
//             name="billNos"
//             value={form.billNos}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Payment & Vehicle */}
//         <div>
//           <label htmlFor="modeOfPayment" className="block font-medium mb-1">Mode of Payment</label>
//           <select
//             id="modeOfPayment"
//             name="modeOfPayment"
//             value={form.modeOfPayment}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           >
//             <option>Cash</option>
//             <option>Card</option>
//             <option>Online</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium mb-1">Vehicle No(s)</label>
//           <input
//             name="vehicleNos"
//             value={form.vehicleNos}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             placeholder="e.g. WP-1234"
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
//         >
//           {loading ? "Submitting..." : "Submit Reservation"}
//         </button>
//       </div>

//       {message && <p className="text-center mt-4 text-sm text-blue-600">{message}</p>}
//     </div>
//   );
// };

// export default GuestRegistrationNextForm;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestRegistrationNextForm = ({
  inDate,
  outDate,
  selectedRooms,
  nicPassportPf,
  durationOfStay,
  onBack,
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "Mr",
    nameWithInitials: "",
    nameInFull: "",
    nationality: "",
    telNo: "",
    officeTel: "",
    homeAddress: "",
    officeAddress: "",
    advance: 0,
    noOfGuests: 1,
    adults: 1,
    children: 0,
    modeOfPayment: "Cash",
    vehicleNos: "",
    billNos: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const API_URL = process.env.REACT_APP_API_URL;

  const handleOpenConfirm = () => {
    setShowConfirmModal(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    setShowConfirmModal(false);

    const payload = {
      ...form,
      nicPassportPf,
      durationOfStay,
      inDate: inDate.toISOString().split("T")[0],
      outDate: outDate.toISOString().split("T")[0],
      roomNos: selectedRooms.map((r) => r.replace("Room ", "")),
    };

    try {
      const res = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setMessage("Failed to create reservation.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error occurred during reservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto mt-10 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Guest Registration</h2>
          <div className="h-1 w-20 bg-blue-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
          </div>
          
          {/* Title & Initials */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <select
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>Mr</option>
              <option>Mrs</option>
              <option>Miss</option>
              <option>Dr</option>
            </select>
          </div>
          <div>
            <label htmlFor="nameWithInitials" className="block text-sm font-medium text-gray-700 mb-1">Name with Initials</label>
            <input
              id="nameWithInitials"
              name="nameWithInitials"
              value={form.nameWithInitials}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. A. B. Silva"
            />
          </div>

          {/* Full Name */}
          <div className="col-span-2">
            <label htmlFor="nameInFull" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              id="nameInFull"
              name="nameInFull"
              value={form.nameInFull}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. Ajith Bandara Silva"
            />
          </div>

          {/* ID & Nationality */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NIC / Passport / PIF</label>
            <input
              value={nicPassportPf}
              disabled
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <input
              id="nationality"
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. Sri Lankan"
            />
          </div>

          {/* Stay Details Section */}
          <div className="col-span-2 mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Stay Details</h3>
          </div>
          
          {/* Duration & Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration of Stay</label>
            <input
              value={durationOfStay}
              disabled
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Numbers</label>
            <input
              value={selectedRooms.join(", ")}
              disabled
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>

          {/* Guests breakdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Guests</label>
            <input
              name="noOfGuests"
              type="number"
              value={form.noOfGuests}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
              <input
                name="adults"
                type="number"
                value={form.adults}
                onChange={handleChange}
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Children</label>
              <input
                name="children"
                type="number"
                value={form.children}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="col-span-2 mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
          </div>
          
          {/* Contact Numbers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <div className="relative">
              <input
                name="telNo"
                value={form.telNo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
                placeholder="e.g. 077 1234567"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Telephone</label>
            <div className="relative">
              <input
                name="officeTel"
                value={form.officeTel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
                placeholder="e.g. 011 2345678"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>

          {/* Addresses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
            <textarea
              name="homeAddress"
              value={form.homeAddress}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter home address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
            <textarea
              name="officeAddress"
              value={form.officeAddress}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter office address"
            />
          </div>

          {/* Payment Section */}
          <div className="col-span-2 mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h3>
          </div>

          {/* Billing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Advance Payment (LKR)</label>
            <div className="relative">
              <input
                name="advance"
                type="number"
                value={form.advance}
                onChange={handleChange}
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
              />
              <span className="absolute left-3 top-3 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bill No(s)</label>
            <input
              name="billNos"
              value={form.billNos}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. B-12345"
            />
          </div>

          {/* Payment & Vehicle */}
          <div>
            <label htmlFor="modeOfPayment" className="block text-sm font-medium text-gray-700 mb-1">Mode of Payment</label>
            <select
              id="modeOfPayment"
              name="modeOfPayment"
              value={form.modeOfPayment}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Bank Transfer</option>
              <option>Online Payment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle No(s)</label>
            <input
              name="vehicleNos"
              value={form.vehicleNos}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="e.g. WP-1234"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
          <button
            onClick={handleOpenConfirm}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all font-medium flex items-center"
          >
            Submit Reservation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {message && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {message}
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Reservation</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this reservation for {form.nameInFull || form.nameWithInitials}?
            </p>
            <div className="flex flex-col sm:flex-row-reverse gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reservation Successful!</h3>
            <p className="text-gray-600 mb-6">
              Your reservation has been successfully created.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestRegistrationNextForm;