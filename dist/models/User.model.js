"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserToCustomModel = exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidationSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().alphanum().required(),
    password: joi_1.default.string().min(8).max(30).required(),
    fullName: joi_1.default.string().max(255).required(),
});
const mapUserToCustomModel = (prismaUser) => (Object.assign({}, prismaUser));
exports.mapUserToCustomModel = mapUserToCustomModel;
//# sourceMappingURL=User.model.js.map