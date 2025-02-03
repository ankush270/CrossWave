import React from 'react';
import { useNavigate } from 'react-router-dom';


const EKYC = () => {
  const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center justify-center mt-32 px-4 '>
      {/* Title */}
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Secure E-KYC Verification</h1>
      
      {/* Description */}
      <p className='text-gray-600 text-center max-w-md mb-6'>
        To maintain trust and transparency, we verify every buyer and seller through E-KYC. This ensures a scam-free environment, preventing fraudulent activities in our import-export marketplace.
      </p>

      {/* Start Button */}
      <div className='flex items-center justify-center'>
        <button onClick={() => navigate('/kyc')} className='bg-gradient-to-r from-blue-600/90 to-purple-700/90 w-64 text-white rounded-xl py-4 px-4 text-lg font-semibold shadow-md hover:scale-105 transition-transform'>
          Start E-KYC
        </button>
      </div>
    </div>
  );
};

export default EKYC;
