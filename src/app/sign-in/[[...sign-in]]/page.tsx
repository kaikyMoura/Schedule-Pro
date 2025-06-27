"use client"

import SignInForm from "@/components/features/SignInForm"
import { Calendar } from "lucide-react"
import Link from "next/link"

const SignInPage = () => {

    return (
        <div className="mt-4 w-full max-w-md mx-auto flex flex-col justify-center">
            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg mb-4">
                    <Calendar className="text-white text-3xl" />
                </div>
                <h1 className="text-3xl font-bold text-(--primary-text-color)">SchedulePro</h1>
                <p className="text-(--secondary-text-color) mt-2">Manage your appointments with ease</p>
            </div>

            <SignInForm />

            <div className="bg-(--secondary-bg) px-8 py-4 border-t border-gray-200">
                <div className="text-center text-sm text-(--secondary-text-color)">
                    Don&apos;t have an account? <Link href="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
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

export default SignInPage;