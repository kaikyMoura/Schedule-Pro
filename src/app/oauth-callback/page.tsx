import { useLoading } from "@/contexts/LoadingContext/useLoading";
import { useSession } from "next-auth/react";
import { useEffect } from "react"

const OauthCallback = () => {
    const { isLoading, setLoading } = useLoading();
    const { data: session } = useSession();

    useEffect(() => {
        setLoading(true)
        // Todo: Fetch the user from the api and if it exists, redirect to the dashboard
    }, [session?.user, setLoading])

    return (
        <div>
            {/* TODO: Add cloud flare verification */}
            <p>Callback</p>
        </div>
    )
}

export default OauthCallback;