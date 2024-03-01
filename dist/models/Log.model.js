"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapLogToCustomModel = exports.logValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.logValidationSchema = joi_1.default.object({
    message: joi_1.default.string().max(500).required(),
    createdAt: joi_1.default.date().iso().required(),
});
const mapLogToCustomModel = (prismaLog) => (Object.assign({}, prismaLog));
exports.mapLogToCustomModel = mapLogToCustomModel;
//# sourceMappingURL=Log.model.js.map