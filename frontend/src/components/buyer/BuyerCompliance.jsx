import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaDownload,
  FaUpload,
  FaClock,
  FaTimes,
  FaCloudUploadAlt,
} from "react-icons/fa";
import {
  requiredDocumentsIndia,
  requiredDocumentsUAE,
} from "../../constants/documents.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
// import Document from "../../../../backend/src/microservices/DocUpload/models/document.model.js";
// import prisma from "../../../../backend/src/config/prisma_db.js";

const BuyerCompliance = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("india");

  const documentList =
    selectedCountry === "india" ? requiredDocumentsIndia : requiredDocumentsUAE;

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/docs/${user.id}`); // Replace with your API URL
      // const res = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);

      // create uploadedDocs array from result.documents
      const userDocs = [];
      for (const doc in result.documents) {
        userDocs.push({
          id: doc._id,
          name: doc,
          status: doc.status,
          verifiedAt: doc.verifiedAt,
        });
      }
      console.log(userDocs);

      setUploadedDocuments(userDocs);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const complianceStats = [
    {
      title: "Overall Compliance",
      value: "95%",
      status: "good",
      icon: <FaShieldAlt />,
      color: "green",
    },
    {
      title: "Pending Documents",
      value: "2",
      status: "warning",
      icon: <FaFileAlt />,
      color: "yellow",
    },
    {
      title: "Last Verification",
      value: "10 days ago",
      status: "good",
      icon: <FaClock />,
      color: "blue",
    },
  ];

  // const handleUploadClick = () => {
  //   setSelectedDocType('');
  //   setShowUploadModal(true);
  // };

  // const handleFileUpload = (file) => {
  //   // Simulate upload progress
  //   let progress = 0;
  //   const interval = setInterval(() => {
  //     progress += 10;
  //     setUploadProgress(progress);
  //     if (progress >= 100) {
  //       clearInterval(interval);
  //       // Add document to uploaded documents list
  //       const newDoc = {
  //         id: Date.now(),
  //         name: selectedDocType || file.name,
  //         status: 'pending',
  //         expiryDate: '2025-12-31',
  //         verifiedAt: new Date().toISOString().split('T')[0],
  //         file: file
  //       };
  //       setUploadedDocuments(prev => [...prev, newDoc]);
  //       setTimeout(() => {
  //         setShowUploadModal(false);
  //         setUploadProgress(0);
  //       }, 500);
  //     }
  //   }, 300);
  // };

  const handleFileUpload = async (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);

        // Prepare form data
        const formData = new FormData();
        formData.append("files", file); // Ensure "files" is the key name
        formData.append("documentType", selectedDocType || file.name);
        // formData.append("expiryDate", "2025-12-31"); // Adjust as needed
        console.log(formData);
        // API call
        fetch(`http://localhost:3000/docs/upload/${user.id}`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then(async (data) => {
            console.log(data);

            if (data.error) {
              console.log("Error Verifyinig document!!");
              alert(
                "We could not verify your document. Please try again or upload a better image."
              );
            } else {
              console.log("Upload successful:", data);
              fetchData();
              // Add document to uploaded list
              // const newDoc = {
              //   id: Date.now(),
              //   name: selectedDocType || file.name,
              //   status: "VERIFIED",
              //   // expiryDate: "2025-12-31",
              //   verifiedAt: new Date().toISOString().split("T")[0],
              //   file: file,
              // };
              // setUploadedDocuments((prev) => [...prev, newDoc]);
            }
          })
          .catch((error) => console.error("Upload failed:", error))
          .finally(() => {
            setShowUploadModal(false);
            setUploadProgress(0);
          });
      }
    }, 300);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        handleFileUpload(file);
      }
    },
    [selectedDocType]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 5242880, // 5MB
    multiple: false,
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {complianceStats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, translateY: -5 }}
            className={`bg-white rounded-xl shadow-sm border border-${stat.color}-100 p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span
                  className={`text-sm ${
                    stat.status === "good"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {stat.status === "good" ? "Good Standing" : "Needs Attention"}
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
      </div> */}

      {/* Documents Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Required Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Required Documents</h3>

            <select
              className="mb-4 p-2 border rounded-lg"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="india">India</option>
              <option value="uae">UAE</option>
            </select>

            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUploadClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            >
              <FaUpload />
              Upload Document
            </motion.button> */}
          </div>
          <div className="space-y-4">
            {documentList.map((doc) => {
              const isUploaded = uploadedDocuments.some(
                (uploaded) => uploaded.name === doc.id
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
                      setSelectedDocType(doc.id);
                      setShowUploadModal(true);
                    }}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                      isUploaded
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    <FaUpload />
                    {isUploaded ? "Update" : "Upload"}
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
          {uploadedDocuments.length > 0 ? (
            <div className="space-y-4">
              {uploadedDocuments.map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaFileAlt className="text-blue-500" />
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-500">
                          Last updated: {doc.verifiedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
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
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No documents uploaded yet
            </div>
          )}
        </div>
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
                <h3 className="text-lg font-semibold">
                  Upload {selectedDocType}
                </h3>
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
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyerCompliance;
