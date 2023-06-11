<div class="hero-gradient" />

<style lang="postcss">
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
			rgb(var(--color-primary-400) / 0.16) 0deg,
			rgb(var(--color-primary-700) / 0.25) 55deg,
			rgb(var(--color-tertiary-600) / 0.35) 120deg,
			rgb(var(--color-error-700) / 0.26) 160deg,
			transparent 360deg
		);
	}
</style>
