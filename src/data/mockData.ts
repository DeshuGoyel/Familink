export const mockAssets = [
  { 
    id: '1', 
    name: 'BTC Wallet (Main)', 
    type: 'Crypto', 
    status: 'Protected', 
    value: 145000, 
    date: '2026-03-20', 
    tags: ['btc', 'main'],
    instructions: 'Seed phrase stored in physical safe #2. Location known by Sarah.',
    beneficiaryId: 'h1',
    encryptionLevel: 'Quantum-Resistant'
  },
  { 
    id: '2', 
    name: 'ETH Wallet', 
    type: 'Crypto', 
    status: 'Protected', 
    value: 82000, 
    date: '2026-03-18', 
    tags: ['eth'],
    instructions: 'Multi-sig recovery active. Requires 2 of 3 guardians.',
    beneficiaryId: 'h1',
    encryptionLevel: 'Military'
  },
  { 
    id: '3', 
    name: 'Bored Ape #4821', 
    type: 'NFT', 
    status: 'Protected', 
    value: 28000, 
    date: '2026-03-10', 
    tags: ['nft', 'art'],
    instructions: 'Transfer to Emily vault.',
    beneficiaryId: 'h1',
    encryptionLevel: 'Standard'
  },
  { 
    id: '4', 
    name: 'Gmail Account', 
    type: 'Account', 
    status: 'Incomplete', 
    value: 0, 
    date: '2026-03-01', 
    tags: ['email'] 
  },
  { 
    id: '5', 
    name: 'Property Deed', 
    type: 'Document', 
    status: 'Protected', 
    value: 0, 
    date: '2026-02-15', 
    tags: ['legal'],
    instructions: 'Physical copy at the London bank vault.',
    beneficiaryId: 'h2',
    encryptionLevel: 'Standard'
  },
  { 
    id: '6', 
    name: 'MetaMask Wallet', 
    type: 'Crypto', 
    status: 'Incomplete', 
    value: 0, 
    date: '2026-02-10', 
    tags: ['eth', 'defi'] 
  },
  { 
    id: '7', 
    name: 'Solana Wallet', 
    type: 'Crypto', 
    status: 'Protected', 
    value: 15000, 
    date: '2026-02-05', 
    tags: ['sol'],
    instructions: 'Ledger backup in office.',
    beneficiaryId: 'h2',
    encryptionLevel: 'Military'
  },
  { 
    id: '8', 
    name: 'Family Photos Drive', 
    type: 'Document', 
    status: 'Protected', 
    value: 0, 
    date: '2026-01-20', 
    tags: ['media'],
    instructions: 'Access codes in bitwarden shared folder.',
    beneficiaryId: 'h1',
    encryptionLevel: 'Standard'
  },
  { 
    id: '9', 
    name: 'Binance Account', 
    type: 'Account', 
    status: 'Protected', 
    value: 15000, 
    date: '2026-01-15', 
    tags: ['exchange'],
    instructions: 'API key recovery set up with Sarah.',
    beneficiaryId: 'h2',
    encryptionLevel: 'Military'
  }
];

export const mockGuardians = [
  { id: 'g1', name: 'Sarah Chen', email: 'sarah@email.com', status: 'Confirmed', relationship: 'Spouse' },
  { id: 'g2', name: 'Michael Rodriguez', email: 'mike@email.com', status: 'Confirmed', relationship: 'Brother' },
  { id: 'g3', name: 'Priya Sharma', email: 'priya@email.com', status: 'Pending', relationship: 'Lawyer' },
  { id: 'g4', name: 'David Kim', email: 'david@email.com', status: 'Confirmed', relationship: 'Friend' },
  { id: 'g5', name: 'Emma Wilson', email: 'emma@email.com', status: 'Pending', relationship: 'Accountant' }
];

export const mockHeirs = [
  { id: 'h1', name: 'Emily Asha', email: 'emily@email.com', relation: 'Daughter', status: 'Not Notified', progress: 0 },
  { id: 'h2', name: 'Raj Kumar', email: 'raj@email.com', relation: 'Son', status: 'In Recovery', progress: 60 }
];

export const mockActivity = [
  { id: 'a1', message: 'Heartbeat sync successful', time: '2h ago', icon: 'Lock' },
  { id: 'a2', message: 'Encryption keys rotated (v2.4)', time: '5h ago', icon: 'Key' },
  { id: 'a3', message: 'Vault audit completed', time: '1d ago', icon: 'FileText' },
  { id: 'a4', message: 'Guardian Sarah confirmed ID verification', time: '2d ago', icon: 'User' },
  { id: 'a5', message: 'BTC Protocol status: SECURE', time: '3d ago', icon: 'Lock' },
  { id: 'a6', message: 'New succession trigger point defined', time: '1w ago', icon: 'FileText' }
];

export const mockNotifications = [
  { id: 'n1', message: 'Guardian Sarah confirmed your invite', icon: 'Key', read: false },
  { id: 'n2', message: 'ETH wallet missing heir instructions', icon: 'AlertTriangle', read: false },
  { id: 'n3', message: 'Monthly security check passed', icon: 'CheckCircle', read: true }
];
