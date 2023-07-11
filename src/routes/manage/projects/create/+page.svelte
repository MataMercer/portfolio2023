<script lang="ts">
	import { onMount } from 'svelte';
	import AssetManager from '../../AssetManager.svelte';
	import type { FileObject } from '@supabase/storage-js';
	export let data;
	const { supabase } = data;
	let showAssetManager = false;
	let attachments: FileObject[] = [];
	let publicUrlBase: string;

	async function getUploadedFilePublicUrls() {
		const { data } = await supabase.storage.from('project-screenshots').getPublicUrl('screenshots');
		return data.publicUrl;
	}
	function setSelectedAttachments(selectedAttachments: FileObject[]) {
		attachments = selectedAttachments;
	}

	onMount(async () => {
		publicUrlBase = await getUploadedFilePublicUrls();
	});
</script>

{#if !showAssetManager}
	<h1>Create New Project</h1>
	<form method="post">
		<div>
			<label>Github Repository</label>
			<span class="flex flex-row">
				<input placeholder="Repository Owner's Username" />
				<span class=" content-center p-5"> / </span>
				<input placeholder="Repository Name" />
			</span>
		</div>
		<div>
			<label>Project Name</label>
			<input />
		</div>
		<div class="flex flex-col">
			<label>Project Screenshots</label>
			<ul class="flex flex-row space-x-2">
				{#each attachments as attachment}
					<li>
						<img class="w-24" src={`${publicUrlBase}/${attachment.name} `} />
						<div class="">{attachment.name}</div>
					</li>
				{/each}
			</ul>

			<button
				type="button"
				on:click={() => {
					showAssetManager = true;
				}}>Attach Images</button
			>
		</div>
		<button>Publish</button>
	</form>
{:else}
	<AssetManager
		{supabase}
		bind:show={showAssetManager}
		{setSelectedAttachments}
		selectedAttachments={attachments}
	/>
{/if}
