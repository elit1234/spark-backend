

import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"
import client from '../redisClient';
import generateToken from '../func/generateToken';
import timeStamp from '../func/timeStamp';

const router = express.Router();
const prisma = new PrismaClient()


router.get("/", function (_req: Request, res: Response) {
    return res.json("LOGIN HERE")
})

router.post("/", async (req: Request, res: Response) => {

    const { username, password }: { username: string, password: string } = req.body;
    await prisma.user.findFirst({
        where: {
            email: {
                equals: username
            }
        }
    })
        .then(async (User: any) => {
            if (User && User.password === password) {
                const token = await generateToken();
                const results = await successfulLogin(User, token);
                return res.json(results).cookie("token", token)
            }
            else return res.json(false);
        })
})


async function successfulLogin(user: UserType, token: string) {

    const rightNow = await timeStamp();
    const dataToSet = {
        id: user.id,
        time: rightNow
    }
    await client.set(token, JSON.stringify(dataToSet));
    return {
        message: "welcome",
        token
    };
}

export default router;