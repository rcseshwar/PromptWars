"use client";

import React, { useState, useRef } from "react";
import { Mic, Camera, Send, FileText, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InputPanelProps {
  onProcess: (input: { type: string; content: string; file?: File }) => void;
  isProcessing: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onProcess, isProcessing }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text && !selectedFile) return;
    onProcess({
      type: selectedFile ? "multimodal" : "text",
      content: text,
      file: selectedFile || undefined
    });
    setText("");
    setSelectedFile(null);
  };

  const toggleMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    
    // Quick mock for demo, actual implementation would use Web Speech API
    setIsListening(!isListening);
    if (!isListening) {
      // Mocking auto-detection after 3s
      setTimeout(() => {
        setIsListening(false);
        setText("Crash on high street, someone's trapped in a blue car! Smoke everywhere.");
      }, 3000);
    }
  };

  return (
    <div className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)' }}>Input Signal</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
             <button 
              onClick={() => fileInputRef.current?.click()}
              className="glass"
              style={{ padding: '0.5rem', borderRadius: '50%', color: selectedFile ? 'var(--primary)' : 'white' }}
            >
              <Camera size={20} />
            </button>
            <button 
              onClick={toggleMic}
              className={`glass ${isListening ? 'pulse' : ''}`}
              style={{ 
                padding: '0.5rem', 
                borderRadius: '50%', 
                color: isListening ? 'var(--danger)' : 'white',
                border: isListening ? '1px solid var(--danger)' : '1px solid var(--card-border)'
              }}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          hidden 
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />

        <AnimatePresence>
          {selectedFile && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div className="glass" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="var(--primary)" />
                <span style={{ fontSize: '0.875rem', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedFile.name}</span>
                <button onClick={() => setSelectedFile(null)}><X size={16} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: 'relative' }}>
          <textarea 
            placeholder={isListening ? "Listening for emergency signals..." : "Describe the situation or symptoms..."}
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--card-border)',
              borderRadius: '1rem',
              padding: '1rem',
              color: 'white',
              fontSize: '1rem',
              minHeight: '100px',
              fontFamily: 'inherit',
              resize: 'none'
            }}
          />
          <button 
            onClick={handleSend}
            disabled={isProcessing || (!text && !selectedFile)}
            className="btn-primary"
            style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              right: '1rem', 
              padding: '0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: (isProcessing || (!text && !selectedFile)) ? 0.5 : 1
            }}
          >
            {isProcessing ? "Processing..." : (
              <>
                <span>Link Aura</span>
                <Send size={16} />
              </>
            )}
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <AlertTriangle size={16} color="var(--accent)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>
            System ready for critical response. Offline-first backup active.
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;
