"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Code2, Loader2 } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock response based on prompt
    const safePrompt = prompt.toLowerCase();
    let bgColor = "white";
    let textColor = "black";
    if (safePrompt.includes("dark")) {
      bgColor = "#1a1a1a";
      textColor = "white";
    }
    if (safePrompt.includes("blue")) {
      bgColor = "#eff6ff";
      textColor = "#1e3a8a";
    }
    if (safePrompt.includes("coffee")) {
        bgColor = "#3c2f2f";
        textColor = "#e8d8d8";
    }
    
    const mockHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; text-align: center; background-color: ${bgColor}; color: ${textColor}; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="font-size: 3.5rem; margin-bottom: 20px; font-weight: 800; letter-spacing: -0.05em; line-height: 1.1;">Your Vision <br> <span style="color: #3b82f6;">Realized</span></h1>
        <p style="font-size: 1.25rem; opacity: 0.8; max-width: 600px; line-height: 1.6;">${prompt}</p>
        <div style="margin-top: 40px; display: flex; gap: 16px;">
            <button style="padding: 16px 32px; background: #3b82f6; color: white; border: none; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.5);">Get Started</button>
            <button style="padding: 16px 32px; background: transparent; color: inherit; border: 1px solid currentColor; border-radius: 12px; cursor: pointer; font-size: 1rem; font-weight: 600;">Learn More</button>
        </div>
      </div>
    `;
    
    setGeneratedCode(mockHtml);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[100px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-4xl flex flex-col items-center gap-8"
      >
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-blue-200 mb-4"
          >
            <Sparkles size={14} />
            <span>AI-Powered Website Builder</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 tracking-tight">
            Describe it. <br /> Build it.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Transform your ideas into reality with our intelligent engine. Just type what you want, and watch the magic happen.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A landing page for a coffee shop with a minimal dark theme..."
            className="w-full h-32 bg-transparent text-white placeholder:text-slate-500 p-4 outline-none resize-none text-lg"
          />
          <div className="flex justify-between items-center px-4 pb-2">
            <div className="text-xs text-slate-500">Press Enter to generate</div>
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Code2 size={18} />}
              <span>{loading ? "Dreaming..." : "Generate"}</span>
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {generatedCode && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full aspect-video bg-white rounded-xl overflow-hidden shadow-2xl border border-white/20 mt-8"
            >
              <div className="bg-slate-100 px-4 py-2 border-b flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
                 <div className="ml-4 text-xs text-slate-400 font-mono">preview.html</div>
              </div>
              <iframe
                srcDoc={generatedCode}
                className="w-full h-full border-none"
                title="Preview"
              />
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </main>
  );
}

