import express from "express";
import db from '@repo/db/client'
import prisma from "@repo/db/client";
const app = express();

app.use(express.json())
app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    console.log("deb", req.body);
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string;
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // update balance and onramp transaction 
    try {
        await db.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId),
                },
                data: {
                    amount: {
                        increment: Number(req.body.amount)
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success",
                }
            }),
        ])
    } catch (e) {
        console.log(e);
    }

    res.json({
        message: "captured"
    });
    // Update balance in db, add txn
})


app.listen(8000);