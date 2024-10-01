// import { NextApiRequest, NextApiResponse } from 'next';
import { error } from 'console';
import connectToDatabase from '../../../mongo-store/connect';
import Bid from '../../../mongo-store/models/Bid';
import { NextRequest, NextResponse } from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     // Connect to the database
//     await connectToDatabase();

//     if (req.method === 'POST') {
//         // Create a new bid
//         try {
//             const { user, productId, bidAmount } = req.body;
//             const bid = new Bid({ user, productId, bidAmount });
//             await bid.save();
//             return res.status(201).json(bid);
//         } catch (error) {
//             return res.status(400).json({ error: 'Error creating bid' });
//         }
//     } else if (req.method === 'GET') {
//         // Fetch all bids
//         try {
//             const bids = await Bid.find({});
//             return res.status(200).json(bids);
//         } catch (error) {
//             return res.status(400).json({ error: 'Error fetching bids' });
//         }
//     } else {
//         return res.status(405).json({ error: 'Method not allowed' });
//     }
// }

export const GET = async () => {
    try {
        await connectToDatabase(); // Don't export `IBid`, just use it internally
        // return NextResponse.json(bids, { status: 200 });
    } catch (error) {
        console.log(error);
    }

    try {
        const bids = await Bid.find({}); // Don't export `IBid`, just use it internally
        return NextResponse.json(bids, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching bids' }, { status: 400 });
    }
}

export const POST = async (req: NextRequest) => {
    try {
        await connectToDatabase(); // Don't export `IBid`, just use it internally
        // return NextResponse.json(bids, { status: 200 });
    } catch (error) {
        console.log(error);
    }

    try {
        const { user, productId, bidAmount }: any = req.body;

        if (!user || !productId || !bidAmount)
            return NextResponse.json({ error: "invalid input" }, { status: 400 });

        const bid = new Bid({ user, productId, bidAmount });
        await bid.save();
        return NextResponse.json(bid, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error creating bid' }, { status: 400 });
    }
}