// routes/url.routes.ts
import express from 'express';
import { businessOwnerController } from '../controllers/bussinessOwner';

const ownerRouter = express.Router();

ownerRouter.post('/create', businessOwnerController.createOwner.bind(businessOwnerController));
// urlRouter.get('/:shortCode', urlController.redirectToOriginalUrl.bind(urlController));

export default ownerRouter;
