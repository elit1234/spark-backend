import express, { Express, Request, Response, Router } from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import loginRoutes from './routes/login';
import adminRoutes from "./routes/admin"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'https://localdev.elijames.xyz');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader("Access-Control-Expose-Headers", "set-cookie")

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



// app.use(cors({
//     origin: "https://localdev.elijames.xyz", credentials: true
// }))

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'https://localdev.elijames.xyz');
//     res.setHeader('Access-Control-Allow-Credentials', "true");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use(cookieParser())

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/login', loginRoutes);

app.use("/admin", adminRoutes)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

