import { Card } from "@/components/ui/card"

const VerifyEmailPage = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="text-center">
                <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
                <p className="mb-6">Please check your email for a verification link.</p>
                <p>If you didn't receive an email, please check your spam folder or try resending the verification link.</p>
            </Card>
        </div>
    );
}

export default VerifyEmailPage;