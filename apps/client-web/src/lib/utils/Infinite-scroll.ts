export function setInfiniteScroll(observable: Element, options: SetInfiniteScrollOptions) {
	const { fetchFn, isMoreAvailable } = options;

	const observer = new IntersectionObserver(
		(entries, observer) => {
			console.log(entries[0].isIntersecting, isMoreAvailable);
			if (entries[0].isIntersecting && isMoreAvailable) {
				console.log('fetch!');
				fetchFn();
			}
		},
		{
			threshold: 0.5,
			rootMargin: '-100% 0% 100%'
		}
	);

	observer.observe(observable);
}

interface SetInfiniteScrollOptions {
	fetchFn: any;
	isMoreAvailable: boolean | undefined;
}
