#!/bin/sh
# Commit package.json changes if git is available
if [ ! -d .git ]; then
  echo "Git repository not found. Initializing new git repo..."
  git init || exit 1
fi

git add package.json || exit 1
git commit -m "fix(package): make scripts Windows-friendly; add cpy-cli and rimraf" || exit 1
echo "Commit successful."
