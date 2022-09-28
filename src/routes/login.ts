

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
    console.log("TRYING LOGIGNG IN : " + username)
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
                res.cookie("token", token, {
                    maxAge: 1800000,
                    httpOnly: true
                })
                return res.json(results)
            }
            else return res.json(false);
        })
})


async function successfulLogin(user: UserType, token: string) {
    const rightNow = await timeStamp();
    const dataToSet = {
        id: user.id,
        time: rightNow,
        admin: user.admin ? user.admin : 0
    }
    await client.set(token, JSON.stringify(dataToSet));
    return {
        message: "welcome",
        token
    };
}

export default router;