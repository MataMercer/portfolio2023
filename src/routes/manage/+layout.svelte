<nav class="bg-slate-100 p-3">
	<h2 class="text-center text-2xl">Management</h2>
	<ul class="flex flex-row justify-center text-xl">
		<li><a href="/manage/projects">Projects</a></li>
		<li><a href="/manage/about">About Page</a></li>
		<li><a href="/manage/account">Account</a></li>
	</ul>
</nav>
<slot />

<style lang="scss">
	li {
		padding: 0em 2em;
	}
</style>
