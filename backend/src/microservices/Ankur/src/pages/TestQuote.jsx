import React, { useState } from 'react';
import RequestQuote from '../components/RequestQuote';

const TestQuote = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Test product data
  const testProduct = {
    _id: '123',
    name: 'Test Product',
    price: 100,
    moq: 10,
    image: 'https://via.placeholder.com/150' // Using placeholder image for testing
  };

  return (
    <div className="p-8">
      <button 
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Open Quote Request
      </button>

      <RequestQuote 
        product={testProduct}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default TestQuote; 