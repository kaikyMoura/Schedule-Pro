"use client";
import OTPInput from "@/components/features/OTPInput";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import { createUserSchema } from "@/schemas/create-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaPhone } from "react-icons/fa6";
import z from "zod";

const CompleteProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
    });

    const [countdown, setCountdown] = useState(60);
    const [isCounting, setIsCounting] = useState(true)

    const [page, setPage] = useState(1);
    const { data: session } = useSession();
    const [userData, setUserData] = useState<{
        name?: string | null;
        email?: string | null;
        image?: string | null;
        phone?: string | null;
    }>({});

    useEffect(() => {
        if (session?.user) {
            setUserData(session?.user);
        }
    }, [session]);

    useEffect(() => {
        if (isCounting && countdown > 0) {
            const timerId = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        } else if (countdown === 0) {
            setIsCounting(false);
        }
    }, [countdown, isCounting]);

    const handleResendClick = () => {
        setIsCounting(true);
        setCountdown(60);
    };

    if (!session) return <Loader />;

    const handlePageChange = (page: number) => {
        console.log(page)
        setPage(page);
    };

    return (
        <div className="flex flex-col justify-center items-center max-w-screen h-screen max-h-screen mx-auto relative">
            <div className="p-8 bg-(--component-color) max-w-md rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <form>
                    {page === 1 ?
                        <Card className="w-full">
                            {/* Page 1 */}
                            <div className="flex flex-col mb-5 gap-4">
                                <h2 className="text-2xl font-semibold text-(--primary-text-color) mb-6 text-center">Complete your profile</h2>
                                <div className="relative">
                                    <div className="absolute inset-y-12 right-2 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-(--primary-text-color) w-4 h-4 z-10" />
                                    </div>
                                    <Input type="tel" label="Phone number" placeholder="+1 111-222-333"
                                        {...register("phone")} autoComplete="tel" />
                                </div>
                                <Button type="button" text={"Next"} buttonStyle={"primary"} onClick={() => handlePageChange(page + 1)} disabled={userData?.phone?.length !== undefined && userData?.phone?.length > 10} />
                            </div>
                        </Card>
                        :
                        <div>

                            <Card className="w-full">
                                {/* Page 2 */}
                                <button type="button" className="relative flex items-center cursor-pointer mb-2" onClick={() => handlePageChange(page - 1)}>
                                    <FaArrowLeft className="text-(--primary-text-color) w-4 h-4 z-10" />
                                    <p className="text-(--primary-text-color) ml-2">Back</p>
                                </button>
                                <div className="flex flex-col text-center mb-5 gap-4">
                                    <h2 className="text-2xl font-semibold text-(--primary-text-color) text-center">Enter the code</h2>
                                    <p className="text-(--primary-text-color) text-sm">We have sent a code to your phone number</p>
                                    <div className="relative flex gap-2">
                                        <OTPInput onChange={() => { }} />
                                    </div>
                                    <button type="button"
                                        onClick={handleResendClick}
                                        disabled={isCounting}
                                        className="text-sm font-medium text-start text-blue-600 hover:text-blue-700">
                                        {isCounting ? `Resend code ${countdown}s` : 'Resend code'}
                                    </button>
                                    <Button type="button" text={"Submit"} buttonStyle={"primary"} onClick={() => handlePageChange(page + 1)} />
                                </div>
                            </Card>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
};

export default CompleteProfile;