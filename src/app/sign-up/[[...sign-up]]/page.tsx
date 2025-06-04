"use client"

import Button from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox"
import Input from "@/components/ui/Input"
import { usePopup } from "@/contexts/PopupContext/usePopup"
import { CreateUserSchema, createUserSchema } from "@/schemas/create-user.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaCalendarAlt, FaEnvelope, FaPhone, FaUserCircle } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { z } from "zod"

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
    });

    const { showPopup } = usePopup();

    const [checked, setChecked] = useState(false)

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

    const onSubmit = (data: CreateUserSchema) => {
        if (data.name === "" || data.email === "" || data.confirmEmail === "" || data.password === "" || data.confirmPassword === "" || data.phone === "") {
            showPopup({
                title: "Error",
                message: "Missing required fields",
                type: "error",
                actionsPopup: false,
            });
            return;
        }
        console.log()

        const payload: CreateUserSchema = {
            name: data.name,
            email: data.email,
            confirmEmail: data.confirmEmail,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phone: data.phone,
            photo: image
        }

        console.log('payload', payload)

        alert("Submitted")
    }

    const handleClearImage = () => {
        setTempImage("")
        setImage(null)
    }

    return (
        <div className="mt-4 w-full max-w-md mx-auto flex flex-col justify-center">
            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg mb-4">
                    <FaCalendarAlt className="text-white text-3xl" />
                </div>
                <h1 className="text-3xl font-bold text-(--primary-text-color)">SchedulePro</h1>
                <p className="text-(--secondary-text-color) mt-2">Manage your appointments with ease</p>
            </div>

            <div className="bg-(--component-color) rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-(--primary-text-color) mb-6 text-center">Create an account</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <div className="flex items-center justify-center">
                                {tempImage ?
                                    <Image className="rounded-full w-30 h-30" src={tempImage} alt={"fafs"} width={100} height={100} />
                                    :
                                    <FaUserCircle className="text-(--primary-text-color) w-30 h-30" />
                                }
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <button type="button" className="absolute inset-y-12 right-0 pl-3 flex items-center cursor-pointer"
                                    onClick={handleClearImage}>
                                    <FaX className="text-(--primary-text-color) w-4 h-4 z-10" />
                                </button>
                                <Input type="file" placeholder={"Choose a file"} label="Upload your profile picture"
                                    accept=".png, .jpg, .jpeg" onChange={handleFileInput} />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <Input type="text" label="Name" placeholder="firstname lastname"
                                    {...register('name', { required: "Name is required" })}
                                    error={errors.name ? true : false} />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <div className="absolute inset-y-12 right-2 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-(--primary-text-color) w-4 h-4 z-10" />
                                </div>
                                <Input type="email" label="Email address" placeholder="you@example.com"
                                    {...register('email', { required: "Email is required" })} error={errors.email ? true : false} />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <div className="absolute inset-y-12 right-2 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-(--primary-text-color) w-4 h-4 z-10" />
                                </div>
                                <Input type="email" label="Confirm email" placeholder="confirm your email address"
                                    {...register('confirmEmail', { required: "Confirm email is required" })}
                                    error={errors.confirmEmail ? true : false} />
                                {errors.email && <span>{errors.confirmEmail!.message}</span>}
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <div className="absolute inset-y-12 right-2 pl-3 flex items-center pointer-events-none">
                                    <FaPhone className="text-(--primary-text-color) w-4 h-4 z-10" />
                                </div>
                                <Input type="tel" label="Phone number" placeholder="+1 111-222-333"
                                    {...register('phone', { required: "Phone number is required" })}
                                    error={errors.phone ? true : false} />
                                {errors.email && <span>{errors.phone!.message}</span>}
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <Input type="password" label="Password" placeholder="••••••••"
                                    {...register('password', { required: "Password is required" })}
                                    error={errors.password ? true : false} />
                                {errors.email && <span>{errors.password!.message}</span>}
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <Input type="password" label="Confirm password" placeholder="••••••••"
                                    {...register('confirmPassword', { required: "Confirm password is required" })}
                                    error={errors.confirmPassword ? true : false} />
                                {errors.email && <span>{errors.confirmPassword!.message}</span>}
                            </div>
                        </div>

                        <div className="flex items-center mb-5">
                            <Checkbox id="terms" label={"I agree to the terms and conditions"} checked={checked} onChange={() => setChecked(!checked)} />
                        </div>

                        <Button type="submit" text={"Sign up"} style={"primary"} />
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-(--component-color) text-(--secondary-text-color)">Or continue with</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-(--secondary-bg) px-8 py-4 border-t border-gray-200">
                    <div className="text-center text-sm text-(--secondary-text-color)">
                        Already have an account? <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;