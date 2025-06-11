import { signIn } from "next-auth/react";
import { useState } from "react";

/**
 * Custom hook for handling social sign-in.
 *
 * Provides loading and error states during the authentication process
 * and a function to initiate sign-in with a specified provider.
 *
 * @returns An object containing:
 * - `isLoading`: A boolean indicating if the sign-in process is ongoing.
 * - `error`: An Error object or null if no error has occurred.
 * - `signInWith`: A function to perform sign-in with a given provider and callback URL.
 */
export const useSocialSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * Sign in with the specified provider and redirect to the callback URL.
     *
     * @param provider The provider to sign in with.
     * @param callbackUrl The URL to redirect to after signing in.
     */
    const signInWith = async (provider: string, callbackUrl: string) => {
        setIsLoading(true);
        setError(null);
        try {
            setIsLoading(false);
            await signIn(provider, { callbackUrl: callbackUrl });
        } catch (err) {
            setError(err as Error);
            console.error("Unexpected error", err);
        }
        finally {
            setIsLoading(false);
        }
    }
    return { isLoading, error, signInWith };
};
