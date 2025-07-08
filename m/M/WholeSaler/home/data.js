import apiConnector from "../../utils/apiConnector";

export const summaryCards = [
  { key: 'all', label: 'All Products', value: 4, desc: 'Active Products', color: '#3973F4', icon: '🛒' },
  { key: 'out', label: 'Out of Stock', value: 4, desc: 'Need Restock', color: '#FF7B1A', icon: '⚠️' },
  { key: 'high', label: 'High Price', value: 1, desc: 'Above Market', color: '#A259F7', icon: '📈' },
  { key: 'exp', label: 'Expiring Price', value: 0, desc: 'Need Update', color: '#F7B500', icon: '⏰' },
  { key: 'expired', label: 'Expired Price', value: 0, desc: 'Not Listed', color: '#F75C4E', icon: '📅' },
  { key: 'kyc', label: 'KYC Status', value: 'Pending', desc: 'Verification', color: '#1CC8EE', icon: '🪪' },
];

export const products = [
  { name: 'Fresh Tomatoes', stock: 250, price: 45, img: '/assets/to.png', tags: ['High Price', 'Expiring Price'] },
  { name: 'Organic Onions', stock: 180, price: 32, img: '/assets/oni.png', tags: ['High Price', 'Expiring Price'] },
  { name: 'Green Capsicum', stock: 120, price: 65, img: '/assets/cap.png', tags: ['High Price', 'Expiring Price'] },
  { name: 'Fresh Carrots', stock: 200, price: 38, img: '/assets/cap.png', tags: [] },
];

export const outOfStockProducts = [
  { name: 'Fresh Tomatoes', currentStock: 0, minRequired: 10, img: '/assets/to.png', status: 'out' },
  { name: 'Green Capsicum', currentStock: 5, minRequired: 10, img: '/assets/cap.png', status: 'low' },
  { name: 'Fresh Carrots', currentStock: 3, minRequired: 10, img: '/assets/cap.png', status: 'low' },
  { name: 'Red Onions', currentStock: 8, minRequired: 10, img: '/assets/oni.png', status: 'low' },
];

export const highPriceProducts = [
  { name: 'Green Capsicum', currentPrice: 65, marketAverage: 45, img: '/assets/cap.png', percentageHigher: 44.4 },
];