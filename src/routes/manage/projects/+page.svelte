<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<h1>Manage Projects</h1>
<button
	on:click={() => {
		goto('projects/create');
	}}>New Project</button
>
