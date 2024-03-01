"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/url.routes.ts
const express_1 = __importDefault(require("express"));
const urlController_1 = require("../controllers/urlController");
const urlRouter = express_1.default.Router();
urlRouter.post('/shorten', urlController_1.urlController.shortenUrl.bind(urlController_1.urlController));
urlRouter.get('/:shortCode', urlController_1.urlController.redirectToOriginalUrl.bind(urlController_1.urlController));
exports.default = urlRouter;
//# sourceMappingURL=url.routes.js.map