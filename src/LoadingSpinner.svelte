<script lang="ts">
	import KUTE from 'kute.js';
	import { onMount } from 'svelte';

	const squareCount = 3;

	onMount(() => {
		const scaleDuration = 180;
		let tween0 = KUTE.to(
			`.sq-0`,
			{ scale: 2.0, opacity: 1.0 },
			{
				duration: scaleDuration,
				repeat: 1,
				yoyo: true,
				easing: 'easingCubicInOut',
				onComplete: () => {
					tween1.start();
				}
			}
		);
		let tween1 = KUTE.to(
			`.sq-1`,
			{ scale: 2.0, opacity: 1.0 },
			{
				duration: scaleDuration,
				repeat: 1,
				yoyo: true,
				easing: 'easingCubicInOut',
				onComplete: () => {
					tween2.start();
				}
			}
		);
		let tween2 = KUTE.to(
			`.sq-2`,
			{ scale: 2.0, opacity: 1.0 },
			{
				duration: scaleDuration,
				repeat: 1,
				yoyo: true,
				easing: 'easingCubicInOut',
				onComplete: () => {
					tween0.start();
				}
			}
		);
		// tween0.start();
	});

	function tweenSquare(index: number) {}

	// function tweenAllSquares() {
	// 	for (let i = 0; i < squareCount; i++) {
	// 		// tweenSquare(i);
	// 	}
	// }
</script>

<div class="container flex flex-row space-x-5 justify-center m-10">
	{#each { length: squareCount } as _, i}
		<div class={`sq-${i} square max-h-full`} />
	{/each}
</div>

<style lang="scss">
	.square {
		rotate: 45deg;
		height: 1em;
		width: 1em;
		background-color: rgb(75, 0, 180);
	}
	.container {
		height: 4em;
	}
	.sq-0 {
		/* animation: slide-in 0.5s linear 0s 1 alternate; */
		animation-name: slide-in;
		animation-duration: 1s;
		animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
		animation-delay: 0s;
		animation-iteration-count: infinite;
		/* animation-direction: alternate; */
	}
	.sq-1 {
		animation-name: scale-up;
		animation-duration: 0.6s;
		animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
		animation-delay: 0s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
	.sq-2 {
		animation-name: slide-out;
		animation-duration: 1.2s;
		animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
		animation-delay: 0s;
		animation-iteration-count: infinite;
		/* animation-direction: alternate; */
	}

	@keyframes slide-in {
		0% {
			/* transform: translate(-100%, -50%); */
			/* transform: scale(0); */
			translate: -2em;
			opacity: 0;
		}

		100% {
			/* transform: translate(0%, 0%); */
			opacity: 1;

			/* transform: scale(2); */

			translate: 42px;
		}
	}

	@keyframes slide-out {
		0% {
			/* transform: translate(-100%, -50%); */
			translate: -40px;
			opacity: 1;
		}

		100% {
			/* transform: translate(0%, 0%); */
			opacity: 0;

			transform: scale(0);
			/* transform: scale(2); */

			translate: 2em;
		}
	}

	@keyframes scale-up {
		0% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(2.4);
		}
	}
</style>
