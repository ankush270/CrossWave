import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  FaFileUpload, FaCheckCircle, FaTimesCircle, 
  FaExclamationTriangle, FaDownload, FaEye, FaTrash,
  FaRobot, FaSearch, FaFilter, FaQuestionCircle,
  FaSyncAlt, FaFileAlt, FaGlobe
} from 'react-icons/fa'

// Dummy data for documents
const documents = [
  {
    id: 1,
    name: 'Business License.pdf',
    type: 'License',
    uploadDate: '2024-02-15',
    status: 'approved',
    notes: 'Valid until 2025'
  },
  {
    id: 2,
    name: 'Export Certificate.pdf',
    type: 'Certificate',
    uploadDate: '2024-02-14',
    status: 'pending',
    notes: 'Under review'
  },
  {
    id: 3,
    name: 'Customs Declaration.pdf',
    type: 'Customs',
    uploadDate: '2024-02-13',
    status: 'rejected',
    notes: 'Missing signature on page 2'
  }
]

// Status Badge Component
const StatusBadge = ({ status, notes }) => {
  const statusConfig = {
    approved: {
      icon: FaCheckCircle,
      color: 'green',
      text: 'Approved'
    },
    pending: {
      icon: FaExclamationTriangle,
      color: 'yellow',
      text: 'Pending'
    },
    rejected: {
      icon: FaTimesCircle,
      color: 'red',
      text: 'Rejected'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
        bg-${config.color}-100 text-${config.color}-800`}>
        <Icon className="w-3 h-3" />
        {config.text}
      </span>
      {notes && (
        <span className="text-xs text-gray-500" title={notes}>
          {notes.length > 20 ? notes.substring(0, 20) + '...' : notes}
        </span>
      )}
    </div>
  )
}

// Document Actions Component
const DocumentActions = ({ document }) => {
  const handleView = () => {
    // Handle document view
    console.log('View document:', document)
  }

  const handleDownload = () => {
    // Handle document download
    console.log('Download document:', document)
  }

  const handleDelete = () => {
    // Handle document deletion
    console.log('Delete document:', document)
  }

  return (
    <div className="flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1 hover:bg-gray-100 rounded-full"
        onClick={handleView}
        title="View"
      >
        <FaEye className="w-4 h-4 text-blue-600" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1 hover:bg-gray-100 rounded-full"
        onClick={handleDownload}
        title="Download"
      >
        <FaDownload className="w-4 h-4 text-green-600" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-1 hover:bg-gray-100 rounded-full"
        onClick={handleDelete}
        title="Delete"
      >
        <FaTrash className="w-4 h-4 text-red-600" />
      </motion.button>
    </div>
  )
}

// Document Viewer Modal Component
const DocumentViewerModal = ({ document, onClose }) => {
  const isImage = document.file?.type?.startsWith('image/')
  const isPDF = document.file?.type === 'application/pdf'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{document.name}</h2>
          <button onClick={onClose}>
            <FaTimesCircle className="w-6 h-6 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          {isImage && (
            <img 
              src={URL.createObjectURL(document.file)} 
              alt={document.name}
              className="max-h-full max-w-full object-contain"
            />
          )}
          {isPDF && (
            <iframe
              src={URL.createObjectURL(document.file)}
              className="w-full h-full"
              title={document.name}
            />
          )}
          {!isImage && !isPDF && (
            <div className="text-center">
              <FaFileAlt className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Preview not available</p>
            </div>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-gray-500">
            Uploaded on {document.uploadDate}
          </p>
          <StatusBadge status={document.status} notes={document.notes} />
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open(URL.createObjectURL(document.file))}
              className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <FaDownload className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ComplianceManager = () => {
  const [selectedDocuments, setSelectedDocuments] = useState([])
  const [showViewer, setShowViewer] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [uploadProgress, setUploadProgress] = useState({})
  const [previewUrl, setPreviewUrl] = useState(null)

  // Enhanced file upload handling
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      // Create preview URL for supported file types
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file))
      }

      // Simulate upload progress
      const uploadId = Date.now()
      setUploadProgress(prev => ({
        ...prev,
        [uploadId]: 0
      }))

      // Simulate file upload with progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setUploadProgress(prev => ({
          ...prev,
          [uploadId]: progress
        }))

        if (progress >= 100) {
          clearInterval(interval)
          // Add file to documents list
          const newDoc = {
            id: uploadId,
            name: file.name,
            type: file.type.split('/')[1].toUpperCase(),
            uploadDate: new Date().toISOString().split('T')[0],
            status: 'pending',
            notes: 'Under review',
            file: file
          }
          // Update documents list (you'll need to implement this)
          console.log('Upload complete:', newDoc)
        }
      }, 100)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 5242880 // 5MB
  })

  // Progress calculation
  const totalDocuments = documents.length
  const approvedDocuments = documents.filter(doc => doc.status === 'approved').length
  const compliancePercentage = Math.round((approvedDocuments / totalDocuments) * 100)

  // Upload Progress Component
  const UploadProgress = ({ progress }) => {
    const progressValue = useMotionValue(0)
    const width = useTransform(progressValue, [0, 100], ['0%', '100%'])

    React.useEffect(() => {
      progressValue.set(progress)
    }, [progress])

    return (
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          style={{ width }}
        />
      </div>
    )
  }

  // Active Uploads Component
  const ActiveUploads = () => (
    <div className="mt-4 space-y-3">
      {Object.entries(uploadProgress).map(([id, progress]) => (
        progress < 100 && (
          <div key={id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Uploading...</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <UploadProgress progress={progress} />
          </div>
        )
      ))}
    </div>
  )

  // Document Upload Section
  const UploadSection = () => (
    <div className="mb-6">
      <div 
        {...getRootProps()} 
        className={`bg-white rounded-xl shadow-lg p-8 border-2 border-dashed
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          transition-colors duration-200 cursor-pointer hover:border-blue-500`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <FaFileUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here or click to select"}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported formats: PDF, DOC, DOCX, JPG (Max size: 5MB)
          </p>
        </div>
      </div>
      <ActiveUploads />
    </div>
  )

  // Document Status Header
  const StatusHeader = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Document Compliance</h2>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${compliancePercentage}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {compliancePercentage}% Complete
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <FaFileUpload className="w-4 h-4" />
            Upload Documents
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <FaQuestionCircle className="w-4 h-4 text-gray-500" />
            View Requirements
          </motion.button>
        </div>
      </div>
    </div>
  )

  // Document List Section
  const DocumentList = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search documents..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="license">Licenses</option>
            <option value="certificate">Certificates</option>
            <option value="customs">Customs</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upload Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaFileAlt className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{doc.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-500">{doc.uploadDate}</span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={doc.status} notes={doc.notes} />
                </td>
                <td className="px-6 py-4">
                  <DocumentActions document={doc} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StatusHeader />
        <UploadSection />
        <DocumentList />
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {showViewer && selectedDocument && (
          <DocumentViewerModal
            document={selectedDocument}
            onClose={() => setShowViewer(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ComplianceManager 