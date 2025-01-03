
// import React, { useState, useEffect } from 'react';

// const ProductForm = ({ product, onSave, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     quantityInStock: '',
//     category: '',
//     imageUrl: '',
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name || '',
//         description: product.description || '',
//         price: product.price || '',
//         quantityInStock: product.quantityInStock || '',
//         category: product.category || '',
//         imageUrl: product.imageUrl || '',
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//         <h2 className="text-2xl mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Quantity In Stock</label>
//             <input
//               type="number"
//               name="quantityInStock"
//               value={formData.quantityInStock}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//             <input
//               type="text"
//               name="imageUrl"
//               value={formData.imageUrl}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2 w-full"
//               required
//             />
//           </div>
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;
import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantityInStock: 0,
    category: '',
    imageUrl: '',
    unit: '', // Added unit field
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        quantityInStock: product.quantityInStock || 0,
        category: product.category || '',
        imageUrl: product.imageUrl || '',
        unit: product.unit || '', // Added unit field
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === 'price' || name === 'quantityInStock' 
      ? Number(value) || 0 
      : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      price: Number(formData.price),
      quantityInStock: Number(formData.quantityInStock)
    };
    console.log('Submitting product data:', processedData);
    onSave(processedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4">{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            >
              <option value="">Select a unit</option>
              <option value="kg">Kilogram (kg)</option>
              <option value="g">Gram (g)</option>
              <option value="l">Liter (l)</option>
              <option value="ml">Milliliter (ml)</option>
              <option value="pcs">Pieces (pcs)</option>
              <option value="pack">Pack</option>
              <option value="box">Box</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity In Stock</label>
            <input
              type="number"
              name="quantityInStock"
              value={formData.quantityInStock}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              min="0"
              step="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;