# Voice Game Master - Frontend (Next.js + React)

> 🎲 **DAY 8 of the Murf AI Voice Agents Challenge**
>
> This frontend provides the user interface for the Voice Game Master - featuring a custom welcome page, 
> real-time conversation UI with turn counter, location display, and status indicators.
> See the [main README](../README.md) for complete project details.

## 🎮 What This Provides

This frontend delivers a complete D&D Game Master experience with:

### Welcome Page (`welcome-view.tsx`)
- **Clean Two-Column Layout** - Story on left, instructions on right
- **Violet Theme** - Professional color scheme matching the game aesthetic
- **D20 Dice Icon** - Animated floating dice
- **Story Teaser** - Hawkins, Indiana 1983 setting
- **How to Play** - Clear 3-step instructions
- **Feature Cards** - Interactive, AI Memory, Real-time, ST Theme

### Conversation Page (`session-view.tsx` + `game-overlay.tsx`)
- **Turn Counter** - Tracks progress (0/15 turns) with dice icon
- **Location Display** - Shows "Hawkins Middle School" with pin icon
- **Status Indicator** - Real-time agent status:
  - 🎙️ GM is narrating... (violet)
  - 👂 Listening to your action... (green)
  - 🤔 GM is thinking... (yellow)
  - ⏸️ Ready (gray)
- **Animated Visualizer** - Pulse bars when GM speaks
- **Chat Transcript** - Full conversation history
- **Control Bar** - Microphone, chat, end call controls

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (Framer Motion)
- **Voice SDK**: LiveKit Components React
- **Icons**: Phosphor Icons

## ✨ Key Features

- **Responsive Design** - Works on desktop and mobile
- **Real-time Updates** - Turn counter and status update live
- **Voice-First** - Optimized for voice interaction
- **Professional UI** - Competition-ready design
- **No Scrolling** - Everything fits on one screen

### Project structure

```
agent-starter-react/
├── app/
│   ├── (app)/
│   ├── api/
│   ├── components/
│   ├── fonts/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── livekit/
│   ├── ui/
│   ├── app.tsx
│   ├── session-view.tsx
│   └── welcome.tsx
├── hooks/
├── lib/
├── public/
└── package.json
```

## Getting started

> [!TIP]
> If you'd like to try this application without modification, you can deploy an instance in just a few clicks with [LiveKit Cloud Sandbox](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react).

[![Open on LiveKit](https://img.shields.io/badge/Open%20on%20LiveKit%20Cloud-002CF2?style=for-the-badge&logo=external-link)](https://cloud.livekit.io/projects/p_/sandbox/templates/agent-starter-react)

Run the following command to automatically clone this template.

```bash
lk app create --template agent-starter-react
```

Then run the app with:

```bash
pnpm install
pnpm dev
```

And open http://localhost:3000 in your browser.

You'll also need an agent to speak with. Try our starter agent for [Python](https://github.com/livekit-examples/agent-starter-python), [Node.js](https://github.com/livekit-examples/agent-starter-node), or [create your own from scratch](https://docs.livekit.io/agents/start/voice-ai/).

## Configuration

This starter is designed to be flexible so you can adapt it to your specific agent use case. You can easily configure it to work with different types of inputs and outputs:

#### Example: App configuration (`app-config.ts`)

```ts
export const APP_CONFIG_DEFAULTS: AppConfig = {
  companyName: 'LiveKit',
  pageTitle: 'LiveKit Voice Agent',
  pageDescription: 'A voice agent built with LiveKit',

  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,

  logo: '/lk-logo.svg',
  accent: '#002cf2',
  logoDark: '/lk-logo-dark.svg',
  accentDark: '#1fd5f9',
  startButtonText: 'Start call',

  // for LiveKit Cloud Sandbox
  sandboxId: undefined,
  agentName: undefined,
};
```

You can update these values in [`app-config.ts`](./app-config.ts) to customize branding, features, and UI text for your deployment.

> [!NOTE]
> The `sandboxId` and `agentName` are for the LiveKit Cloud Sandbox environment.
> They are not used for local development.

#### Environment Variables

You'll also need to configure your LiveKit credentials in `.env.local` (copy `.env.example` if you don't have one):

```env
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=https://your-livekit-server-url
```

These are required for the voice agent functionality to work with your LiveKit project.

## Contributing

This template is open source and we welcome contributions! Please open a PR or issue through GitHub, and don't forget to join us in the [LiveKit Community Slack](https://livekit.io/join-slack)!
