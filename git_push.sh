#!/bin/bash

if [ -z "$1" ]; then
  COMMIT_MESSAGE="Changes: $(git status -s | awk '{print $2}' | tr '\n' ' ')"
else
  COMMIT_MESSAGE=$1
fi

BRANCH="$(git branch --show-current)"

git add .
git commit -m "[$BRANCH] $COMMIT_MESSAGE"
git push
