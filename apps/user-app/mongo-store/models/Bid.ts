// models/Bid.ts
import mongoose, { Model, Schema } from 'mongoose';

// Interface stays within the file

const STATUS_ENUM = ['pending', 'active', 'completed', 'cancelled'] as const;
const bidSchema: Schema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    initialBid: {
        type: Number,
        required: true,
    },
    multiple: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: STATUS_ENUM,
        default: "pending",
        required: true,

    }
});

const Bid: Model<any> = mongoose.models.Bid || mongoose.model<any>('Bid', bidSchema);
export default Bid;
