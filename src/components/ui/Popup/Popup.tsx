import { usePopup } from "@/contexts/PopupContext/usePopup";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PopupProps {
    type: "error" | "success" | "warning" | "notification",
    title: string,
    message?: string
    actionsPopup?: boolean | false
    action?: () => void
}

const Popup = ({ action, title, message, type, actionsPopup }: PopupProps) => {
    const { closePopup } = usePopup();

    const bgColor = {
        error: "bg-red-100 text-red-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        notification: "bg-gray-50 text-black-700",
    }[type];

    useEffect(() => { }, [bgColor])

    const close = () => {
        closePopup()
    };

    return (
        <div className={`fixed top-[50%] right-[50%] translate-x-[50%] p-4 rounded-md shadow-lg space-y-4 ${bgColor}`} onClick={close}>
            <h2 className={"font-2xl font-semibold"}>{title}</h2>
            <p className="font-medium">
                {message}
            </p>
            {actionsPopup && (
                <div className="flex gap-4">
                    <Button className={`font-normal text-md`} variant={"secondary"} type="button" onClick={close}>Close</Button>
                    <Button className={`font-normal text-md`} variant={"default"} type="button" onClick={action}>Action</Button>
                </div>
            )}
        </div>
    );
}

export default Popup;