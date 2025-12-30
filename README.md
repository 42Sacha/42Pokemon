# ⚔️ Pokémon Battle Simulator - 42 Edition ⚔️

**Welcome, Hugo.**

You are walking pleasantly in the streets of **Brno**, Czech Republic, enjoying a *trdelník*. Suddenly, **Admin Elidjah** blocks your path! He suspects you of using AI to cheat on your exams. To prove your innocence and enter the **School 42 Piscine**, you must defeat him in a fully decentralized, blockchain-powered Pokémon Battle.

*Will you choose the ghostly Ectoplasma or the fiery Charizard?*

---

## 📋 Prerequisites

Before you start, make sure you have these installed:

1.  **Node.js** (for installing dependencies)
2.  **Deno** (to run the server and client) -> [Install Deno](https://docs.deno.com/runtime/getting_started/installation/)

---

## ⚡ Quick Start (Automatic Setup)

The easiest way to get started is to use the automated setup script.

1.  **Run the Setup Script**:
    ```bash
    cd pokemon-battle
    ./setup.sh
    ```
    *This script will automatically clone the server, install all dependencies (server & client), create the necessary directories, and generate your secure keys.*

2.  **Compile the Game**:
    *(Still in the `pokemon-battle` folder)*
    ```bash
    npm run prepack:asc
    ```

3.  **Start the Server**:
    Open a **NEW Terminal** window and run:
    ```bash
    cd bobine
    ~/.deno/bin/deno run -A --sloppy-imports ./src/mod.ts serve --env=../pokemon-battle/.env --port=8080
    ```

4.  **Deploy the Game**:
    Back in your **first terminal** (in `pokemon-battle`):
    ```bash
    ~/.deno/bin/deno run -A ./run/src/mods/produce/mod.ts ./out/mod.wasm
    ```
    🚨 **Copy the long address** that appears (e.g., `b2907...`). This is your **Contract Address**.

5.  **FIGHT!**:
    Run the client with your address:
    ```bash
    ~/.deno/bin/deno run -A client/game.ts <YOUR_ADDRESS>
    ```

---

## 🛠️ Manual Installation

If you prefer to set everything up manually, follow these steps strictly.

### 1. Setup the Server (`bobine`)
The server code is hosted separately. From the project root:
```bash
git clone https://github.com/hazae41/bobine
cd bobine
npm install
mkdir -p scripts
cd ..
```

### 2. Setup the Client (`pokemon-battle`)
```bash
cd pokemon-battle
npm install
```

### 3. Configuration (`.env`)
You must create a `.env` file in `pokemon-battle` with your keys and paths.
Generate random hex keys (64 characters) for the keys.

**File: `pokemon-battle/.env`**
```env
ED25519_PRIVATE_KEY_HEX=...your_random_private_key...
ED25519_PUBLIC_KEY_HEX=...your_random_public_key...
DATABASE_PATH=./db.sqlite
SCRIPTS_PATH=./scripts
```

**File: `pokemon-battle/.env.local`**
```env
SERVER=http://localhost:8080
```

Once configured, follow steps **2 to 5** from the "Quick Start" section above to play.

---

## 🥚 Secrets & Easter Eggs

-   **Abdou**: He was seen debugging near the park benches, but used *Teleport* when Elidjah appeared.
-   **Brice**: Rumor has it he awaits the victor at the Pokémon League.
-   **Loading Messages**: Pay attention to the loading screens, they might reveal what's happening on the blockchain (or if Snorlax is sleeping on the cables).

---

*"Start me up, if you dare."* - Admin Elidjah
