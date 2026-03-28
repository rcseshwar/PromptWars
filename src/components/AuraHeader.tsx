"use client";

import { Activity, Menu, ShieldCheck } from "lucide-react";
import React from 'react';

const AuraHeader = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 0',
      marginBottom: '2rem',
      position: 'sticky',
      top: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px var(--primary-glow)'
        }}>
          <Activity size={24} color="white" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>Aura Link</h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
          <ShieldCheck size={16} color="var(--success)" />
          <span>Core Ops Verified</span>
        </div>
        <button style={{ background: 'transparent', color: 'white' }}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default AuraHeader;
