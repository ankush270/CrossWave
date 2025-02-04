import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaImage,
  FaTags,
  FaBox,
  FaUpload,
} from "react-icons/fa";
import DashboardBackground from "../common/DashboardBackground";

const SellerProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState("grid");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      category: "Electronics",
      price: 1299,
      stock: 45,
      status: "active",
      image: "https://placehold.co/300x300",
      sales: 128,
      description: "High-quality premium headphones with noise cancellation.",
    },
    // Add more products...
  ]);

  const [data, setData] = useState({
    name: "",
    overview: "",
    category: "",
    stock: 0,
    images: [],
    origin: "",
    pricing: {
      sample: {
        price: 0,
        moq: 0,
      },
      standard: {
        price: 0,
        moq: 0,
      },
      premium: {
        price: 0,
        moq: 0,
      },
    },
    specifications: {
      technical: [{ key: "", value: "" }],
      physical: [{ key: "", value: "" }],
    },
  });

  const categories = [
    "All Categories",
    "Electronics",
    "Components",
    "Accessories",
    "Tools",
  ];

  const origins = [
    "All Origins",
    "India",
    "China",
    "USA",
    "Germany",
    "Japan",
    "UK",
    "UAE",
    "Canada",
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
    setProducts(products.filter((p) => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    const productData = {
      // id: selectedProduct ? selectedProduct.id : Date.now(),
      name: data.name,
      category: data.category,
      stock: data.stock,
      images: data.images,
      origin: data.origin,
      pricing: data.pricing,
      specifications: data.specifications,
      overview: data.overview,
      status: "active",
      // sales: selectedProduct ? selectedProduct.sales : 0,
    };

    if (selectedProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...productData } : p
        )
      );
    } else {
      // Add new product
      setProducts([...products, productData]);
    }

    // Reset form data
    setData({
      name: "",
      overview: "",
      category: "",
      stock: 0,
      images: [],
      origin: "",
      pricing: {
        sample: { price: 0, moq: 0 },
        standard: { price: 0, moq: 0 },
        premium: { price: 0, moq: 0 },
      },
      specifications: {
        technical: [],
        physical: [],
      },
    });

    setShowAddModal(false);
    setSelectedProduct(null);
  };

  const handleImageChange = (e) => {
    const file = Array.from(e.target.files);
    setData((prev) => ({
      images: [...prev.images, ...file],
    }));
  };

  const handleSpecificationChange = (type, index, field, value) => {
    setData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [type]: prev.specifications[type].map((spec, i) =>
          i === index ? { ...spec, [field]: value } : spec
        ),
      },
    }));
  };

  const addNewSpecification = (type) => {
    setData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [type]: [...prev.specifications[type], { key: "", value: "" }],
      },
    }));
  };

  const removeSpecification = (type, index) => {
    setData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [type]: prev.specifications[type].filter((_, i) => i !== index),
      },
    }));
  };

  console.log(data.category);

  // Add this CSS at the beginning of your component
  const scrollbarHiddenStyles = {
    scrollbarWidth: "none" /* Firefox */,
    msOverflowStyle: "none" /* IE and Edge */,
    "&::-webkit-scrollbar": {
      display: "none" /* Chrome, Safari and Opera */,
    },
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
            {
              title: "Total Products",
              value: "156",
              icon: <FaBox />,
              color: "blue",
            },
            {
              title: "Active Listings",
              value: "142",
              icon: <FaTags />,
              color: "green",
            },
            {
              title: "Out of Stock",
              value: "14",
              icon: <FaBox />,
              color: "red",
            },
            {
              title: "Total Sales",
              value: "₹1.2M",
              icon: <FaTags />,
              color: "purple",
            },
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
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg ${
                    view === "grid" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded-lg ${
                    view === "list" ? "bg-white shadow-sm" : ""
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              {view === "grid" ? (
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
                      <span className="text-blue-600 font-bold">
                        ₹{product.price}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          product.stock > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
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
                    <p className="text-sm text-gray-600">
                      {product.stock} in stock
                    </p>
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
              onClick={() => setShowAddModal(false)}
              style={scrollbarHiddenStyles}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl mb-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white border-b px-6 py-4 rounded-t-xl z-10">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                      {selectedProduct ? "Edit Product" : "Add New Product"}
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
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-4">
                  <div className="space-y-6">
                    {/* Your existing form content */}
                    {/* Image Upload */}
                    <div className="border-2 border-dashed rounded-xl p-8 text-center relative">
                      <input
                        type="file"
                        name="productImage"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Upload product image"
                      />
                      {data.images && data.images.length ? (
                        <div className="relative h-48">
                          <img
                            src={URL.createObjectURL(data.images[0])}
                            alt="Product preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <>
                          <FaImage className="text-4xl text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">
                            Drag & drop product image here, or click to select
                          </p>
                          <button
                            type="button"
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 mx-auto pointer-events-none"
                          >
                            <FaUpload />
                            Upload Image
                          </button>
                        </>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            required
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            name="category"
                            value={data.category}
                            required
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                category: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Category</option>
                            {categories.slice(1).map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Stock
                          </label>
                          <input
                            type="number"
                            name="stock"
                            required
                            value={data.stock}
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                stock: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      {/* Pricing Section */}
                      <div className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium text-gray-900">
                          Pricing Options
                        </h4>

                        {/* Sample Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sample Price
                            </label>
                            <input
                              type="number"
                              value={data.pricing.sample.price}
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    sample: {
                                      ...prev.pricing.sample,
                                      price: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sample MOQ
                            </label>
                            <input
                              type="number"
                              value={data.pricing.sample.moq}
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    sample: {
                                      ...prev.pricing.sample,
                                      moq: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* Standard Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Standard Price
                            </label>
                            <input
                              type="number"
                              value={data.pricing.standard.price}
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    standard: {
                                      ...prev.pricing.standard,
                                      price: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Standard MOQ
                            </label>
                            <input
                              type="number"
                              value={data.pricing.standard.moq}
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    standard: {
                                      ...prev.pricing.standard,
                                      moq: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* Premium Pricing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Premium Price
                            </label>
                            <input
                              type="number"
                              value={data.pricing.premium.price}
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    premium: {
                                      ...prev.pricing.premium,
                                      price: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Premium MOQ
                            </label>
                            <input
                              type="number"
                              value={data.pricing.premium.moq}
                              required
                              onChange={(e) =>
                                setData((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    premium: {
                                      ...prev.pricing.premium,
                                      moq: Number(e.target.value),
                                    },
                                  },
                                }))
                              }
                              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Specifications */}
                      <div className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium text-gray-900">
                          Specifications
                        </h4>

                        {/* Technical Specs */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">
                              Technical Specifications
                            </label>
                            <button
                              type="button"
                              onClick={() => addNewSpecification("technical")}
                              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                              Add New
                            </button>
                          </div>
                          {data.specifications.technical.map((spec, index) => (
                            <div
                              key={index}
                              className="flex gap-4 items-center"
                            >
                              <div className="flex gap-4 items-center w-[90%]">
                                <input
                                  type="text"
                                  placeholder="Specification Name"
                                  value={spec.key}
                                  onChange={(e) =>
                                    handleSpecificationChange(
                                      "technical",
                                      index,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                  type="text"
                                  placeholder="Value"
                                  value={spec.value}
                                  onChange={(e) =>
                                    handleSpecificationChange(
                                      "technical",
                                      index,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeSpecification("technical", index)
                                  }
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Physical Specs */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="block text-sm font-medium text-gray-700">
                              Physical Specifications
                            </label>
                            <button
                              type="button"
                              onClick={() => addNewSpecification("physical")}
                              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                              Add New
                            </button>
                          </div>
                          {data.specifications.physical.map((spec, index) => (
                            <div
                              key={index}
                              className="flex gap-4 items-center"
                            >
                              <div className="flex gap-4 items-center w-[90%]">
                                <input
                                  type="text"
                                  placeholder="Specification Name"
                                  value={spec.key}
                                  onChange={(e) =>
                                    handleSpecificationChange(
                                      "physical",
                                      index,
                                      "key",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <input
                                  type="text"
                                  placeholder="Value"
                                  value={spec.value}
                                  onChange={(e) =>
                                    handleSpecificationChange(
                                      "physical",
                                      index,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeSpecification("physical", index)
                                  }
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Overview */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Overview
                        </label>
                        <textarea
                          value={data.overview}
                          required
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              overview: e.target.value,
                            }))
                          }
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-t px-6 py-4 rounded-b-xl">
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
                        {selectedProduct ? "Update Product" : "Add Product"}
                      </motion.button>
                    </div>
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
                  Are you sure you want to delete "{productToDelete?.name}"?
                  This action cannot be undone.
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
