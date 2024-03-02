// Import necessary modules
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { emailer } from '../utils/nodemailer';

const prisma = new PrismaClient();

class ImportPermitController {
  async create(req: Request, res: Response) {
    console.log(req.body)
    try {
      const {
        citizenship,
        nationalId,
        passportId,
        email,
        phone,
        company,
        TIN,
        date,
        province,
        businessType,
        purposeOfImportation,
        productCategory,
        weight,
        unitOfMeasurement,
        qty,
        desc,
        othernames,
        surname
      } = req.body;

      const newRecord = await prisma.permit.create({
        data: {
          citizenship,
          email,
          phone,
          company,
          TIN,
          date,
          province,
          businessType,
          purposeOfImportation,
          productCategory,
          weight,
          unitOfMeasurement,
          qty,
          desc,
          othernames,
          surname,
          passportId,
          nationalId
        },
      });
      emailer.notify(newRecord);
      res.status(201).json(newRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get all records
  async getAll(req: Request, res: Response) {
    try {
      const allRecords = await prisma.permit.findMany();
      res.status(200).json(allRecords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
const permit = new ImportPermitController();
export {
    permit,
    ImportPermitController
};
