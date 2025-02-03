const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  userEmail: {
    type: String,
    required: true
  },
  documents: {
    PARTNERSHIP_REGISTRATION: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    INCORPORATION_CERTIFICATE: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    GST: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    PAN: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    IEC: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    MSME: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    DPIIT: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    },
    AD_CODE: {
      documentNumber: String,
      cloudinaryId: String,
      fileUrl: String,
      fileType: String,
      size: Number,
      status: {
        type: String,
        enum: ['PENDING', 'VERIFIED', 'REJECTED', 'NOT_UPLOADED'],
        default: 'NOT_UPLOADED'
      },
      verificationComments: String,
      uploadedAt: Date,
      verifiedAt: Date
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on document changes
documentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Document', documentSchema); 