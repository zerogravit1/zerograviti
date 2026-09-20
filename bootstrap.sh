#!/usr/bin/env bash

set -euo pipefail

NODE_MAJOR=26

echo "Checking Node.js..."
CURRENT_NODE_MAJOR="$(node --version | sed 's/^v//' | cut -d. -f1)"

if [[ "$CURRENT_NODE_MAJOR" != "$NODE_MAJOR" ]]; then
  echo "Expected Node $NODE_MAJOR, found $(node --version)"
  exit 1
fi

echo "Initializing npm workspace..."
npm init -y

npm pkg set private=true
npm pkg set engines.node=">=26 <27"

npm pkg set 'workspaces[0]=apps/*'
npm pkg set 'workspaces[1]=packages/*'

echo "Creating React application..."
npm create vite@latest apps/web -- \
  --template react-ts \
  --no-interactive \
  --eslint \
  --no-immediate

echo "Installing root development tooling..."
npm install --save-dev \
  eslint \
  prettier \
  vitest \
  typescript

echo "Adding workspace scripts..."
npm pkg set scripts.lint="npm run lint --workspaces --if-present"
npm pkg set scripts.typecheck="npm run typecheck --workspaces --if-present"
npm pkg set scripts.test="npm run test --workspaces --if-present"
npm pkg set scripts.build="npm run build --workspaces --if-present"

echo "Installing dependencies..."
npm install

echo "Bootstrap complete."
