"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useReducer } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { creatAuctionItem } from "../lib/actions/createAuctionItem";

type FormProps = {
    title: string;
    imgURL: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    intitalBid: string;
    multiple: string;
}
export const AddAuctionItems = () => {
    const initialFormState = { title: "", imgURL: "", description: "", startDate: "", endDate: "", startTime: "", endTime: "", intitalBid: "", multiple: "" };
    const reducer = (state: FormProps, action: { type: string; payload: any }): FormProps => {
        switch (action.type) {
            case 'UPDATE_FIELD':
                // Handle the action and return the updated state
                return { ...state, [action.payload?.name]: action.payload?.value };
            case 'RESET_FORM':
                return initialFormState;
            default:
                return state;

        }

    }
    const [state, dispatch] = useReducer(reducer, initialFormState);

    return <Card title="Add Auction Item" classNames="w-full max-w-3xl max-h-fit">
        <div className="w-full max-w-3xl">
            <TextInput label={"title"} placeholder={"title"} type="text" onChange={(e) => {
                dispatch({ type: "UPDATE_FIELD", payload: { name: "title", value: e } });
            }} />
            <TextInput label={"image URL"} placeholder={"image URL"} type="text" onChange={(e) => {
                dispatch({ type: "UPDATE_FIELD", payload: { name: "imgURL", value: e } });
            }} />
            <TextInput label={"description"} placeholder={"description"} type="text" onChange={(e) => {
                dispatch({ type: "UPDATE_FIELD", payload: { name: "description", value: e } });
            }} />
            <div className="flex gap-5 w-full">
                <TextInput label={"start date"} classNames={"flex-1"} placeholder={"startDate"} type="date" onChange={(e) => {
                    dispatch({ type: "UPDATE_FIELD", payload: { name: "startDate", value: e } });
                }} />
                <TextInput label={"start time"} classNames={"flex-1"} placeholder={"start time"} type="time" onChange={(e) => {
                    dispatch({ type: "UPDATE_FIELD", payload: { name: "startTime", value: e } });
                }} />
            </div>
            <div className="flex gap-5 w-full">
                <TextInput label={"end date"} classNames={"flex-1"} placeholder={"endDate"} type="date" onChange={(e) => {
                    dispatch({ type: "UPDATE_FIELD", payload: { name: "endDate", value: e } });
                }} />
                <TextInput label={"endTime"} classNames={"flex-1"} placeholder={"endTime"} type="time" onChange={(e) => {
                    dispatch({ type: "UPDATE_FIELD", payload: { name: "endTime", value: e } });
                }} />
            </div>

            <TextInput label={"intitalBid"} placeholder={"intitalBid"} type="number" onChange={(e) => {
                dispatch({ type: "UPDATE_FIELD", payload: { name: "intitalBid", value: e } });
            }} />
            <TextInput label={"Increment Amount"} placeholder={"Increment amount"} type="number" onChange={(e) => {
                dispatch({ type: "UPDATE_FIELD", payload: { name: "multiple", value: e } });
            }} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    const response = await creatAuctionItem({ ...state });
                    console.log(response);
                }}>
                    Add Auction item
                </Button>
            </div>
        </div>
    </Card>
}