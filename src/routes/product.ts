// routes/url.routes.ts
import express from 'express';
import { product } from '../controllers/ProductController';

const productRouter = express.Router();

productRouter.post('/create', product.createProduct.bind(product));
// urlRouter.get('/:shortCode', urlController.redirectToOriginalUrl.bind(urlController));

export default productRouter;
