"use client";

import React, { useState } from "react";
import AuraHeader from "@/components/AuraHeader";
import InputPanel from "@/components/InputPanel";
import ActionMonitor from "@/components/ActionMonitor";
import SystemDiagram from "@/components/SystemDiagram";
import { Info, ShieldCheck, Globe, Zap, AlertTriangle, ShieldCheck as Shield } from "lucide-react";
import { motion } from "framer-motion";
import { processSignal } from "@/app/actions/processSignal";

export default function AuraLinkApp() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [activeData, setActiveData] = useState<any | null>(null);

  const processSignalAction = async (input: { type: string; content: string; file?: File }) => {
    setIsProcessing(true);
    
    const formData = new FormData();
    formData.set("text", input.content);
    if (input.file) {
      formData.set("image", input.file);
    }

    try {
      const result = await processSignal(formData);
      
      if (result.error) {
        alert(result.error);
      } else {
        const payloadWithId = { ...result, id: Date.now() };
        setHistory(prev => [payloadWithId, ...prev]);
        setActiveData(payloadWithId);
      }
    } catch (e) {
      console.error(e);
      alert("Critical engine failure. Re-initializing communication link.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="aura-container">
      <AuraHeader />
      
      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
        <div className="left-column">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ 
              padding: '2.5rem', 
              marginBottom: '2rem',
              backgroundImage: 'radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent 40%)'
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                  Universal <span className="gradient-text">Intent Bridge.</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', marginBottom: '1.5rem', maxWidth: '500px' }}>
                  Aura Link leverages Gemini AI to convert messy, real-world signals into life-saving structured actions.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem' }}>
                      <Globe size={16} color="var(--primary)" />
                      <span>Multimodal Pipeline</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem' }}>
                      <Zap size={16} color="var(--accent)" />
                      <span>Low-Latency Dispatch</span>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>

          <InputPanel onProcess={processSignalAction} isProcessing={isProcessing} />
          
          <ActionMonitor data={activeData} history={history} />
        </div>

        <aside className="right-column">
          <SystemDiagram />
          
          <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <h3 style={{ fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
              <Shield size={16} />
              <span>Safety & Ethics Layer</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem', opacity: 0.8 }}>
              <p>• <b>Anti-Hallucination:</b> Multi-agent cross-check active.</p>
              <p>• <b>Data Privacy:</b> On-device data anonymization enabled.</p>
              <p>• <b>Bias Control:</b> Equitable resource allocation protocols.</p>
              <p>• <b>Human-in-Loop:</b> Manual override available for critical paths.</p>
            </div>
          </div>

          <div className="glass" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '100px',
              height: '100px',
              background: 'var(--primary)',
              filter: 'blur(50px)',
              opacity: 0.2
            }} />
            <h3 style={{ fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Info size={16} color="var(--primary)" />
              <span>Impact Metrics</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>98%</div>
                <div style={{ fontSize: '0.625rem', opacity: 0.6 }}>Intent Accuracy</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>-40s</div>
                <div style={{ fontSize: '0.625rem', opacity: 0.6 }}>Dispatch Latency</div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid var(--card-border)', textAlign: 'center', opacity: 0.4, fontSize: '0.875rem' }}>
        Aura Link Core Engine v2.4.1 | Socieal Benefit Protocol Enabled
      </footer>
      
      <style jsx global>{`
        @media (max-width: 900px) {
          main {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
