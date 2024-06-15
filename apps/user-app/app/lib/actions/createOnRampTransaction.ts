"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";


export const createOnRampTransaction = async (provider: string, amount: number) => {
    const session = await getServerSession(authOptions);
    const user = session.user.id;
    console.log(user)
    const token = (Math.random() * 1000).toString();
    await prisma.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(user),
            amount: amount * 100
        }
    });

    return {
        message: "Done"
    }
}
