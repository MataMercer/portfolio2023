<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data;

	async function signInWithGitHub() {
		const { data: signInData, error } = await data.supabase.auth.signInWithOAuth({
			provider: 'github'
		});
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div class="flex-center flex flex-col">
	<h1>Admin Sign In</h1>
	<div class="flex-center flex flex-col">
		<p>Unless you are Mercer Denholm, you shouldn't be here.</p>
		<button
			class="bg-slate-900"
			on:click={() => {
				signInWithGitHub();
			}}>Github Sign In</button
		>
	</div>
</div>
