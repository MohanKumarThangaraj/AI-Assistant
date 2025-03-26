from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import whisper
import torch
from TTS.api import TTS

app = FastAPI()

# Load AI models
stt_model = whisper.load_model("base")
tts_model = TTS("tts_models/en/ljspeech/glow-tts").to("cpu")

class TextRequest(BaseModel):
    text: str

@app.post("/tts")
async def text_to_speech(request: TextRequest):
    tts_model.tts_to_file(text=request.text, file_path="output.wav")
    return {"message": "TTS Done!", "audio_file": "output.wav"}

@app.post("/stt")
async def speech_to_text(audio: UploadFile = File(...)):
    audio_path = f"temp_audio.wav"
    with open(audio_path, "wb") as f:
        f.write(audio.file.read())
    
    result = stt_model.transcribe(audio_path)
    return {"text": result["text"]}

@app.get("/")
async def root():
    return {"message": "Chi-Chi Backend Running"}
