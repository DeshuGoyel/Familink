export const mockAssets = [
  { id: '1', name: 'BTC Wallet (Main)', type: 'Crypto', status: 'Protected', value: 145000, date: '2026-03-20', tags: ['btc', 'main'] },
  { id: '2', name: 'ETH Wallet', type: 'Crypto', status: 'Protected', value: 82000, date: '2026-03-18', tags: ['eth'] },
  { id: '3', name: 'Bored Ape #4821', type: 'NFT', status: 'Protected', value: 28000, date: '2026-03-10', tags: ['nft', 'art'] },
  { id: '4', name: 'Gmail Account', type: 'Account', status: 'Incomplete', value: 0, date: '2026-03-01', tags: ['email'] },
  { id: '5', name: 'Property Deed', type: 'Document', status: 'Protected', value: 0, date: '2026-02-15', tags: ['legal'] },
  { id: '6', name: 'MetaMask Wallet', type: 'Crypto', status: 'Incomplete', value: 0, date: '2026-02-10', tags: ['eth', 'defi'] },
  { id: '7', name: 'Solana Wallet', type: 'Crypto', status: 'Protected', value: 15000, date: '2026-02-05', tags: ['sol'] },
  { id: '8', name: 'Family Photos Drive', type: 'Document', status: 'Protected', value: 0, date: '2026-01-20', tags: ['media'] },
  { id: '9', name: 'Binance Account', type: 'Account', status: 'Protected', value: 15000, date: '2026-01-15', tags: ['exchange'] }
];

export const mockGuardians = [
  { id: 'g1', name: 'Sarah Chen', email: 'sarah@email.com', status: 'Confirmed' },
  { id: 'g2', name: 'Michael Rodriguez', email: 'mike@email.com', status: 'Confirmed' },
  { id: 'g3', name: 'Priya Sharma', email: 'priya@email.com', status: 'Pending' },
  { id: 'g4', name: 'David Kim', email: 'david@email.com', status: 'Confirmed' },
  { id: 'g5', name: 'Emma Wilson', email: 'emma@email.com', status: 'Pending' }
];

export const mockHeirs = [
  { id: 'h1', name: 'Emily Asha', email: 'emily@email.com', relation: 'Daughter', status: 'Not Notified', progress: 0 },
  { id: 'h2', name: 'Raj Kumar', email: 'raj@email.com', relation: 'Son', status: 'In Recovery', progress: 60 }
];

export const mockActivity = [
  { id: 'a1', message: 'BTC Wallet added', time: '2h ago', icon: 'Lock' },
  { id: 'a2', message: 'Guardian Sarah confirmed', time: '1d ago', icon: 'User' },
  { id: 'a3', message: 'Will document uploaded', time: '3d ago', icon: 'FileText' },
  { id: 'a4', message: 'ETH Wallet added', time: '5d ago', icon: 'Key' },
  { id: 'a5', message: 'Gmail account linked', time: '1w ago', icon: 'Mail' }
];

export const mockNotifications = [
  { id: 'n1', message: 'Guardian Sarah confirmed your invite', icon: 'Key', read: false },
  { id: 'n2', message: 'ETH wallet missing heir instructions', icon: 'AlertTriangle', read: false },
  { id: 'n3', message: 'Monthly security check passed', icon: 'CheckCircle', read: true }
];
