// models/Bid.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface stays within the file
export interface IBid extends Document {
    amount: number;
    bidder: string;
    auctionItem: string;
    createdAt: Date;
    updatedAt: Date;
}

const BidSchema: Schema<IBid> = new Schema(
    {
        amount: { type: Number, required: true, min: 0 },
        bidder: { type: String, required: true },
        auctionItem: { type: String, required: true },
    },
    { timestamps: true }
);

const Bid: Model<IBid> = mongoose.models.Bid || mongoose.model<IBid>('Bid', BidSchema);
export default Bid;
