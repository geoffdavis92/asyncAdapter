const jest = require("jest");
const asyncAdapter = require("../dist/asyncAdapter.js");

test("asyncAdapter", () => {
	expect(asyncAdapter).toBeDefined();
	expect(typeof asyncAdapter).toBe("function");
});
