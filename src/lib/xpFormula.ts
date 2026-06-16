/**
 * XP Formula: 1000 × (level ^ 1.5)
 * Calculates the XP required to complete a level
 */

export const xpForLevel = (level: number): number => {
  return Math.round(1000 * Math.pow(level, 1.5))
}

/**
 * Calculates the current level based on total XP
 */
export const calculateLevel = (totalXp: number): number => {
  let level = 1
  let accumulated = 0

  while (level < 51) {
    const cost = xpForLevel(level)
    if (accumulated + cost > totalXp) break
    accumulated += cost
    level++
  }

  return Math.min(level, 50)
}

/**
 * Calculates cumulative XP needed to reach a given level
 */
export const cumulativeXpToLevel = (level: number): number => {
  let total = 0
  for (let i = 1; i < level; i++) {
    total += xpForLevel(i)
  }
  return total
}

/**
 * Calculates progress towards next level (0-100%)
 */
export const xpProgress = (totalXp: number): number => {
  const currentLevel = calculateLevel(totalXp)
  const xpAtNextLevel = cumulativeXpToLevel(currentLevel + 1)
  const xpInCurrentLevel = totalXp - cumulativeXpToLevel(currentLevel)
  const xpNeededInLevel = xpAtNextLevel - cumulativeXpToLevel(currentLevel)

  if (currentLevel >= 50) return 100

  return Math.round((xpInCurrentLevel / xpNeededInLevel) * 100)
}

/**
 * Get level title based on level number
 */
export const getLevelTitle = (level: number): string => {
  if (level <= 5) return 'X Initiate'
  if (level <= 10) return 'Key Carver'
  if (level <= 20) return 'Word Forger'
  if (level <= 35) return 'Cipher Knight'
  if (level <= 49) return 'Type Master'
  return 'Typer X Legend'
}

/**
 * Calculate XP needed to reach next level from current total
 */
export const xpToNextLevel = (totalXp: number): number => {
  const currentLevel = calculateLevel(totalXp)
  if (currentLevel >= 50) return 0

  const xpAtCurrentLevel = cumulativeXpToLevel(currentLevel)
  const xpAtNextLevel = cumulativeXpToLevel(currentLevel + 1)
  const xpRemaining = xpAtNextLevel - totalXp

  return Math.max(0, xpRemaining)
}
