import express from "express";
import { analyticsController } from "../controllers/Analytics.controller";

const analRouter = express.Router();

analRouter.post("/:shortCode",analyticsController.recordAnalytics.bind(analyticsController));

export default analRouter;