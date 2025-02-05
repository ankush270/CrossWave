// const express = require("express");
// const cors = require("cors");
import cors from "cors";
import express from "express";
import {
  RekognitionClient,
  CreateFaceLivenessSessionCommand,
  GetFaceLivenessSessionResultsCommand,
} from "@aws-sdk/client-rekognition"; // ES Modules import
// const {
//   RekognitionClient,
//   CreateFaceLivenessSessionCommand,
//   GetFaceLivenessSessionResultsCommand,
// } = require("@aws-sdk/client-rekognition"); // CommonJS import

import prisma from "../../config/prisma_db.js";

const config = { region: "us-east-1" };

const client = new RekognitionClient(config);

// { // CreateFaceLivenessSessionResponse
//   SessionId: "STRING_VALUE", // required
// };

const app = express();
app.use(express.json());
app.use(cors());

// const rekognition = new AWS.Rekognition({ region: "us-east-1" });

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const createFaceLivenessSession = async () => {
  const input = {
    // CreateFaceLivenessSessionRequest
    KmsKeyId: "e14f75b0-2c67-4b8b-9225-f1bf16623f1a",
    // Settings: {
    //   // CreateFaceLivenessSessionRequestSettings
    //   OutputConfig: {
    //     // LivenessOutputConfig
    //     S3Bucket: "STRING_VALUE", // required
    //     S3KeyPrefix: "STRING_VALUE",
    //   },
    //   AuditImagesLimit: Number("int"),
    // },
    ClientRequestToken: generateRandomString(10),
  };
  const command = new CreateFaceLivenessSessionCommand(input);
  const response = await client.send(command);
  //   console.log(response);
  return response;
};

export const getFaceLivenessSessionResults = async (sessionId) => {
  const input = {
    // GetFaceLivenessSessionResultsRequest
    SessionId: sessionId, // required
  };
  const command = new GetFaceLivenessSessionResultsCommand(input);
  const response = await client.send(command);
  //   console.log(response);
  return response;
};

export const createSession = async (req, res) => {
  try {
    const response = await createFaceLivenessSession();
    res.status(200).json({ sessionId: response.SessionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getResults = async (req, res) => {
  const { sessionId, userId } = req.body;
  console.log(sessionId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  try {
    const response = await getFaceLivenessSessionResults(sessionId);
    console.log(response);
    if (response.Confidence > 50 && !user.is_kyc_done) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          is_kyc_done: true,
        },
      });
    }
    res.status(200).json({ results: response });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
};

// app.listen(3001, () => console.log("Server running on port 3001"));
