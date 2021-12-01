import {index} from "../src";

describe("index.ts", () => {
    it("should return 'hello world!'", () => {
        expect(index()).toBe('hello world!');
    });
});
