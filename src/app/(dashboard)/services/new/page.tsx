"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/LoadingContext/useLoading";
import { usePopup } from "@/contexts/PopupContext/usePopup";
import { useNotificationStore } from "@/stores/useNotificationStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const user = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson123@example.com',
    number: '123-456-7890',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'CUSTOMER'
}

const availableIcons: { name: string; icon: React.ElementType }[] = [
]
const NewService = () => {
    const { showPopup, closePopup } = usePopup();

    // const handleOpenPopup = () => {
    //     showPopup({
    //         title: "Update appointment",
    //         message: "Are you sure you want to update this customer?",
    //         type: "notification",
    //         actionsPopup: true,
    //         action: handleSubmit,
    //     });
    // };

    const { addNotification } = useNotificationStore();

    const handleOpenNotification = () => {
        addNotification("Service created successfully", "a new service has been created", "notification");
    };
    const { setLoading } = useLoading()

    const [type, setType] = useState('');
    const [price, setPrice] = useState<number>();
    const [duration, setDuration] = useState<number>();
    const [selectedIcon, setIcon] = useState('');
    const [color, setColor] = useState('');
    const router = useRouter()

    const IconComponent = availableIcons.find((item) => item.name === selectedIcon)?.icon;

    const handleSubmit = async () => {
        if (!type || !price || !duration || !selectedIcon || !color) {
            alert("Please fill in all fields");
            return;
        }
        handleOpenNotification()

        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false)
        showPopup({
            title: "Service Created Successfully",
            type: "success",
            actionsPopup: true,
            action: closePopup,
        });
    }

    if (user.role !== "CUSTOMER") {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center text-(--primary-text-color)">
                <h1 className="text-3xl font-bold">Unauthorized</h1>
                <p className="mt-4">You are not authorized to access this page</p>
                <Button variant={"default"} className='mt-4 p-4 max-w-36 h-10'>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        )
    }
    else {
        return (
            <div className="min-h-screen max-h-screen">
                <Card className="w-full h-full">
                    <form className="p-6">
                        <div className="gap-6">
                            <div>
                                <h3 className="text-lg font-semibold text-(--primary-text-color) mb-4">Create a new service</h3>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-(--primary-text-color) mb-1" htmlFor="staff">Choose a icon</label>
                                    <div className="relative">
                                        {availableIcons.map((icon) => (
                                            <button
                                                type="button"
                                                key={icon.name}
                                                onClick={() => setIcon(icon.name)}
                                                className={`p-3 border rounded text-xl hover:bg-blue-500 hover:text-white hover:border-blue-500 ${selectedIcon === icon.name ? 'bg-blue-500 text-white' : 'bg-white'
                                                    }`}
                                            >
                                                {<icon.icon />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6 flex items-center gap-6 text-(--primary-text-color)">
                                    <label className="flex flex-col justify-start gap-1" style={{ marginLeft: '2rem' }}>
                                        Pick Color:
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                            style={{ marginLeft: '0.5rem' }}
                                        />
                                    </label>

                                    <div className="mb-6" style={{ marginTop: '2rem', fontSize: '2rem', color }}>
                                        {IconComponent && <IconComponent />}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="relative">
                                        <Input type="text" placeholder="Enter service name"
                                            onChange={(e: { target: { value: string; }; }) => setType(e.target.value)} value={type} />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="relative">
                                        <Label>Service Price</Label>
                                        <Input type="number" placeholder="Enter service price"
                                            onChange={(e: { target: { value: string; }; }) => setPrice(Number(e.target.value))} value={price} />
                                    </div>
                                </div>

                                <div className="">
                                    <div className="relative">
                                        <Label>Average Duration</Label>
                                        <Input type="number" placeholder="Enter service duration"
                                            onChange={(e: { target: { value: string; }; }) => setDuration(Number(e.target.value))} value={duration} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
                <div className="flex justify-between gap-4 mt-4">
                    <Button type="button" variant={"secondary"} onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" variant={"default"} onClick={handleSubmit} >Create Service</Button>
                </div>
            </div>
        )
    }
}

export default NewService;