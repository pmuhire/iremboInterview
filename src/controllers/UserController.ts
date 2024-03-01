// controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { User, userValidationSchema, mapUserToCustomModel } from '../models/User.model';
import { hashPassword, generateToken, comparePasswords } from '../utils/auth';

const prisma = new PrismaClient();

class UserController {
    async getAllUsers(req: Request, res: Response): Promise<void> {
        // console.log(req);
        try {
            const users = await prisma.user.findMany();
            res.json(users.map(mapUserToCustomModel));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            res.json(mapUserToCustomModel(user));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createUser(req: Request, res: Response): Promise<void> {
        const { email, username, password, fullName } = req.body;

        try {
            await userValidationSchema.validateAsync({ email, username, password, fullName });
            const existingUser = await prisma.user.findFirst({
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

            const hashedPassword = await hashPassword(password);

            const prismaUser = await prisma.user.create({
                data: { email, username, password: hashedPassword, fullName },
            });
            const customUser: User = mapUserToCustomModel(prismaUser);

            res.status(201).json(customUser);
        } catch (error) {
            console.log(error);
            if (error.isJoi) {
                const validationError = error.details.map((detail: any) => detail.message).join(', ');
                res.status(400).json({ error: `Validation failed: ${validationError}` });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const { email, username, password, fullName } = req.body;

        try {
            // Validate user input
            await userValidationSchema.validateAsync({ email, username, password, fullName });

            // Hash the password before updating it
            const hashedPassword = await hashPassword(password);

            // Update the user using Prisma
            const prismaUser = await prisma.user.update({
                where: { id: userId },
                data: { email, username, password: hashedPassword, fullName },
            });

            // Map Prisma user to custom user model
            const customUser: User = mapUserToCustomModel(prismaUser);

            res.json(customUser);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Invalid input' });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;

        try {
            // Delete the user using Prisma
            await prisma.user.delete({
                where: { id: userId },
            });

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async login(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { username },
            });

            if (!user) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const passwordMatch = await comparePasswords(password, user.password);

            if (!passwordMatch) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const token = generateToken(user.id);
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

const userController = new UserController();
export {
    userController,
    UserController
};

