import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { emailer } from '../utils/nodemailer';
import { mapBussinessOwnerToCustomModel, ownerValidationSchema } from '../models/bussinessOwner';

const prisma = new PrismaClient();

class BusinnessDetailsController {
    async createBusinessDetails(req: Request, res: Response): Promise<void> {
        // console.log(req);
        const {
            citizenship,
            identificationNumber,
            passportNumber,
            otherNames,
            surname,
            Nationality,
            phoneNumber,
            email,
        } = req.body;

        try {
            await ownerValidationSchema.validateAsync({
                identificationNumber,
                passportNumber,
                otherNames,
                surname,
                Nationality,
                phoneNumber,
                email,
                citizenship
            });
            const owner = await prisma.businessOwner.findFirst({
                where: {
                    OR: [
                        { identificationNumber },
                        { passportNumber },
                    ],
                },
            });

            if (owner) {
                res.json({ sucess: true, info: { ...owner } });
                return;
            }


            const createdOwner = await prisma.businessOwner.create({
                data: {
                    citizenship,
                    identificationNumber,
                    passportNumber,
                    otherNames,
                    surname,
                    Nationality,
                    phoneNumber,
                    email,
                },
            });
            console.log(createdOwner);
            await emailer.notifyUserForSignup(createdOwner.email, createdOwner.surname);
            res.json({ sucess: true, info: createdOwner });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getBusinnessDetails(req: Request, res: Response): Promise<void> {
        // console.log(req);
        try {
            const owner = await prisma.businessOwner.findMany();
            res.json(owner.map(mapBussinessOwnerToCustomModel));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getBusinessDetailsById(req: Request, res: Response): Promise<void> {
        const businessDetailsId = req.params.id;

        try {
            const details = await prisma.businessDetails.findUnique({
                where: { id: businessDetailsId },
            });

            if (!details) {
                res.status(404).json({ error: 'details not found' });
                return;
            }

            res.json(details);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
const businnessDetailsController = new BusinnessDetailsController();
export {
    businnessDetailsController,
    BusinnessDetailsController
}