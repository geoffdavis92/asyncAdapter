const asyncAdapter = (fn: Function, ...args: any[]): Promise<Function> => {
	return new Promise((resolve: Function, reject: Function) => {
		const safeArgs: any[] =
			args.length > 0
				? args
				: fn.length === 1
					? new Array(fn.length).fill(null)
					: new Array(fn.length - 1).fill(null);
		try {
			if (fn.length > 1 && fn.length !== safeArgs.length) {
				fn(...safeArgs, resolve);
			} else {
				resolve(fn(...safeArgs));
			}
		} catch (e) {
			reject(new Error(e));
		}
	});
};

export default asyncAdapter;
