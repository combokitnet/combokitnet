#!/bin/bash

# ./git_push.sh --skip-build "update"

# Check for --skip-build flag
SKIP_BUILD=false
for arg in "$@"; do
  if [ "$arg" == "--skip-build" ]; then
    SKIP_BUILD=true
    break
  fi
done

# Run build check unless --skip-build is passed
if [ "$SKIP_BUILD" = false ]; then
  echo "Running build check..."
  npm run build
  if [ $? -ne 0 ]; then
    echo "Build failed. Aborting commit."
    exit 1
  fi
else
  echo "Skipping build check..."
fi

# Determine commit message
if [ -z "$1" ] || [ "$1" == "--skip-build" ]; then
  COMMIT_MESSAGE="Changes: $(git status -s | awk '{print $2}' | tr '\n' ' ')"
else
  COMMIT_MESSAGE=$1
fi

# Get the current branch name
BRANCH="$(git branch --show-current)"

# Stage all changes
git add .

# Commit changes with branch name and message
git commit -m "[$BRANCH] $COMMIT_MESSAGE"

# Push changes to the repository
git push
