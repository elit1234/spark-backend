import express, { Express, Request, Response } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import loginRoutes from './routes/login';
import adminRoutes from "./routes/admin"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors({
    origin: "http://localhost:3000", credentials: true
}))
app.use(cookieParser())

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/login', loginRoutes);

app.use("/admin", adminRoutes)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

