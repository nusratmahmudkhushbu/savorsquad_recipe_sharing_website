
// import React from 'react';

// const ProductList = ({ products = [], onEdit, onDelete }) => {
//   if (!Array.isArray(products) || products.length === 0) {
//     return <p className="text-gray-500">No products available.</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl mb-4">Product List</h2>
//       <table className="w-full table-auto min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//         <thead className="ltr:text-left rtl:text-right">
//           <tr>
//             <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
//             <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Description</th>
//             <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Price</th>
//             <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
//             <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
//             {/* <th className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image URL</th> */}
//             <th className="px-4 py-2"></th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {products.map((product) => (
//             <tr key={product._id}>
//               <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.name}</td>
//               <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.description}</td>
//               <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">${product.price}</td>
//               <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.quantityInStock}</td>
//               <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.category}</td>
//               {/* <td className="border whitespace-nowrap px-4 py-2 font-medium text-gray-900">{product.imageUrl}</td> */}
//               <td className="whitespace-nowrap px-4 py-2">
//                 <button
//                   onClick={() => onEdit(product)}
//                   className="inline-block rounded bg-indigo-600 px-4 py-2 mx-2 text-xs font-medium text-white hover:bg-indigo-700"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => onDelete(product._id)}
//                   className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;
// import React from 'react';

// const ProductList = ({ products, onEdit, onDelete }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       {products.map((product) => (
//         <div key={product._id} className="border rounded-lg p-4 shadow">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="w-full h-48 object-cover mb-4 rounded"
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
//             }}
//           />
//           <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//           <p className="text-gray-600 mb-2">{product.description}</p>
//           <p className="text-lg font-bold text-indigo-600 mb-2">
//             ৳{product.price}
//           </p>
//           <p className="text-sm text-gray-500 mb-2">
//             Stock: {product.quantityInStock} {product.unit}
//           </p>
//           <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
//           <div className="flex justify-end space-x-2">
//             <button
//               onClick={() => onEdit(product)}
//               className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => onDelete(product._id)}
//               className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
  if (!products.length) {
    return <p className="text-gray-500">No products available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product._id} className="border rounded-lg p-4 shadow">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-lg font-bold text-indigo-600 mb-2">
            ৳{product.price}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Stock: {product.quantityInStock} {product.unit}
          </p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;