import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileContract, FaFileSignature, FaFileUpload, FaDownload,
  FaEye, FaPrint, FaSearch, FaFilter, FaCalendarAlt,
  FaExclamationTriangle, FaCheckCircle, FaClock, FaTrash
} from 'react-icons/fa';

const BuyerContracts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showContractDetails, setShowContractDetails] = useState(false);

  const contracts = [
    {
      id: 'CNT001',
      title: 'Annual Supply Agreement',
      supplier: 'Tech Components Ltd',
      type: 'Supply Agreement',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      value: '₹2,500,000',
      documents: [
        { name: 'Main Contract.pdf', size: '2.4 MB' },
        { name: 'Terms & Conditions.pdf', size: '1.1 MB' }
      ]
    },
    {
      id: 'CNT002',
      title: 'Bulk Purchase Agreement',
      supplier: 'Display Solutions Inc',
      type: 'Purchase Agreement',
      status: 'pending',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      value: '₹1,800,000',
      documents: [
        { name: 'Purchase Agreement.pdf', size: '3.2 MB' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'expired': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search contracts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <FaFileUpload />
            Upload Contract
          </motion.button>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Contract ID</th>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Supplier</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Value</th>
                <th className="text-left py-3 px-4">Valid Until</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <motion.tr
                  key={contract.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  className="border-t border-gray-100"
                >
                  <td className="py-3 px-4 font-medium">{contract.id}</td>
                  <td className="py-3 px-4">{contract.title}</td>
                  <td className="py-3 px-4">{contract.supplier}</td>
                  <td className="py-3 px-4">{contract.type}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{contract.value}</td>
                  <td className="py-3 px-4">{contract.endDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedContract(contract);
                          setShowContractDetails(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <FaEye />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                      >
                        <FaDownload />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contract Details Modal */}
      {showContractDetails && selectedContract && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setShowContractDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedContract.title}</h3>
                  <p className="text-sm text-gray-500">Contract ID: {selectedContract.id}</p>
                </div>
                <button
                  onClick={() => setShowContractDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Supplier</p>
                  <p className="font-medium">{selectedContract.supplier}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{selectedContract.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedContract.status)}`}>
                    {selectedContract.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Value</p>
                  <p className="font-medium">{selectedContract.value}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{selectedContract.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{selectedContract.endDate}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Documents</p>
                <div className="space-y-2">
                  {selectedContract.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FaFileContract className="text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                      >
                        <FaDownload />
                      </motion.button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2"
                >
                  <FaPrint />
                  Print
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                  <FaFileSignature />
                  Sign Contract
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BuyerContracts; 