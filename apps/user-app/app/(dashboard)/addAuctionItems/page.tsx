"use client"

import { useEffect } from "react";
import { AddAuctionItems } from "../../components/AddAuctionItems";

export default async function () {
    useEffect(() => {
        const x: any = async () => {
            try {
                const response = await fetch(`/api/bids`);
                const res = await response.json();
                console.log(res);
            } catch (e) {
                console.log(e);

            }
        };
        x();

    }, [])
    // console.log(response.json());
    return <AddAuctionItems />
}