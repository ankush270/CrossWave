import express from "express";
import { createSession, getResults } from "../microservices/kyc/liveness.js";

const app = express();

const router = express.Router();

router.get("/liveness/session/create", createSession);
router.post("/liveness/session/get", getResults);

export default router;
