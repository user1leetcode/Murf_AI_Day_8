import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
    >
      <path
        d="M32 4L8 16V32L32 60L56 32V16L32 4Z"
        stroke="#8b5cf6"
        strokeWidth="3"
        fill="rgba(139, 92, 246, 0.1)"
        strokeLinejoin="round"
      />
      <path
        d="M32 4V60M8 16L32 32L56 16M8 32L32 32L56 32"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="38"
        fontSize="20"
        fontWeight="bold"
        textAnchor="middle"
        fill="#a78bfa"
        style={{ fontFamily: 'serif' }}
      >
        20
      </text>
    </svg>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Simple background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950"></div>

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8">
        <div className="w-full max-w-5xl space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-3">
              <WelcomeImage />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
              VOICE GAME MASTER
            </h1>
            
            <p className="text-lg text-violet-300 font-semibold">
              🎮 Your AI Dungeon Master for D&D Adventures
            </p>
          </div>

          {/* Main Content - Two Columns */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Story */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/30">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-lg">
                    <span className="text-red-400 text-xs font-bold">⚠ CLASSIFIED</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-black text-violet-300 mb-1">
                    Hawkins, Indiana
                  </h2>
                  <p className="text-violet-400 font-semibold">November 1983</p>
                </div>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  Strange things at Hawkins Middle School. Something from the <span className="text-red-400 font-bold">Upside Down</span> is breaking through.
                </p>
                
                <div className="pt-3 border-t border-violet-500/20">
                  <p className="text-violet-300 text-sm font-semibold flex items-center gap-2">
                    <span>🎙️</span>
                    Use your voice to explore and survive
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - How to Play */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-500/30">
              <h3 className="text-lg font-bold text-white mb-4">How to Play</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                    <span className="text-sm font-bold text-violet-300">1</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Click Begin Adventure</p>
                    <p className="text-slate-400 text-xs">Allow microphone access</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                    <span className="text-sm font-bold text-violet-300">2</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Listen to the GM</p>
                    <p className="text-slate-400 text-xs">Hear the scene description</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                    <span className="text-sm font-bold text-violet-300">3</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Speak Your Action</p>
                    <p className="text-slate-400 text-xs">Say what you want to do</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-2">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={onStartCall} 
              className="px-12 py-4 text-xl font-bold bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/30 transform hover:scale-105 transition-all duration-200"
            >
              🎲 {startButtonText}
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-violet-500/20 text-center">
              <div className="text-3xl mb-1">🎭</div>
              <div className="text-violet-300 text-xs font-bold">Interactive</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-violet-500/20 text-center">
              <div className="text-3xl mb-1">🧠</div>
              <div className="text-violet-300 text-xs font-bold">AI Memory</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-violet-500/20 text-center">
              <div className="text-3xl mb-1">⚡</div>
              <div className="text-violet-300 text-xs font-bold">Real-time</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-violet-500/20 text-center">
              <div className="text-3xl mb-1">🎬</div>
              <div className="text-violet-300 text-xs font-bold">ST Theme</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
