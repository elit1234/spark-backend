"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const login_1 = __importDefault(require("./routes/login"));
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const typedefs_1 = __importDefault(require("./graphq/typedefs"));
const resolvers_1 = __importDefault(require("./graphq/resolvers"));
const apollo_server_express_1 = require("apollo-server-express");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typedefs_1.default,
    resolvers: resolvers_1.default,
});
const loadFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    server.applyMiddleware({ app });
});
loadFunc();
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
    res.setHeader("Access-Control-Expose-Headers", "set-cookie");
    // Pass to next layer of middleware
    next();
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Express + TypeScript Server');
}));
app.use('/login', login_1.default);
app.use("/admin", admin_1.default);
app.use("/shop", shop_1.default);
app.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token", { secure: true, httpOnly: true });
    res.end();
}));
app.listen(port, () => {
    console.log(`??????[server]: Server is running at https://localhost:${port}`);
});
