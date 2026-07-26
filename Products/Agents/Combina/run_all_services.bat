@echo off
echo Starting all services...

@REM start "frontend" cmd /k call "%~dp0interface\run_front.bat"
start "auth_service" cmd /k call "%~dp0services\auth\run_auth.bat"
@REM start "agent_service" cmd /k call "%~dp0services\agent\run_agent.bat"
@REM start "record_service" cmd /k call "%~dp0services\record\run_rec.bat"
