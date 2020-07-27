import { range } from "../../src/app/utils";

describe("utils", () => {
    describe("range", () => {
        it("generates a range of numbers", () => {
            const gen = range(2, 8);
            const a = Array.from(gen);

            expect(a).toHaveLength(7);
            expect(a).toEqual([2, 3, 4, 5, 6, 7, 8]);
        });
    });
});
