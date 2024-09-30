"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState, useTransition } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createP2PTransaction } from "../lib/actions/createP2PTransaction";
import { useRouter } from "next/navigation";


export const P2PCard = () => {
    const [value, setValue] = useState(0);
    const [message, setMessage] = useState("");
    const [isPending, startTransition] = useTransition();
    const [phoneNumber, setPhoneNumber] = useState("");
    const router = useRouter(); // H
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
                    const response = await createP2PTransaction(phoneNumber, Number(value) * 100);
                    setMessage(response.message);
                    startTransition(() => {
                        router.refresh(); // Refreshes the parent server component
                    });
                }}>
                    Send Money
                </Button>
            </div>
            {message ? <span style={{ color: "purple" }}>{message}</span> : null}
        </div>
    </Card>
}