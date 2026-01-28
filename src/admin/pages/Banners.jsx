import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { Plus, Trash2, Image as ImageIcon, Link, X, Check, Edit, Power } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../api/apiContext';

const Banners = () => {
    const { banners, loading, refetch } = useAdminData();
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newBanner, setNewBanner] = useState({
        title: '',
        image: '',
        link: '',
        active: true
    });

    const handleEdit = (banner) => {
        setNewBanner({
            title: banner.title,
            image: banner.image,
            link: banner.link,
            active: banner.active
        });
        setEditingId(banner.id);
        setShowAddForm(true);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.patch(`/banners/${editingId}`, newBanner);
                toast.success(' Banner updated successfully');
            } else {
                await api.post('/banners', {
                    ...newBanner,
                    id: Date.now().toString()
                });
                toast.success(' Banner added successfully');
            }
            setShowAddForm(false);
            setEditingId(null);
            setNewBanner({ title: '', image: '', link: '', active: true });
            refetch();
        } catch (err) {
            toast.error(editingId ? ' Failed to update banner' : '❌ Failed to add banner');
            console.error('Banner save error:', err);
        }
    };

    const handleToggleActive = async (id, currentStatus) => {
        try {
            await api.patch(`/banners/${id}`, { active: !currentStatus });
            toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'}`);
            refetch();
        } catch (err) {
            toast.error(' Failed to update status');
            console.error('Banner status update error:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this banner?')) {
            try {
                await api.delete(`/banners/${id}`);
                toast.success('Banner deleted');
                refetch();
            } catch (err) {
                toast.error(' Failed to delete banner');
                console.error('Banner delete error:', err);
            }
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}><div className="loader" style={{ margin: '0 auto' }}></div></div>;

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Home Banners</h1>
                    <p style={{ color: 'var(--admin-text-muted)', fontSize: '1rem', margin: '0.5rem 0 0 0' }}>
                        Manage featured carousel images for your homepage
                    </p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowAddForm(true)}
                >
                    <Plus size={20} /> Add New Banner
                </button>
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Preview</th>
                                <th>Title</th>
                                <th>Link</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map(banner => (
                                <tr key={banner.id}>
                                    <td>
                                        <img
                                            src={banner.image}
                                            alt={banner.title}
                                            style={{ width: '120px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }}
                                        />
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{banner.title}</td>
                                    <td style={{ color: '#888', fontSize: '0.9rem' }}>
                                        <div className="flex align-center gap-1"><Link size={14} /> {banner.link}</div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${banner.active ? 'status-green' : 'status-gray'}`}>
                                            {banner.active ? 'Active' : 'Inactive'}
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
                                                onClick={() => handleEdit(banner)}
                                                title="Edit Banner"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="btn"
                                                style={{
                                                    padding: '0.4rem',
                                                    borderRadius: '8px',
                                                    color: banner.active ? '#10B981' : '#6B7280',
                                                    background: banner.active ? '#D1FAE5' : '#F3F4F6'
                                                }}
                                                onClick={() => handleToggleActive(banner.id, banner.active)}
                                                title={banner.active ? "Deactivate" : "Activate"}
                                            >
                                                <Power size={16} />
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ padding: '0.4rem', borderRadius: '8px' }}
                                                onClick={() => handleDelete(banner.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {banners.length === 0 && (
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
                                <ImageIcon size={40} color="#BFBFBF" />
                            </div>
                            <h3 style={{ color: 'var(--admin-text-main)', marginBottom: '0.5rem', fontSize: '1.25rem' }}>No banners found</h3>
                            <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.95rem', maxWidth: '300px', margin: '0 auto' }}>
                                Add your first homepage banner to showcase promotions.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {showAddForm && (
                <div className="modal-overlay" onClick={() => { setShowAddForm(false); setEditingId(null); }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <button className="close-modal" onClick={() => { setShowAddForm(false); setEditingId(null); }}><X /></button>
                        <h2 style={{ marginTop: 0 }}>{editingId ? 'Edit Banner' : 'Add New Banner'}</h2>

                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label className="form-label">Banner Title</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newBanner.title}
                                    onChange={e => setNewBanner({ ...newBanner, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="url"
                                    className="form-input"
                                    value={newBanner.image}
                                    onChange={e => setNewBanner({ ...newBanner, image: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Link URL</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newBanner.link}
                                    onChange={e => setNewBanner({ ...newBanner, link: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group flex align-center gap-2">
                                <input
                                    type="checkbox"
                                    id="active"
                                    checked={newBanner.active}
                                    onChange={e => setNewBanner({ ...newBanner, active: e.target.checked })}
                                />
                                <label htmlFor="active" style={{ fontWeight: 600 }}>Set as Active</label>
                            </div>

                            <div style={{ marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{editingId ? 'Update Banner' : 'Save Banner'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banners;
