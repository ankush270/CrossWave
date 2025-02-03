import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-red-600">Payment Failed ❌</h2>
        <p className="mt-2 text-gray-700">Unfortunately, your payment could not be processed. Please try again.</p>
        <button 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => navigate('/')}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;