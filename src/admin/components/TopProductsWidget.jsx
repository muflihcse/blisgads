import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const TopProductsWidget = ({ orders = [], products = [] }) => {
    
    const productSales = orders.reduce((acc, order) => {
        if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
                const productId = item.id?.toString() || item.productId?.toString();
                if (productId) {
                    acc[productId] = (acc[productId] || 0) + (item.qty || item.quantity || 1);
                }
            });
        }
        return acc;
    }, {});

    const topProducts = Object.entries(productSales)
        .map(([id, sales]) => {
            const product = products.find(p => p.id?.toString() === id);
            if (product) {
                return { ...product, sales };
            }
            return null;
        })
        .filter(p => p && p.name)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);

    return (
        <div className="bg-white rounded-lg p-9 shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 animate-[fadeIn_0.6s_cubic-bezier(0.25,1,0.5,1)]">
            <div className="text-[1.35rem] font-bold mb-6 tracking-tight text-black">Top Products</div>
            <div className="flex flex-col">
                {topProducts.length > 0 ? (
                    topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <span className="font-semibold text-gray-500 w-5 text-sm">{index + 1}</span>
                                {product.image || product.colors?.[0]?.image ? (
                                    <img
                                        src={product.image || product.colors?.[0]?.image}
                                        alt={product.name}
                                        className="w-12 h-12 rounded-md object-cover border border-gray-300"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-[0.7rem] border border-gray-300">
                                        NO IMG
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-[0.95rem] truncate text-black">
                                        {product.name}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                        {product.device || product.category || 'Product'}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right ml-4 shrink-0">
                                <div className="font-bold text-[0.95rem] text-black">{product.sales} sales</div>
                                <div className="text-xs text-gray-500">
                                    {formatCurrency((product.price || 0) * product.sales)}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500 text-sm">
                        No sales data available.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopProductsWidget;
