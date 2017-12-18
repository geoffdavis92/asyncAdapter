import babel from "rollup-plugin-babel";
import ts from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	plugins: [ts()],
	output: [
		{
			file: "demo/js/asyncAdapter.js",
			format: "iife",
			name: "asyncAdapter"
		},
		{
			file: "dist/asyncAdapter.ts",
			format: "es"
		},
		{
			file: "dist/asyncAdapter.js",
			format: "cjs"
		}
	]
};
