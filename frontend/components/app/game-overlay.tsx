'use client';

import React, { useEffect, useState } from 'react';
import { useVoiceAssistant } from '@livekit/components-react';

interface GameOverlayProps {
  messages: any[];
}

export function GameOverlay({ messages }: GameOverlayProps) {
  const { state: agentState } = useVoiceAssistant();
  const [turnCount, setTurnCount] = useState(0);

  useEffect(() => {
    // Count player messages as turns
    const playerMessages = messages.filter(m => m.from?.isLocal === true);
    setTurnCount(playerMessages.length);
  }, [messages]);

  const getStateText = () => {
    switch (agentState) {
      case 'speaking':
        return '🎙️ GM is narrating...';
      case 'listening':
        return '👂 Listening to your action...';
      case 'thinking':
        return '🤔 GM is thinking...';
      default:
        return '⏸️ Ready';
    }
  };

  const getStateColor = () => {
    switch (agentState) {
      case 'speaking':
        return 'bg-violet-600/20 border-violet-500/40 text-violet-300';
      case 'listening':
        return 'bg-green-600/20 border-green-500/40 text-green-300';
      case 'thinking':
        return 'bg-yellow-600/20 border-yellow-500/40 text-yellow-300';
      default:
        return 'bg-slate-600/20 border-slate-500/40 text-slate-300';
    }
  };

  return (
    <>
      {/* Top Bar - Status & Turn Counter */}
      <div className="fixed top-4 left-4 right-4 z-40 pointer-events-none">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {/* Left - Turn Counter */}
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-violet-500/30 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎲</span>
              <div>
                <div className="text-xs text-slate-400 font-semibold">Turn</div>
                <div className="text-lg font-black text-violet-300">
                  {turnCount} <span className="text-sm text-slate-500">/ 15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Status Indicator */}
          <div className={`bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border shadow-lg transition-all duration-300 ${getStateColor()}`}>
            <div className="flex items-center gap-2">
              <div className="text-sm font-bold whitespace-nowrap">
                {getStateText()}
              </div>
              {agentState === 'speaking' && (
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-current rounded-full animate-pulse"></div>
                  <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-4 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Left - Location */}
      <div className="fixed bottom-24 left-4 z-40 pointer-events-none md:bottom-32">
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-violet-500/30 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <div>
              <div className="text-xs text-slate-400 font-semibold">Location</div>
              <div className="text-sm font-bold text-violet-300">Hawkins Middle School</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
