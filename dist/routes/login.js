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
const client_1 = require("@prisma/client");
const redisClient_1 = __importDefault(require("../redisClient"));
const generateToken_1 = __importDefault(require("../func/generateToken"));
const timeStamp_1 = __importDefault(require("../func/timeStamp"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", function (_req, res) {
    return res.json("LOGIN HERE");
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    yield prisma.user.findFirst({
        where: {
            email: {
                equals: username
            }
        }
    })
        .then((User) => __awaiter(void 0, void 0, void 0, function* () {
        if (User && User.password === password) {
            const token = yield (0, generateToken_1.default)();
            const results = yield successfulLogin(User, token);
            return res.json(results).cookie("token", token);
        }
        else
            return res.json(false);
    }));
}));
function successfulLogin(user, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const rightNow = yield (0, timeStamp_1.default)();
        const dataToSet = {
            id: user.id,
            time: rightNow
        };
        yield redisClient_1.default.set(token, JSON.stringify(dataToSet));
        return {
            message: "welcome",
            token
        };
    });
}
exports.default = router;
