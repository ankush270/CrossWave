import React from 'react';
import { motion } from "framer-motion";
import {
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaPlus,
  FaImage,
  FaUpload,
} from "react-icons/fa";

const AddProductModal = ({ 
  showModal, 
  setShowModal, 
  selectedProduct, 
  setSelectedProduct, 
  data, 
  setData, 
  handleSubmit,
  handleImageChange,
  handleSpecificationChange,
  addNewSpecification,
  removeSpecification,
  categories 
}) => {
  // Add this CSS for the modal
  const scrollbarHiddenStyles = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto py-6"
      onClick={() => setShowModal(false)}
      style={scrollbarHiddenStyles}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-2xl mx-4 shadow-2xl mb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-white border-b px-6 py-4 rounded-t-xl z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {selectedProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedProduct(null);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisV />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* Image Upload Section */}
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
                  
          {/* Rest of your form fields */}
          {/* ... Copy the form fields from your existing modal ... */}

          {/* Form Footer */}
          <div className="bg-white border-t px-6 py-4 rounded-b-xl">
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
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
  );
};

export default AddProductModal; 