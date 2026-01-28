import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import '../styles/admin.css';

const AdminLayout = () => {
    return (
        <div className="bg-gray-100 text-black font-sans min-h-screen">
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 p-10 overflow-y-auto max-w-[1400px] mx-auto w-full box-border">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
