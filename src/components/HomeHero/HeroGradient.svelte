<div class="hero-gradient" />

<style>
	.hero-gradient {
		width: 360px;
		height: 400px;
		z-index: -9999;
		top: -43px;
		left: 0;
		position: absolute;
		filter: blur(45px);
		transform: translateZ(0);
		transform: translateY(0%);
		background: conic-gradient(
			from 180deg at 67% 67%,
			hsl(var(--primary) / 0.16) 0deg,
			hsl(var(--primary) / 0.25) 55deg,
			hsl(var(--destructive) / 0.35) 120deg,
			hsl(var(--secondary) / 0.26) 160deg,
			transparent 360deg
		);
	}
</style>
