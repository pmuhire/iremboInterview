import express, { Response, Request } from 'express';
import { PrismaClient } from "@prisma/client"
import detailsRouter from './routes/details';
import owner from './routes/owner';
import productRouter from './routes/product';
import importDetailsRouter from './routes/importDetails';
import permitRouter from './routes/permit';

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

export async function main() {
    app.use((req, res, next) => {
        const allowedOrigins = ['https://shortener-fe.vercel.app/', 'http://localhost:5173']; // Add your origins to this array
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use(express.json());
    app.use('/api/owner', owner);
    app.use("/api/details", detailsRouter)
    app.use("/api/importDetails", importDetailsRouter)
    app.use("/api/product", productRouter)
    app.use("/api/permit", permitRouter)
    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route not found` });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
