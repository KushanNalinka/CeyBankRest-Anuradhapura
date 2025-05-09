


import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import { usePopup } from '../../context/PopupContext';

export default function EditInventoryItem({ initial, isOpen, onClose, onSuccess }) {
  const [itemCode, setItemCode] = useState(initial.itemCode);
  const [itemName, setItemName] = useState(initial.itemName);
  const [description, setDescription] = useState(initial.description);
  const [slug, setSlug] = useState(initial.slug);
  const [quantity, setQuantity] = useState(initial.quantity);
  const [unit, setUnit] = useState(initial.unit);
  const [category, setCategory] = useState(initial.category);
  const [reOrderLevel, setReOrderLevel] = useState(initial.reOrderLevel);
  const [maximumReorderLevel, setMaximumReorderLevel] = useState(initial.maximumReorderLevel);
  const [image, setImage] = useState(initial.image);
  const [error, setError] = useState('');

  const { openPopup, closePopup } = usePopup();
  const API = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (isOpen) openPopup();
    else closePopup();
    return () => closePopup();
  });

  useEffect(() => {
    setItemCode(initial.itemCode);
    setItemName(initial.itemName);
    setDescription(initial.description);
    setSlug(initial.slug);
    setQuantity(initial.quantity);
    setUnit(initial.unit);
    setCategory(initial.category);
    setReOrderLevel(initial.reOrderLevel);
    setMaximumReorderLevel(initial.maximumReorderLevel);
    setImage(initial.image);
  }, [initial]);

  async function handleUpdate() {
    try {
      setError('');
      await axios.put(`${API}/v1/InventoryItem/update/${initial.id}`, {
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
      onSuccess('Item updated.');
      onClose();
    } catch {
      setError('Update failed.');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl p-6 w-[90vw] h-[80vh] shadow-lg overflow-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-medium mb-4">Edit Inventory Item</h2>
        {error && <p className="mb-2 text-red-600">{error}</p>}

        <div className="grid grid-cols-2 gap-4 whitespace-nowrap">
          {/* left column */}
          <div>
            <label className="block mb-1 text-sm font-medium">Item Code</label>
            <input className="w-full border rounded p-2" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Item Name</label>
            <input className="w-full border rounded p-2" value={itemName} onChange={(e) => setItemName(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <input className="w-full border rounded p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Slug</label>
            <input className="w-full border rounded p-2" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Quantity</label>
            <input type="number" className="w-full border rounded p-2" value={quantity} onChange={(e) => setQuantity(+e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Unit</label>
            <input className="w-full border rounded p-2" value={unit} onChange={(e) => setUnit(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <input className="w-full border rounded p-2" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Re-order Level</label>
            <input type="number" className="w-full border rounded p-2" value={reOrderLevel} onChange={(e) => setReOrderLevel(+e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Max Re-order Level</label>
            <input type="number" className="w-full border rounded p-2" value={maximumReorderLevel} onChange={(e) => setMaximumReorderLevel(+e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium">Image URL</label>
            <input className="w-full border rounded p-2" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}
