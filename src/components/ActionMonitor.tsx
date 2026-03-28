"use client";

import React from "react";
import { CheckCircle2, ShieldAlert, Cpu, Share2, ClipboardList, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ActionMonitorProps {
  data: any | null;
  history: any[];
}

const ActionMonitor: React.FC<ActionMonitorProps> = ({ data, history }) => {
  if (!data && history.length === 0) {
    return (
      <div className="glass" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>
        <Cpu size={48} style={{ margin: '0 auto 1rem', display: 'block' }} />
        <h3>Waiting for Aura Signal</h3>
        <p style={{ fontSize: '0.875rem' }}>Active monitoring enabled. Link your first intent to start system processing.</p>
      </div>
    );
  }

  const renderCard = (item: any, isLatest: boolean) => (
    <motion.div 
      initial={isLatest ? { opacity: 0, y: 20 } : { opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass" 
      style={{ 
        padding: '1.5rem', 
        marginBottom: '1rem', 
        border: isLatest ? '1px solid var(--primary)' : '1px solid var(--card-border)',
        boxShadow: isLatest ? '0 0 20px rgba(124, 58, 237, 0.2)' : 'none'
      }}
      key={item.id}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} color="var(--primary)" />
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>{item.intent}</span>
        </div>
        <div style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '999px', 
          background: item.urgency === 'CRITICAL' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
          color: item.urgency === 'CRITICAL' ? 'var(--danger)' : 'var(--success)',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          {item.urgency}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.6, fontSize: '0.75rem' }}>
            <ClipboardList size={14} />
            <span>EXTRACTED PAYLOAD</span>
          </div>
          <pre style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)', overflowX: 'auto' }}>
            {JSON.stringify(item.payload, null, 2)}
          </pre>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.6, fontSize: '0.75rem' }}>
            <ShieldAlert size={14} />
            <span>ACTIONS TRIGGERED</span>
          </div>
          <ul style={{ fontSize: '0.875rem', paddingLeft: '1rem' }}>
            {item.actions.map((action: string, i: number) => (
              <li key={i} style={{ marginBottom: '0.25rem' }}>{action}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'rgba(16, 185, 129, 0.8)' }}>
          <CheckCircle2 size={16} />
          <span>Verified & Synced with External Node</span>
        </div>
        <button style={{ color: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
          <Share2 size={16} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>System Log & Response</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence>
          {history.map((item, index) => renderCard(item, index === 0))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActionMonitor;
