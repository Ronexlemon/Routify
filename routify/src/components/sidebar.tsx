import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div>
            <button onClick={toggleSidebar} className="fixed top-4 left-4 p-2 bg-gray-800 text-white rounded-md z-50">
                Menu
            </button>
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 p-4 z-40`}
            >
                <h2 className="text-xl mb-4">Sidebar</h2>
                <ul>
                    <li className="mb-2">
                        <Button className="w-full">Accounts</Button>
                    </li>
                    <li>
                        <Button className="w-full">Settings</Button>
                    </li>
                </ul>
            </div>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleClickOutside(event.nativeEvent)}
                />
            )}
        </div>
    );
};

export default Sidebar;
