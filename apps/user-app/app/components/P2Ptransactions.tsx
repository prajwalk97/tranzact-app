import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const P2PTransactions = async ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        fromUserId: number,
        toUserId: number
    }[]
}) => {
    const session = await getServerSession(authOptions);
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    console.log("debug", typeof session?.user?.id, transactions);
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t =>
                <div key={crypto.randomUUID()} className="flex justify-between">
                    <div>
                        <div className={`text-sm ${t.toUserId === Number(session?.user?.id) ? 'text-lime-500' : 'text-yellow-500'}`}>
                            {t.toUserId === Number(session?.user?.id) ? `From User - ${t.fromUserId} to You` : `To User - ${t.toUserId} From You`}
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>

                </div>)}
        </div>
    </Card>
}
