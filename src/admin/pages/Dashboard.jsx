import React from 'react';
import { useAdminData } from '../hooks/useAdminData';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import RecentOrdersTable from '../components/RecentOrdersTable';
import TopProductsWidget from '../components/TopProductsWidget';
import {
    IndianRupee,
    ShoppingBag,
    Users,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
    Calendar
} from 'lucide-react';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../utils/formatters';

const Dashboard = () => {
    const { orders, users, products, loading, error } = useAdminData();

    React.useEffect(() => {
        if (!loading && !error) {
            toast.info('ℹ️ Dashboard loaded successfully', { toastId: 'dashboard-load' });
        }
    }, [loading, error]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600 p-4 bg-red-50 rounded-lg border border-red-200">Error: {error}</div>;
    }

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || order.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalProducts = products.length;

    return (
        <div className="animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-bold text-black tracking-tight mb-2">Dashboard</h1>
                    <p className="text-gray-500 text-base">
                        Welcome back, Admin. Here's what's happening today.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-black font-semibold text-sm bg-white px-5 py-3 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-200">
                    <Calendar size={18} className="text-gray-600" />
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    label="Total Revenue"
                    value={formatCurrency(totalRevenue)}
                    icon={<IndianRupee size={24} />}
                    trend="up"
                    trendValue="12.5%"
                />
                <StatCard
                    label="Total Orders"
                    value={totalOrders}
                    icon={<ShoppingCart size={24} />}
                    trend="up"
                    trendValue="5.2%"
                />
                <StatCard
                    label="Total Customers"
                    value={totalUsers}
                    icon={<Users size={24} />}
                    trend="up"
                    trendValue="2.1%"
                />
                <StatCard
                    label="Total Products"
                    value={totalProducts}
                    icon={<ShoppingBag size={24} />}
                    trend="down"
                    trendValue="1%"
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
                <div className="lg:col-span-2">
                    <RevenueChart orders={orders} />
                </div>

                
                <div className="lg:col-span-1">
                    <TopProductsWidget orders={orders} products={products} />
                </div>
            </div>

            
            <div className="w-full">
                <RecentOrdersTable orders={orders} />
            </div>
        </div>
    );
};

export default Dashboard;
