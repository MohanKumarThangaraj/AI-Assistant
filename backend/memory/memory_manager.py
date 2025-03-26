import sqlite3
from datetime import datetime

class MemoryManager:
    def __init__(self, db_path="database.db"):
        self.db_path = db_path
        self._create_table()

    def _create_table(self):
        """Create a table for storing chat history."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS chat_memory (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id TEXT,
                    message TEXT,
                    timestamp TEXT
                )
            ''')
            conn.commit()

    def store_message(self, user_id, message):
        """Store user message in database."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO chat_memory (user_id, message, timestamp) 
                VALUES (?, ?, ?)
            ''', (user_id, message, datetime.utcnow().isoformat()))
            conn.commit()

    def get_recent_messages(self, user_id, limit=5):
        """Retrieve the last few messages of the user."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT message FROM chat_memory 
                WHERE user_id = ? 
                ORDER BY timestamp DESC 
                LIMIT ?
            ''', (user_id, limit))
            return [row[0] for row in cursor.fetchall()]

    def clear_memory(self, user_id):
        """Clear chat history for a user."""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM chat_memory WHERE user_id = ?', (user_id,))
            conn.commit()
