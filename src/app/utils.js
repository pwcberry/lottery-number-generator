export function* range(min, max) {
    let i =  min;
    while (i <= max) {
        yield i;
        i += 1;
    }
}

export function hash(list) {
    return list.reduce((acc, n) => acc | 2n ** BigInt(n), 0n);
}

export function* generateGames(selectedNumbers, limit) {
    let pool = new Set();
    let i = limit;

    while (i > 0) {
        // generate random numbers from selectedNumbers
        // hash this list
        // check if hash is in pool
        // if not in pool, add to pool and yield list
    }
}