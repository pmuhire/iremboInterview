// routes/url.routes.ts
import express from 'express';
import { businnessDetailsController } from '../controllers/BusinessDetailsController';

const detailsRouter = express.Router();

detailsRouter.post('/create', businnessDetailsController.createBusinessDetails.bind(businnessDetailsController));
export default detailsRouter;
