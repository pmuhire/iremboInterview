// routes/url.routes.ts
import express from 'express';
import { permit } from '../controllers/importPermit';

const permitRouter = express.Router();

permitRouter.post('/create', permit.create.bind(permit));

export default permitRouter;
