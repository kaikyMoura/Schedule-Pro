"use client";

import OTPInput from "@/components/features/OTPInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { usePopup } from "@/contexts/PopupContext/usePopup";
import { sendOtp, signUp, verifyOtp } from "@/lib/services/auth.service";
import { CreateUserSchema, createUserSchema } from "@/schemas/create-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const CompleteSignupPage = () => {
    const route = useRouter();
    const { showPopup } = usePopup();

    const [countdown, setCountdown] = useState(60);
    const [isCounting, setIsCounting] = useState(true)

    const [otp, setOtp] = useState<string>("");

    const [page, setPage] = useState(1);
    const { data: session } = useSession();
    const [userData, setUserData] = useState<{
        name?: string | null;
        email?: string | null;
        confirmEmail?: string | null;
        password?: string | null;
        confirmPassword?: string | null;
        photo?: string | null;
        phone?: string | null;
    }>({});

    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: userData?.name || "",
            email: userData?.email || "",
            photo: userData?.photo || "",
            phone: userData?.phone || "",
        },
    });

    useEffect(() => {
        if (session?.user) {
            setUserData(session?.user);
        }
        else if (localStorage.getItem("signupPayload")) {
            const payload = JSON.parse(localStorage.getItem("signupPayload") || "{}");
            setUserData({
                name: payload.name,
                password: payload.password,
                email: payload.email,
                photo: payload.photo,
                phone: payload.phone,
            });
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
        setOtp("");
        sendCode();
    };

    if (!session) return <Loader />;

    const handlePageChange = (page: number) => {
        console.log(page)
        setPage(page);
    };

    const sendCode = async () => {
        const phone = form.getValues("phone");
        const response = await sendOtp(phone);

        if (response.success) {
            showPopup({
                title: "Success",
                message: "Code sent successfully",
                type: "success",
                actionsPopup: false,
            });
            handlePageChange(2);
        } else {
            showPopup({
                title: "Error",
                message: response.message || "Failed to send code",
                type: "error",
                actionsPopup: false,
            });
        }
    }

    const verifyCode = async () => {
        const phone = form.getValues("phone");

        const response = await verifyOtp(phone, otp);
        if (response.success) {
            showPopup({
                title: "Success",
                message: response.message || "OTP verified successfully",
                type: "success",
                actionsPopup: false,
            });
            const payload = {
                name: userData.name!,
                email: userData.email!,
                password: userData.password!,
                photo: userData.photo!,
                phone: userData.phone!,
            };

            const result = await signUp(payload)

            if (result.success) {
                showPopup({
                    title: "Success",
                    message: "Account created successfully",
                    type: "success",
                    actionsPopup: false,
                });
                localStorage.removeItem("signupPayload");
                route.push("/verify-email");
            } else {
                showPopup({
                    title: "Error",
                    message: result.message || "Failed to create account",
                    type: "error",
                    actionsPopup: false,
                });
            }
        } else {
            showPopup({
                title: "Error",
                message: response.message || "Failed to verify OTP",
                type: "error",
                actionsPopup: false,
            });
        }
    };

    return (
        <div className="flex flex-col justify-center items-center max-w-screen h-screen max-h-screen mx-auto relative">
            <Form {...form}>
                <form className="space-y-6">
                    {page === 1 ?
                        <Card className="w-full p-8">
                            {/* Page 1 */}
                            <div className="flex flex-col mb-5 gap-4">
                                <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Complete your profile</h2>
                                <FormField
                                    name={"phone"}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <div className="flex relative flex-col">
                                                    <Phone className="absolute left-3 inset-y-5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        type="tel"
                                                        placeholder="Your Phone"
                                                        className="pl-10"
                                                        {...field}
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                    />
                                                    <div className="mt-5 flex w-full">
                                                        <Button
                                                            className="w-full"
                                                            type="button"
                                                            variant={"default"}
                                                            onClick={sendCode}
                                                            disabled={field.value.length < 10 || field.value.length > 15}
                                                        >
                                                            Send Code
                                                        </Button>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </Card>
                        :
                        <div>
                            <Card className="w-full p-8">
                                {/* Page 2 */}
                                <Button variant="ghost" type="button" className="relative flex items-center justify-start cursor-pointer mb-2 w-1/3" onClick={() => handlePageChange(page - 1)}>
                                    <ArrowLeft className="text-primary w-4 h-4 z-10" />
                                    <p className="text-primary ml-2">Back</p>
                                </Button>
                                <div className="flex flex-col text-center mb-5 gap-4">
                                    <h2 className="text-2xl font-semibold text-primary text-center">Enter the code</h2>
                                    <p className="text-primary text-sm">We have sent a code to your phone number</p>
                                    <div className="relative flex gap-2">
                                        <OTPInput onChange={(value) => setOtp(value)} />
                                    </div>
                                    <Button variant="ghost" type="button"
                                        onClick={handleResendClick}
                                        disabled={isCounting}
                                        className="text-sm font-medium text-start text-blue-600 hover:text-blue-700">
                                        {isCounting ? `Resend code ${countdown}s` : 'Resend code'}
                                    </Button>
                                    <Button type="button" variant={"default"} onClick={verifyCode} className="w-full">
                                        Submit
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    }
                </form>
            </Form>
        </div>
    )
};

export default CompleteSignupPage;