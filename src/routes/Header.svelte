<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
	import logo from '$lib/images/matamercerlogo2020.svg';

	const navLinks = [
		{
			text: 'Home',
			link: '/'
		},
		{
			text: 'Portfolio',
			link: '/portfolio'
		},
		{
			text: 'About',
			link: '/about'
		},
		{
			text: 'Contact',
			link: '/contact'
		}
	];
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,3 L2,3 L2,0 Z" />
		</svg>

		<ul
			class="relative p-0 m-0 h-auto flex justify-center items-center bg-contain flex-wrap list-none"
		>
			<li class="brand">
				<a href="/">
					<img src={logo} alt="SvelteKit" />
				</a>
				<a href="/">
					<div class="brand-text">Mercer Denholm</div>
				</a>
			</li>
			{#each navLinks as navLink}
				<li aria-current={$page.url.pathname === navLink.link ? 'page' : undefined}>
					<svg viewBox="0 0 2 3" aria-hidden="true">
						<path d="M0,0 L0,3 L2,0 Z" />
					</svg>
					<a href={navLink.link}>{navLink.text}</a>
					<svg viewBox="0 0 2 3" aria-hidden="true">
						<path d="M0,3 L2,3 L2,0 Z" />
					</svg>
				</li>
			{/each}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	.test {
		flex-wrap: wrap;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.brand {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.brand a {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.brand img {
		/* width: 4em; */
		height: 2em;
		object-fit: contain;
	}

	nav {
		margin: 1em;
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 1);

		align-items: flex-start;
		filter: drop-shadow(25px 15px 0px var(--color-theme-4));
	}

	svg {
		width: 2em;
		/* height: 3em; */
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		background: var(--background);
	}

	li {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
	}

	li[aria-current='page']::before {
		--size: 10px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 1.5em;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-bottom: var(--size) solid var(--color-text-light);
	}

	li[aria-current='page'] {
		background-color: var(--color-theme-1);
	}
	li[aria-current='page'] a {
		color: var(--color-text-light);
	}

	li:hover {
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		/* color: var(--color-text); */
		font-weight: 700;
		font-size: 1rem;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.brand-text {
		color: var(--color-text);
		font-size: x-large;
	}
</style>
