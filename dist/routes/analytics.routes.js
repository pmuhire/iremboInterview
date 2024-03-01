"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Analytics_controller_1 = require("../controllers/Analytics.controller");
const analRouter = express_1.default.Router();
analRouter.post("/:shortCode", Analytics_controller_1.analyticsController.recordAnalytics.bind(Analytics_controller_1.analyticsController));
exports.default = analRouter;
//# sourceMappingURL=analytics.routes.js.map