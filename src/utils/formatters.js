export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
};

export const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};

export const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
};

export const calculatePercentage = (value, total) => {
    if (!total || total === 0) return 0;
    return Math.round((value / total) * 100);
};

export const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'placed':
        case 'pending':
            return 'bg-[#E8F2FF] text-[#0071E3]';
        case 'processing':
            return 'bg-[#FFF8E6] text-[#B27B00]';
        case 'shipped':
            return 'bg-[#F2EEFF] text-[#6E41E2]';
        case 'delivered':
            return 'bg-[#E4F9EC] text-[#248A3D]';
        case 'cancelled':
            return 'bg-[#FFF2F4] text-[#FF3B30]';
        default:
            return 'bg-[#F2F2F7] text-[#8E8E93]';
    }
};
