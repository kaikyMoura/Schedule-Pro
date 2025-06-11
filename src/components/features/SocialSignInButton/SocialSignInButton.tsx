import Loader from "@/components/ui/Loader";
import { useSocialSignIn } from "./hook";
import React from "react";

interface SocialSignInButtonProps {
    provider: 'google' | 'apple' | 'facebook';
    icon: React.ReactNode;
    children: React.ReactNode;
    callbackUrl: string;
}

const SocialSignInButton = ({ provider, icon, children, callbackUrl }: SocialSignInButtonProps) => {
    const { signInWith, isLoading, error } = useSocialSignIn();
    const handleSignIn = async () => {
        await signInWith(provider, callbackUrl);
    }

    return (
        <button type="button"
            className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-(--secondary-bg) text-md font-medium text-(--primary-text-color) hover:bg-gray-50 hover:text-(--tertiary-text-color) transition-all duration-150"
            onClick={handleSignIn}
            disabled={isLoading}>
            {isLoading ? <Loader /> :
                <React.Fragment>
                    <span className="mr-2">{icon}</span>
                    {children}
                </React.Fragment>
            }
            {error && <p className="text-red-500">{error.message}</p>}
        </button>
    )
}

export default SocialSignInButton;