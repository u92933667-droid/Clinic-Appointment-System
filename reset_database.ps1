# Reset Database Script for Clinic Appointment System
# This script will delete the old database and restart the backend server

Write-Host "🔄 Starting Database Reset Process..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Find and stop the uvicorn process
Write-Host "⏹️  Stopping backend server..." -ForegroundColor Yellow
$uvicornProcess = Get-Process -Name "python" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*uvicorn*"
}

if ($uvicornProcess) {
    Stop-Process -Id $uvicornProcess.Id -Force
    Write-Host "✅ Backend server stopped" -ForegroundColor Green
    Start-Sleep -Seconds 2
} else {
    Write-Host "ℹ️  No running backend server found" -ForegroundColor Gray
}

# Step 2: Delete the database file
Write-Host ""
Write-Host "🗑️  Deleting old database..." -ForegroundColor Yellow
if (Test-Path "clinic.db") {
    Remove-Item "clinic.db" -Force
    Write-Host "✅ Old database deleted" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Database file not found (already deleted)" -ForegroundColor Gray
}

# Step 3: Restart the backend server
Write-Host ""
Write-Host "🚀 Starting backend server with new data..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Expected output: 'Database populated with 10 patients, 8 doctors, and 10 appointments!'" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting server..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server when you're done" -ForegroundColor Gray
Write-Host ""

# Start the backend server
uvicorn backend.main:app --reload
