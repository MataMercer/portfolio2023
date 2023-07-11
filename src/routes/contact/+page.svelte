<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact info" />
</svelte:head>
<!-- <div class="text-column">
	<h1>Contact</h1>
	<p>
		I will try my best to respond within 24 hours. Alternatively, email me directly at
		developer.mercer@gmail.com.
	</p>

</div> -->

<div class="text-column">
	<h1>Contact</h1>
	<p>
		I will try my best to respond within 24 hours. Alternatively, email me directly at
		developer.mercer@gmail.com.
	</p>
	<form class="flex flex-col" action="https://formspree.io/xvowlgvo" method="post">
		<label for="name">Name </label>
		<input type="text" name="name" id="name" />

		<label for="email">Email</label>
		<input type="email" name="_replyto" id="email" />

		<label for="exampleText">Message</label>
		<textarea name="message" id="message" rows="15" />
		<button type="submit">Send</button>
	</form>
</div>
