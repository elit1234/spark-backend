

import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"


const router = express.Router();
const prisma = new PrismaClient()


router.get("/", function (_req: Request, res: Response) {
    return res.json("LOGIN HERE")
})

router.get("/getPlans", async (req: Request, res: Response) => {
    const { id, subid } = req.query;
    console.log(subid)
    const plans = await prisma.$queryRaw`SELECT * FROM "Plan" AS P INNER JOIN "Category" AS C ON "subCategory" = C."categoryId" WHERE P."category" = ${Number(id)} ORDER BY price ASC`;
    return res.json(plans);
})






export default router;