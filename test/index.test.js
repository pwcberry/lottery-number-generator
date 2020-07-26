import { add2 } from "../src/app/utils.js";

describe("index", () => {
    it("should return true", () => {
        expect(2+2).toBe(4);
    });
    
    it("should add 2", () => {
        expect(add2(2)).toBe(4);
    });
});
