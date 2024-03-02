import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { detailsValidation } from '../models/businessDetails';

const prisma = new PrismaClient();

class BusinnessDetailsController {
    async createBusinessDetails(req: Request, res: Response): Promise<void> {
        // console.log(req);
        const {
            companyName,
            TinNumber,
            Address,
            RegistrationDate,
            businessType
        } = req.body;

        try {
            await detailsValidation.validateAsync({
                companyName,
                TinNumber,
                Address,
                RegistrationDate,
            });
            const details = await prisma.businessDetails.findFirst({
                where: {
                    OR: [
                        { TinNumber },
                        { companyName },
                    ],
                },
            });

            if (details) {
                res.json({ sucess: true, info: { ...details } });
                return;
            }
            const createdDetails = await prisma.businessDetails.create({
                data: {
                    companyName,
                    TinNumber,
                    Address,
                    RegistrationDate,
                    businessType
                },
            });
            console.log(createdDetails);
            res.json({ sucess: true, info: createdDetails });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getBusinnessDetails(req: Request, res: Response): Promise<void> {
        // console.log(req);
        try {
            const details = await prisma.businessDetails.findMany();
            res.json(details);
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