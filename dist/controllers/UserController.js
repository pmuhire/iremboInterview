"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.userController = void 0;
const client_1 = require("@prisma/client");
const User_model_1 = require("../models/User.model");
const auth_1 = require("../utils/auth");
const prisma = new client_1.PrismaClient();
class UserController {
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req);
            try {
                const users = yield prisma.user.findMany();
                res.json(users.map(User_model_1.mapUserToCustomModel));
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield prisma.user.findUnique({
                    where: { id: userId },
                });
                if (!user) {
                    res.status(404).json({ error: 'User not found' });
                    return;
                }
                res.json((0, User_model_1.mapUserToCustomModel)(user));
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, username, password, fullName } = req.body;
            try {
                yield User_model_1.userValidationSchema.validateAsync({ email, username, password, fullName });
                const existingUser = yield prisma.user.findFirst({
                    where: {
                        OR: [
                            { email },
                            { username },
                        ],
                    },
                });
                if (existingUser) {
                    res.status(409).json({ error: 'User with the provided email or username already exists' });
                    return;
                }
                const hashedPassword = yield (0, auth_1.hashPassword)(password);
                const prismaUser = yield prisma.user.create({
                    data: { email, username, password: hashedPassword, fullName },
                });
                const customUser = (0, User_model_1.mapUserToCustomModel)(prismaUser);
                res.status(201).json(customUser);
            }
            catch (error) {
                console.log(error);
                if (error.isJoi) {
                    const validationError = error.details.map((detail) => detail.message).join(', ');
                    res.status(400).json({ error: `Validation failed: ${validationError}` });
                }
                else {
                    res.status(500).json({ error: 'Internal server error' });
                }
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const { email, username, password, fullName } = req.body;
            try {
                // Validate user input
                yield User_model_1.userValidationSchema.validateAsync({ email, username, password, fullName });
                // Hash the password before updating it
                const hashedPassword = yield (0, auth_1.hashPassword)(password);
                // Update the user using Prisma
                const prismaUser = yield prisma.user.update({
                    where: { id: userId },
                    data: { email, username, password: hashedPassword, fullName },
                });
                // Map Prisma user to custom user model
                const customUser = (0, User_model_1.mapUserToCustomModel)(prismaUser);
                res.json(customUser);
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'Invalid input' });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                // Delete the user using Prisma
                yield prisma.user.delete({
                    where: { id: userId },
                });
                res.status(204).send();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield prisma.user.findUnique({
                    where: { username },
                });
                if (!user) {
                    res.status(401).json({ error: 'Invalid credentials' });
                    return;
                }
                const passwordMatch = yield (0, auth_1.comparePasswords)(password, user.password);
                if (!passwordMatch) {
                    res.status(401).json({ error: 'Invalid credentials' });
                    return;
                }
                const token = (0, auth_1.generateToken)(user.id);
                res.json({ token });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.UserController = UserController;
const userController = new UserController();
exports.userController = userController;
//# sourceMappingURL=UserController.js.map