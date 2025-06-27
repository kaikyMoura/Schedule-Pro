"use client"

import SignUpForm from "@/components/features/SignUpForm"
import { Calendar } from "lucide-react"
import Link from "next/link"

const SignupPage = () => {

    return (
        <div className="mt-4 w-full max-w-md mx-auto flex flex-col justify-center">
            <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg mb-4">
                    <Calendar className="text-white text-3xl" />
                </div>
                <h1 className="text-3xl font-bold text-(--primary-text-color)">SchedulePro</h1>
                <p className="text-(--secondary-text-color) mt-2">Manage your appointments with ease</p>
            </div>

            <SignUpForm />

            <div className="bg-(--secondary-bg) px-8 py-4 border-t border-gray-200">
                <div className="text-center text-sm text-(--secondary-text-color)">
                    Already have an account? <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
                </div>
            </div>
        </div >
    )
}

export default SignupPage;