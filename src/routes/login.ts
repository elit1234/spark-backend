

import express, { Request, Response } from 'express';
import client from '../redisClient';
import generateToken from '../func/generateToken';
import timeStamp from '../func/timeStamp';
import { prisma } from '../prismaClient';
import { UserType } from '../../global';

const router = express.Router();


router.get("/", function (_req: Request, res: Response) {
    return res.json("LOGIN HERE")
})

router.post("/", async (req: Request, res: Response) => {
    try {
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
                        httpOnly: true,
                        secure: true,
                        // sameSite: 'strict',
                        // domain: "elijames.xyz"
                    })
                    res.cookie("username", User.name, {
                        secure: true
                    })
                    return res.json(results)
                }
                else return res.json(false);
            })
    }
    catch (err) {
        console.log("ERROR::::")
        console.log(err)
    }
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