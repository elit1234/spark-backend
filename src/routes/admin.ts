import express, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { PlanType } from "../../global";


const router = express.Router();
const prisma = new PrismaClient()


router.get("/", (req: Request, res: Response) => {
    console.log(req.cookies);
    return res.json("ADMIN HERE")
})

router.post("/plans", async (req: Request, res: Response) => {
    const { categoryName } = req.body;
    let categoryId = categoryName === "onaccount" ? 1 : 2;
    const plans = await prisma.plan.findMany({
        where: {
            category: categoryId
        },
        orderBy: {
            price: "asc"
        }
    })
    return res.json(plans);
})
router.post("/plan", async (req: Request, res: Response) => {
    const { planId } = req.body;
    const plan = await prisma.plan.findUnique({
        where: {
            id: Number(planId)
        }
    })
    return res.json(plan);
})

router.post("/updatePlan", async (req: Request, res: Response) => {
    const { id, callAmount, dataAmount, name, smsAmount, price }: PlanType = req.body;
    await prisma.plan.update({
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
    })
    return res.json(true);
})

export default router;