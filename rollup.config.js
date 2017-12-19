import babel from "rollup-plugin-babel";
import ts from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	plugins: [ts(), babel()],
	output: [
		{
			file: "demo/js/asyncAdapter.js",
			format: "iife",
			name: "asyncAdapter"
		},
		{
			file: "dist/asyncAdapter.esm.js",
			format: "es"
		},
		{
			file: "dist/asyncAdapter.cjs.js",
			format: "cjs"
		}
	]
};
