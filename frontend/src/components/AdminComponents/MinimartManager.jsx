import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const MinimartManager = () => {
  const apiStart = "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Add category filter state
  const [categories, setCategories] = useState([]); // Store unique categories

  useEffect(() => {
    fetchProducts();
  }, []);

  // Extract unique categories from products
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiStart}/api/minimart/products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error);
      alert('Failed to fetch products. Please check your connection and try again.');
    }
  };

  const handleSave = async (productData) => {
    try {
      console.log('Sending product data:', productData);
      
      if (selectedProduct) {
        const response = await axios.put(
          `${apiStart}/api/minimart/products/${selectedProduct._id}`,
          productData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
          }
        );
        console.log('Update response:', response.data);
      } else {
        const response = await axios.post(
          `${apiStart}/api/minimart/products`,
          productData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
          }
        );
        console.log('Create response:', response.data);
      }
      
      await fetchProducts();
      setShowForm(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error saving product:', error.response?.data || error);
      alert(`Failed to save product: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${apiStart}/api/minimart/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
        });
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error.response?.data || error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleCloseForm = () => {
    setSelectedProduct(null);
    setShowForm(false);
  };

  // Filter products based on both search term and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1 className="text-3xl mb-6">Minimart Manager</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
      >
        Add New Product
      </button>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Category Filter */}
        <div className="w-full md:w-64">
          <select
            className="border rounded-lg px-4 py-2 w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.sort().map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ProductList 
        products={filteredProducts} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      
      {showForm && (
        <ProductForm 
          product={selectedProduct} 
          onSave={handleSave} 
          onClose={handleCloseForm} 
        />
      )}
    </div>
  );
};

export default MinimartManager;
