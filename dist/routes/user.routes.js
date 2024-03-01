"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.get('/users', UserController_1.userController.getAllUsers.bind(UserController_1.userController));
router.get('/users/:id', UserController_1.userController.getUserById.bind(UserController_1.userController));
router.post('/users', UserController_1.userController.createUser.bind(UserController_1.userController));
router.put('/users/:id', authMiddleware_1.default, UserController_1.userController.updateUser.bind(UserController_1.userController));
router.delete('/users/:id', authMiddleware_1.default, UserController_1.userController.deleteUser.bind(UserController_1.userController));
router.post('/login', UserController_1.userController.login.bind(UserController_1.userController));
exports.default = router;
//# sourceMappingURL=user.routes.js.map