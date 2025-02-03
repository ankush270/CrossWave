const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadService = require('../services/upload.service');
const auth = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Add allowed file types
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

const router = express.Router();

// Upload document
router.post('/', auth, upload.array('files', 1), async (req, res) => {
  try {
    const { documentType, documentNumber } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!documentType || !documentNumber) {
      return res.status(400).json({ error: 'Document type and number are required' });
    }

    const document = await uploadService.uploadFiles(
      files, 
      req.user._id,
      req.user.email,
      { documentType, documentNumber }
    );

    // Clean up uploaded files
    files.forEach(file => {
      fs.unlink(file.path, err => {
        if (err) console.error('Error deleting temporary file:', err);
      });
    });

    res.status(201).json(document);
  } catch (error) {
    // Clean up files if upload fails
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting temporary file:', err);
        });
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get all documents for a user
router.get('/', auth, async (req, res) => {
  try {
    const documents = await uploadService.getAllDocumentsByUser(req.user._id);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get document status
router.get('/status', auth, async (req, res) => {
  try {
    const status = await uploadService.getDocumentStatus(req.user._id);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific document type
router.delete('/:documentType', auth, async (req, res) => {
  try {
    const result = await uploadService.deleteDocument(req.params.documentType, req.user._id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify document (admin only)
router.post('/:documentType/verify', auth, async (req, res) => {
  try {
    const { status, comments } = req.body;
    const document = await uploadService.verifyDocument(
      req.params.userId,
      req.params.documentType,
      status,
      comments
    );
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 