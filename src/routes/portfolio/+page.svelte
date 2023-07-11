<script lang="ts">
	import type { PageData } from './$types';
	import type { ProjectsResponseSuccess } from './+page.server';

	export let data: PageData;
	// const repos = data.apiData.filter((it: any) => it.fork === false);
	const projects: ProjectsResponseSuccess = data.projects ? data.projects : [];
</script>

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Portfolio</h1>
	<p>test</p>
	{#each projects as project}
		<div>
			<h3>{project.github_url}</h3>
		</div>
	{/each}
</div>
