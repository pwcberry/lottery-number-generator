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

export function generateGames(setOfNumbers, maxGames = 12, maxPicksPerGame = 6) {
    const pool = new Map();
    const randomIndexLimit = setOfNumbers.length - 1;
    let gameCounter = maxGames;

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
        if (!pool.has(gameHash)) {
            pool.set(gameHash, gamePicks);
            gameCounter -= 1;
        }
    }

    return Array.from(pool.values());
}
