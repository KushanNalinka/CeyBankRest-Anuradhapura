
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaTimes } from 'react-icons/fa';
// import { usePopup } from '../../context/PopupContext';

// export default function CreateInventoryItem({ isOpen, onClose, onSuccess }) {
//   const [itemCode, setItemCode] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [description, setDescription] = useState('');
//   const [slug, setSlug] = useState('');
//   const [quantity, setQuantity] = useState(0);
//   const [unit, setUnit] = useState('');
//   const [category, setCategory] = useState('');
//   const [reOrderLevel, setReOrderLevel] = useState(0);
//   const [maximumReorderLevel, setMaximumReorderLevel] = useState(0);
//   const [image, setImage] = useState('');
//   const [error, setError] = useState('');

//   const { openPopup, closePopup } = usePopup();
//  const API= process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     if (isOpen) openPopup();
//     else closePopup();
//     return () => closePopup();
//   });

//   async function handleCreate() {
//     try {
//       setError('');
//       await axios.post(`${API}/v1/InventoryItem/add`, {
//         itemCode,
//         itemName,
//         description,
//         slug,
//         quantity,
//         unit,
//         category,
//         reOrderLevel,
//         maximumReorderLevel,
//         image,
//       });
//       onSuccess('Item created.');
//       onClose();
//     } catch {
//       setError('Create failed.');
//     }
//   }

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
//       <div className="absolute inset-0 bg-black/30" onClick={onClose} />
//       <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
//         <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
//           <FaTimes />
//         </button>

//         <h2 className="text-xl font-medium mb-4">Create Inventory Item</h2>
//         {error && <p className="mb-2 text-red-600">{error}</p>}

//         <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
//           <div><label className="block mb-1 text-sm font-medium">Item Code</label><input className="w-full border rounded p-2" value={itemCode} onChange={(e) => setItemCode(e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Item Name</label><input className="w-full border rounded p-2" value={itemName} onChange={(e) => setItemName(e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Description</label><input className="w-full border rounded p-2" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Slug</label><input className="w-full border rounded p-2" value={slug} onChange={(e) => setSlug(e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Quantity</label><input type="number" className="w-full border rounded p-2" value={quantity} onChange={(e) => setQuantity(+e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Unit</label><input className="w-full border rounded p-2" value={unit} onChange={(e) => setUnit(e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Category</label><input className="w-full border rounded p-2" value={category} onChange={(e) => setCategory(e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Re-order Level</label><input type="number" className="w-full border rounded p-2" value={reOrderLevel} onChange={(e) => setReOrderLevel(+e.target.value)} /></div>
//           <div><label className="block mb-1 text-sm font-medium">Max Re-order Level</label><input type="number" className="w-full border rounded p-2" value={maximumReorderLevel} onChange={(e) => setMaximumReorderLevel(+e.target.value)} /></div>
//           <div className="col-span-2"><label className="block mb-1 text-sm font-medium">Image URL</label><input className="w-full border rounded p-2" value={image} onChange={(e) => setImage(e.target.value)} /></div>
//         </div>

//         <div className="mt-4 flex justify-end space-x-2">
//           <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
//           <button className="px-4 py-2 rounded bg-green-500 text-white" onClick={handleCreate}>Create</button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { usePopup } from '../../context/PopupContext';

export default function CreateInventoryItem({ isOpen, onClose, onSuccess }) {
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [reOrderLevel, setReOrderLevel] = useState(0);
  const [maximumReorderLevel, setMaximumReorderLevel] = useState(0);
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const { openPopup, closePopup } = usePopup();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isOpen) openPopup();
    else closePopup();
    return () => closePopup();
  });

  async function handleCreate() {
    try {
      setError('');
      await axios.post(`${API}/v1/InventoryItem/add`, {
        itemCode,
        itemName,
        description,
        slug,
        quantity,
        unit,
        category,
        reOrderLevel,
        maximumReorderLevel,
        image,
      });
      onSuccess('Inventory item created successfully.');
      onClose();
    } catch {
      setError('Create failed.');
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
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Create New Inventory Item</h2>
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

          {/* Image Preview */}
          {image && (
            <div className="mb-6 flex justify-center">
              <img
                src={image}
                alt="Item preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700 mb-2">
                Item Code
              </label>
              <input
                id="itemCode"
                type="text"
                placeholder="Enter item code (e.g., INV001)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Unique identifier for this inventory item</p>
            </div>

            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-2">
                Item Name
              </label>
              <input
                id="itemName"
                type="text"
                placeholder="Enter item name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Display name for the inventory item</p>
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Current Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={quantity}
                onChange={(e) => setQuantity(+e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Current stock quantity</p>
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unit of Measurement
              </label>
              <input
                id="unit"
                type="text"
                placeholder="e.g., kg, pcs, liters"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Unit for measuring this item</p>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                id="category"
                type="text"
                placeholder="e.g., Raw Materials, Supplies"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Item category for organization</p>
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                id="slug"
                type="text"
                placeholder="e.g., raw-material-flour"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">URL-friendly identifier</p>
            </div>

            <div>
              <label htmlFor="reOrderLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Re-order Level
              </label>
              <input
                id="reOrderLevel"
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={reOrderLevel}
                onChange={(e) => setReOrderLevel(+e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Minimum stock level before reordering</p>
            </div>

            <div>
              <label htmlFor="maximumReorderLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Re-order Level
              </label>
              <input
                id="maximumReorderLevel"
                type="number"
                min="0"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                value={maximumReorderLevel}
                onChange={(e) => setMaximumReorderLevel(+e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Maximum stock level to maintain</p>
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
                onChange={(e) => setImage(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">URL of the item image for display</p>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                placeholder="Enter item description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">Brief description of the inventory item</p>
            </div>
          </div>

          {/* Stock Level Preview */}
          {quantity > 0 && reOrderLevel > 0 && (
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-purple-800 font-medium">Stock Level Analysis</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-purple-600">Current Stock</p>
                  <p className="text-lg font-bold text-purple-900">{quantity} {unit}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-purple-600">Re-order Level</p>
                  <p className="text-lg font-bold text-purple-900">{reOrderLevel} {unit}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-purple-600">Stock Status</p>
                  <p className={`text-sm font-bold ${
                    quantity <= reOrderLevel ? 'text-red-600' : 
                    quantity <= reOrderLevel * 1.5 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {quantity <= reOrderLevel ? 'Low Stock' : 
                     quantity <= reOrderLevel * 1.5 ? 'Medium Stock' : 'Good Stock'}
                  </p>
                </div>
              </div>
            </div>
          )}
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
              onClick={handleCreate}
            >
              Create Inventory Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
