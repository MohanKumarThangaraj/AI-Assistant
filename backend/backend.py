from fastapi import FastAPI
from pydantic import BaseModel
from textblob import TextBlob

app = FastAPI()

class InputText(BaseModel):
    text: str

@app.post("/analyze_sentiment/")
async def analyze_sentiment(input_text: InputText):
    analysis = TextBlob(input_text.text)
    polarity = analysis.sentiment.polarity

    if polarity > 0.2:
        emotion = "happy"
    elif polarity < -0.2:
        emotion = "sad"
    else:
        emotion = "neutral"

    return {"emotion": emotion, "polarity": polarity}
