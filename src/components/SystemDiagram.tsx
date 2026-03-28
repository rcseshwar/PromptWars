"use client";

import React from "react";
import { MoveDown, Database, Cpu, Terminal, Zap, ShieldCheck } from "lucide-react";

const SystemDiagram = () => {
  const steps = [
    { icon: <Terminal size={20} />, label: "Input Processor", detail: "Messy Multimodal Data", color: "#3b82f6" },
    { icon: <Cpu size={20} />, label: "Intent Engine", detail: "Gemini-Powered Extraction", color: "var(--primary)" },
    { icon: <Database size={20} />, label: "Context Aggregator", detail: "External Signal Sync", color: "#ec4899" },
    { icon: <Zap size={20} />, label: "Decision Engine", detail: "Confidence Verification", color: "#f59e0b" },
    { icon: <ShieldCheck size={20} />, label: "Action Layer", detail: "Real-world Triggering", color: "#10b981" },
  ];

  return (
    <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', opacity: 0.8 }}>System Architecture Flow</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              width: '100%', 
              background: 'rgba(255,255,255,0.02)', 
              padding: '0.75rem 1.25rem', 
              borderRadius: '0.75rem',
              border: `1px solid ${step.color}33`,
              transition: 'all 0.3s ease'
            }}>
              <div style={{ color: step.color }}>{step.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{step.label}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{step.detail}</div>
              </div>
            </div>
            {i < steps.length - 1 && <MoveDown size={20} style={{ opacity: 0.2, margin: '-0.5rem 0' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SystemDiagram;
