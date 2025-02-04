import React from 'react';
import { motion } from 'framer-motion';

const ProductGallery = ({ product, selectedImage, setSelectedImage }) => {
  if (!product.images || product.images.length === 0) {
    return (
      <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-white shadow-lg">
        <img 
          src={product.images[selectedImage]} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {product.images.map((image, index) => (
          <motion.button
            key={index}
            className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-blue-500' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
          </motion.button>
        ))}
      </div>
    </>
  );
};

export default ProductGallery; 