import express from 'express';
import {upload, uploadDocument, getDocs,getStatus, deleteDocByType, verifyDocByType} from "./../microservices/DocUpload/controller/upload.controller.js";

const app = express();

const router = express.Router();

router.get('/:userId', getDocs)
router.post('/upload/:userId', upload.array('files', 1), uploadDocument);
router.get('/status/:userId', getStatus);
router.put('/verify/:userId', verifyDocByType)
router.delete('/:userId', deleteDocByType)

export default router;