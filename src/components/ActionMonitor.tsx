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
          <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{item.intent}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ 
            padding: '0.25rem 0.75rem', 
            borderRadius: '999px', 
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.625rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
             <span>Node: Alpha-7</span>
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
      </div>

      {item.explanation && (
        <p style={{ fontSize: '0.875rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem', opacity: 0.8, fontStyle: 'italic' }}>
          &quot;{item.explanation}&quot;
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 250px', gap: '1.5rem', marginBottom: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.6, fontSize: '0.75rem' }}>
            <ClipboardList size={14} />
            <span>EXTRACTED PAYLOAD</span>
          </div>
          <pre style={{ fontSize: '0.8125rem', lineHeight: 1.4, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.9)', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(item.payload, null, 2)}
          </pre>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', opacity: 0.6, fontSize: '0.75rem' }}>
              <ShieldAlert size={14} />
              <span>ACTIONS TRIGGERED</span>
            </div>
            <ul style={{ fontSize: '0.8125rem', paddingLeft: '1rem', color: 'var(--success)' }}>
              {item.actions.map((action: string, i: number) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'rgba(16, 185, 129, 0.8)' }}>
            <CheckCircle2 size={16} />
            <span>Identity Verified</span>
          </div>
          <div style={{ height: '4px', width: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '94%', height: '100%', background: 'var(--primary)' }} />
          </div>
          <span style={{ fontSize: '0.625rem', opacity: 0.4 }}>CONFIDENCE: 94.2%</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ fontSize: '0.625rem', opacity: 0.4 }}>LATENCY: 842ms</span>
          <button style={{ color: 'rgba(255,255,255,0.4)', background: 'transparent' }}>
            <Share2 size={16} />
          </button>
        </div>
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
