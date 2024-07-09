import React from 'react';
import Sidebar from '../sidebar';
import FloatingButtonWithModal from './floating';

const Account: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Welcome to the HomePage</h1>
            </div>
            <FloatingButtonWithModal />
        </div>
    );
};

export default Account;
