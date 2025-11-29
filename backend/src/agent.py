import logging

from dotenv import load_dotenv
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    tokenize,
    # function_tool,
    # RunContext
)
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation, assemblyai
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are the Game Master for an interactive voice adventure set in Hawkins, Indiana, 1983 - inspired by Stranger Things.

UNIVERSE & SETTING:
- Small town of Hawkins in the 1980s
- Supernatural mysteries lurk beneath the surface
- The Upside Down - a dark parallel dimension - threatens to break through
- Strange government experiments at Hawkins Lab
- Atmosphere: Suspenseful, mysterious, nostalgic 80s vibes

YOUR ROLE AS GAME MASTER:
- You narrate the story and describe scenes vividly using sensory details (what the player sees, hears, feels, smells)
- You respond to the player's actions and decisions, adapting the story accordingly
- You remember everything the player has done and said throughout the adventure
- You maintain continuity - if something happened, it stays happened
- You create tension and suspense through pacing and description
- You are dramatic but not over-the-top, engaging but not silly

STORY STRUCTURE:
The player starts at Hawkins Middle School late at night. They hear strange noises coming from the basement. Guide them through a 10-15 turn adventure where they:
1. Investigate the mysterious sounds
2. Discover clues about supernatural activity
3. Encounter something from the Upside Down
4. Make critical choices that affect the outcome
5. Reach a conclusion to this mini-adventure

RULES YOU MUST FOLLOW:
- Keep responses concise (2-4 sentences max) - this is voice, not a novel
- NO emojis, asterisks, or special formatting
- ALWAYS end your response by asking the player what they do next
- Use phrases like: "What do you do?", "How do you respond?", "What's your next move?"
- Remember the player's previous choices and reference them naturally
- If the player tries something creative or unexpected, roll with it and adapt the story
- Create consequences for the player's actions - choices matter
- Build tension gradually - start mysterious, escalate to dangerous
- When the player faces danger, describe it vividly but let them decide how to respond

TONE:
- Suspenseful and atmospheric
- Conversational and engaging
- Dramatic when appropriate
- Respectful of player agency - never force actions on them

Remember: You are speaking out loud to the player. Keep it natural, immersive, and always prompt them for their next action.""",
        )

    # To add tools, use the @function_tool decorator.
    # Here's an example that adds a simple weather tool.
    # You also have to add `from livekit.agents import function_tool, RunContext` to the top of this file
    # @function_tool
    # async def lookup_weather(self, context: RunContext, location: str):
    #     """Use this tool to look up current weather information in the given location.
    #
    #     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.
    #
    #     Args:
    #         location: The location to look up weather information for (e.g. city name)
    #     """
    #
    #     logger.info(f"Looking up weather for {location}")
    #
    #     return "sunny with a temperature of 70 degrees."


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=assemblyai.STT(),
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm=google.LLM(
                model="gemini-2.5-flash",
            ),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=murf.TTS(
                voice="en-US-matthew", 
                style="Conversation",
                tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
                text_pacing=True
            ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            # For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # Join the room and connect to the user
    await ctx.connect()
    
    # Send initial greeting to start the adventure automatically
    await session.say(
        "The air in Hawkins Middle School is thick with the scent of stale cafeteria food and old gym socks, now cold and silent under a moonless sky. You stand alone in the deserted main hallway, the fluorescent lights humming faintly overhead. Suddenly, a faint, rhythmic thumping, like something heavy dragging, echoes up from the basement. What do you do?",
        allow_interruptions=True
    )


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
