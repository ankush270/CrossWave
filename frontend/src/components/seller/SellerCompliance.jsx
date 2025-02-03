import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  FaShieldAlt, FaCheckCircle, FaExclamationTriangle, 
  FaFileAlt, FaDownload, FaUpload, FaClock, FaTimes,
  FaCloudUploadAlt
} from 'react-icons/fa';
import DashboardBackground from '../common/DashboardBackground';
import {requiredDocumentsIndia, requiredDocumentsUAE} from "../../constants/documents.js"

const SellerCompliance = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("india");

  const documentList = selectedCountry === "india" ? requiredDocumentsIndia : requiredDocumentsUAE;

  const complianceStats = [
    {
      title: 'Overall Compliance',
      value: '92%',
      status: 'good',
      icon: <FaShieldAlt />,
      color: 'green'
    },
    {
      title: 'Pending Documents',
      value: '3',
      status: 'warning',
      icon: <FaFileAlt />,
      color: 'yellow'
    },
    {
      title: 'Last Audit',
      value: '15 days ago',
      status: 'good',
      icon: <FaClock />,
      color: 'blue'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Business License',
      status: 'verified',
      expiryDate: '2025-12-31',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Tax Registration',
      status: 'pending',
      expiryDate: '2024-12-31',
      lastUpdated: '2024-02-01'
    },
    // Add more documents...
  ];




  const handleUploadClick = () => {
    setSelectedDocType('');
    setShowUploadModal(true);
  };

  const handleFileUpload = (file) => {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // Add document to uploaded documents list
        const newDoc = {
          id: Date.now(),
          name: selectedDocType || file.name,
          status: 'pending',
          expiryDate: '2025-12-31',
          lastUpdated: new Date().toISOString().split('T')[0],
          file: file
        };
        setUploadedDocuments(prev => [...prev, newDoc]);
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadProgress(0);
        }, 500);
      }
    }, 300);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [selectedDocType]);

  const handleManualUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,.jpg,.jpeg,.png';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileUpload(file);
      }
    };
    fileInput.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  return (
    <div className="relative min-h-screen">
      <DashboardBackground />
      
      {/* Main Content */}
      <div className="relative z-10 space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Compliance Management</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <FaUpload />
            Upload Document
          </motion.button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {complianceStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className={`bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-${stat.color}-100`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <span className={`text-sm ${
                    stat.status === 'good' ? 'text-green-500' : 'text-yellow-500'
                  }`}>
                    {stat.status === 'good' ? 'Good Standing' : 'Needs Attention'}
                  </span>
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

        {/* Documents Section with Required Documents List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>

            <select
              className="mb-4 p-2 border rounded-lg"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="india">India</option>
              <option value="uae">UAE</option>
            </select>

            <div className="space-y-4">
              {documentList.map((doc) => {
                const isUploaded = uploadedDocuments.some(
                  uploaded => uploaded.name === doc.name
                );
                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {doc.name}
                        {doc.required && (
                          <span className="text-xs text-red-500">*Required</span>
                        )}
                        {isUploaded && (
                          <FaCheckCircle className="text-green-500" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedDocType(doc.name);
                        setShowUploadModal(true);
                      }}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        isUploaded 
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      <FaUpload />
                      {isUploaded ? 'Update' : 'Upload'}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Uploaded Documents - Right Side */}
          <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
            {uploadedDocuments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="text-left py-3 px-4">Document</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Last Updated</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedDocuments.map((doc) => (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                        className="border-t"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FaFileAlt className="text-gray-400" />
                            {doc.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            doc.status === 'verified'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{doc.lastUpdated}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                              onClick={() => {
                                // Handle download
                                const url = URL.createObjectURL(doc.file);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = doc.name;
                                a.click();
                              }}
                            >
                              <FaDownload />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                              onClick={() => {
                                setSelectedDocType(doc.name);
                                setShowUploadModal(true);
                              }}
                            >
                              <FaUpload />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No documents uploaded yet
              </div>
            )}
          </div>
        </div>

        {/* Compliance Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-4">Compliance Guidelines</h3>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Ensure all your documents are up to date and comply with our platform's guidelines.
              Regular updates help maintain your seller status and build trust with buyers.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upload {selectedDocType}</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FaTimes />
                </button>
              </div>

              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-blue-500">Drop the file here</p>
                ) : (
                  <div>
                    <p className="text-gray-600">
                      Drag & drop a file here, or click to select
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: PDF, JPG, PNG (max 5MB)
                    </p>
                  </div>
                )}
              </div>

              {uploadProgress > 0 && (
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleManualUpload}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                  <FaUpload />
                  Upload Document
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerCompliance; 