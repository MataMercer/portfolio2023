<script>
	import { goto } from '$app/navigation';

	// import Counter from './Counter.svelte';
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<span class="background-svg">
	<svg
		id="visual"
		viewBox="0 0 900 600"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		version="1.1"
		preserveAspectRatio="none"
		><path
			class="wave"
			d="M0 393L21.5 394C43 395 86 397 128.8 398.3C171.7 399.7 214.3 400.3 257.2 411.5C300 422.7 343 444.3 385.8 459.7C428.7 475 471.3 484 514.2 469C557 454 600 415 642.8 417.3C685.7 419.7 728.3 463.3 771.2 485.3C814 507.3 857 507.7 878.5 507.8L900 508L900 601L878.5 601C857 601 814 601 771.2 601C728.3 601 685.7 601 642.8 601C600 601 557 601 514.2 601C471.3 601 428.7 601 385.8 601C343 601 300 601 257.2 601C214.3 601 171.7 601 128.8 601C86 601 43 601 21.5 601L0 601Z"
			stroke-linecap="round"
			stroke-linejoin="miter"
		/></svg
	>
</span>

<section>
	<h1>Mercer Denholm</h1>

	<h2>Hi! I'm a developer from Huntington Beach, California.</h2>
	<button class="call-to-action-button" on:click={() => goto('/portfolio')}>See my work </button>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		font-size: 5em;
	}
	h2 {
		font-size: 2.5em;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.background-svg {
		top: 0px;
		right: 0px;
		left: 0px;
		position: absolute;
		width: 100%;
		z-index: -1;
		overflow: hidden;
	}

	.background-svg svg {
		position: relative;
		display: block;
		width: calc(100% + 1.3px);
		height: 100vh;
		overflow: hidden;
	}
	.wave {
		fill: var(--color-theme-2);
	}
	.triangle {
		fill: var(--color-theme-4);
	}

	.call-to-action-button {
		font-size: 2em;
		box-shadow: 5px 5px 10px rgb(207, 207, 207);
	}
</style>
