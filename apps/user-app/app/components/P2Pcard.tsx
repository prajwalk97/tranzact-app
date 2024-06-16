"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../lib/actions/createOnRampTransaction";
import { createP2PTransaction } from "../lib/actions/createP2PTransaction";


export const P2PCard = () => {
    const [value, setValue] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    return <Card title="Add Money">
        <div className="w-full">
            <TextInput label={"Number"} placeholder={"Phone Number"} type="text" onChange={(val) => {
                setPhoneNumber(val)
            }} />
            <TextInput label={"Amount"} placeholder={"Amount"} type="number" onChange={(val) => {
                setValue(Number(val))
            }} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createP2PTransaction(phoneNumber, Number(value) * 100)
                }}>
                    Send Money
                </Button>
            </div>
        </div>
    </Card>
}