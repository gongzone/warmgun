export function calculateTrendingScore(likeCount: number, createdAt: Date) {
	let sign = 0;
	const order = Math.log10(Math.max(Math.abs(likeCount), 1));
	const date = Math.floor(new Date(createdAt).getTime() / 1000);
	const seconds = date - 1681534621;
	const t = 45000;

	console.log(date, seconds);

	if (likeCount > 0) {
		sign = 1;
	} else {
		sign = 0;
	}

	const trendingScore = order + (sign * seconds) / t;
	return Math.round((trendingScore + Number.EPSILON) * 10000000) / 10000000;
}
