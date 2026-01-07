# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file into the container at /app
COPY backend/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Create the database if it doesn't exist (triggers startup event in main.py)
# We don't need to do anything special here as FastAPI startup handles it.

# Make port 7860 available to the world (Hugging Face default)
EXPOSE 7860

# Run uvicorn when the container launches
# Note: we use 0.0.0.0 and port 7860 for Hugging Face
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
