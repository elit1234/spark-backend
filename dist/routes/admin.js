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
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", (req, res) => {
    console.log(req.cookies);
    return res.json("ADMIN HERE");
});
router.post("/plans", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName } = req.body;
    let categoryId = categoryName === "onaccount" ? 1 : 2;
    const plans = yield prisma.plan.findMany({
        where: {
            category: categoryId
        },
        orderBy: {
            price: "asc"
        }
    });
    return res.json(plans);
}));
router.post("/plan", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId } = req.body;
    const plan = yield prisma.plan.findUnique({
        where: {
            id: Number(planId)
        }
    });
    return res.json(plan);
}));
router.post("/updatePlan", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, callAmount, dataAmount, name, smsAmount, price } = req.body;
    yield prisma.plan.update({
        where: {
            id: id
        },
        data: {
            callAmount: callAmount || undefined,
            dataAmount: dataAmount || undefined,
            smsAmount: smsAmount || undefined,
            price: price || undefined,
            name: name || undefined
        }
    });
    return res.json(true);
}));
exports.default = router;
