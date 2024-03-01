import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LocationController {
    async createLocation(req: Request, res: Response): Promise<void> {
        // console.log(req);
        const {
            address
        } = req.body;

        try {
            const createdLocation = await prisma.location.create({
                data: {
                    address
                },
            });
            console.log(createdLocation);
            res.json({ sucess: true, info: createdLocation });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllLocations(req: Request, res: Response): Promise<void> {
        console.log(req);
        try {
            const location = await prisma.location.findMany();
            res.json(location);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getLocationById(req: Request, res: Response): Promise<void> {
        const locationId = req.params.id;

        try {
            const location = await prisma.location.findUnique({
                where: { id: locationId },
            });

            if (!location) {
                res.status(404).json({ error: 'Location not found' });
                return;
            }

            res.json(location);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
const locationController = new LocationController();
export {
    locationController,
    LocationController
}