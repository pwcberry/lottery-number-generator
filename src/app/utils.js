export function* range(min, max) {
    while (min <= max) {
        yield min;
        min += 1;
    }
}
