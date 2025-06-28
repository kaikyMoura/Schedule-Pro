"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePopup } from "@/contexts/PopupContext/usePopup";
import { LoginUserSchema, loginUserSchema } from "@/schemas/login-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { AppleIcon, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import z from "zod";
import SocialSignInButton from "../SocialSignInButton";

const SignInForm = () => {
    // const route = useRouter();

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const { showPopup } = usePopup();

    const [checked, setChecked] = useState(false)
    // const [remenberMe, setRemenberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data: LoginUserSchema) => {
        console.log("data", data)
        if (data.email === "" || data.password === "") {
            showPopup({
                title: "Error",
                message: "Missing required fields",
                type: "error",
                actionsPopup: false,
            });
            return;
        }

        recaptchaRef.current?.execute()

        // const payload: LoginUserSchema = {
        //     email: data.email,
        //     password: data.password,
        // }
    }


    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Fill in the fields below to get started.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input type="email" placeholder="your@email.com" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" {...field} />
                                            <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center mb-5">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!}
                                onChange={() => setChecked(true)}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={!checked}>Sign In</Button>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid w-full grid-cols-2 gap-3">
                    <SocialSignInButton provider="google" icon={<GoogleIcon />} callbackUrl="/">
                        <span className="ml-2">Google</span>
                    </SocialSignInButton>
                    <SocialSignInButton provider="apple" icon={<AppleIcon />} callbackUrl="/">
                        <span className="ml-2">Apple</span>
                    </SocialSignInButton>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SignInForm;
