"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { SetStateAction, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Input from '../Input';
import styles from './SearchInput.module.scss';

interface SearchBarProps<T extends object> {
    placeholder: string;
    data: T[];
    imageKey?: keyof T;
    label: string;
    keys: (keyof T)[];
}

const SearchBar = <T extends object>({
    placeholder,
    data: allData,
    imageKey,
    label,
    keys, }: SearchBarProps<T>
) => {

    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setFilteredData([]);
            return;
        }

        const filtered = allData.filter((item) =>
            keys.some((key) =>
                String(item[key]).toLowerCase().startsWith(query.toLowerCase()) || String(item[key]).toLowerCase().includes(query.toLowerCase())
            )
        );

        setFilteredData(filtered);
    }, [query, allData, keys]);

    const clearInput = async () => {
        setQuery('');
        setFilteredData([]);
    };

    return (
        <div>
            <div className='relative'>
                <div className="relative">
                    <Input type="text" label={label} placeholder={placeholder} value={query} onChange={(e: { target: { value: SetStateAction<string>; }; }) => setQuery(e.target.value)} />
                    <div className="absolute inset-y-12 right-2 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                </div>

            </div>
            {query && !isLoading && filteredData.length > 0 && (
                <ul className={`sticky w-full bg-white shadow-md rounded-md cursor-pointer ${styles.search_input__results}`}>
                    {filteredData.map((item, i) => (
                        <li key={i} className="cursor-pointer">
                            <Link href="#" className='flex items-center gap-4 p-2 border-b border-gray-200 ' onClick={clearInput}>
                                <Image
                                    onLoad={() => setIsLoading(false)} src={item[imageKey!] as string} alt='customer-photo' loading="lazy" width={40} height={40}
                                    className='rounded-full h-10 w-10' />
                                {keys.map((key, index) => (
                                    <p key={index} className="font-medium text-lg">{item[key!] as React.ReactNode}</p>
                                ))}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;