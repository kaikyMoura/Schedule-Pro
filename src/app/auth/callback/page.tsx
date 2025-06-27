"use client"
import { useLoading } from "@/contexts/LoadingContext/useLoading";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const OauthCallback = () => {
    const { isLoading, setLoading } = useLoading();
    const { data: session } = useSession();

    useEffect(() => {
        setLoading(false)
        // Todo: Fetch the user from the api and if it exists, redirect to the dashboard
    }, [session?.user, setLoading])

    return ( 
        <div>
            {isLoading && <div>Loading...</div>}
        </div>
    )
}

export default OauthCallback;