# DAY 8: Voice Game Master - D&D Adventure 🎲

[![Murf AI](https://img.shields.io/badge/Powered%20by-Murf%20Falcon%20TTS-8b2e8f?style=for-the-badge)](https://murf.ai)
[![LiveKit](https://img.shields.io/badge/Built%20with-LiveKit%20Agents-blue?style=for-the-badge)](https://livekit.io)
[![Challenge](https://img.shields.io/badge/Challenge-Day%208%2F10-success?style=for-the-badge)](https://github.com/Gangadhar-NG-CODER)

> **Part of the Murf AI Voice Agents Challenge** - Building 10 AI Voice Agents in 10 Days

## 🎮 About This Project

An interactive voice-powered **Game Master** that runs a D&D-style adventure set in the Stranger Things universe (Hawkins, Indiana, 1983). The AI acts as your Dungeon Master, narrating scenes, responding to your choices, and guiding you through a supernatural mystery.

### The Story: "The Upside Down Mystery"

You find yourself at Hawkins Middle School late at night. Strange noises echo from the basement. Flickering lights. Cold air. Something is wrong. What do you do?

## ✨ Features

- 🎙️ **Voice-First Gameplay** - Speak your actions, the GM responds
- 🧠 **Contextual Memory** - GM remembers all your previous choices
- 📖 **Dynamic Storytelling** - Story adapts based on your decisions
- 🎭 **Immersive Narration** - Vivid scene descriptions with suspenseful atmosphere
- ⚡ **Ultra-Fast TTS** - Powered by Murf Falcon (fastest TTS API)
- 🌙 **Stranger Things Theme** - 1980s Hawkins with supernatural elements

## 🎯 Challenge Requirements Met

✅ Clear Game Master persona with defined universe (Stranger Things/1983)  
✅ Interactive voice-driven story with scene descriptions  
✅ GM always prompts "What do you do?" after each turn  
✅ Maintains continuity using chat history  
✅ 8-15 turn adventure arc with beginning, middle, and end  
✅ Custom UI with Game Master branding

## 🏗️ Tech Stack

- **TTS**: Murf Falcon (fastest TTS API in the world)
- **STT**: AssemblyAI
- **LLM**: Google Gemini 2.5 Flash
- **Framework**: LiveKit Agents (Python)
- **Frontend**: Next.js 15 + React 19
- **Backend**: Python 3.12 with uv package manager

## 🎮 New Features

### Conversation Page Enhancements:
- **Turn Counter** - Tracks progress (0/15 turns)
- **Location Display** - Shows current location (Hawkins Middle School)
- **Status Indicator** - Real-time agent status (Speaking/Listening/Thinking)
- **Animated Visualizer** - Audio bars when GM is speaking
- **Auto-Start** - GM automatically greets you with the opening scene

## 📁 Project Structure

```
DAY8/
├── backend/
│   ├── src/
│   │   └── agent.py          # Game Master agent with auto-greeting
│   ├── .env.local            # API keys
│   └── pyproject.toml        # Python dependencies
├── frontend/
│   ├── app/                  # Next.js app
│   ├── components/
│   │   ├── app/
│   │   │   ├── welcome-view.tsx      # Landing page
│   │   │   ├── session-view.tsx      # Conversation page
│   │   │   └── game-overlay.tsx      # Turn counter & status
│   │   └── livekit/          # LiveKit components
│   ├── app-config.ts         # Branding configuration
│   └── package.json
├── livekit_1.9.4_windows_amd64/  # LiveKit server
└── README.md
│   ├── .env.local            # API keys
│   └── pyproject.toml        # Python dependencies
├── frontend/
│   ├── app/                  # Next.js app
│   ├── components/
│   │   └── app/
│   │       └── welcome-view.tsx  # Game Master themed UI
│   ├── app-config.ts         # Branding configuration
│   └── package.json
└── README.md
```

## 🎲 How It Works

### The Game Master System

The agent uses a carefully crafted system prompt that defines:

1. **Universe**: Hawkins, Indiana, 1983 (Stranger Things inspired)
2. **Tone**: Suspenseful, mysterious, nostalgic 80s atmosphere
3. **Role**: Narrate scenes, respond to player actions, maintain continuity
4. **Rules**: 
   - Keep responses concise (2-4 sentences)
   - Always end with "What do you do?"
   - Remember all previous player choices
   - Create consequences for actions

### Story Arc

**Act 1 - Discovery (Turns 1-3)**
- Player at Hawkins Middle School at night
- Strange noises from basement
- Initial exploration

**Act 2 - Investigation (Turns 4-8)**
- Find clues (flickering lights, cold air, slime)
- Tension builds
- Supernatural elements emerge

**Act 3 - Encounter (Turns 9-12)**
- Face the threat from the Upside Down
- Critical decision point
- Player choices matter

**Act 4 - Resolution (Turns 13-15)**
- Consequences of player's actions
- Story conclusion
- Mini-arc wraps up

## 🚀 Quick Start

### Prerequisites

- Python 3.12+ with [uv](https://docs.astral.sh/uv/) package manager
- Node.js 18+ with pnpm
- LiveKit Server (included in project)

### Setup & Run

**1. Backend Setup**

```bash
cd DAY8/backend

# Install dependencies
uv sync

# Download required models
uv run python src/agent.py download-files
```

**2. Frontend Setup**

```bash
cd DAY8/frontend

# Install dependencies
pnpm install
```

**3. Run All Services**

Open 3 terminals:

```bash
# Terminal 1 - LiveKit Server (Windows)
cd DAY8/livekit_1.9.4_windows_amd64
.\livekit-server.exe --dev

# Terminal 2 - Backend Agent
cd DAY8/backend
uv run python src/agent.py dev

# Terminal 3 - Frontend
cd DAY8/frontend
pnpm dev
```

**4. Play the Game**

1. Open http://localhost:3000 in your browser
2. Click "🎲 Begin Adventure"
3. **Wait** - The GM will automatically start speaking the opening scene
4. Speak your actions when prompted with "What do you do?"

## 🎮 How to Play

1. Click "Begin Adventure"
2. Allow microphone access
3. Listen to the Game Master describe the scene
4. Speak your action (e.g., "I go down to the basement")
5. The GM responds and asks "What do you do?"
6. Continue the adventure for 10-15 turns
7. Reach the conclusion of the mystery

**Tips:**
- Be creative with your actions
- The GM remembers everything you've done
- Your choices have consequences
- Speak naturally - it's a conversation

## 🎬 Demo Video

[🎥 Watch the Demo](#) *(Coming Soon)*

See the Voice Game Master in action as we explore the mystery at Hawkins Middle School!

### Demo Highlights:
- Auto-greeting with opening scene
- Turn counter tracking progress
- Real-time status indicators
- Voice-driven gameplay
- GM remembering all choices
- Complete 12-turn adventure

## 📝 What I Learned

- Crafting effective system prompts for narrative agents
- Maintaining story continuity through chat history
- Balancing conciseness with immersion in voice interactions
- Creating engaging D&D-style experiences with AI
- Integrating Murf Falcon TTS for natural-sounding narration

## 🔗 Links

- **GitHub**: [Gangadhar-NG-CODER](https://github.com/Gangadhar-NG-CODER)
- **LinkedIn Post**: [Coming Soon]
- **Challenge**: [Murf AI Voice Agents Challenge](https://murf.ai)

## 🏆 Challenge Progress

- ✅ DAY 4: Teach-the-Tutor Active Recall Coach
- ✅ DAY 6: ICICI Bank Fraud Alert Agent
- ✅ DAY 7: Zepto Voice Shopping Agent
- ✅ **DAY 8: Voice Game Master (D&D Adventure)** ← You are here
- ⏳ DAY 9: Coming soon...
- ⏳ DAY 10: Coming soon...

## 📚 Resources

- [Murf Falcon TTS](https://murf.ai/api/docs/text-to-speech/streaming)
- [LiveKit Agents](https://docs.livekit.io/agents)
- [AssemblyAI STT](https://www.assemblyai.com/)
- [Google Gemini](https://ai.google.dev/)

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for the Murf AI Voice Agents Challenge**

*#MurfAIVoiceAgentsChallenge #10DaysofAIVoiceAgents*
