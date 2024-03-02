import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

class ProductController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productName, productCategory, productDescription, unitOfMeasurement, quantity } = req.body;
      const createdProduct = await this.prisma.product.create({
        data: {
          productName,
          productCategory,
          productDescription,
          unitOfMeasurement,
          quantity,
        },
      });
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
const product = new ProductController();
export {
    product,
    ProductController
}
