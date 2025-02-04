import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, 
  FaEllipsisV, FaImage, FaTags, FaBox, FaUpload, FaTimes 
} from 'react-icons/fa';
import DashboardBackground from '../common/DashboardBackground';
import axios from 'axios';

const SellerProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('grid');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Premium Headphones',
      category: 'Electronics',
      price: 1299,
      stock: 45,
      status: 'active',
      image: 'https://placehold.co/300x300',
      sales: 128,
      description: 'High-quality premium headphones with noise cancellation.'
    },
    // Add more products...
  ]);

  const categories = [
    'All Categories',
    'Electronics',
    'Components',
    'Accessories',
    'Tools'
  ];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    overview: '',
    category: '',
    stock: '',
    images: [],
    origin: '',
    moq: '',
    pricing: {
      sample: {
        quantity: '',
        price: '',
        moq: '',
        features: []
      },
      standard: {
        quantity: '',
        price: '',
        moq: '',
        features: []
      },
      premium: {
        quantity: '',
        price: '',
        moq: '',
        features: []
      }
    },
    specifications: {
      technical: {},
      physical: {}
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePricingChange = (tier, field, value) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [tier]: {
          ...prev.pricing[tier],
          [field]: value
        }
      }
    }));
  };

  const handleSpecificationChange = (type, key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [type]: {
          ...prev.specifications[type],
          [key]: value
        }
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Handle image upload logic here
    // You might want to use FormData to upload images to your server
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/products/add', formData, {
        headers: {
          'Content-Type': 'application/json',
          // Add your authentication token here
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess('Product added successfully!');
      setShowForm(false);
      // Reset form or handle success
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <DashboardBackground />
      
      {/* Main Content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <FaPlus />
            Add Product
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Products', value: '156', icon: <FaBox />, color: 'blue' },
            { title: 'Active Listings', value: '142', icon: <FaTags />, color: 'green' },
            { title: 'Out of Stock', value: '14', icon: <FaBox />, color: 'red' },
            { title: 'Total Sales', value: '₹1.2M', icon: <FaTags />, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-${stat.color}-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                  <span className={`text-${stat.color}-500 text-xl`}>
                    {stat.icon}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg ${
                    view === 'grid' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg ${
                    view === 'list' ? 'bg-white shadow-sm' : ''
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {view === 'grid' ? (
                // Grid View
                <div>
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <button 
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                        onClick={() => handleEdit(product)}
                      >
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-blue-600 font-bold">₹{product.price}</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(product)}
                        className="px-4 py-2 text-red-500 border border-red-500 rounded-lg"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                // List View
                <div className="flex items-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">₹{product.price}</p>
                    <p className="text-sm text-gray-600">{product.stock} in stock</p>
                  </div>
                  <div className="ml-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(product)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Add/Edit Order Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">
                    {selectedProduct ? 'Edit Order' : 'Add New Order'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedProduct(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaEllipsisV />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div className="border-2 border-dashed rounded-xl p-8 text-center">
                    <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Drag & drop product image here, or click to select
                    </p>
                    <button type="button" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 mx-auto">
                      <FaUpload />
                      Upload Image
                    </button>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={selectedProduct?.name}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select 
                        name="category"
                        defaultValue={selectedProduct?.category}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {categories.slice(1).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={selectedProduct?.price}
                        required
                        min="0"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        defaultValue={selectedProduct?.stock}
                        required
                        min="0"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      defaultValue={selectedProduct?.description}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setSelectedProduct(null);
                      }}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                    >
                      {selectedProduct ? <FaEdit /> : <FaPlus />}
                      {selectedProduct ? 'Update Order' : 'Add Order'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
                <p className="text-gray-600">
                  Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Add New Product</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="computing">Computing</option>
                      <option value="mobile">Mobile Devices</option>
                      {/* Add more categories */}
                    </select>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Overview
                  </label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Stock and MOQ */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Order Quantity
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="moq"
                      value={formData.moq}
                      onChange={(e) => {
                        // Prevent negative values
                        const value = Math.max(0, parseInt(e.target.value) || 0);
                        setFormData(prev => ({
                          ...prev,
                          moq: value
                        }));
                      }}
                      min="1" // Set minimum value to 1
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      onKeyPress={(e) => {
                        // Prevent negative sign and decimal point
                        if (e.key === '-' || e.key === '.') {
                          e.preventDefault();
                        }
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum order quantity must be at least 1
                    </p>
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Pricing Tiers</h3>
                  {['sample', 'standard', 'premium'].map((tier) => (
                    <div key={tier} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-medium capitalize mb-4">{tier} Pricing</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Quantity Range</label>
                          <input
                            type="text"
                            value={formData.pricing[tier].quantity}
                            onChange={(e) => handlePricingChange(tier, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., 1-10 units"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Price per Unit</label>
                          <input
                            type="text"
                            value={formData.pricing[tier].price}
                            onChange={(e) => handlePricingChange(tier, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="e.g., $99.99"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">MOQ for Tier</label>
                          <input
                            type="number"
                            value={formData.pricing[tier].moq}
                            onChange={(e) => {
                              // Prevent negative values
                              const value = Math.max(1, parseInt(e.target.value) || 1);
                              handlePricingChange(tier, 'moq', value);
                            }}
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            onKeyPress={(e) => {
                              // Prevent negative sign and decimal point
                              if (e.key === '-' || e.key === '.') {
                                e.preventDefault();
                              }
                            }}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Minimum value: 1
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <FaUpload className="text-3xl text-gray-400 mb-2" />
                      <span className="text-gray-600">Click to upload images</span>
                      <span className="text-sm text-gray-500">or drag and drop</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Adding Product...' : 'Add Product'}
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
                {success && (
                  <div className="text-green-500 text-sm mt-2">{success}</div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProducts; 