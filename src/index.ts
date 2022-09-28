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
    origin: "https://localdev.elijames.xyz", credentials: true
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://localdev.elijames.xyz');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    next();
});

app.use(cookieParser())

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/login', loginRoutes);

app.use("/admin", adminRoutes)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

