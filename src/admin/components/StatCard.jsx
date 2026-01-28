import React, { useState, useEffect } from 'react';

const StatCard = ({ label, value, icon, trend, trendValue, color }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
       
        const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, "")) : value;
        if (isNaN(target)) {
            setDisplayValue(value);
            return;
        }

        let start = 0;
        const duration = 1000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setDisplayValue(value);
                clearInterval(timer);
            } else {
                if (typeof value === 'string' && value.startsWith('₹')) {
                    setDisplayValue(`₹${Math.floor(start).toLocaleString('en-IN')}`);
                } else {
                    setDisplayValue(Math.floor(start).toLocaleString('en-IN'));
                }
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="bg-white p-7 rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 flex flex-col gap-3 transition-transform duration-400 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)]">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-gray-100 text-black">
                    {icon}
                </div>
                <div className="text-gray-500 text-sm font-medium">{label}</div>
            </div>
            <div className="text-3xl font-bold text-black tracking-tight">{displayValue}</div>
            {trendValue && (
                <div className={`text-sm font-semibold mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full ${trend === 'up' ? 'text-black bg-gray-200' : 'text-gray-600 bg-gray-100'}`}>
                    {trend === 'up' ? '↑' : '↓'} {trendValue}
                </div>
            )}
        </div>
    );
};

export default StatCard;
