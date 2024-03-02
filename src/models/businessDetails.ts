import Joi from 'joi';
import { BusinessDetails as PrismaDetails } from "@prisma/client";

export interface BusinessDetails extends PrismaDetails {
  id: string;
  companyName: string;
  TinNumber: bigint
  Address: string
  RegistrationDate: Date
  createdAt : Date 
}

export const detailsValidation = Joi.object({
  companyName: Joi.string().required(),
  Address: Joi.string().required(),
  TinNumber: Joi.string().required(),
  RegistrationDate: Joi.date()
});
export const mapDetails = (details: PrismaDetails): BusinessDetails => ({
    ...details,
  });