import { Readable, Writable } from "@hazae41/binary";
import process from "node:process";
import { generate } from "../run/src/libs/effort/mod.ts";
import { Packable, Packed } from "../run/src/libs/packed/mod.ts";
import {
    clearScreen,
    displayTitle,
    displayBattle,
    displayAttackMenu,
    displayCommentary,
    displayAttackResult,
    displayWinner,
    prompt,
    sleep
} from "./display.ts";

process.loadEnvFile(".env.local")
process.loadEnvFile(".env")

type Proof = [Array<string>, Array<[string, Uint8Array, Uint8Array]>, Array<[string, Uint8Array, Uint8Array]>, Packable, bigint]

async function executeFunction(module: string, method: string, params: Array<Packable>): Promise<Packable> {
    const body = new FormData()

    body.append("module", module)
    body.append("method", method)
    body.append("params", new Blob([Writable.writeToBytesOrThrow(new Packed(params))]))
    body.append("effort", new Blob([await generate(10n ** 6n)]))

    try {
        const response = await fetch(new URL("/api/execute", process.env.SERVER), { method: "POST", body });

        if (!response.ok) {
            const text = await response.text()
            console.error(text)
            throw new Error("API Request Failed: " + text)
        }

        const [logs, reads, writes, returned, sparks] = Readable.readFromBytesOrThrow(Packed, await response.bytes()) as Proof

        return returned
    } catch (e) {
        console.error("Execution error:", e)
        throw e
    }
}

async function parseBattleState(stateStr: string) {
    const parts = stateStr.split("|");
    const state: any = {};
    for (const part of parts) {
        const [key, val] = part.split(":");
        if (key === "ectoplasmaHP" || key === "charizardHP" || key === "turnCount") {
            state[key] = parseInt(val);
        } else if (key === "isFinished") {
            state[key] = val === "true";
        } else {
            state[key] = val;
        }
    }
    return state;
}

async function parseAttackResult(resultStr: string) {
    const parts = resultStr.split("|");
    const result: any = {};
    for (const part of parts) {
        const colonIndex = part.indexOf(":");
        const key = part.slice(0, colonIndex);
        const val = part.slice(colonIndex + 1);

        if (key === "damage" || key === "ectoplasmaHP" || key === "charizardHP") {
            result[key] = parseInt(val);
        } else if (key === "finished") {
            result[key] = val === "true";
        } else {
            result[key] = val;
        }
    }
    return result;
}

const LOADING_MESSAGES = [
    "Searching for HM01 Cut in the bag...",
    "Waiting for Snorlax to wake up...",
    "Cleaning the Pokéballs...",
    "Argueing with Team Rocket...",
    "Healing at the Pokémon Center...",
    "Running from a wild Zubat...",
    "Consulting the Pokédex...",
    "Checking if Abdou is still hiding...",
    "Polishing the Gym Badge...",
    "Charging the Pika-Power..."
];

function getRandomLoadingMessage() {
    return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
}

const MODULE_ADDRESS = process.argv[2];

if (!MODULE_ADDRESS) {
    console.error("Please provide the module address as an argument.");
    console.error("Usage: deno run -A client/game.ts <MODULE_ADDRESS>");
    process.exit(1);
}

async function main() {
    clearScreen();

    console.log("\n⚠️  PLEASE MAXIMIZE YOUR TERMINAL WINDOW FOR THE BEST EXPERIENCE! ⚠️");
    console.log("Press ENTER when you are ready.");
    await prompt("");

    clearScreen();
    console.log("📍 Location: Brno, Czech Republic\n");
    await sleep(1500);

    console.log("You are walking peacefully down the street, enjoying a trdelník.");
    await sleep(2000);

    console.log("Suddenly, you spot a wild ABDOU trying to debug code on a bench!");
    await sleep(2000);

    console.log("You reach for your Pokéballs to catch him, but...");
    await sleep(1500);

    console.log("Abdou spots ADMIN ELIDJAH approaching and uses Teleport! He's gone!");
    await sleep(2000);

    console.log("\nADMIN ELIDJAH steps in front of you, blocking the path to the Pokémon League where Brice is waiting.");
    await sleep(2000);

    console.log("\n👮 ELIDJAH: 'Stop right there, Hugo! I suspect you of using GitHub Copilot on the exam!'");
    await sleep(2000);
    console.log("👮 ELIDJAH: 'If you want to stay in School 42, you have to defeat me in a Pokémon Battle right now!'");
    await sleep(2000);

    console.log("\n⚔️  THE ANTI-CHEAT BATTLE BEGINS! ⚔️\n");
    await sleep(2000);

    displayTitle();

    let playerChoice = "";
    while (!["1", "2"].includes(playerChoice)) {
        playerChoice = await prompt("Hugo, choose your fighter:\n[1] Ectoplasma (Ghost) - The Code Phantom\n[2] Charizard (Fire) - The Deadline Burner\n\n> ");
    }

    const playerPokemon = playerChoice === "1" ? 0 : 1;
    const enemyPokemon = playerPokemon === 0 ? 1 : 0;
    const playerName = playerPokemon === 0 ? "ECTOPLASMA" : "CHARIZARD";
    const enemyName = enemyPokemon === 0 ? "ECTOPLASMA" : "CHARIZARD";

    console.log(`\nYou chose ${playerName}! Elidjah sends out ${enemyName}!`);
    console.log("Identifying blockchain connection...");

    let battleId = await executeFunction(MODULE_ADDRESS, "startBattle", ["init"]) as string;

    await sleep(1000);

    let isFinished = false;

    while (!isFinished) {
        // clearScreen(); // REMOVED: Keep history for user
        // displayTitle(); // REMOVED: Save space
        console.log("\n═══════════════════════════════════════════════════════════════\n");

        const stateStr = await executeFunction(MODULE_ADDRESS, "getBattleState", [battleId]) as string;
        const state = await parseBattleState(stateStr);

        const commentary = await executeFunction(MODULE_ADDRESS, "getCommentary", [battleId]) as string;

        displayBattle(state.ectoplasmaHP, state.charizardHP);
        displayCommentary(commentary);

        if (state.isFinished) {
            isFinished = true;
            const winner = state.ectoplasmaHP > 0 ? "ECTOPLASMA" : "CHARIZARD";
            const playerWon = (playerPokemon === 0 && winner === "ECTOPLASMA") || (playerPokemon === 1 && winner === "CHARIZARD");

            displayWinner(winner);

            await sleep(2000);
            console.log("\n──────────────────────────────────────────────────────────────────");
            if (playerWon) {
                console.log("🎉 ELIDJAH: 'Hmmpf. Impressive. Maybe you really did code this yourself.'");
                console.log("🎉 You defeated the Admin! Access directly to the Piscine granted!");
                console.log("🎉 You can now proceed to the League to face your rival Brice!");
            } else {
                console.log("💀 ELIDJAH: 'I KNEW IT! RTFM! READ THE MANPAGE!'");
                console.log("💀 You have been banned from School 42.");
                console.log("💀 Game Over, Hugo.");
            }
            console.log("──────────────────────────────────────────────────────────────────\n");

            break;
        }

        displayAttackMenu(playerPokemon);

        let choice = "";
        while (!["1", "2", "3", "4"].includes(choice)) {
            choice = await prompt(`[Hugo's ${playerName}] Choose attack (1-4):`);
        }

        const attackIndex = parseInt(choice) - 1;

        console.log(`\n⏳ ${getRandomLoadingMessage()}`);
        const resultStr = await executeFunction(MODULE_ADDRESS, "chooseAttack", [battleId, playerPokemon, attackIndex]) as string;
        const result = await parseAttackResult(resultStr);

        if (result.nextState) {
            battleId = result.nextState;
        }

        displayAttackResult(result.message, result.damage);
        await sleep(1200);

        if (result.finished) {
            continue;
        }

        console.log(`\n👮 ELIDJAH is plotting his next move...`);
        await sleep(800);

        const enemyAttack = Math.floor(Math.random() * 4);

        console.log(`⏳ ${getRandomLoadingMessage()}`);
        const enemyResultStr = await executeFunction(MODULE_ADDRESS, "chooseAttack", [battleId, enemyPokemon, enemyAttack]) as string;
        const enemyResult = await parseAttackResult(enemyResultStr);

        if (enemyResult.nextState) {
            battleId = enemyResult.nextState;
        }

        displayAttackResult(enemyResult.message, enemyResult.damage);
        await sleep(1200);
    }
}

main().catch(console.error);
