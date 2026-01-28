import React from 'react';
import { formatCurrency, formatDate, getStatusColor } from '../../utils/formatters';

const RecentOrdersTable = ({ orders }) => {
    const getStatusClass = (status) => {
        const colorClass = getStatusColor(status);
        
        if (colorClass === 'status-blue') return 'bg-gray-200 text-black';
        if (colorClass === 'status-green') return 'bg-black text-white';
        if (colorClass === 'status-yellow') return 'bg-gray-300 text-gray-800';
        if (colorClass === 'status-red') return 'bg-gray-100 text-gray-600';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)] p-9">
            <div className="text-[1.35rem] font-bold mb-6 tracking-tight text-black">Recent Activity</div>
            <div className="bg-transparent rounded-none border-none overflow-visible">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-transparent border-b border-gray-200 uppercase tracking-wide">Order ID</th>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-transparent border-b border-gray-200 uppercase tracking-wide">Customer</th>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-transparent border-b border-gray-200 uppercase tracking-wide">Date</th>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-transparent border-b border-gray-200 uppercase tracking-wide">Amount</th>
                            <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-transparent border-b border-gray-200 uppercase tracking-wide">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders
                                .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
                                .slice(0, 6)
                                .map((order) => (
                                    <tr key={order.id} className="transition-all duration-400 hover:bg-gray-50">
                                        <td className="px-6 py-5 border-b border-gray-200 last:border-0 align-middle text-[0.95rem] text-black font-semibold">#{order.id?.slice(-8).toUpperCase() || 'N/A'}</td>
                                        <td className="px-6 py-5 border-b border-gray-200 last:border-0 align-middle text-[0.95rem] text-black">{order.shippingAddress?.fullName || 'Guest'}</td>
                                        <td className="px-6 py-5 border-b border-gray-200 last:border-0 align-middle text-sm text-gray-500">{formatDate(order.createdAt || order.date)}</td>
                                        <td className="px-6 py-5 border-b border-gray-200 last:border-0 align-middle text-[0.95rem] text-black font-bold text-left">{formatCurrency(order.total || order.totalAmount || 0)}</td>
                                        <td className="px-6 py-5 border-b border-gray-200 last:border-0 align-middle text-left">
                                            <span className={`px-3.5 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 ${getStatusClass(order.status)}`}>
                                                {order.status || 'Placed'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-16 text-gray-500">
                                    No recent orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrdersTable;
