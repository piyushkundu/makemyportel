'use client';

import { useState } from 'react';
import servicesData from '@/data/services.json';

interface Service {
    id: string;
    category: string;
    name: string;
    description: string;
    priceMin: number;
    priceMax: number;
    discountPrice: number | null;
    enabled: boolean;
    featured: boolean;
    perPage?: boolean;
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>(servicesData.services);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');

    const categories = servicesData.categories;

    const filteredServices = filterCategory === 'all'
        ? services
        : services.filter(s => s.category === filterCategory);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN').format(price);
    };

    const handleToggleEnabled = (id: string) => {
        setServices(services.map(s =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
        ));
    };

    const handleToggleFeatured = (id: string) => {
        setServices(services.map(s =>
            s.id === id ? { ...s, featured: !s.featured } : s
        ));
    };

    const handleEdit = (service: Service) => {
        setEditingService({ ...service });
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (editingService) {
            setServices(services.map(s =>
                s.id === editingService.id ? editingService : s
            ));
            setIsModalOpen(false);
            setEditingService(null);
        }
    };

    const handleAddNew = () => {
        setEditingService({
            id: `new-${Date.now()}`,
            category: 'websites',
            name: '',
            description: '',
            priceMin: 0,
            priceMax: 0,
            discountPrice: null,
            enabled: true,
            featured: false,
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    return (
        <div className="admin-page">
            <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-xl)' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-xs)' }}>Services Management</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Add, edit, and manage your services and pricing</p>
                </div>
                <button className="btn btn-primary" onClick={handleAddNew}>
                    + Add Service
                </button>
            </div>

            {/* Filter */}
            <div className="glass-card" style={{ marginBottom: 'var(--space-lg)', padding: 'var(--space-md)' }}>
                <div className="flex items-center gap-md">
                    <span style={{ fontWeight: 600 }}>Filter by Category:</span>
                    <div className="tabs">
                        <button
                            className={`tab ${filterCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('all')}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`tab ${filterCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setFilterCategory(cat.id)}
                            >
                                {cat.icon} {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Table */}
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Category</th>
                                <th>Price Range (₹)</th>
                                <th>Discount (₹)</th>
                                <th>Status</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServices.map((service) => (
                                <tr key={service.id}>
                                    <td>
                                        <div>
                                            <strong>{service.name}</strong>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                                                {service.description.slice(0, 50)}...
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge badge-primary">
                                            {categories.find(c => c.id === service.category)?.name}
                                        </span>
                                    </td>
                                    <td>
                                        ₹{formatPrice(service.priceMin)} – ₹{formatPrice(service.priceMax)}
                                    </td>
                                    <td>
                                        {service.discountPrice ? (
                                            <span style={{ color: 'var(--success)' }}>₹{formatPrice(service.discountPrice)}</span>
                                        ) : (
                                            <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                                        )}
                                    </td>
                                    <td>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={service.enabled}
                                                onChange={() => handleToggleEnabled(service.id)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="toggle">
                                            <input
                                                type="checkbox"
                                                checked={service.featured}
                                                onChange={() => handleToggleFeatured(service.id)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <div className="flex gap-sm">
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => handleEdit(service)}
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn btn-ghost btn-sm"
                                                onClick={() => handleDelete(service.id)}
                                                style={{ color: 'var(--error)' }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {isModalOpen && editingService && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="modal-header">
                            <h3 className="modal-title">
                                {editingService.id.startsWith('new-') ? 'Add New Service' : 'Edit Service'}
                            </h3>
                            <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="grid grid-cols-2" style={{ gap: 'var(--space-lg)' }}>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Service Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={editingService.name}
                                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-input form-textarea"
                                        value={editingService.description}
                                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-input"
                                        value={editingService.category}
                                        onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div></div>

                                <div className="form-group">
                                    <label className="form-label">Starting Price (₹)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={editingService.priceMin}
                                        onChange={(e) => setEditingService({ ...editingService, priceMin: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Maximum Price (₹)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={editingService.priceMax}
                                        onChange={(e) => setEditingService({ ...editingService, priceMax: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Discount Price (₹) - Optional</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={editingService.discountPrice || ''}
                                        placeholder="Leave empty for no discount"
                                        onChange={(e) => setEditingService({
                                            ...editingService,
                                            discountPrice: e.target.value ? Number(e.target.value) : null
                                        })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Options</label>
                                    <div className="flex gap-lg" style={{ marginTop: 'var(--space-sm)' }}>
                                        <label className="flex items-center gap-sm" style={{ cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={editingService.enabled}
                                                onChange={(e) => setEditingService({ ...editingService, enabled: e.target.checked })}
                                            />
                                            Enabled
                                        </label>
                                        <label className="flex items-center gap-sm" style={{ cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={editingService.featured}
                                                onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                                            />
                                            Featured
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
