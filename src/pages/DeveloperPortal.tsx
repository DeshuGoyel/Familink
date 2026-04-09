import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useB2BStore } from '../store/useB2BStore';
import Button from '../components/ui/Button';
import { Code2, Server, Key, ShieldCheck, Activity, Terminal, ExternalLink, Network, Database, Lock, Plus } from 'lucide-react';

export default function DeveloperPortal() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'contracts' | 'security'>('api');
  const { connectedNodes, lastPing, registerNode, pingNode } = useB2BStore();

  const handlePing = async (nodeId: string) => {
    pingNode(nodeId);
  };

  const handleConnectBank = () => {
    registerNode({
      name: 'Chase Wealth Management',
      type: 'bank',
      status: 'active',
      permissions: ['read_assets', 'verify_death']
    });
  };

  return (
    <div className="min-h-screen bg-secondary">
<main className="pt-6 px-4 md:px-8 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <Terminal className="text-primary" size={24}/>
                 <h1 className="text-3xl font-bold text-text">Developer Platform</h1>
              </div>
              <p className="text-muted mt-1 max-w-xl">
                B2B APIs, verifiable credentials, and smart contract architecture for institutional estate planning integration.
              </p>
            </div>
            <Button variant="secondary" className="gap-2 font-mono text-xs border-primary/30 text-primary">
              <Code2 size={16}/> View Documentation
            </Button>
          </header>

          <div className="flex space-x-2 border-b border-border/50 overflow-x-auto scrollbar-hide">
            {[
              { id: 'architecture', label: 'Architecture', icon: Network },
              { id: 'api', label: 'API Keys & Nodes', icon: Key },
              { id: 'contracts', label: 'Smart Contracts', icon: Database },
              { id: 'security', label: 'Security & Auth', icon: ShieldCheck },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted hover:text-text'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* API Keys & Nodes Tab */}
              {activeTab === 'api' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* B2B Node Exchange Widget */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="glassmorphism rounded-2xl p-6 border border-primary/20 bg-surface/30">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
                             <Server className="text-primary" size={20}/> Connected B2B Nodes
                          </h3>
                          <p className="text-sm text-muted mt-1">Institutions with authorized vault access.</p>
                        </div>
                        <Button onClick={handleConnectBank} variant="secondary" className="text-xs border-primary/30 hover:bg-primary/10">
                          <Plus size={14} className="mr-1"/> Add Institution
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {connectedNodes.length === 0 ? (
                          <div className="text-center py-8 border border-dashed border-border rounded-xl">
                             <p className="text-muted text-sm">No external institutional nodes connected.</p>
                          </div>
                        ) : (
                           connectedNodes.map(node => (
                             <div key={node.id} className="flex justify-between items-center p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                      <Server size={20} />
                                   </div>
                                   <div>
                                      <h4 className="text-sm font-semibold text-text">{node.name}</h4>
                                      <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-surface border border-border text-muted">{node.type}</span>
                                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${node.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                           {node.status}
                                        </span>
                                      </div>
                                   </div>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                   <div className="text-right mr-2 hidden sm:block">
                                      <p className="text-[10px] text-muted">Last Ping</p>
                                      <p className="text-xs font-mono text-text">{lastPing[node.id] ? new Date(lastPing[node.id]).toLocaleTimeString() : 'Never'}</p>
                                   </div>
                                   <button 
                                     onClick={() => handlePing(node.id)}
                                     title="Send Ping Request"
                                     className="p-2 rounded bg-surface hover:bg-primary/20 text-muted hover:text-primary transition-colors border border-border"
                                   >
                                     <Activity size={16} />
                                   </button>
                                </div>
                             </div>
                           ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* API Keys Panel */}
                  <div className="lg:col-span-1 space-y-6">
                    <div className="glassmorphism rounded-2xl p-6 relative overflow-hidden">
                       <h3 className="text-lg font-semibold text-text mb-4">REST API Keys</h3>
                       <p className="text-xs text-muted mb-6">Manage your private API keys for custom integrations.</p>
                       
                       <div className="space-y-3">
                          <div className="bg-background rounded-lg border border-border p-3">
                             <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-text">Production Key</span>
                                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded">Active</span>
                             </div>
                             <div className="flex items-center justify-between mt-2">
                               <code className="text-[10px] text-muted font-mono bg-surface px-2 py-1 rounded truncate w-32">lk_live_a1b2c3...</code>
                               <button className="text-xs text-primary hover:underline">Reveal</button>
                             </div>
                          </div>
                       </div>
                       
                       <Button variant="secondary" className="w-full mt-4 text-xs">Generate New Key</Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Architecture Tab */}
              {activeTab === 'architecture' && (
                 <div className="glassmorphism rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center border-dashed border-border border-2">
                    <Network size={48} className="text-primary/40 mb-4" />
                    <h3 className="text-xl font-semibold text-text mb-2">Zero-Knowledge Architecture Overview</h3>
                    <p className="text-muted max-w-lg mb-6 leading-relaxed">
                      Transfer Legacy uses a decentralized nodal network where your data is encrypted locally using PBKDF2 and AES-GCM before reaching our servers. We never store your raw master password.
                    </p>
                    <Button variant="primary" className="glow-blue gap-2"><ExternalLink size={16}/> Read Whitepaper</Button>
                 </div>
              )}

              {/* Smart Contracts Tab */}
              {activeTab === 'contracts' && (
                 <div className="glassmorphism rounded-2xl p-8 border border-purple-500/20">
                    <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2"><Database className="text-purple-400" size={20}/> On-Chain Vault Escrow</h3>
                    <div className="bg-[#0a0a0f] text-[#a9b1d6] font-mono text-sm p-6 rounded-xl overflow-x-auto shadow-inner border border-white/5">
<pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TransferLegacyVault {
    address public owner;
    address[] public designatedHeirs;
    uint256 public heartbeatTimeout;
    uint256 public lastHeartbeat;
    
    event Heartbeat(uint256 timestamp);
    event RecoveryTriggered(address triggerer, uint256 timestamp);

    function ping() external {
        require(msg.sender == owner, "Only owner can ping");
        lastHeartbeat = block.timestamp;
        emit Heartbeat(block.timestamp);
    }
}`}</pre>
                    </div>
                 </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glassmorphism rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                       <Lock className="text-emerald-400 mb-4" size={24} />
                       <h4 className="font-semibold text-text mb-2">End-to-End Encryption</h4>
                       <p className="text-sm text-muted">All vault items and memory capsules are encrypted client-side using WebCrypto API. The server only receives ciphertext.</p>
                    </div>
                    <div className="glassmorphism rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
                       <ShieldCheck className="text-emerald-400 mb-4" size={24} />
                       <h4 className="font-semibold text-text mb-2">Posthumous Authentication</h4>
                       <p className="text-sm text-muted">Multi-signature scheme requiring (M of N) guardians to verify death off-chain before the key shard is released to heirs.</p>
                    </div>
                 </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

