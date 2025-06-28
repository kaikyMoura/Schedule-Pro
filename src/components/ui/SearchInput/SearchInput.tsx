"use client"
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Input } from '../input';
import { Label } from '../label';
import styles from './SearchInput.module.scss';

interface SearchBarProps<T extends object> {
    placeholder: string;
    data: T[];
    imageKey?: keyof T;
    label?: string;
    keys: (keyof T)[];
    onSelect: (item: T) => void;
    showFilteredList?: boolean;
    setFilteredList?: (filteredData: T[]) => void;
}

const SearchInput = <T extends object>({
    placeholder,
    data: allData,
    imageKey,
    label,
    keys,
    onSelect,
    showFilteredList,
    setFilteredList
}: SearchBarProps<T>
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

        setFilteredList?.(filtered);
        setFilteredData(filtered);
    }, [query, allData, keys, setFilteredList]);

    const clearInput = async () => {
        setQuery('');
        setFilteredData([]);
    };

    return (
        <div className=''>
            <div className='relative'>
                <div className="relative">
                    <Label>{label}</Label>
                    <div className='mt-2'>
                        <div className="absolute inset-y-10 left-2 flex items-center pointer-events-none">
                            <Search className="text-gray-400 w-4 h-4" />
                        </div>
                        <Input
                            id="search"
                            placeholder={placeholder}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    {query &&
                        <div className="absolute inset-y-10 right-2 flex items-center cursor-pointer" onClick={clearInput}>
                            <X className="text-gray-400 w-4 h-4" />
                        </div>
                    }
                </div>

            </div>
            {showFilteredList && (
                <>
                    {query && !isLoading && filteredData.length > 0 && (
                        <ul className={`sticky w-full bg-card border shadow-md rounded-md cursor-pointer ${styles.search_input__results}`}>
                            {filteredData.map((item, i) => (
                                <li key={i} className="cursor-pointer hover:bg-gray-400">
                                    <Link href="#" className='flex items-center gap-4 p-2 border-b border-gray-200' onClick={
                                        () => {
                                            onSelect(item);
                                            clearInput();
                                        }
                                    }>
                                        <Image
                                            onLoad={() => setIsLoading(false)} src={item[imageKey!] as string} alt='customer-photo' loading="lazy" width={40} height={40}
                                            className='rounded-full h-10 w-10' />
                                        {keys.map((key, index) => (
                                            <p key={index} className="font-medium text-lg text-(--primary-text-color)">{item[key!] as React.ReactNode}</p>
                                        ))}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )
            }
        </div>
    );
};

export default SearchInput;