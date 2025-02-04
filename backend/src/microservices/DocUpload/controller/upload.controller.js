import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import uploadService from "../services/upload.service.js";
import prisma from "../../../config/prisma_db.js";
import Document from "../models/document.model.js";

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Add allowed file types
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

const requiredDocuments = {
  indian: [
    "iec",
    "cic",
    "bis",
    "cic",
    "shipping",
    "tradeLicense",
    "gstin",
    "cic",
  ],
  uae: ["UAEid", "UAEvat", "UAEesma", "UAEcoo"],
  personal: ["aadhaar", "pan"],
};

async function checkUploadedDocuments(userId) {
  try {
    const userDocs = await Document.findOne({ userId });

    if (!userDocs || !userDocs.documents) {
      return { indian: false, uae: false, personal: false }; // No documents uploaded
    }
    console.log(userDocs);

    const uploadedStatus = {};

    for (const category in requiredDocuments) {
      uploadedStatus[category] = requiredDocuments[category].every((doc) =>
        userDocs.documents.get(doc)
      );
    }
    console.log(uploadedStatus);

    return uploadedStatus;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { indian: false, uae: false, personal: false };
  }
}

export const uploadDocument = async (req, res) => {
  try {
    // console.log("Worlddddddddddddddddddddddddddddddd");
    const { documentType } = req.body;
    const files = req.files;
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
    });

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!documentType) {
      return res
        .status(400)
        .json({ error: "Document type and number are required" });
    }
    // console.log("Worlddddddddddddddddddddddddddddddd");
    // console.log(req.user);

    const document = await uploadService.uploadFiles(
      files,
      // req.user._id,
      req.params.userId,
      // req.user.email,
      { documentType }
    );

    if (!document.verified) {
      return res.status(400).json({ error: "Document verification failed" });
    }

    // Clean up uploaded files
    // files.forEach(file => {
    //   fs.unlink(file.path, err => {
    //     if (err) console.error('Error deleting temporary file:', err);
    //   });
    // });

    // check if all required documents are uploaded
    const userDocsStatus = await checkUploadedDocuments(req.params.userId);
    if (
      userDocsStatus.indian ||
      userDocsStatus.uae ||
      userDocsStatus.personal
    ) {
      const updates = {};
      if (
        (userDocsStatus.indian || userDocsStatus.uae) &&
        !user.is_company_docs_done
      ) {
        updates.is_company_docs_done = true;
      }

      if (userDocsStatus.personal && !user.is_personal_docs_done) {
        updates.is_personal_docs_done = true;
      }

      if (Object.keys(updates).length > 0) {
        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: updates,
        });
        console.log("User updated:", updatedUser);
      }
    }

    res.status(201).json(document);
  } catch (error) {
    // Clean up files if upload fails
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.error("Error deleting temporary file:", err);
        });
      });
    }
    res.status(500).json({ error: error.message });
  }
};
// Upload document
// const uploadDoc = async (documentType) => {
//   try {
//     // const { documentType } = req.body;
//     console.log(req.body);

//     const files = req.files;

//     if (!files || files.length === 0) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     if (!documentType) {
//       return res
//         .status(400)
//         .json({ error: "Document type and number are required" });
//     }
//     console.log("Worlddddddddddddddddddddddddddddddd");
//     console.log(req.user);

//     const document = await uploadService.uploadFiles(
//       files,
//       // req.user._id,
//       req.body.userId,
//       // req.user.email,
//       { documentType }
//     );

//     // console.log(document);

//     // Clean up uploaded files
//     // files.forEach(file => {
//     //   fs.unlink(file.path, err => {
//     //     if (err) console.error('Error deleting temporary file:', err);
//     //   });
//     // });

//     return document;
//   } catch (error) {
//     console.log(error);
//     return {};
//   }
// };

// Get all documents for a user
export const getDocs = async (req, res) => {
  try {
    const documents = await uploadService.getAllDocumentsByUser(
      req.params.userId
    );
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get document status
export const getStatus = async (req, res) => {
  try {
    const status = await uploadService.getDocumentStatus(req, params.userId);
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific document type
export const deleteDocByType = async (req, res) => {
  try {
    const { documentType } = req.body;
    const userId = req.params.userId;
    const result = await deleteDoc(documentType, userId);
    re.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const deleteDoc = async (documentType, userId) => {
  try {
    const result = await uploadService.deleteDocument(documentType, userId);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

// Verify document (admin only)
export const verifyDocByType = async (req, res) => {
  try {
    const { documentType } = req.body;
    const userId = req.params.userId;
    console.log(userId, documentType);
    const document = await verifyDoc(userId, documentType);
    res.json(document);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
};
const verifyDoc = async (
  userId,
  documentType,
  status = "VERIFIED",
  comments = "Good To Go!"
) => {
  try {
    const document = await uploadService.verifyDocument(
      userId,
      documentType,
      status,
      comments
    );
    return document;
  } catch (error) {
    return { error: error };
  }
};
