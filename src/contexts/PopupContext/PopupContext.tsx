import Popup from "@/components/ui/Popup";
import { createContext, ReactNode, useState } from "react";

interface ShowPopupProps {
    title: string;
    message: string;
    type: "error" | "success" | "warning" | "notification";
    actionsPopup?: boolean | false
    action?: () => void
}

interface PopupContextProps {
    showPopup: (props: ShowPopupProps) => void;
    closePopup: () => void;
}

const PopupContext = createContext<PopupContextProps | undefined>(undefined);

const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [popupState, setPopupState] = useState<ShowPopupProps | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const showPopup = (props: ShowPopupProps) => {
        setPopupState(props);
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setTimeout(() => setPopupState(null), 300);
    };

    return (
        <PopupContext.Provider value={{ showPopup, closePopup }}>
            {children}
            {isOpen && popupState && (
                <Popup
                    title={popupState.title}
                    message={popupState.message}
                    type={popupState.type}
                    actionsPopup={popupState.actionsPopup}
                    action={popupState.action}
                />
            )}
        </PopupContext.Provider>
    );
};

export { PopupContext, PopupProvider };