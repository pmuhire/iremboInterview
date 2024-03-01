import Joi from 'joi';
// import {  } from "../generated/client";
import { User as PrismaUser  } from "@prisma/client"
export interface User extends PrismaUser {
    id: string;
    email: string;
    username: string;
    password: string;
    fullName: string;
}

export const userValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().min(8).max(30).required(),
    fullName: Joi.string().max(255).required(),
});
export const mapUserToCustomModel = (prismaUser: PrismaUser): User => ({
    ...prismaUser,
});