@echo off
REM Commit package.json changes if git is available
if not exist .git (
  echo Git repository not found. Initializing new git repo...
  git init || goto no_git
)
git add package.json || goto no_git
git commit -m "fix(package): make scripts Windows-friendly; add cpy-cli and rimraf" || goto no_git
echo Commit successful.
goto end
:no_git
echo Git is not installed or not available on PATH.
echo Please install Git and rerun this script.
:end
