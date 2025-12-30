import {
  textref,
  texts
} from "@hazae41/stdbob"

const MAX_HP: i32 = 100

const ECTOPLASMA_ATTACKS: string[] = [
  "Existential Crisis|Confuses the opponent with deep questions|15|25",
  "Spoiler Alert|Ruins the opponent's favorite show|20|30",
  "Ghostly Fart|Stinks even in the afterlife|10|20",
  "TikTok Jumpscare|Viral damage from cringe content|25|35"
]

const CHARIZARD_ATTACKS: string[] = [
  "Failed Flamethrower|Coughs instead of breathing fire|15|25",
  "Taco Breath|Critical hit from last night's dinner|20|30",
  "Crash Landing|Tries to fly, fails miserably|10|20",
  "Midlife Crisis|Realizes he's just a big lizard|25|35"
]

function deterministicRandom(seedStr: string, min: i32, max: i32): i32 {
  let hash: u32 = 0x811c9dc5

  for (let i = 0; i < seedStr.length; i++) {
    hash ^= seedStr.charCodeAt(i) as u32
    hash *= 0x01000193
  }

  const range = max - min + 1
  return min + (hash % range as i32)
}

export function startBattle(seed: textref): textref {
  return texts.fromString("100-100-0-0")
}

export function chooseAttack(battleId: textref, pokemon: i32, attackId: i32): textref {
  const stateStr = texts.toString(battleId)
  const stateParts = stateStr.split("-")

  let ectoplasmaHP = 100
  let charizardHP = 100
  let turnCount = 0
  let isFinished = 0

  if (stateParts.length >= 4) {
    ectoplasmaHP = parseInt(stateParts[0]) as i32
    charizardHP = parseInt(stateParts[1]) as i32
    turnCount = parseInt(stateParts[2]) as i32
    isFinished = parseInt(stateParts[3]) as i32
  }

  if (isFinished == 1) {
    return texts.fromString("Battle is already finished!|nextState:" + stateStr)
  }

  const attacks = pokemon == 0 ? ECTOPLASMA_ATTACKS : CHARIZARD_ATTACKS
  const attackInfo = attacks[attackId]
  const parts = attackInfo.split("|")
  const attackName = parts[0]
  const minDmg = parseInt(parts[2]) as i32
  const maxDmg = parseInt(parts[3]) as i32

  const seedStr = stateStr + attackId.toString()
  const damage = deterministicRandom(seedStr, minDmg, maxDmg)

  let newEctoHP = ectoplasmaHP
  let newCharHP = charizardHP

  if (pokemon == 0) {
    newCharHP = charizardHP - damage
    if (newCharHP < 0) newCharHP = 0
  } else {
    newEctoHP = ectoplasmaHP - damage
    if (newEctoHP < 0) newEctoHP = 0
  }

  const newTurnCount = turnCount + 1
  let newIsFinished = isFinished
  if (newEctoHP == 0 || newCharHP == 0) {
    newIsFinished = 1
  }

  const nextState = newEctoHP.toString() + "-" + newCharHP.toString() + "-" + newTurnCount.toString() + "-" + newIsFinished.toString()

  const attackerName = pokemon == 0 ? "Ectoplasma" : "Charizard"
  const message = attackerName + " used " + attackName + "! " + damage.toString() + " damage!"

  const response =
    "damage:" + damage.toString() + "|" +
    "message:" + message + "|" +
    "ectoplasmaHP:" + newEctoHP.toString() + "|" +
    "charizardHP:" + newCharHP.toString() + "|" +
    "finished:" + (newIsFinished == 1 ? "true" : "false") + "|" +
    "nextState:" + nextState

  return texts.fromString(response)
}

export function getBattleState(battleId: textref): textref {
  const stateStr = texts.toString(battleId)
  const stateParts = stateStr.split("-")

  let ectoplasmaHP = 100
  let charizardHP = 100
  let turnCount = 0
  let isFinished = 0

  if (stateParts.length >= 4) {
    ectoplasmaHP = parseInt(stateParts[0]) as i32
    charizardHP = parseInt(stateParts[1]) as i32
    turnCount = parseInt(stateParts[2]) as i32
    isFinished = parseInt(stateParts[3]) as i32
  }

  const state =
    "ectoplasmaHP:" + ectoplasmaHP.toString() + "|" +
    "charizardHP:" + charizardHP.toString() + "|" +
    "turnCount:" + turnCount.toString() + "|" +
    "isFinished:" + (isFinished == 1 ? "true" : "false") + "|" +
    "lastAttack:Waiting for move..."

  return texts.fromString(state)
}

export function getCommentary(battleId: textref): textref {
  const stateStr = texts.toString(battleId)
  const stateParts = stateStr.split("-")

  let ectoplasmaHP = 100
  let charizardHP = 100
  let turnCount = 0
  let isFinished = 0

  if (stateParts.length >= 4) {
    ectoplasmaHP = parseInt(stateParts[0]) as i32
    charizardHP = parseInt(stateParts[1]) as i32
    turnCount = parseInt(stateParts[2]) as i32
    isFinished = parseInt(stateParts[3]) as i32
  }

  let commentary = ""

  if (isFinished == 1) {
    if (ectoplasmaHP == 0) {
      commentary = "🎙️ AND IT'S OVER! Charizard wins! Ectoplasma has been sent back to the spirit realm!"
    } else {
      commentary = "🎙️ UNBELIEVABLE! Ectoplasma wins! Charizard's flame has been extinguished!"
    }
  }
  else if (turnCount == 0) {
    commentary = "🎙️ Ladies and gentlemen, welcome to the most epic battle of the century! Ghost vs Fire! Let's see who comes out on top!"
  }
  else if (ectoplasmaHP < 30 && charizardHP < 30) {
    commentary = "🎙️ Both fighters are on their last legs! This is getting intense, folks!"
  }
  else if (ectoplasmaHP < 30) {
    commentary = "🎙️ Ectoplasma is fading away! Can the ghost make a comeback?!"
  }
  else if (charizardHP < 30) {
    commentary = "🎙️ Charizard is getting roasted! The tables have turned!"
  }
  else if (turnCount < 3) {
    commentary = "🎙️ We're just getting started! Both fighters looking strong!"
  }
  else {
    commentary = "🎙️ This battle is heating up! Who will emerge victorious?!"
  }

  return texts.fromString(commentary)
}

export function getPokedexEntry(pokemon: i32): textref {
  let entry = ""
  if (pokemon == 0) {
    entry = "📱 POKÉDEX: Ectoplasma, the Ghost Pokémon."
  } else {
    entry = "📱 POKÉDEX: Charizard, the Flame Pokémon."
  }
  return texts.fromString(entry)
}