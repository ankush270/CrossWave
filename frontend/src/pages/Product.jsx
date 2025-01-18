import React, { useState } from 'react';
import { motion } from 'framer-motion';
import earbuds from '../assets/earbuds.jpg';
import {
  FaSearch,
  FaMicrophone,
  FaFilter,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaShare,
  FaArrowLeft,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';

const Product = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [showQuickView, setShowQuickView] = useState(null);

  // Electronic categories
  const categories = [
    'All',
    'Smartphones',
    'Laptops',
    'Audio',
    'Gaming',
    'Cameras',
    'Smart Home',
    'Accessories',
    'TVs',
    'Tablets'
  ];

  // Sample electronic products data
  const products = [
    {
      id: 1,
      name: 'iPhone 14 Pro Max',
      price: 1099,
      rating: 4.8,
      reviews: 256,
      seller: 'Apple Store',
      location: 'California',
      image:{earbuds},
        category: 'Smartphones',
      specs: {
        storage: '256GB',
        color: 'Deep Purple',
        screen: '6.7-inch'
      }
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      price: 1999,
      rating: 4.9,
      reviews: 189,
      seller: 'Apple Store',
      location: 'California',
      image:{earbuds},      
      category: 'Laptops',
      specs: {
        processor: 'M2 Pro',
        ram: '16GB',
        storage: '512GB'
      }
    },
    {
      id: 3,
      name: 'Sony WH-1000XM4',
      price: 349,
      rating: 4.7,
      reviews: 432,
      seller: 'Sony Electronics',
      location: 'New York',
      image:{earbuds},      
      category: 'Audio',
      specs: {
        type: 'Wireless Headphones',
        battery: '30 hours',
        anc: 'Yes'
      }
    },
    {
      id: 4,
      name: 'PlayStation 5',
      price: 499,
      rating: 4.8,
      reviews: 876,
      seller: 'Sony Gaming',
      location: 'Tokyo',
      image:{earbuds},      
      category: 'Gaming',
      specs: {
        storage: '825GB SSD',
        resolution: '4K',
        type: 'Digital Edition'
      }
    },
    {
      id: 5,
      name: 'Samsung 65" QLED 4K TV',
      price: 1299,
      rating: 4.6,
      reviews: 345,
      seller: 'Samsung Electronics',
      location: 'Seoul',
      image:{earbuds},      
      category: 'TVs',
      specs: {
        resolution: '4K',
        type: 'QLED',
        size: '65 inch'
      }
    },
    {
      id: 6,
      name: 'iPad Pro 12.9"',
      price: 1099,
      rating: 4.7,
      reviews: 289,
      seller: 'Apple Store',
      location: 'California',
      image:{earbuds},      
      category: 'Tablets',
      specs: {
        screen: '12.9-inch',
        chip: 'M2',
        storage: '256GB'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          {/* Search Bar */}
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search electronics, brands, or categories..."
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <FaMicrophone size={20} />
              </button>
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <FaSearch size={20} />
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center gap-6 mt-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`whitespace-nowrap px-4 py-1 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>${priceRange.min}</span>
                  <span>${priceRange.max}</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Brand</h4>
                <div className="space-y-2">
                  {['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP'].map((brand) => (
                    <label key={brand} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-blue-500" />
                      <span className="text-sm text-gray-600">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Rating</h4>
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 mb-1">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <div className="flex items-center">
                      {[...Array(rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Condition</h4>
                <div className="space-y-2">
                  {['New', 'Refurbished', 'Used - Like New', 'Used - Good'].map((condition) => (
                    <label key={condition} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-blue-500" />
                      <span className="text-sm text-gray-600">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Electronics</h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Sort by Popularity</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Latest Arrivals</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square">
                    <img
                      src={earbuds}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100">
                        <FaHeart className="text-gray-400 hover:text-red-500" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-xs text-blue-500 font-medium mb-1">{product.category}</div>
                    <h3 className="font-medium text-lg mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex items-center text-yellow-400">
                        <FaStar />
                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">${product.price}</span>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt size={12} />
                        {product.seller} • {product.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <div className="flex items-start gap-6">
              <div className="w-1/2">
                <img
                  src={products[showQuickView - 1].image}
                  alt={products[showQuickView - 1].name}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="w-1/2">
                <h3 className="text-xl font-semibold mb-2">{products[showQuickView - 1].name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-600">{products[showQuickView - 1].rating}</span>
                  </div>
                  <span className="text-gray-500">({products[showQuickView - 1].reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold mb-4">${products[showQuickView - 1].price}</div>
                <div className="space-y-4">
                  <h4 className="font-medium">Specifications:</h4>
                  <ul className="space-y-2">
                    {Object.entries(products[showQuickView - 1].specs).map(([key, value]) => (
                      <li key={key} className="text-sm text-gray-600">
                        <span className="font-medium capitalize">{key}:</span> {value}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Add to Cart
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowQuickView(null)}
            >
              <FaArrowLeft size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product; 