import { hash, range } from "../../src/app/utils";

describe("utils", () => {
    describe("range", () => {
        it("generates a range of numbers", () => {
            const gen = range(2, 8);
            const a = Array.from(gen);

            expect(a).toHaveLength(7);
            expect(a).toEqual([2, 3, 4, 5, 6, 7, 8]);
        });
    });

    describe("hash", () => {
        it("should hash 4 numbers as an integer", () => {
            const list = [3, 9, 11, 4];
            const expected = 1n << 3n | 1n << 4n | 1n << 9n | 1n << 11n;
            const result = hash(list);
            expect(result).toBe(expected);
        });

        it("should hash 6 large numbers as an integer", () => {
            const list = [43, 38, 45, 41, 35, 37];
            const expected = 1n << 35n | 1n << 37n | 1n << 38n | 1n << 41n | 1n << 43n | 1n << 45n;
            const result = hash(list);
            expect(result).toBe(expected);
        });
    });
});
