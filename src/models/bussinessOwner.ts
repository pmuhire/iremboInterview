import Joi from 'joi';
import { BusinessOwner as Owner } from '@prisma/client';

export interface BussinessOwner extends Owner {
  id: string
  citizenship: string
  identificationNumber: string
  passportNumber: string
  otherNames: string
  surname: string
  Nationality: string
  phoneNumber: string
  email: string
  createdAt: Date
}

export const ownerValidationSchema = Joi.object({
  citizenship: Joi.string().required(),
  Nationality: Joi.string().required(),
  surname: Joi.string().required(),
  otherNames: Joi.string().required(),
  identificationNumber: Joi.string().max(16).min(16),
  passportNumber: Joi.string(),
  phoneNumber: Joi.string().max(10).min(10),
  email: Joi.string().email().required()
});
export const mapBussinessOwnerToCustomModel = (owner: Owner): BussinessOwner => ({
  ...owner,
});