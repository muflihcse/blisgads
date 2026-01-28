import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000';

export const useAdminData = () => {
    const [data, setData] = useState({
        orders: [],
        users: [],
        products: [],
        banners: [],
        coupons: [],
        loading: true,
        error: null,
    });

    const fetchData = useCallback(async () => {
        setData(prev => ({ ...prev, loading: true }));
        try {
            const [ordersRes, usersRes, productsRes, bannersRes, couponsRes] = await Promise.allSettled([
                fetch(`${API_URL}/orders`),
                fetch(`${API_URL}/users`),
                fetch(`${API_URL}/products`),
                fetch(`${API_URL}/banners`),
                fetch(`${API_URL}/coupons`),
            ]);

            const [orders, users, products, banners, coupons] = await Promise.all([
                ordersRes.status === 'fulfilled' && ordersRes.value.ok 
                    ? ordersRes.value.json() 
                    : Promise.resolve([]),
                usersRes.status === 'fulfilled' && usersRes.value.ok 
                    ? usersRes.value.json() 
                    : Promise.resolve([]),
                productsRes.status === 'fulfilled' && productsRes.value.ok 
                    ? productsRes.value.json() 
                    : Promise.resolve([]),
                bannersRes.status === 'fulfilled' && bannersRes.value.ok 
                    ? bannersRes.value.json() 
                    : Promise.resolve([]),
                couponsRes.status === 'fulfilled' && couponsRes.value.ok 
                    ? couponsRes.value.json() 
                    : Promise.resolve([]),
            ]);

            setData({
                orders: orders || [],
                users: users || [],
                products: products || [],
                banners: banners || [],
                coupons: coupons || [],
                loading: false,
                error: null,
            });
        } catch (err) {
            console.error('Error fetching admin data:', err);
            setData(prev => ({ 
                ...prev, 
                loading: false, 
                error: err.message,
                orders: prev.orders || [],
                users: prev.users || [],
                products: prev.products || [],
                banners: prev.banners || [],
                coupons: prev.coupons || [],
            }));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { ...data, refetch: fetchData };
};
