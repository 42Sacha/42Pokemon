# ⚔️ Pokémon Battle Simulator - 42 Edition ⚔️

Welcome to the **Ultimate Anti-Cheat Test**!

You are **Hugo**, a student peacefully walking in the streets of **Brno**, Czech Republic. You were looking for your friend **Brice** at the Pokémon League, but suddenly... **Admin Elidjah** blocks your way!

He suspects you of using AI to code your exam. To prove your worth and regain access to the **School 42 Piscine**, you must defeat him in a blockchain-powered Pokémon Battle!

---

## 🚀 Prerequisite

1.  **Node.js** (for npm)
2.  **Deno** (for the server and client) -> [Install Deno](https://deno.land/#installation)

---

## ⚡ Quick Start

1.  **Run the Setup Script** (installs everything, invokes Bobine, generates keys):
    ```bash
    ./setup.sh
    ```

2.  **Compile the Game**:
    ```bash
    npm run prepack:asc
    ```

3.  **Start the Server** (Open a **NEW Terminal** window):
    ```bash
    cd ../bobine
    ~/.deno/bin/deno run -A --sloppy-imports ./src/mod.ts serve --env=../pokemon-battle/.env --port=8080
    ```

4.  **Deploy**:
    ```bash
    # Back in your first terminal
    ~/.deno/bin/deno run -A ./run/src/mods/produce/mod.ts ./out/mod.wasm
    ```

5.  **FIGHT!**:
    ```bash
    ~/.deno/bin/deno run -A client/game.ts <YOUR_ADDRESS_FROM_STEP_4>
    ```

---

## 🏗️ Step 2: Compilation

We need to compile the game logic into WebAssembly (the "brain" of the game that runs on the blockchain).

Run this command:

```bash
npm run prepack:asc
```

*If successful, a new folder `out` will appear containing `mod.wasm`.*

---

## 🔌 Step 3: Start the Server (The Blockchain)

You need the **Bobine** server running to host the battle.

1.  Open a **NEW Terminal window**.
2.  Navigate to the `bobine` folder (it should be next to this one).
3.  Run the server:

```bash
cd ../bobine
~/.deno/bin/deno run -A --sloppy-imports ./src/mod.ts serve --env=../pokemon-battle/.env --port=8080
```

*Keep this terminal OPEN. If you close it, the server stops!*

---

## 🚀 Step 4: Deploy the Contract

Now, let's send your game code to the server.

Back in your **first terminal** (the `pokemon-battle` one), run:

```bash
~/.deno/bin/deno run -A ./run/src/mods/produce/mod.ts ./out/mod.wasm
```

**Copy the long code** that appears (e.g., `b2907...`). This is your **Contract Address**.

---

## 🎮 Step 5: FIGHT!

It's time to face Admin Elidjah. Make sure your terminal window is **MAXIMIZED** for the best experience.

Run this command (replace `<YOUR_ADDRESS>` with the code you just copied):

```bash
~/.deno/bin/deno run -A client/game.ts <YOUR_ADDRESS>
```

**Example:**
`~/.deno/bin/deno run -A client/game.ts b290718de64e6dce0f340d2b9acb8037bff9cebced0d09398e38e04df6398af7`

---

## 🥚 Easter Eggs & Secrets

-   **RTFM**: Elidjah hates it when you don't read the manual.
-   **Abdou**: He was seen debugging on a bench nearby, but he used *Teleport*.
-   **Brice**: He is waiting for you at the League... if you survive this test.
-   **Snorlax**: Sometimes the network is slow... maybe Snorlax is blocking the blockchain?

---

*"Start me up, if you dare."* - Admin Elidjah
