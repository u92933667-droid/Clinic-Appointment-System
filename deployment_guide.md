# Deployment Guide

This guide will help you deploy your **Clinic Appointment System** online so your instructor can access it.

## Part 1: Backend Deployment (Render)

We will use **Render.com** because it is free and supports Python FastAPI.

### Steps:
1.  **Push Code to GitHub**:
    - Make sure your latest code is on GitHub.
    - If you haven't installed Git yet, you must download "Git for Windows" and run:
      ```bash
      git init
      git add .
      git commit -m "Final version"
      # (Then follow GitHub instructions to push to your repository)
      ```
2.  **Create Account**: Go to [render.com](https://render.com) and sign up with GitHub.
3.  **New Web Service**:
    - Click **"New"** -> **"Web Service"**.
    - Connect your GitHub repository.
4.  **Configure**:
    - **Name**: `clinic-backend` (or similar)
    - **Language**: `Python 3`
    - **Root Directory**: `.` (Leave as is)
    - **Build Command**: `pip install -r backend/requirements.txt`
    - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port 10000`
5.  **Deploy**: Click "Create Web Service".
6.  **Copy URL**: Once deployed, copy the URL (e.g., `https://clinic-backend.onrender.com`). You will need this for the Frontend.

---

## Part 2: Frontend Deployment (Vercel)

We will use **Vercel** for the React frontend.

### Steps:
1.  **Update URL**:
    - Open `frontend/src/App.jsx`.
    - Replace `http://localhost:8000` with your NEW Backend URL from Render (e.g., `https://clinic-backend.onrender.com`).
    - Commit and push this change to GitHub.
2.  **Create Account**: Go to [vercel.com](https://vercel.com) and sign up with GitHub.
3.  **New Project**:
    - Click **"Add New..."** -> **"Project"**.
    - Import your GitHub repository.
4.  **Configure**:
    - **Framework Preset**: `Vite` (It should detect this automatically).
    - **Root Directory**: Click "Edit" and select `frontend`.
5.  **Deploy**: Click "Deploy".
6.  **Done!**: Vercel will give you a live URL (e.g., `https://clinic-frontend.vercel.app`).

## Part 3: Live Test
1.  Open your Vercel URL.
2.  Try adding an appointment.
3.  If it works, congratulations! Your project is live.
