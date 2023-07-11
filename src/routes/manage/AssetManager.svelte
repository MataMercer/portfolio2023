<script lang="ts">
	import type { Database } from '$lib/types/supabase';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { FileObject } from '@supabase/storage-js';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import LoadingSpinner from '../../LoadingSpinner.svelte';

	export let supabase: SupabaseClient<Database>;
	let files: FileList;
	let fileForm: HTMLFormElement;
	let fileThumbSrcs: string[] = [];
	let uploadedFiles: FileObject[] = [];
	let uploadedFilesLoadingState: LoadingState;
	let uploadedFilesBaseUrl: string = '';
	const authorizedExtensions = ['png', 'jpeg', 'jpg'];
	export let selectedAttachments: FileObject[];
	//we need a sep var for Ids because group bind doesn't work on a list of objects.
	let selectedAttachmentIds: string[];
	let attachForm: HTMLFormElement;
	export let show = false;
	export let setSelectedAttachments: (arg0: FileObject[]) => void;

	const getFileThumbnail = (file: File) => {
		const reader = new FileReader();

		return new Promise<string>((resolve, reject) => {
			reader.readAsDataURL(file);
			reader.onabort = () => {
				reject(new Error('file reading was aborted'));
			};
			reader.onerror = () => {
				reject(new Error('file reading has failed'));
			};
			reader.onload = () => {
				resolve(reader.result as string);
			};
		});
	};

	$: {
		console.log(selectedAttachmentIds);
		console.log(selectedAttachments);
	}

	async function onFileInputChange() {
		fileThumbSrcs = await Promise.all(Array.from(files).map((it: File) => getFileThumbnail(it)));
	}

	async function uploadFiles() {
		return Promise.all(
			Array.from(files).map(async (it) =>
				supabase.storage.from('project-screenshots').upload(`screenshots/${it.name}`, it, {
					cacheControl: '3600',
					upsert: false
				})
			)
		);
	}

	async function refreshUploadedFileList() {
		uploadedFilesLoadingState = 'loading';
		uploadedFiles = await getUploadedFiles();
		uploadedFilesLoadingState = 'success';
	}

	async function handleUploadSubmit() {
		await uploadFiles();
		refreshUploadedFileList();
		fileThumbSrcs = [];
		fileForm.reset();
	}

	async function getUploadedFiles() {
		const { data, error } = await supabase.storage.from('project-screenshots').list('screenshots', {
			limit: 100,
			offset: 0,
			sortBy: { column: 'name', order: 'asc' }
		});
		if (data) {
			return data;
		} else {
			return [];
		}
	}

	async function getUploadedFilePublicUrls() {
		const { data } = await supabase.storage.from('project-screenshots').getPublicUrl('screenshots');
		return data.publicUrl;
	}

	async function deleteFile(file: FileObject) {
		const { data, error } = await supabase.storage
			.from('project-screenshots')
			.remove([`screenshots/${file.name}`]);
		selectedAttachmentIds.filter((it) => {
			file.id === it;
		});
		setSelectedAttachments(
			selectedAttachments.filter((it) => {
				file.id === it.id;
			})
		);
	}

	async function handleAttachSubmit() {
		console.log(selectedAttachments);
		attachForm.reset();
		selectedAttachments = [];
	}

	onMount(async () => {
		selectedAttachmentIds = selectedAttachments.map((it) => it.id);
		refreshUploadedFileList();
		uploadedFilesBaseUrl = await getUploadedFilePublicUrls();
	});
</script>

<div class="flex flex-row-reverse bg-slate-200 p-4">
	<button
		class="bg-red-500 pl-4 pr-4 pt-1 pb-1 text-3xl"
		on:click={() => {
			show = false;
		}}>x</button
	>
</div>

<h1 class="mb-5">Asset Manager</h1>

<div class="flex flex-row justify-around flex-wrap space-x-1 space-y-1">
	<div>
		<h2 class="text-2xl text-center mb-5">Uploaded Image Assets</h2>
		<form
			on:submit={() => {
				handleAttachSubmit();
			}}
			bind:this={attachForm}
		>
			<table>
				<tr>
					<th>Select</th>
					<th>Thumb</th>
					<th>Filename</th>
					<th>Options</th>
				</tr>

				{#if uploadedFilesLoadingState == 'success'}
					{#each uploadedFiles as uploadedFile}
						<tr class="">
							<td>
								<input
									id={uploadedFile.id}
									type="checkbox"
									bind:group={selectedAttachmentIds}
									value={uploadedFile.id}
									class="m-0 mr-2 p-0 h-10 w-10"
								/>
							</td>

							<td>
								<img
									src={`${uploadedFilesBaseUrl}/${uploadedFile.name}`}
									alt="uploaded img file"
									class="h-10 w-10"
								/>
							</td>
							<td>
								<div class="break-all">{uploadedFile.name}</div>
							</td>

							<td>
								<button
									class="bg-transparent text-red-500"
									type="button"
									on:click={async () => {
										uploadedFilesLoadingState = 'loading';
										await deleteFile(uploadedFile);
										uploadedFilesLoadingState = 'success';
										await refreshUploadedFileList();
									}}
								>
									<Fa icon={faTrash} />
								</button>
							</td>
						</tr>
					{/each}
				{/if}
			</table>
			{#if uploadedFilesLoadingState === 'loading'}
				<div class="justify-center">
					<LoadingSpinner />
				</div>
			{/if}
			<div class="flex justify-center">
				<button
					on:click={() => {
						setSelectedAttachments(
							uploadedFiles.filter((it) => {
								return selectedAttachmentIds.includes(it.id);
							})
						);
						show = false;
					}}>Attach Selected Images</button
				>
			</div>
		</form>
	</div>
	<form
		class="bg-slate-200 p-5"
		on:submit={() => {
			handleUploadSubmit();
		}}
		bind:this={fileForm}
	>
		<input
			type="file"
			bind:files
			name=""
			multiple
			on:change={() => {
				onFileInputChange();
			}}
			accept={authorizedExtensions.join(',')}
		/>
		{#if fileThumbSrcs && fileThumbSrcs.length > 0}
			<ul class="flex flex-row">
				{#each fileThumbSrcs as src}
					<li>
						<img {src} alt="thumb" class="w-24 m-4" />
					</li>
				{/each}
			</ul>
		{:else}
			<div class="text-center pt-10 pb-10">No files to be uploaded yet.</div>
		{/if}

		<div class="flex flex-wrap justify-center">
			<button type="submit">Upload Images</button>
			<button type="reset">Clear</button>
		</div>
	</form>
</div>
