const asyncAdapter = (fn: Function, ...params: any[]): Promise<Function> => {
	return new Promise((resolve: Function, reject: Function) => {
		const safeParams: any[] =
			params.length > 0
				? params
				: fn.length === 1
					? new Array(fn.length).fill(null)
					: new Array(fn.length - 1).fill(null);
		try {
			if (fn.length > 1 && fn.length !== safeParams.length) {
				fn(...safeParams, resolve);
			} else {
				resolve(fn(...safeParams));
			}
		} catch (e) {
			reject(new Error(e));
		}
	});
};

export default asyncAdapter;
