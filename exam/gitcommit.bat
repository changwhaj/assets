@echo off
setlocal enabledelayedexpansion

REM Get the current date in YYYYMMDD format
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /format:list') do set datetime=%%a
set "YYYY=!datetime:~0,4!"
set "MM=!datetime:~4,2!"
set "DD=!datetime:~6,2!"
set "today=!YYYY!!MM!!DD!"

REM Git commands
git add .
git commit -m "Exam Refresh on !today!"

endlocal