import React, { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData';
import { formatDate } from '../../utils/formatters';
import { Search, Mail, User, Ban, CheckCircle, Users as UsersIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../api/apiContext';

const Users = () => {
    const { users, loading, refetch } = useAdminData();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleBlockStatus = async (id, isBlocked) => {
        if (window.confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`)) {
            const loadingToast = toast.loading('Updating user status...');
            try {
                await api.patch(`/users/${id}`, { isBlocked: !isBlocked });
                toast.dismiss(loadingToast);
                toast.success(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
                refetch();
            } catch (err) {
                toast.dismiss(loadingToast);
                toast.error('Failed to update user status');
                console.error(err);
            }
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
                    <h1 className="text-3xl font-bold text-black tracking-tight mb-2">Users</h1>
                    <p className="text-gray-500">Manage registered customers and administrators</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2">
                    <UsersIcon size={18} className="text-black" />
                    <span className="font-bold text-black">{users.length}</span>
                    <span className="text-gray-500 text-sm">Total Users</span>
                </div>
            </div>

            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg text-base bg-white focus:outline-none focus:border-black focus:shadow-[0_0_0_4px_rgba(0,0,0,0.1)] transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">User Profile</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Status</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Joined Date</th>
                                <th className="text-left px-6 py-4 text-gray-500 font-medium text-xs bg-gray-50 border-b border-gray-200 uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-black text-sm">{user.name || 'Unknown User'}</div>
                                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Mail size={10} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100">
                                        {user.isBlocked ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold border border-red-200">
                                                <Ban size={12} /> Blocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-200">
                                                <CheckCircle size={12} /> Active
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-sm text-gray-600">
                                        {formatDate(user.createdAt || user.joinedAt)}
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-100 text-left">
                                        <button
                                            onClick={() => toggleBlockStatus(user.id, user.isBlocked)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${user.isBlocked
                                                    ? 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100'
                                                    : 'text-red-700 bg-red-50 border-red-200 hover:bg-red-100'
                                                }`}
                                            title={user.isBlocked ? "Unblock User" : "Block User"}
                                        >
                                            {user.isBlocked ? (
                                                <>
                                                    <CheckCircle size={14} /> Unblock
                                                </>
                                            ) : (
                                                <>
                                                    <Ban size={14} /> Block
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-16">
                                        <User size={48} className="text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                                        <p className="text-gray-500 text-sm">Try searching for a different name.</p>
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

export default Users;
