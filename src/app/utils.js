export function* range(min, max) {
    while (min <= max) {
        yield min;
        min += 1;
    }
}

export function hash(list) {
    return list.reduce((acc, n) => acc | 2n ** BigInt(n), 0n);
}

