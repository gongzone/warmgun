let timer = null;

export function debounce(cb, time: number) {
	clearTimeout(timer);
	timer = setTimeout(cb, time);
}
