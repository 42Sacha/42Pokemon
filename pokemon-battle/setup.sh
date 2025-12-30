#!/bin/bash

echo "🎮 Setting up Pokémon Battle Simulator - 42 Edition..."

# 1. Setup Bobine Server
if [ ! -d "../bobine" ]; then
    echo "📦 Cloning Bobine Server..."
    cd ..
    git clone https://github.com/hazae41/bobine
    cd bobine
    echo "📦 Installing server dependencies..."
    npm install
    cd ../pokemon-battle
else
    echo "✅ Bobine Server already exists."
fi

# 2. Setup Environment Variables
if [ ! -f ".env" ]; then
    echo "🔑 Generating new secure keys..."
    
    # Generate random hex keys using openssl
    PRIVATE_KEY=$(openssl rand -hex 32)
    PUBLIC_KEY=$(openssl rand -hex 32) # In a real scenario, this should be derived from private key, but for a local simulation random is fine for the ID
    
    echo "ED25519_PRIVATE_KEY_HEX=$PRIVATE_KEY" > .env
    echo "ED25519_PUBLIC_KEY_HEX=$PUBLIC_KEY" >> .env
    echo "DATABASE_PATH=./db.sqlite" >> .env
    
    echo "SERVER=http://localhost:8080" > .env.local
    
    echo "✅ Created .env and .env.local with fresh credentials."
else
    echo "✅ Environment files already exist."
fi

# 3. Install Project Dependencies
echo "📦 Installing project dependencies..."
npm install

echo "🎉 Setup Complete!"
echo "------------------------------------------------------"
echo "You can now follow the README instructions:"
echo "1. Open a terminal in ../bobine and start the server."
echo "2. Run 'npm run prepack:asc' here."
echo "3. Deploy and Play!"
echo "------------------------------------------------------"
