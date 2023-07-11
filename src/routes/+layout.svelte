<script>
	import '../app.postcss';
	import '../app.scss';
	import Header from './Header.svelte';
	import './styles.scss';

	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				goto(`/${!session ? 'login' : 'manage/account'}`);
			}}
			class="flex flex-col items-center cursor-pointer"
		>
			{#if session}
				<div class="flex flex-row items-center">
					<img src={session.user.user_metadata.avatar_url} class="px-4 h-10 rounded-lg" />

					<div>{session.user.user_metadata.user_name}</div>
				</div>
			{/if}
			&#xa9; {new Date().getFullYear()} Mercer Denholm
		</div>
	</footer>
</div>

<style lang="scss">
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
