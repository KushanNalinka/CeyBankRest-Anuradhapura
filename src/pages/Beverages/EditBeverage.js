// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditBeverage(props: any) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [code, setCode] = useState(initial.code);
//   const [name, setName] = useState(initial.name);
//   const [image, setImage] = useState(initial.image);
//   const [description, setDescription] = useState(initial.description);
//   const [slug, setSlug] = useState(initial.slug);
//   const [price, setPrice] = useState(initial.price);
//   const [portionType, setPortionType] = useState(initial.portionType);
//   const [itemCategory, setItemCategory] = useState(initial.itemCategory);
//   const [availableForMeals, setAvailableForMeals] = useState<string[]>(initial.availableForMeals);
//   const [error, setError] = useState('');

//   const meals = ['BREAKFAST', 'LUNCH', 'DINNER'];
//   const { openPopup, closePopup } = usePopup();
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) {
//       openPopup();
//     } else {
//       closePopup();
//     }
//     return () => closePopup();
//   }, [isOpen]);

//   function toggleMeal(meal: string) {
//     setAvailableForMeals(prev =>
//       prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
//     );
//   }

//   useEffect(() => {
//     setCode(initial.code);
//     setName(initial.name);
//     setImage(initial.image);
//     setDescription(initial.description);
//     setSlug(initial.slug);
//     setPrice(initial.price);
//     setPortionType(initial.portionType);
//     setItemCategory(initial.itemCategory);
//     setAvailableForMeals(initial.availableForMeals);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(`http://localhost:8080/api/beverages/${initial.beverageId}`, {
//         code,
//         name,
//         image,
//         description,
//         slug,
//         price,
//         portionType,
//         itemCategory,
//         availableForMeals,
//       });
//       onSuccess('Beverage updated.');
//       onClose();
//     } catch {
//       setError('Update failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-96 shadow-lg">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Edit Beverage</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}

//         <div className="space-y-3">
//           <input
//             placeholder="Code"
//             className="w-full border rounded p-2"
//             value={code}
//             onChange={e => setCode(e.target.value)}
//           />
//           <input
//             placeholder="Name"
//             className="w-full border rounded p-2"
//             value={name}
//             onChange={e => setName(e.target.value)}
//           />
//           <input
//             placeholder="Image URL"
//             className="w-full border rounded p-2"
//             value={image}
//             onChange={e => setImage(e.target.value)}
//           />
//           <input
//             placeholder="Description"
//             className="w-full border rounded p-2"
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//           />
//           <input
//             placeholder="Slug"
//             className="w-full border rounded p-2"
//             value={slug}
//             onChange={e => setSlug(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             className="w-full border rounded p-2"
//             value={price}
//             onChange={e => setPrice(+e.target.value)}
//           />
//           <input
//             placeholder="Portion Type"
//             className="w-full border rounded p-2"
//             value={portionType}
//             onChange={e => setPortionType(e.target.value)}
//           />
//           <input
//             placeholder="Category"
//             className="w-full border rounded p-2"
//             value={itemCategory}
//             onChange={e => setItemCategory(e.target.value)}
//           />

//           <div>
//             <span className="block mb-1">Available For Meals:</span>
//             <div className="flex space-x-2">
//               {meals.map(meal => (
//                 <label key={meal} className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={availableForMeals.includes(meal)}
//                     onChange={() => toggleMeal(meal)}
//                     className="form-checkbox"
//                   />
//                   <span className="ml-1">{meal}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 rounded bg-blue-500 text-white"
//             onClick={handleUpdate}
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditBeverage(props: any) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [code, setCode] = useState(initial.code);
//   const [name, setName] = useState(initial.name);
//   const [image, setImage] = useState(initial.image);
//   const [description, setDescription] = useState(initial.description);
//   const [slug, setSlug] = useState(initial.slug);
//   const [price, setPrice] = useState(initial.price);
//   const [portionType, setPortionType] = useState(initial.portionType);
//   const [itemCategory, setItemCategory] = useState(initial.itemCategory);
//   const [availableForMeals, setAvailableForMeals] = useState(initial.availableForMeals);
//   const [error, setError] = useState('');

//   const meals = ['BREAKFAST', 'LUNCH', 'DINNER'];
//   const { openPopup, closePopup } = usePopup();
//   const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) openPopup(); else closePopup();
//     return () => closePopup();
//   }, [isOpen]);

//   function toggleMeal(meal: string) {
//     setAvailableForMeals(prev =>
//       prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
//     );
//   }

//   useEffect(() => {
//     setCode(initial.code);
//     setName(initial.name);
//     setImage(initial.image);
//     setDescription(initial.description);
//     setSlug(initial.slug);
//     setPrice(initial.price);
//     setPortionType(initial.portionType);
//     setItemCategory(initial.itemCategory);
//     setAvailableForMeals(initial.availableForMeals);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(`${API_URL}/beverages/${initial.beverageId}`, {
//         code,
//         name,
//         image,
//         description,
//         slug,
//         price,
//         portionType,
//         itemCategory,
//         availableForMeals,
//       });
//       onSuccess('Beverage updated.');
//       onClose();
//     } catch {
//       setError('Update failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 overflow-auto">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Edit Beverage</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}

//         <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
//           <div>
//             <label htmlFor="code" className="block mb-1 text-sm font-medium">Code</label>
//             <input
//               id="code"
//               placeholder="Code"
//               className="w-full border rounded p-2"
//               value={code}
//               onChange={e => setCode(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
//             <input
//               id="name"
//               placeholder="Name"
//               className="w-full border rounded p-2"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="image" className="block mb-1 text-sm font-medium">Image URL</label>
//             <input
//               id="image"
//               placeholder="Image URL"
//               className="w-full border rounded p-2"
//               value={image}
//               onChange={e => setImage(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
//             <input
//               id="description"
//               placeholder="Description"
//               className="w-full border rounded p-2"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="slug" className="block mb-1 text-sm font-medium">Slug</label>
//             <input
//               id="slug"
//               placeholder="Slug"
//               className="w-full border rounded p-2"
//               value={slug}
//               onChange={e => setSlug(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="price" className="block mb-1 text-sm font-medium">Price</label>
//             <input
//               id="price"
//               type="number"
//               placeholder="Price"
//               className="w-full border rounded p-2"
//               value={price}
//               onChange={e => setPrice(+e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="portionType" className="block mb-1 text-sm font-medium">Portion Type</label>
//             <input
//               id="portionType"
//               placeholder="Portion Type"
//               className="w-full border rounded p-2"
//               value={portionType}
//               onChange={e => setPortionType(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="itemCategory" className="block mb-1 text-sm font-medium">Category</label>
//             <input
//               id="itemCategory"
//               placeholder="Category"
//               className="w-full border rounded p-2"
//               value={itemCategory}
//               onChange={e => setItemCategory(e.target.value)}
//             />
//           </div>

//           <div className="col-span-2">
//             <span className="block mb-1 text-sm font-medium">Available For Meals:</span>
//             <div className="flex flex-wrap gap-4">
//               {meals.map(meal => (
//                 <label key={meal} className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={availableForMeals.includes(meal)}
//                     onChange={() => toggleMeal(meal)}
//                     className="form-checkbox"
//                   />
//                   <span className="ml-1">{meal}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
//           <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={handleUpdate}>Update</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function EditBeverage(props) {
//   const { initial, isOpen, onClose, onSuccess } = props;
//   const [code, setCode] = useState(initial.code);
//   const [name, setName] = useState(initial.name);
//   const [image, setImage] = useState(initial.image);
//   const [description, setDescription] = useState(initial.description);
//   const [slug, setSlug] = useState(initial.slug);
//   const [price, setPrice] = useState(initial.price);
//   const [portionType, setPortionType] = useState(initial.portionType);
//   const [itemCategory, setItemCategory] = useState(initial.itemCategory);
//   const [availableForMeals, setAvailableForMeals] = useState(initial.availableForMeals);
//   const [error, setError] = useState('');

//   const meals = ['BREAKFAST', 'LUNCH', 'DINNER','ALACARTE'];
//   const { openPopup, closePopup } = usePopup();
//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) openPopup();
//     else closePopup();
//     return () => closePopup();
//   });

//   function toggleMeal(meal) {
//     setAvailableForMeals(prev =>
//       prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
//     );
//   }

//   useEffect(() => {
//     setCode(initial.code);
//     setName(initial.name);
//     setImage(initial.image);
//     setDescription(initial.description);
//     setSlug(initial.slug);
//     setPrice(initial.price);
//     setPortionType(initial.portionType);
//     setItemCategory(initial.itemCategory);
//     setAvailableForMeals(initial.availableForMeals);
//   }, [initial]);

//   async function handleUpdate() {
//     setError('');
//     try {
//       await axios.put(`${API_URL}/beverages/${initial.beverageId}`, {
//         code,
//         name,
//         image,
//         description,
//         slug,
//         price,
//         portionType,
//         itemCategory,
//         availableForMeals,
//       });
//       onSuccess('Beverage updated.');
//       onClose();
//     } catch {
//       setError('Update failed.');
//     }
//   }

//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 overflow-auto">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes />
//         </button>
//         <h2 className="text-xl font-medium mb-4">Edit Beverage</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}

//         <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
//           <div>
//             <label htmlFor="code" className="block mb-1 text-sm font-medium">Code</label>
//             <input
//               id="code"
//               placeholder="Code"
//               className="w-full border rounded p-2"
//               value={code}
//               onChange={e => setCode(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
//             <input
//               id="name"
//               placeholder="Name"
//               className="w-full border rounded p-2"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="image" className="block mb-1 text-sm font-medium">Image URL</label>
//             <input
//               id="image"
//               placeholder="Image URL"
//               className="w-full border rounded p-2"
//               value={image}
//               onChange={e => setImage(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="description" className="block mb-1 text-sm font-medium">Description</label>
//             <input
//               id="description"
//               placeholder="Description"
//               className="w-full border rounded p-2"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="slug" className="block mb-1 text-sm font-medium">Slug</label>
//             <input
//               id="slug"
//               placeholder="Slug"
//               className="w-full border rounded p-2"
//               value={slug}
//               onChange={e => setSlug(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="price" className="block mb-1 text-sm font-medium">Price</label>
//             <input
//               id="price"
//               type="number"
//               placeholder="Price"
//               className="w-full border rounded p-2"
//               value={price}
//               onChange={e => setPrice(+e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="portionType" className="block mb-1 text-sm font-medium">Portion Type</label>
//             <input
//               id="portionType"
//               placeholder="Portion Type"
//               className="w-full border rounded p-2"
//               value={portionType}
//               onChange={e => setPortionType(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="itemCategory" className="block mb-1 text-sm font-medium">Category</label>
//             <input
//               id="itemCategory"
//               placeholder="Category"
//               className="w-full border rounded p-2"
//               value={itemCategory}
//               onChange={e => setItemCategory(e.target.value)}
//             />
//           </div>

//           <div className="col-span-2">
//             <span className="block mb-1 text-sm font-medium">Available For Meals:</span>
//             <div className="flex flex-wrap gap-4">
//               {meals.map(meal => (
//                 <label key={meal} className="inline-flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={availableForMeals.includes(meal)}
//                     onChange={() => toggleMeal(meal)}
//                     className="form-checkbox"
//                   />
//                   <span className="ml-1">{meal}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-5 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
//           <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={handleUpdate}>Update</button>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { usePopup } from '../../context/PopupContext';

export default function EditBeverage(props) {
  const { initial, isOpen, onClose, onSuccess } = props;
  const [code, setCode] = useState(initial.code);
  const [name, setName] = useState(initial.name);
  const [image, setImage] = useState(initial.image);
  const [description, setDescription] = useState(initial.description);
  const [slug, setSlug] = useState(initial.slug);
  const [price, setPrice] = useState(initial.price);
  const [portionType, setPortionType] = useState(initial.portionType);
  const [itemCategory, setItemCategory] = useState(initial.itemCategory);
  const [availableForMeals, setAvailableForMeals] = useState(initial.availableForMeals);
  const [error, setError] = useState('');

  const meals = ['BREAKFAST', 'LUNCH', 'DINNER', 'ALACARTE'];
  const { openPopup, closePopup } = usePopup();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isOpen) openPopup();
    else closePopup();
    return () => closePopup();
  });

  function toggleMeal(meal) {
    setAvailableForMeals(prev =>
      prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
    );
  }

  useEffect(() => {
    setCode(initial.code);
    setName(initial.name);
    setImage(initial.image);
    setDescription(initial.description);
    setSlug(initial.slug);
    setPrice(initial.price);
    setPortionType(initial.portionType);
    setItemCategory(initial.itemCategory);
    setAvailableForMeals(initial.availableForMeals);
  }, [initial]);

  async function handleUpdate() {
    setError('');
    try {
      await axios.put(`${API_URL}/beverages/${initial.beverageId}`, {
        code,
        name,
        image,
        description,
        slug,
        price,
        portionType,
        itemCategory,
        availableForMeals,
      });
      onSuccess('Beverage updated successfully.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl border border-gray-200 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 rounded-t-xl border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Edit Beverage</h2>
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Beverage ID Display */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">#{initial.beverageId}</span>
              </div>
              <div>
                <span className="text-sm text-blue-600 font-medium">Beverage ID</span>
                <p className="text-lg font-bold text-blue-900">#{initial.beverageId}</p>
              </div>
            </div>
          </div>

          {/* Current Image Display */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img
                src={image || initial.image || 'https://via.placeholder.com/150'}
                alt="Beverage preview"
                className="w-40 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                Current
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Beverage Code
              </label>
              <input
                id="code"
                type="text"
                placeholder="Enter beverage code"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Unique identifier for this beverage</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Beverage Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter beverage name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Display name for the menu</p>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">₹</span>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={price}
                  onChange={e => setPrice(+e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Selling price per serving</p>
            </div>

            <div>
              <label htmlFor="itemCategory" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                id="itemCategory"
                type="text"
                placeholder="e.g., Hot Beverage, Cold Drink"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={itemCategory}
                onChange={e => setItemCategory(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Beverage category or type</p>
            </div>

            <div>
              <label htmlFor="portionType" className="block text-sm font-medium text-gray-700 mb-2">
                Portion Type
              </label>
              <input
                id="portionType"
                type="text"
                placeholder="e.g., Glass, Bottle, Cup"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={portionType}
                onChange={e => setPortionType(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Serving size or container type</p>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                id="slug"
                type="text"
                placeholder="e.g., iced-coffee"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={slug}
                onChange={e => setSlug(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">URL-friendly identifier</p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                id="image"
                type="url"
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={image}
                onChange={e => setImage(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">URL of the beverage image for display</p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                placeholder="Enter beverage description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Brief description of the beverage</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available For Meals
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {meals.map(meal => (
                  <label key={meal} className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availableForMeals.includes(meal)}
                      onChange={() => toggleMeal(meal)}
                      className="sr-only"
                    />
                    <div className={`w-full p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                      availableForMeals.includes(meal)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}>
                      {meal}
                    </div>
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">Select which meals this beverage is available for</p>
            </div>
          </div>

          {/* Price Comparison */}
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm text-orange-600 font-medium">Price Change</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-orange-800">₹{initial.price.toFixed(2)}</span>
                    <svg className="h-3 w-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-bold text-orange-800">₹{price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {price !== initial.price && (
                <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                  price > initial.price 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {price > initial.price ? '+' : ''}₹{(price - initial.price).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              onClick={handleUpdate}
            >
              Update Beverage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}