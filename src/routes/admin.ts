import express, { Request, Response } from "express"
const router = express.Router();


router.get("/", (req: Request, res: Response) => {
    console.log(req.cookies);
    return res.json("ADMIN HERE")
})

export default router;