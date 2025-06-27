"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePopup } from "@/contexts/PopupContext/usePopup";
import { createUserSchema, CreateUserSchema } from "@/schemas/create-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { AppleIcon, Eye, EyeOff, Link, Lock, Mail, Phone, UploadCloud, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import SocialSignInButton from "../SocialSignInButton";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
    const route = useRouter();

    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            confirmEmail: "",
            phone: "",
            password: "",
            confirmPassword: "",
            photo: "",
            terms: false
        },
    });

    const { showPopup } = usePopup();

    const [checked, setChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [image, setImage] = useState<string | null>()
    const [tempImage, setTempImage] = useState<string>()

    /**
     * Handles the file input event by reading the selected file and setting
     * the temporary image state to the base64-encoded data URL representing
     * the file content.
     *
     * @param {object} event - The event object containing the file input
     * @param {FileList} event.target.files - The list of files selected by
     * the user
     */
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return console.warn('No files selected.');
        const file = event.target.files[0]
        const tempFile = new Blob([file], { type: file.type });
        const tempFileUrl = URL.createObjectURL(tempFile);

        console.log(tempFileUrl);
        setTempImage(tempFileUrl);

        const reader = new FileReader()
        /**
         * This event handler is triggered when the file has been successfully read.
         * It sets the temporary image to the result of the FileReader, which is the
         * base64-encoded data URL representing the file content.
        */
        reader.onload = () => {
            setTempImage(tempFileUrl)
        }

        reader.readAsDataURL(file)
    }

    const onSubmit = async (data: CreateUserSchema) => {
        console.log("data", data)
        if (data.name === "" || data.email === "" || data.confirmEmail === "" || data.password === "" || data.confirmPassword === "" || data.phone === "") {
            showPopup({
                title: "Error",
                message: "Missing required fields",
                type: "error",
                actionsPopup: false,
            });
            return;
        }

        const payload: CreateUserSchema = {
            name: data.name,
            email: data.email,
            confirmEmail: data.confirmEmail,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phone: data.phone,
            photo: image
        }


    }

    const onInvalid = (validationErrors: unknown) => {
        console.log("THE VALIDATION FAILED! Errors:", validationErrors);
    };

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
                            name="photo"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center justify-center space-y-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={tempImage ?? undefined} alt="Profile preview" />
                                        <AvatarFallback>
                                            <User2 className="h-12 w-12" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <FormControl>
                                        <Button asChild variant="outline" size="sm">
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <UploadCloud className="mr-2 h-4 w-4" />
                                                Upload a photo
                                                <Input id="file-upload" type="file" className="sr-only" onChange={handleFileInput} accept="image/png, image/jpeg" />
                                            </label>
                                        </Button>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                            name="confirmEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Email</FormLabel>
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
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input type="tel" placeholder="(99) 99999-9999" className="pl-10" {...field} />
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value !== null && field.value !== undefined}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I agree to the <Link href="/terms" className="text-primary underline hover:no-underline">terms and conditions</Link>.
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Create Account</Button>
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
                    <SocialSignInButton provider="google" icon={<GoogleIcon />} callbackUrl="/dashboard">
                        <span className="ml-2">Google</span>
                    </SocialSignInButton>
                    <SocialSignInButton provider="apple" icon={<AppleIcon />} callbackUrl="/dashboard">
                        <span className="ml-2">Apple</span>
                    </SocialSignInButton>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SignUpForm;
