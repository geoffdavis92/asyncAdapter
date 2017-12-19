const jest = require("jest");
const asyncAdapter = require("../dist/asyncAdapter.cjs.js");

const add = (n1, n2) => n1 + n2;
const addCallback = (n1, n2, fn) => fn(add(n1, n2));

const asyncAdd = (n1, n2) => asyncAdapter(add, n1, n2);
const asyncAddCallback = (n1, n2) => asyncAdapter(addCallback, n1, n2);

const logsAfterSum = (addFn, callback) => {
	const result = addFn();
	console.log({ result });
	callback(result);
};

const echo = v => v;

const GET = (url, callback, options = {}) => {
	const xhr = new XMLHttpRequest();
	xhr.addEventListener("readystatechange", () => {
		if (xhr.status == 4 && xhr.readyState == 2) {
			callback(xhr.responseText);
		}
	});
	xhr.open("GET", url);
	xhr.send();
};

test("static asyncAdapter tests", () => {
	expect(asyncAdapter).toBeDefined();
	expect(typeof asyncAdapter).toBe("function");
});

test("asynchronous asyncAdapter tests", () => {
	(async function test() {
		const ten = add(5, 5);
		const twenty = await asyncAdapter(addCallback, 15, 5);
		const thirty = asyncAdd(20, 10);
		const forty = await asyncAddCallback(4, 36);
		const notANum = await asyncAddCallback();
		const fifty = await asyncAdapter(logsAfterSum, () => add(25, 25));

		expect(ten).toEqual(10);
		expect(twenty).toEqual(20);
		expect(await thirty).toEqual(30);
		expect(forty).toEqual(40);
		expect(notANum).toEqual(NaN);
		expect(fifty).toEqual(50);

		const echoYes = echo("Yes");
		const asyncEchoNo = asyncAdapter(echo, "No");
		const asyncEchoNotAvailable = await asyncAdapter(echo);

		expect(echoYes).toMatch("Yes");
		expect(await asyncEchoNo).toMatch("No");
		expect(asyncEchoNotAvailable).toBe(null);
	})();
});
