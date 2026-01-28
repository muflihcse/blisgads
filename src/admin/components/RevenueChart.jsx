import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const RevenueChart = ({ orders = [] }) => {
    
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            days.push(d.toISOString().split('T')[0]);
        }
        return days;
    };

    const chartData = getLast7Days().map(date => {
        const dayOrders = orders.filter(o => {
            const orderDate = o.date || o.createdAt;
            if (!orderDate) return false;
            
            const orderDateStr = typeof orderDate === 'string' ? orderDate : new Date(orderDate).toISOString();
            return orderDateStr.includes(date);
        });
        const revenue = dayOrders.reduce((sum, o) => sum + (o.total || o.totalAmount || 0), 0);
        return {
            name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            date: date,
            revenue
        };
    });

    return (
        <div className="bg-white rounded-lg p-10 shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)]">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <div className="text-[1.35rem] font-bold mb-1 tracking-tight text-black">Revenue Analysis</div>
                    <div className="text-sm text-gray-500">Weekly performance overview</div>
                </div>
            </div>

            <div className="w-full h-80 mt-8">
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 12, fontWeight: 500 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 12, fontWeight: 500 }}
                            tickFormatter={(value) => value === 0 ? '0' : `₹${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
                        />
                        <Tooltip
                            cursor={{ fill: '#f5f5f5' }}
                            contentStyle={{
                                borderRadius: '8px',
                                border: '1px solid #d4d4d4',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                padding: '12px 16px',
                                backgroundColor: '#fff'
                            }}
                            itemStyle={{ color: '#000', fontWeight: 700 }}
                            labelStyle={{ color: '#666', marginBottom: '4px', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}
                            formatter={(value) => [formatCurrency(value), 'Revenue']}
                        />
                        <Bar
                            dataKey="revenue"
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.revenue > 0 ? '#000' : '#e5e5e5'}
                                    fillOpacity={entry.revenue > 0 ? 1 : 0.6}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueChart;
