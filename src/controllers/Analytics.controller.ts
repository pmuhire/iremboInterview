// controllers/analyticsController.ts
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class AnalyticsController {
    async recordAnalytics(req: Request, res: Response): Promise<void> {
        const { shortCode } = req.params;
        const { ipAddress, os, location } = req.body;

        try {
            const url = await prisma.url.findUnique({
                where: { shortUrl: `${req.protocol}://${req.get('host')}/api/urls/${shortCode}` }
            });

            if (!url) {
                res.status(404).json({ error: 'Short URL not found' });
                return;
            }

            const prismaAnal=await prisma.analytics.create({
                data: { ipAddress, os, location, urlId: url.id, },
            });
            const customAnal : Analytics = mapAnalyticsToPrismaModel(prismaAnal);
            res.json({ message: 'Analytics recorded successfully',data: customAnal });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const analyticsController = new AnalyticsController();

export {
    analyticsController,
    AnalyticsController
}
