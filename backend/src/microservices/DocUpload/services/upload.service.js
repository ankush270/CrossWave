import cloudinary from "../config/cloudinary.config.js";
import Document from "../models/document.model.js";
import fs from "fs";
import { verifyDocument } from "../../kyc/document_verify/main.js";
import prisma from "../../../config/prisma_db.js";
class UploadService {
  async uploadFiles(files, userId, documentDetails) {
    try {
      // First, find or create user document record
      console.log("Yayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      let userDocs = await Document.findOne({ userId });

      if (!userDocs) {
        userDocs = new Document({
          userId,
          // userEmail,
          documents: {},
        });
      }

      // add to user document record
      await prisma.user.update({
        where: { id: userId },
        data: {
          documentDocId: userDocs._id,
        },
      });

      const file = files[0]; // Since we're only handling one file at a time
      console.log("FILEPATH : ", file.path);

      const verificationResult = await verifyDocument(
        file.path,
        documentDetails.documentType
      );
      console.log(verificationResult);
      if (!verificationResult.verified) {
        return {
          verified: false,
        };
      }

      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        folder: `documents/${userId}`,
        use_filename: true,
        unique_filename: true,
        overwrite: true,
      });
      // console.log(result);

      // Update the specific document type
      // check if userDocs.documents exists. if not, create it
      // if (!userDocs.documents) {
      //   userDocs.documents = {};
      // }
      // console.log(documentDetails.documentType);
      if (!userDocs.documents[documentDetails.documentType]) {
        userDocs.documents[documentDetails.documentType] = {};
      }

      // userDocs.documents[documentDetails.documentType] = {
      //   // documentNumber: documentDetails.documentNumber,
      //   cloudinaryId: result.public_id,
      //   fileUrl: result.secure_url,
      //   fileType: file.mimetype,
      //   size: file.size,
      //   status: "PENDING",
      //   uploadedAt: new Date(),
      //   verificationComments: null,
      //   verifiedAt: null,
      // };
      let data = {
        cloudinaryId: result.public_id,
        fileUrl: result.secure_url,
        fileType: file.mimetype,
        size: file.size,
        status: "VERIFIED",
        uploadedAt: new Date(),
        verificationComments: null,
        verifiedAt: new Date(),
      };
      userDocs.set(`documents.${documentDetails.documentType}`, data);

      console.log(userDocs);

      await userDocs.save();
      data["verified"] = true;
      return data;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async getAllDocumentsByUser(userId) {
    try {
      console.log(userId);

      const userDocs = await Document.findOne({ userId });
      if (!userDocs) {
        return {
          userId,
          documents: {},
        };
      }
      return userDocs;
    } catch (error) {
      console.log(error);

      throw new Error(`Failed to fetch documents: ${error.message}`);
    }
  }

  async getDocumentStatus(userId) {
    try {
      const userDocs = await Document.findOne({ userId });

      const requiredDocs = [
        "cic",
        "bis",
        "coo",
        "gstin",
        "iec",
        "shipping",
        "tradeLicense",
        "pan",
        "aadhaar",
        "UAEvat",
        "UAEid",
        "UAEesma",
        // "UAEcoo",
      ];

      const status = requiredDocs.map((docType) => {
        const doc = userDocs?.documents?.[docType];
        return {
          documentType: docType,
          status: doc?.status || "NOT_UPLOADED",
          documentNumber: doc?.documentNumber || null,
          comments: doc?.verificationComments || null,
          uploadedAt: doc?.uploadedAt || null,
          verifiedAt: doc?.verifiedAt || null,
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
        throw new Error("Document not found or unauthorized");
      }

      const cloudinaryId = userDocs.documents[documentType].cloudinaryId;

      // Delete from Cloudinary
      if (cloudinaryId) {
        await cloudinary.uploader.destroy(cloudinaryId, {
          resource_type: "auto",
        });
      }

      // Remove the specific document
      userDocs.documents[documentType] = {
        status: "NOT_UPLOADED",
      };

      await userDocs.save();

      return { message: "Document deleted successfully" };
    } catch (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  }

  // New method to verify documents
  async verifyDocument(userId, documentType, verificationStatus, comments) {
    try {
      console.log("Helloooooooooooo");

      const userDocs = await Document.findOne({ userId });

      // console.log(userDocs);
      // if (!userDocs || !userDocs.documents[documentType]) {
      //   console.log("worlddddddddddd");

      //   throw new Error("Document not found");
      // }

      // userDocs.documents[documentType].status = verificationStatus;
      // userDocs.documents[documentType].verificationComments = comments;
      // userDocs.documents[documentType].verifiedAt = new Date();
      // userDocs.set(`documents.${documentType}.status`, verificationStatus);
      // userDocs.set(`documents.${documentType}.verificationComments`, comments);
      // userDocs.set(`documents.${documentType}.verifiedAt`, new Date());
      // console.log(userDocs);

      // await userDocs.save();

      const currentDoc = userDocs.documents.get(documentType);

      // Update the document
      if (currentDoc) {
        currentDoc.status = verificationStatus;
        currentDoc.verificationComments = comments;
        currentDoc.verifiedAt = new Date();

        // Set the updated document back to the Map
        userDocs.documents.set(documentType, currentDoc);

        // Save the document
        await userDocs.save();
      }

      return userDocs.documents[documentType];
    } catch (error) {
      throw new Error(`Verification failed: ${error.message}`);
    }
  }
}

export default new UploadService();
