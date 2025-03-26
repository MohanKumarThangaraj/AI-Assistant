import uvicorn
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import chat
from faster_whisper import WhisperModel
import os
import pyttsx3
import tempfile

app = FastAPI(
    title="Chi-Chi AI",
    description="A personal AI assistant backend powered by FastAPI.",
    version="1.0.0"
)

# CORS Middleware to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for now (change in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include chat routes
app.include_router(chat.router, prefix="/api", tags=["Chat"])

# Initialize TTS Engine
tts_engine = pyttsx3.init()
tts_engine.setProperty("rate", 150)  # Adjust speech rate
tts_engine.setProperty("volume", 1.0)  # Full volume

# Load Whisper model for STT
whisper_model = WhisperModel("base")

@app.get("/")
def home():
    return {"message": "FastAPI backend is working!"}
def root():
    """Root endpoint to check if the server is running."""
    return {"message": "Chi-Chi AI Backend is running!"}

@app.post("/api/tts/")
async def text_to_speech(text: str):
    """Convert text to speech and return an audio file."""
    try:
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        tts_engine.save_to_file(text, temp_file.name)
        tts_engine.runAndWait()
        return {"audio_file": temp_file.name}
    except Exception as e:
        return {"error": str(e)}

@app.post("/api/stt/")
async def speech_to_text(file: UploadFile = File(...)):
    """Convert speech to text using OpenAI's Whisper model."""
    try:
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".wav")
        with open(temp_file.name, "wb") as f:
            f.write(file.file.read())

        # Transcribe audio
        result = whisper_model.transcribe(temp_file.name)
        os.remove(temp_file.name)  # Clean up file after processing

        return {"text": result["text"]}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
