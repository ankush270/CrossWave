import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, FaSearch, FaFilter, FaEdit, FaTrash, 
  FaEllipsisV, FaImage, FaTags, FaBox, FaUpload 
} from 'react-icons/fa';
import DashboardBackground from '../common/DashboardBackground';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
      id: selectedProduct ? selectedProduct.id : Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      description: formData.get('description'),
      status: 'active',
      image: 'https://placehold.co/300x300', // Replace with actual image upload
      sales: 0
    };

    if (selectedProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Add new product
      setProducts([...products, productData]);
    }

    setShowAddModal(false);
    setSelectedProduct(null);
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
            onClick={() => setShowAddModal(true)}
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

        {/* Add/Edit Product Modal */}
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
                    {selectedProduct ? 'Edit Product' : 'Add New Product'}
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

                  {/* Product Details */}
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
                      {selectedProduct ? 'Update Product' : 'Add Product'}
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
      </div>
    </div>
  );
};

export default SellerProducts; 