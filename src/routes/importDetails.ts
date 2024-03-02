// routes/url.routes.ts
import express from 'express';
import { ImportDetailsController,importDetails } from '../controllers/ImportDetailsController';

const importDetailsRouter = express.Router();

importDetailsRouter.post('/create', importDetails.createImportDetails.bind(importDetails));

export default importDetailsRouter;
