"use client";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaPhone } from "react-icons/fa6";

const CompleteProfilePage = () => {
    const [page, setPage] = useState(1);
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState<{
        name?: string | null;
        email?: string | null;
        image?: string | null;
    }>({});

    useEffect(() => {
        if (session?.user) {
            setUserData(session?.user);
        }
    }, [session]);

    if (!userData) return <p>Carregando...</p>;

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
                                    <Input type="tel" label="Phone number" placeholder="+1 111-222-333" />
                                </div>
                                <Button className="mt-4" type="button" text={"Next"} style={"primary"} action={() => handlePageChange(page + 1)} />
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
                                        <Input className="max-w-[50px]" type="text" placeholder="" maxLength={1} />
                                        <Input className="max-w-[50px]" type="text" placeholder="" maxLength={1} />
                                        <Input className="max-w-[50px]" type="text" placeholder="" maxLength={1} />
                                        <Input className="max-w-[50px]" type="text" placeholder="" maxLength={1} />
                                        <Input className="max-w-[50px]" type="text" placeholder="" maxLength={1} />
                                    </div>
                                    <Button className="mt-4" type="button" text={"Submit"} style={"primary"} action={() => handlePageChange(page + 1)} />
                                </div>
                            </Card>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
};

export default CompleteProfilePage;