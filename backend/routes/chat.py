from fastapi import APIRouter, Depends
from pydantic import BaseModel
from backend.memory.memory_manager import MemoryManager

router = APIRouter()
memory_manager = MemoryManager()

class ChatRequest(BaseModel):
    user_id: str
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    """Handle chat request with memory support."""
    
    # Get conversation history
    history = memory_manager.get_recent_messages(request.user_id)

    # Append new message to history
    history.append(request.message)

    # Create AI response (For now, just echo the last message)
    response = f"Chi-Chi remembers: {', '.join(history)}"

    # Store message in memory
    memory_manager.store_message(request.user_id, request.message)

    return {"response": response}
