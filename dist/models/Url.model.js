"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUrlToCustomModel = exports.urlValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.urlValidationSchema = joi_1.default.object({
    originalUrl: joi_1.default.string().uri().required(),
    shortUrl: joi_1.default.string().required(),
    shortCode: joi_1.default.string().required(),
    clicks: joi_1.default.number().integer().min(0).required(),
    createdAt: joi_1.default.date().iso().required(),
    userId: joi_1.default.string(),
});
const mapUrlToCustomModel = (prismaUrl) => (Object.assign({}, prismaUrl));
exports.mapUrlToCustomModel = mapUrlToCustomModel;
//# sourceMappingURL=Url.model.js.map