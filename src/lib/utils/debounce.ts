export function debounce(timer: NodeJS.Timer, cb: () => Promise<void> | void, delay: number) {
	clearTimeout(timer);
	timer = setTimeout(cb, delay);
}
