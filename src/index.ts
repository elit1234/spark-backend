import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import loginRoutes from './routes/login';
import adminRoutes from "./routes/admin"
import shopRoutes from "./routes/shop";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import typeDefs from './graphq/typedefs';
import resolvers from './graphq/resolvers';
import { ApolloServer } from "apollo-server-express"

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

const loadFunc = async () => {
    await server.start();
    server.applyMiddleware({ app })
}
loadFunc()


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

app.use(cookieParser())

app.get('/', async (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/login', loginRoutes);

app.use("/admin", adminRoutes)

app.use("/shop", shopRoutes);

app.get("/logout", async (req: Request, res: Response) => {
    res.clearCookie("token", { secure: true, httpOnly: true })
    res.end();
})


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

