// 🖥️ TERMINAL DISPLAY UTILITIES

import { ECTOPLASMA_ASCII, CHARIZARD_ASCII } from "./ascii-art.ts";

// Colors
const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const MAGENTA = "\x1b[35m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";

export function clearScreen() {
    console.log("\x1Bc");
}

export function displayTitle() {
    console.log(`
${CYAN}${BOLD}
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║        🎮  POKÉMON BATTLE SIMULATOR ON BLOCKCHAIN  🎮        ║
║                                                               ║
║              Ectoplasma  VS  Charizard                        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
${RESET}
  `);
}

export function displayBattle(ectoplasmaHP: number, charizardHP: number) {
    const ectoBar = createHPBar(ectoplasmaHP, 100, "ECTOPLASMA");
    const charBar = createHPBar(charizardHP, 100, "CHARIZARD");

    console.log("\n");
    console.log(`${MAGENTA}${ECTOPLASMA_ASCII}${RESET}`);
    console.log(ectoBar);
    console.log("\n                    VS\n");
    console.log(`${RED}${CHARIZARD_ASCII}${RESET}`);
    console.log(charBar);
    console.log("\n");
}

function createHPBar(hp: number, maxHP: number, name: string): string {
    const barLength = 20;
    const filledLength = Math.floor((hp / maxHP) * barLength);
    const emptyLength = barLength - filledLength;

    const filled = "█".repeat(filledLength);
    const empty = "░".repeat(emptyLength);

    let color = GREEN;
    if (hp < 30) color = RED;
    else if (hp < 60) color = YELLOW;

    let comment = "";
    if (hp === 0) comment = "Knocked out!";
    else if (hp < 20) comment = "Critical condition!";
    else if (hp < 50) comment = "Hanging in there...";
    else if (hp < 80) comment = "Still fighting!";
    else comment = "Looking strong!";

    return `${BOLD}${name}${RESET}  HP: ${color}[${filled}${empty}]${RESET} ${hp}/${maxHP}  "${comment}"`;
}

export function displayAttackMenu(pokemon: number) {
    const attacks = pokemon === 0 ? [
        "💀 Existential Crisis - Confuses the opponent",
        "👻 Spoiler Alert - Ruins the opponent's day",
        "🌫️  Ghostly Fart - Stinks even in afterlife",
        "😱 TikTok Jumpscare - Viral damage"
    ] : [
        "🔥 Failed Flamethrower - Coughs instead of fire",
        "🌶️  Taco Breath - Critical from last night",
        "💨 Crash Landing - Fails to fly",
        "🦎 Midlife Crisis - Realizes he's a lizard"
    ];

    const pokemonName = pokemon === 0 ? "ECTOPLASMA" : "CHARIZARD";

    console.log(`\n${BOLD}╔════════════════════════════════════════════════════════════╗${RESET}`);
    console.log(`${BOLD}║  WHAT SHOULD ${pokemonName} DO?${" ".repeat(Math.max(0, 36 - pokemonName.length))}║${RESET}`);
    console.log(`${BOLD}╠════════════════════════════════════════════════════════════╣${RESET}`);

    attacks.forEach((attack, i) => {
        const padding = " ".repeat(Math.max(0, 56 - attack.length));
        console.log(`${BOLD}║  [${i + 1}] ${attack}${padding}║${RESET}`);
    });

    console.log(`${BOLD}╚════════════════════════════════════════════════════════════╝${RESET}`);
}

export function displayCommentary(text: string) {
    console.log(`\n${CYAN}${BOLD}${text}${RESET}\n`);
}

export function displayPokedex(entry: string) {
    console.log(`\n${YELLOW}${entry}${RESET}\n`);
}

export function displayAttackResult(message: string, damage: number) {
    console.log(`\n${BOLD}>>> ${message}${RESET}`);
    console.log(`${RED}${BOLD}💥 ${damage} DAMAGE!${RESET}\n`);
}

export function displayWinner(winner: string) {
    console.log(`\n${BOLD}${GREEN}
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║                    🏆  ${winner} WINS!  🏆${" ".repeat(Math.max(0, 20 - winner.length))}║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
${RESET}\n`);
}

export async function prompt(question: string): Promise<string> {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(question + " "));
    const n = await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n || 0)).trim();
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
