import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { formatCurrency } from '../../utils/formatters';
import { Search, Trash2, Plus, Star, Edit, X, ShoppingBag, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../api/apiContext';

const Products = () => {
    const { products, loading, refetch } = useAdminData();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        device: '',
        price: '',
        mrp: '',
        discount: '',
        stock: '',
        category: 'Phone Case',
        trending: false,
        showInShop: true,
        colors: [{ name: '', code: '#000000', image: '' }]
    });

    const categories = ['All', ...new Set(products.map(p => p.category || 'Phone Case'))];

    const filteredProducts = products.filter(p =>
        (categoryFilter === 'All' || p.category === categoryFilter) &&
        (p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.device?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    console.log("Filtered Products:", filteredProducts);

    const handleDelete = async (id) => {
        if (window.confirm('⚠️ Are you sure you want to delete this product? This action cannot be undone.')) {
            const loadingToast = toast.loading('🗑️ Deleting product...');
            try {
                await api.delete(`/products/${id}`);
                toast.dismiss(loadingToast);
                toast.success('✅ Product deleted successfully!');
                refetch();
            } catch (err) {
                toast.dismiss(loadingToast);
                toast.error('❌ Failed to delete product. Please try again.');
                console.error('Delete error:', err);
            }
        }
    };

    const handleEdit = (product) => {
        toast.info('📝 Opening product editor...');
        setEditingProduct(product);
        setFormData({
            name: product.name || '',
            device: product.device || '',
            price: product.price || '',
            mrp: product.mrp || '',
            discount: product.discount || '',
            stock: product.stock || '',
            category: product.category || 'Phone Case',
            trending: product.trending || false,
            showInShop: product.showInShop !== undefined ? product.showInShop : true,
            colors: product.colors && product.colors.length > 0 ? product.colors : [{ name: '', code: '#000000', image: '' }]
        });
        setShowForm(true);
    };

    const handleAddColor = () => {
        setFormData({
            ...formData,
            colors: [...formData.colors, { name: '', code: '#000000', image: '' }]
        });
        toast.success('🎨 Color variant added!');
    };

    const handleRemoveColor = (index) => {
        if (formData.colors.length > 1) {
            setFormData({
                ...formData,
                colors: formData.colors.filter((_, i) => i !== index)
            });
            toast.info('🗑️ Color variant removed');
        } else {
            toast.warning('⚠️ At least one color variant is required!');
        }
    };

    const handleColorChange = (index, field, value) => {
        const newColors = [...formData.colors];
        newColors[index] = { ...newColors[index], [field]: value };
        setFormData({ ...formData, colors: newColors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading(editingProduct ? '💾 Updating product...' : '➕ Creating product...');

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                mrp: Number(formData.mrp),
                discount: Number(formData.discount),
                stock: Number(formData.stock),
                image: formData.colors[0]?.image || '',
            };

            if (editingProduct) {
                await api.patch(`/products/${editingProduct.id}`, productData);
                toast.dismiss(loadingToast);
                toast.success('✅ Product updated successfully!');
            } else {
                await api.post('/products', {
                    ...productData,
                    id: Date.now().toString()
                });
                toast.dismiss(loadingToast);
                toast.success(' Product added successfully!');
            }

            setShowForm(false);
            setEditingProduct(null);
            setFormData({
                name: '',
                device: '',
                price: '',
                mrp: '',
                discount: '',
                stock: '',
                category: 'Phone Case',
                trending: false,
                showInShop: true,
                colors: [{ name: '', code: '#000000', image: '' }]
            });
            refetch();
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error(editingProduct ? '❌ Failed to update product. Please try again.' : '❌ Failed to add product. Please try again.');
            console.error('Submit error:', err);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}><div className="loader" style={{ margin: '0 auto' }}></div></div>;

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Products</h1>
                    <p style={{ color: 'var(--admin-text-muted)', fontSize: '1rem', margin: '0.5rem 0 0 0' }}>
                        Manage {products.length} products in your catalog
                    </p>
                </div>

                <div className="flex gap-2">
                    <div className="status-filter flex align-center gap-1" style={{ background: 'white', padding: '0.6rem 0.8rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}>
                        <Filter size={16} color="var(--admin-text-muted)" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            style={{ border: 'none', background: 'transparent', outline: 'none', fontWeight: 500, fontSize: '0.85rem', cursor: 'pointer', color: 'var(--admin-text-main)' }}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            toast.info('➕ Opening product form...');
                            setEditingProduct(null);
                            setFormData({
                                name: '',
                                device: '',
                                price: '',
                                mrp: '',
                                discount: '',
                                stock: '',
                                category: 'Phone Case',
                                trending: false,
                                showInShop: true,
                                colors: [{ name: '', code: '#000000', image: '' }]
                            });
                            setShowForm(true);
                        }}
                    >
                        <Plus size={20} /> Add New Product
                    </button>
                </div>
            </div>

            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search products by name, device or category..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="card">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ minWidth: '250px' }}>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th style={{ width: '120px', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="flex align-center gap-2">
                                            <img
                                                src={product.image || product.colors?.[0]?.image || ''}
                                                alt={product.name}
                                                className="product-image"
                                                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div style={{ display: 'none', width: '48px', height: '48px', background: '#f0f0f0', borderRadius: '8px', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#999' }}>
                                                No Image
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{product.name || 'Unnamed Product'}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.35rem' }}>
                                                    {product.device || product.category || 'Product'} • ID: {product.id}
                                                </div>
                                                <div className="flex gap-1">
                                                    {product.showInShop !== false && (
                                                        <span style={{
                                                            fontSize: '0.65rem',
                                                            padding: '0.2rem 0.5rem',
                                                            background: '#E8F2FF',
                                                            color: '#0071E3',
                                                            borderRadius: '4px',
                                                            fontWeight: 600
                                                        }}>
                                                            SHOP
                                                        </span>
                                                    )}
                                                    {product.trending && (
                                                        <span style={{
                                                            fontSize: '0.65rem',
                                                            padding: '0.2rem 0.5rem',
                                                            background: '#FFF8E6',
                                                            color: '#B27B00',
                                                            borderRadius: '4px',
                                                            fontWeight: 600
                                                        }}>
                                                            TRENDING
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="status-badge status-gray">{product.category || product.device || 'N/A'}</span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700 }}>{formatCurrency(product.price || 0)}</div>
                                        {product.mrp && product.mrp > product.price && (
                                            <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: '#888' }}>
                                                {formatCurrency(product.mrp)}
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{product.stock || 'N/A'}</div>
                                        {product.stock !== undefined && (
                                            <div className="progress-bar" style={{ width: '60px', height: '4px', background: '#eee', borderRadius: '2px', marginTop: '4px' }}>
                                                <div style={{
                                                    width: `${Math.min((product.stock || 0) / 10, 100)}%`,
                                                    height: '100%',
                                                    background: (product.stock || 0) < 10 ? '#dc3545' : '#28a745',
                                                    borderRadius: '2px'
                                                }}></div>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex gap-1" style={{ justifyContent: 'center' }}>
                                            <button
                                                className="btn btn-secondary"
                                                style={{ padding: '0.5rem', minWidth: '36px' }}
                                                title="Edit Product"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                style={{ padding: '0.5rem', minWidth: '36px' }}
                                                title="Delete Product"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>
                                <ShoppingBag size={48} color="#ccc" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <h3 style={{ color: 'var(--admin-text-muted)', marginBottom: '0.5rem' }}>No products found</h3>
                                <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
                                    {searchTerm
                                        ? 'Try adjusting your search or add a new product.'
                                        : 'Get started by adding your first product.'}
                                </p>
                            </td>
                        </tr>
                    )}
                </div>
            </div>

            
            {showForm && (
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowForm(false)}><X /></button>
                        <h2 style={{ marginTop: 0 }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="dashboard-grid">
                                <div>
                                    <div className="form-group">
                                        <label className="form-label">Product Name *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Device/Model *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.device}
                                            onChange={e => setFormData({ ...formData, device: e.target.value })}
                                            placeholder="e.g., iPhone 17 Pro Max"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Category</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Price (₹) *</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">MRP (₹) *</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={formData.mrp}
                                            onChange={e => setFormData({ ...formData, mrp: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="form-group">
                                        <label className="form-label">Discount (%)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={formData.discount}
                                            onChange={e => setFormData({ ...formData, discount: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Stock Quantity *</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={formData.stock}
                                            onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                            placeholder="Available quantity"
                                            required
                                        />
                                    </div>

                                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                        <label className="form-label" style={{ marginBottom: '1rem', display: 'block' }}>Visibility Settings</label>
                                        <div style={{ background: '#F5F5F7', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            <div className="flex align-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="showInShop"
                                                    checked={formData.showInShop}
                                                    onChange={e => setFormData({ ...formData, showInShop: e.target.checked })}
                                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                />
                                                <label htmlFor="showInShop" style={{ fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>Show in Shop Section</label>
                                            </div>
                                            <div className="flex align-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id="trending"
                                                    checked={formData.trending}
                                                    onChange={e => setFormData({ ...formData, trending: e.target.checked })}
                                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                />
                                                <label htmlFor="trending" style={{ fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>Show in Trending Section</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                <label className="form-label">Product Colors *</label>
                                {formData.colors.map((color, index) => (
                                    <div key={index} className="flex gap-2 align-center" style={{ marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                                        <div style={{ flex: 1 }}>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="Color Name"
                                                value={color.name}
                                                onChange={e => handleColorChange(index, 'name', e.target.value)}
                                                style={{ marginBottom: '0.5rem' }}
                                                required
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="color"
                                                    value={color.code}
                                                    onChange={e => handleColorChange(index, 'code', e.target.value)}
                                                    style={{ width: '60px', height: '40px', border: '1px solid #ddd', borderRadius: '4px' }}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    placeholder="Image URL"
                                                    value={color.image}
                                                    onChange={e => handleColorChange(index, 'image', e.target.value)}
                                                    style={{ flex: 1 }}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {formData.colors.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => handleRemoveColor(index)}
                                                style={{ padding: '0.5rem' }}
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleAddColor}
                                    style={{ marginTop: '0.5rem' }}
                                >
                                    <Plus size={16} /> Add Color Variant
                                </button>
                            </div>

                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowForm(false)}
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
