'use client';

import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center text-(--primary-text-color)">
            <h1 className="text-3xl font-bold">Page not found</h1>
            <p className="mt-4">The page you are looking for does not exist</p>
            <Button variant={'outline'} className='mt-4 p-4 max-w-36 h-10'>
                <Link href="/dashboard">Back to Home</Link>
            </Button>
        </div>
    );
}