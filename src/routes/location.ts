// routes/url.routes.ts
import express from 'express';
import { locationController } from '../controllers/LocationController';

const locationRouter = express.Router();

locationRouter.post('/create', locationController.createLocation.bind(locationController));
// urlRouter.get('/:shortCode', urlController.redirectToOriginalUrl.bind(urlController));

export default locationRouter;
