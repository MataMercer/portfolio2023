<script>
	import '../app.scss';
	import Header from './Header.svelte';
	import './styles.scss';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		&#xa9; {new Date().getFullYear()} Mercer Denholm
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
		color: var(--color-text-light);
		background-color: var(--color-theme-4);
		box-shadow: 0 100vh 0 100vh var(--color-theme-5);
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
