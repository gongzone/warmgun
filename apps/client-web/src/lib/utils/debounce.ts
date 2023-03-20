type Func = (...args: any[]) => any;

export function debounce<F extends Func>(func: F, wait: number): (...args: Parameters<F>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, wait);
	};
}
