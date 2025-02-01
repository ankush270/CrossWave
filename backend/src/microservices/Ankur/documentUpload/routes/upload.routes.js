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

// Upload multiple documents
router.post('/', auth, upload.array('files', 10), async (req, res) => {
  try {
    const { title } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const documents = await uploadService.uploadFiles(
      files, 
      req.user._id,
      req.user.email,
      title
    );

    // Clean up uploaded files after successful upload to Cloudinary
    files.forEach(file => {
      fs.unlink(file.path, err => {
        if (err) console.error('Error deleting temporary file:', err);
      });
    });

    res.status(201).json(documents);
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

// Get all documents for a specific user
router.get('/', auth, async (req, res) => {
  try {
    const documents = await uploadService.getAllDocumentsByUser(req.user._id);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a document
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await uploadService.deleteDocument(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 