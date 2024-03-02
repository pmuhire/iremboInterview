// ImportDetailsController.ts

import { Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';

class ImportDetailsController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createImportDetails(req: Request, res: Response): Promise<void> {
    try {
      const { purpose, details } = req.body;
      const createdImportDetails = await this.prisma.importDetails.create({
        data: {
          purpose,
          details,
        },
      });
      res.status(201).json(createdImportDetails);
    } catch (error) {
      console.error('Error creating import details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
const importDetails = new ImportDetailsController();
export {
    importDetails,
    ImportDetailsController
}

