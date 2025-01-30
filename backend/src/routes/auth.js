import express from 'express';
import {login, register, logout} from "../controllers/auth.js";
import authMiddleware from "../middlewares/auth.js";

const app = express();

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authMiddleware, logout)

export default router;