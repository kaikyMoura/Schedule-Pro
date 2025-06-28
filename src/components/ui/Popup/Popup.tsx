import { usePopup } from "@/contexts/PopupContext/usePopup";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../alert";
import { Terminal, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface PopupProps {
    type: "error" | "success" | "warning" | "notification",
    title: string,
    message?: string
}

const iconMap = {
    error: <AlertTriangle className="text-red-500" />,
    success: <CheckCircle className="text-green-500" />,
    warning: <AlertTriangle className="text-yellow-500" />,
    notification: <Info className="text-blue-500" />,
};

const Popup = ({ title, message, type }: PopupProps) => {
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
        <Alert variant="default" className={bgColor + " flex flex-col gap-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 p-6 z-50 shadow-lg rounded-lg"} onClick={close}>
            <div className="flex items-center gap-2">
                {iconMap[type]}
                <AlertTitle>{title}</AlertTitle>
            </div>
            {message && (
                <AlertDescription>
                    {message}
                </AlertDescription>
            )}
            <div className="flex w-full justify-end mt-2">
                <Button variant="outline" onClick={close}>
                    Close
                </Button>
            </div>
        </Alert>
    );
}

export default Popup;