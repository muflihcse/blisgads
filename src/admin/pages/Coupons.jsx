import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { Plus, Trash2, Ticket, X, Calendar, Percent, IndianRupee, Power, Edit } from 'lucide-react';
import { toast } from 'react-toastify';
import { formatCurrency, formatDate } from '../../utils/formatters';
import api from '../../api/apiContext';

const Coupons = () => {
    const { coupons, loading, refetch } = useAdminData();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newCoupon, setNewCoupon] = useState({
        code: '',
        discountType: 'percentage',
        discountAmount: '',
        minAmount: '',
        maxDiscount: '',
        expiryDate: '',
        usageLimitPerUser: 1,
        active: true
    });

    const handleEdit = (coupon) => {
        setNewCoupon({
            code: coupon.code,
            discountType: coupon.discountType || 'percentage',
            discountAmount: coupon.discountAmount,
            minAmount: coupon.minAmount,
            maxDiscount: coupon.maxDiscount,
            expiryDate: coupon.expiryDate,
            usageLimitPerUser: coupon.usageLimitPerUser || 1,
            active: coupon.active
        });
        setEditingId(coupon.id);
        setShowAddForm(true);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.patch(`/coupons/${editingId}`, {
                    ...newCoupon,
                    code: newCoupon.code.toUpperCase()
                });
                toast.success(' Coupon updated successfully');
            } else {
                await api.post('/coupons', {
                    ...newCoupon,
                    id: Date.now().toString(),
                    code: newCoupon.code.toUpperCase()
                });
                toast.success(' Coupon created successfully');
            }
            setShowAddForm(false);
            setEditingId(null);
            setNewCoupon({
                code: '',
                discountType: 'percentage',
                discountAmount: '',
                minAmount: '',
                maxDiscount: '',
                expiryDate: '',
                usageLimitPerUser: 1,
                active: true
            });
            refetch();
        } catch (err) {
            toast.error(editingId ? ' Failed to update coupon' : ' Failed to create coupon');
            console.error('Coupon save error:', err);
        }
    };

    const handleToggleActive = async (id, currentStatus) => {
        try {
            await api.patch(`/coupons/${id}`, { active: !currentStatus });
            toast.success(`Coupon ${!currentStatus ? 'activated' : 'deactivated'}`);
            refetch();
        } catch (err) {
            toast.error(' Failed to update status');
            console.error('Coupon status update error:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this coupon?')) {
            try {
                await api.delete(`/coupons/${id}`);
                toast.success('Coupon deleted');
                refetch();
            } catch (err) {
                toast.error(' Failed to delete coupon');
                console.error('Coupon delete error:', err);
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}><div className="loader" style={{ margin: '0 auto' }}></div></div>;

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Coupons</h1>
                    <p style={{ color: 'var(--admin-text-muted)', fontSize: '1rem', margin: '0.5rem 0 0 0' }}>
                        Create and manage discount codes for your customers
                    </p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(true)}
                >
                    <Plus size={20} /> Create New Coupon
                </button>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Discount</th>
                                <th>Min. Order</th>
                                <th>Limit/User</th>
                                <th>Expires</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(coupon => (
                                <tr key={coupon.id}>
                                    <td>
                                        <div style={{
                                            background: '#F2F2F7',
                                            color: '#1D1D1F',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '8px',
                                            fontFamily: 'SF Mono, Menlo, monospace',
                                            fontWeight: 600,
                                            display: 'inline-block',
                                            fontSize: '0.85rem'
                                        }}>
                                            {coupon.code}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>
                                            {coupon.discountType === 'percentage' ? `${coupon.discountAmount}% OFF` : `₹${coupon.discountAmount} OFF`}
                                        </div>
                                        {coupon.maxDiscount && (
                                            <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Max: ₹{coupon.maxDiscount}</div>
                                        )}
                                    </td>
                                    <td>{formatCurrency(coupon.minAmount || 0)}</td>
                                    <td>
                                        <div style={{ textAlign: 'center', fontWeight: 600, color: 'var(--admin-text-main)' }}>
                                            {coupon.usageLimitPerUser || 1}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex align-center gap-1" style={{ fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>
                                            {formatDate(coupon.expiryDate)}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${coupon.active ? 'status-green' : 'status-gray'}`}>
                                            {coupon.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="btn"
                                                style={{
                                                    padding: '0.4rem',
                                                    borderRadius: '8px',
                                                    color: '#3B82F6',
                                                    background: '#EFF6FF'
                                                }}
                                                onClick={() => handleEdit(coupon)}
                                                title="Edit Coupon"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="btn"
                                                style={{
                                                    padding: '0.4rem',
                                                    borderRadius: '8px',
                                                    color: coupon.active ? '#10B981' : '#6B7280',
                                                    background: coupon.active ? '#D1FAE5' : '#F3F4F6'
                                                }}
                                                onClick={() => handleToggleActive(coupon.id, coupon.active)}
                                                title={coupon.active ? "Deactivate" : "Activate"}
                                            >
                                                <Power size={16} />
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ padding: '0.4rem', borderRadius: '8px' }}
                                                onClick={() => handleDelete(coupon.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {coupons.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: '#F5F5F7',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto'
                            }}>
                                <Ticket size={40} color="#BFBFBF" />
                            </div>
                            <h3 style={{ color: 'var(--admin-text-main)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>No coupons found</h3>
                            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.95rem', maxWidth: '300px', margin: '0 auto' }}>
                                Create a discount coupon to boost sales and reward customers.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showAddForm && (
                <div className="modal-overlay" onClick={() => { setShowAddForm(false); setEditingId(null); }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <button className="close-modal" onClick={() => { setShowAddForm(false); setEditingId(null); }}><X /></button>
                        <h2 style={{ marginTop: 0 }}>{editingId ? 'Edit Coupon' : 'Create New Coupon'}</h2>

                        <form onSubmit={handleAdd}>
                            <div className="dashboard-grid">
                                <div>
                                    <div className="form-group">
                                        <label className="form-label">Coupon Code</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            style={{ textTransform: 'uppercase' }}
                                            placeholder="E.g. SUMMER50"
                                            value={newCoupon.code}
                                            onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Discount Type</label>
                                        <select
                                            className="form-input"
                                            value={newCoupon.discountType}
                                            onChange={e => setNewCoupon({ ...newCoupon, discountType: e.target.value })}
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount (₹)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Discount Amount</label>
                                        <div className="flex align-center gap-1">
                                            {newCoupon.discountType === 'percentage' ? <Percent size={18} /> : <span>₹</span>}
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={newCoupon.discountAmount}
                                                onChange={e => setNewCoupon({ ...newCoupon, discountAmount: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="form-group">
                                        <label className="form-label">Min. Order Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={newCoupon.minAmount}
                                            onChange={e => setNewCoupon({ ...newCoupon, minAmount: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Usage Limit Per User</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={newCoupon.usageLimitPerUser}
                                            onChange={e => setNewCoupon({ ...newCoupon, usageLimitPerUser: e.target.value })}
                                            min="1"
                                            required
                                        />
                                    </div>
                                    {newCoupon.discountType === 'percentage' && (
                                        <div className="form-group">
                                            <label className="form-label">Max. Discount Amount (₹)</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={newCoupon.maxDiscount}
                                                onChange={e => setNewCoupon({ ...newCoupon, maxDiscount: e.target.value })}
                                            />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label className="form-label">Expiry Date</label>
                                        <input
                                            type="date"
                                            className="form-input"
                                            value={newCoupon.expiryDate}
                                            onChange={e => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group flex align-center gap-2">
                                <input
                                    type="checkbox"
                                    id="coupon-active"
                                    checked={newCoupon.active}
                                    onChange={e => setNewCoupon({ ...newCoupon, active: e.target.checked })}
                                />
                                <label htmlFor="coupon-active" style={{ fontWeight: 600 }}>Set as Active</label>
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{editingId ? 'Update Coupon' : 'Save Coupon'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Coupons;
