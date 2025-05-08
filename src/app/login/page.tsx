"use client"

import Button from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox"
import Input from "@/components/ui/Input"
import Link from "next/link"
import { FaCalendarAlt, FaEnvelope } from "react-icons/fa"
import { FaApple, FaGoogle } from "react-icons/fa6"

const Login = () => {

    return (
        <div className="mt-4 w-full max-w-md mx-auto flex flex-col justify-center">
            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg mb-4">
                    <FaCalendarAlt className="text-white text-3xl" />
                </div>
                <h1 className="text-3xl font-bold text-(--primary-text-color)">SchedulePro</h1>
                <p className="text-(--tertiary-text-color) mt-2">Manage your appointments with ease</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                <div className="p-8">
                    <h2 className="text-2xl font-semibold text-(--primary-text-color) mb-6 text-center">Sign in to your account</h2>

                    <form>
                        <div className="mb-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-(--tertiary-text-color)" />
                                </div>
                                <Input type="email" label="Email address" placeholder="you@example.com" />
                            </div>
                        </div>

                        <div className="mb-5">
                            <div className="relative">
                                <Input type="password" label="Password" placeholder="••••••••" />
                                <Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link>
                            </div>
                        </div>

                        <div className="flex items-center mb-5">
                            <Checkbox id="remember-me" label={"Remember me"} checked={false} onChange={() => { }} />
                        </div>

                        <Button type="submit" text={"Sign in"} style={"primary"} />
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-(--tertiary-text-color)">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <a href="#" className="social-btn w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-md font-medium text-(--primary-text-color) hover:bg-gray-50 transition-all duration-150">
                                <FaGoogle className="mr-2 text-red-500" />
                                <p>Google</p>
                            </a>
                            <a href="#" className="social-btn w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-md font-medium text-(--primary-text-color) hover:bg-gray-50 transition-all duration-150">
                                <FaApple className="mr-2 text-(--primary-text-color)" />
                                <p>Apple</p>

                            </a>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
                    <div className="text-center text-sm text-(--tertiary-text-color)">
                        Don&apos;t have an account? <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
                    </div>
                </div>
            </div>

            {/* Coming soon...  */}
            {/* <div className="mt-8 text-center">
                <p className="text-sm text-(--tertiary-text-color) mb-3">Get the mobile app</p>
                <div className="flex justify-center space-x-3">
                    <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-(--primary-text-color) bg-white hover:bg-gray-50">
                        <FaApple className="mr-2 text-xl" />
                        <span>App Store</span>
                    </a>
                    <a href="#" className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-(--primary-text-color) bg-white hover:bg-gray-50">
                        <FaGooglePlay className="mr-2 text-xl" />
                        <span>Google Play</span>
                    </a>
                </div>
            </div> */}
        </div>
    )
}

export default Login