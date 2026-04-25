import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Shield, 
  Mail, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { opsApi } from '../../../lib/opsApi';
import StatCard from '../../../components/ui/StatCard';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

export default function OpsDashboard() {
  const [stats, setStats] = useState({
    waitlistCount: 0,
    adminCount: 0,
    systemStatus: 'Operational',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [waitlist, admins] = await Promise.all([
        opsApi.get<any[]>('/ops/waitlist'),
        opsApi.get<any[]>('/ops/admins'),
      ]);
      setStats({
        waitlistCount: waitlist.length,
        adminCount: admins.length,
        systemStatus: 'Operational',
      });
    } catch (err) {
      console.error('Failed to fetch stats');
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">System Overview</h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live infrastructure monitoring for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/ops/waitlist">
            <Button variant="default" className="rounded-xl border-slate-800 bg-slate-900/50">
              View Analytics
            </Button>
          </Link>
          <Link to="/ops/branding">
            <Button variant="primary" className="rounded-xl glow-blue">
              Studio Config
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item}>
          <StatCard
            title="Total Waitlist"
            value={stats.waitlistCount}
            icon={<Users className="w-5 h-5" />}
            trend={{ value: 12, label: 'from last week', positive: true }}
            className="bg-slate-900/40 border-slate-800 hover:border-indigo-500/30 transition-all cursor-default"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="System Admins"
            value={stats.adminCount}
            icon={<Shield className="w-5 h-5" />}
            className="bg-slate-900/40 border-slate-800 hover:border-indigo-500/30 transition-all cursor-default"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="API Latency"
            value={24}
            suffix="ms"
            icon={<Activity className="w-5 h-5" />}
            trend={{ value: 4, label: 'optimized', positive: true }}
            className="bg-slate-900/40 border-slate-800 hover:border-indigo-500/30 transition-all cursor-default"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatCard
            title="Service Status"
            value={stats.systemStatus}
            icon={<ShieldCheck className="w-5 h-5" />}
            className="bg-slate-900/40 border-slate-800 hover:border-indigo-500/30 transition-all cursor-default"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / System Log */}
        <motion.div variants={item} className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              Recent Operations
            </h3>
            <button className="text-xs text-indigo-400 font-bold hover:underline">View Audit Log</button>
          </div>
          <Card className="bg-slate-950 border-slate-800 p-0 overflow-hidden divide-y divide-slate-800/50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center justify-between group hover:bg-slate-900/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Branding Configuration Update</p>
                    <p className="text-xs text-slate-500">System updated by admin@transferlegacy.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">2h ago</p>
                  <Badge variant="success" className="text-[9px] mt-1">success</Badge>
                </div>
              </div>
            ))}
          </Card>
        </motion.div>

        {/* Quick Insights */}
        <motion.div variants={item} className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-indigo-400" />
            Quick Insights
          </h3>
          <Card className="bg-indigo-600/10 border-indigo-500/20 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Globe className="w-20 h-20 text-indigo-500" />
            </div>
            <p className="text-sm text-indigo-300 font-medium">Growth Target</p>
            <h4 className="text-2xl font-bold text-white mt-2">Targeting 500+</h4>
            <p className="text-xs text-indigo-400/80 mt-1 leading-relaxed">
              Based on recent waitlist velocity, we are on track to exceed our pre-launch goals.
            </p>
            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#020409]" />
                ))}
              </div>
              <span className="text-xs font-bold text-indigo-400">+18% this month</span>
            </div>
          </Card>
          
          <Card className="bg-slate-900/40 border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-slate-800">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-sm font-bold text-white">System Notifications</p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              "No critical system alerts. Infrastructure is stable across all regions."
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
