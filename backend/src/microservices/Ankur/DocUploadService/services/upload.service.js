const cloudinary = require('../config/cloudinary.config');
const Document = require('../models/document.model');
const fs = require('fs');

class UploadService {
  async uploadFiles(files, userId, userEmail, documentDetails) {
    try {
      // First, find or create user document record
      let userDocs = await Document.findOne({ userId });
      
      if (!userDocs) {
        userDocs = new Document({
          userId,
          userEmail,
          documents: {}
        });
      }

      const file = files[0]; // Since we're only handling one file at a time
      
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: `documents/${userId}`,
        use_filename: true,
        unique_filename: true,
        overwrite: true
      });

      // Update the specific document type
      userDocs.documents[documentDetails.documentType] = {
        documentNumber: documentDetails.documentNumber,
        cloudinaryId: result.public_id,
        fileUrl: result.secure_url,
        fileType: file.mimetype,
        size: file.size,
        status: 'PENDING',
        uploadedAt: new Date(),
        verificationComments: null,
        verifiedAt: null
      };

      await userDocs.save();
      return userDocs.documents[documentDetails.documentType];
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async getAllDocumentsByUser(userId) {
    try {
      const userDocs = await Document.findOne({ userId });
      if (!userDocs) {
        return {
          userId,
          documents: {}
        };
      }
      return userDocs;
    } catch (error) {
      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
  }

  async getDocumentStatus(userId) {
    try {
      const userDocs = await Document.findOne({ userId });
      
      const requiredDocs = [
        'PARTNERSHIP_REGISTRATION',
        'INCORPORATION_CERTIFICATE',
        'GST',
        'PAN',
        'IEC',
        'DPIIT',
        'AD_CODE',
        'MSME'
      ];

      const status = requiredDocs.map(docType => {
        const doc = userDocs?.documents?.[docType];
        return {
          documentType: docType,
          status: doc?.status || 'NOT_UPLOADED',
          documentNumber: doc?.documentNumber || null,
          comments: doc?.verificationComments || null,
          uploadedAt: doc?.uploadedAt || null,
          verifiedAt: doc?.verifiedAt || null
        };
      });

      return status;
    } catch (error) {
      throw new Error(`Failed to fetch document status: ${error.message}`);
    }
  }

  async deleteDocument(documentType, userId) {
    try {
      const userDocs = await Document.findOne({ userId });
      
      if (!userDocs || !userDocs.documents[documentType]) {
        throw new Error('Document not found or unauthorized');
      }

      const cloudinaryId = userDocs.documents[documentType].cloudinaryId;

      // Delete from Cloudinary
      if (cloudinaryId) {
        await cloudinary.uploader.destroy(cloudinaryId, {
          resource_type: 'auto'
        });
      }
      
      // Remove the specific document
      userDocs.documents[documentType] = {
        status: 'NOT_UPLOADED'
      };
      
      await userDocs.save();
      
      return { message: 'Document deleted successfully' };
    } catch (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  // New method to verify documents
  async verifyDocument(userId, documentType, verificationStatus, comments) {
    try {
      const userDocs = await Document.findOne({ userId });
      
      if (!userDocs || !userDocs.documents[documentType]) {
        throw new Error('Document not found');
      }

      userDocs.documents[documentType].status = verificationStatus;
      userDocs.documents[documentType].verificationComments = comments;
      userDocs.documents[documentType].verifiedAt = new Date();

      await userDocs.save();
      return userDocs.documents[documentType];
    } catch (error) {
      throw new Error(`Verification failed: ${error.message}`);
    }
  }
}

module.exports = new UploadService(); 