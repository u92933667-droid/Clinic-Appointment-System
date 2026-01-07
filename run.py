from backend.main import app
import uvicorn
import os

if __name__ == "__main__":
    # Get port from environment or default to 10000 for Render
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
