@echo off
REM Simple batch file to run the PowerShell reset script
powershell.exe -ExecutionPolicy Bypass -File "reset_database.ps1"
pause
