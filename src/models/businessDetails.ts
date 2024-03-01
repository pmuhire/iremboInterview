import Joi from 'joi';
import { BusinessDetails as PrismaDetails } from "@prisma/client";

export interface BusinessDetails extends PrismaDetails {
  id: string;
  companyName: string;
  TinNumber: bigint
  bussinessAddress: string
  Address: string
  RegistrationDate: Date
  createdAt : Date 
}

export const logValidationSchema = Joi.object({
  message: Joi.string().max(500).required(),
  createdAt: Joi.date().iso().required(),
});
export const mapLogToCustomModel = (details: PrismaDetails): BusinessDetails => ({
    ...details,
  });