#!/bin/bash

# Solana Key Converter Installation Script

set -e

echo "Installing Solana Key Converter (skc)..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is required but not installed."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Install globally
echo "Installing skc globally..."
npm install -g .

echo "✅ Installation complete!"
echo ""
echo "Usage:"
echo "  skc '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64]'"
echo "  skc 'base58-encoded-key'"
echo "  skc filename.txt"
echo "  skc --help"