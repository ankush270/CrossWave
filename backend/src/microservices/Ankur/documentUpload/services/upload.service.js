const cloudinary = require('../config/cloudinary.config');
const Document = require('../models/document.model');
const fs = require('fs');

class UploadService {
  async uploadFiles(files, userId, userEmail, title) {
    try {
      const uploadPromises = files.map(async (file) => {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: 'auto',
          folder: `documents/${userId}`,
          use_filename: true,
          unique_filename: true,
          overwrite: true,
          // For PDFs and other documents
          format: file.mimetype === 'application/pdf' ? 'pdf' : undefined,
          transformation: file.mimetype === 'application/pdf' ? { flags: "attachment" } : []
        });

        // Create document record in MongoDB
        const document = new Document({
          title: `${title}_${file.originalname}`,
          cloudinaryId: result.public_id,
          fileUrl: result.secure_url,
          fileType: file.mimetype,
          userId: userId,
          userEmail: userEmail,
          size: file.size
        });

        return document.save();
      });

      const documents = await Promise.all(uploadPromises);
      return documents;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async getAllDocumentsByUser(userId) {
    try {
      const documents = await Document.find({ userId })
        .sort({ uploadedAt: -1 })
        .select('-userId -userEmail');

      return documents;
    } catch (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
  }

  async deleteDocument(documentId, userId) {
    try {
      const document = await Document.findOne({ 
        _id: documentId,
        userId: userId 
      });
      
      if (!document) {
        throw new Error('Document not found or unauthorized');
      }

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(document.cloudinaryId, {
        resource_type: 'auto'
      });
      
      // Delete from MongoDB
      await Document.findByIdAndDelete(documentId);
      
      return { message: 'Document deleted successfully' };
    } catch (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }
}

module.exports = new UploadService(); 