import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/formatters';
import { Search, Eye, Filter, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../api/apiContext';

const Orders = () => {
    const { orders, loading, refetch } = useAdminData();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredOrders = orders.filter(order =>
        (statusFilter === 'All' || order.status === statusFilter) &&
        (order.id?.toString().includes(searchTerm) ||
            order.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.shippingAddress?.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusClass = (status) => {
        const colorClass = getStatusColor(status);
        if (colorClass === 'status-blue') return 'bg-gray-200 text-black';
        if (colorClass === 'status-green') return 'bg-black text-white';
        if (colorClass === 'status-yellow') return 'bg-gray-300 text-gray-800';
        if (colorClass === 'status-red') return 'bg-gray-100 text-gray-600';
        return 'bg-gray-100 text-gray-600';
    };

    const handleStatusUpdate = async (id, newStatus) => {
        const loadingToast = toast.loading('Updating status...');
        try {
            await api.patch(`/orders/${id}`, { status: newStatus });
            toast.dismiss(loadingToast);
            toast.success(`Order #${id} marked as ${newStatus}`);
            refetch();
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error('Failed to update status');
            console.error(err);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Orders</h1>
                    <p className="text-gray-500">Manage customer orders and processing</p>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer Name or Email..."
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-black focus:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] transition-all duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="bg-white border border-gray-300 rounded-lg px-4 flex items-center gap-2 min-w-[180px]">
                    <Filter size={18} className="text-gray-500" />
                    <select
                        className="w-full bg-transparent border-none outline-none font-medium text-black cursor-pointer py-3.5"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Order ID</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Date</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Customer</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Items</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Total</th>
                                <th className="text-center px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Status</th>
                                <th className="text-center px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? filteredOrders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 border-b border-gray-100 font-semibold text-black text-sm">#{order.id?.slice(-8).toUpperCase()}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-gray-600 text-sm whitespace-nowrap">{formatDate(order.createdAt || order.date)}</td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <div className="font-medium text-black text-sm">{order.shippingAddress?.fullName || 'Guest'}</div>
                                        <div className="text-xs text-gray-500">{order.shippingAddress?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-sm text-gray-600">
                                        {order.items?.length || 0} items
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 font-bold text-black text-sm">{formatCurrency(order.total || order.totalAmount || 0)}</td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${getStatusClass(order.status)}`}>
                                            {order.status || 'Placed'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-center">
                                        <select
                                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white cursor-pointer hover:border-black focus:outline-none transition-colors"
                                            value={order.status || 'Placed'}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        >
                                            <option value="Paid">Paid</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-16">
                                        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                                        <p className="text-gray-500 text-sm">Try adjusting your filters.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;
