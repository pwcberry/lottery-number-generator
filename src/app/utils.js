export function* range(min, max) {
    let i = min;
    while (i <= max) {
        yield i;
        i += 1;
    }
}

export function hash(list) {
    return list.reduce((acc, n) => acc | 2n ** BigInt(n), 0n);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param current {BigInt} The current set of numbers represented as a hash
 * @param previous {BigInt} The previous set of numbers represented as a hash
 * @param threshold {Number} The maximum number of matches to make the current set valid
 * @param maxSize {Number} The maximum range of numbers for a game
 */
function doesGameResemblePrevious(current, previous, threshold = 3, maxSize = 63) {
    const matches = [];

    for (let i = 0; i < maxSize; i += 1) {
        const n = 2n ** BigInt(i);
        const c = current & n;
        const p = previous & n;
        if (c === n && p === n) {
            matches.push(i);
        }
    }

    return matches.length > threshold;
}

export function generateGames(setOfNumbers, maxGames = 12, maxPicksPerGame = 6) {
    const pool = new Map();
    const randomIndexLimit = setOfNumbers.length - 1;
    let gameCounter = maxGames;
    let previousGameHash = 0n;

    while (gameCounter > 0) {
        const usedIndexes = [];

        // maxPicksPerGame must be larger than setOfNumbers.length
        let pickCounter = maxPicksPerGame;
        const gamePicks = [];

        while (pickCounter > 0) {
            const index = getRandomInt(randomIndexLimit);
            if (!usedIndexes.includes(index)) {
                gamePicks.push(setOfNumbers[index]);
                usedIndexes.push(index);
                pickCounter -= 1;
            }
        }

        const gameHash = hash(gamePicks);
        if (!doesGameResemblePrevious(gameHash, previousGameHash, 2) && !pool.has(gameHash)) {
            gamePicks.sort((a, b) => a - b);
            pool.set(gameHash, gamePicks);
            gameCounter -= 1;
            previousGameHash = gameHash;
        }
    }

    return Array.from(pool.values());
}
