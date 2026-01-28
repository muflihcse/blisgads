import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Users,
    Image,
    Ticket,
    LogOut
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/products', icon: <ShoppingBag size={20} />, label: 'Products' },
        { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
        { path: '/admin/banners', icon: <Image size={20} />, label: 'Banners' },
        { path: '/admin/coupons', icon: <Ticket size={20} />, label: 'Coupons' },
    ];

    return (
        <aside className="w-[260px] bg-white border-r border-gray-300 flex flex-col p-5 sticky top-0 h-screen z-50 transition-all duration-400">
            <div className="font-bold text-2xl mb-12 pl-4 tracking-tight text-black">
                BLISZGADS<span className="text-gray-400 font-light">.ADM</span>
            </div>

            <nav className="flex flex-col gap-1.5 flex-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg text-black no-underline transition-all duration-400 font-medium text-[0.95rem] hover:bg-gray-100 ${isActive ? 'bg-gray-200 font-semibold' : ''
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <button
                className="mt-auto flex items-center gap-4 px-4 py-3.5 text-black bg-transparent border-none cursor-pointer font-semibold rounded-lg transition-all duration-400 hover:bg-gray-100"
                onClick={logout}
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
        </aside>
    );
};

export default Sidebar;
