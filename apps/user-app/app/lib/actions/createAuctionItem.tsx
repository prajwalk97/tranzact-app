"use server"
import connectToDatabase from '../../../mongo-store/connect';
import Bid from '../../../mongo-store/models/Bid';

export const creatAuctionItem = async (props: { title: any; imgURL: any; description: any; startDate: any; endDate: any; startTime: any; endTime: any; intitalBid: any; multiple: any; }) => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.log(error);
    }
    console.log("hiiii",);
    try {
        const {
            title,
            imgURL,
            description,
            startDate,
            endDate,
            startTime,
            endTime,
            intitalBid,
            multiple
        } = props;

        // Combine date and time to create DateTime objects
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);

        // Ensure startDateTime is before endDateTime
        if (startDateTime >= endDateTime) {
            return { success: false, message: 'Start time must be before end time' };
        }

        // Create a new bid document using the Bid model
        const bid = new Bid({
            productId: crypto.randomUUID(),
            title,
            imgURL,
            description,
            startDateTime,
            endDateTime,
            initialBid: parseInt(intitalBid, 10),
            multiple: parseInt(multiple, 10),
        });

        // Save the bid to the database (which creates the bid in the 'bids' collection)
        await bid.save();

        return { success: true };
    } catch (error) {
        return { success: false, message: error?.message };
    }
}
