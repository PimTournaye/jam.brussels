<script>
	let showFeatures = false;
</script>

<main class="max-w-3xl mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

	<section>
		<h2 class="text-2xl font-bold">How do I log in to jam.brussels?</h2>
		<li>
			You can log in to jam.brussels using your Google account. This will redirect you to Google's
			authentication page where you can sign in with your Google credentials and grant permission to
			jam.brussels.
		</li>
		<li>
			You can log in to jam.brussels using a magic link. This will send you an email with a link
			that you can click to log in to jam.brussels.
		</li>
		<p class="mt-4">
			For now, these two ways are the only ways to log in. I won't introduce a normal account system
			that has a password, since humans are notoriously bad at passwords.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-bold">Do I need an account to submit new jam sessions?</h2>
		<p>
			Yes, you need to have an account and be logged in to submit new jam sessions. This helps
			ensure the accuracy and quality of the information provided by the community. I also don't
			want people spamming the website with fake jam sessions.
		</p>
	</section>

	<section>
		<h2 class="text-2xl font-bold">What are the features on the roadmap?</h2>

		<li>More login options</li>
		<li>Being able to save jams to your own personal calender</li>
		<li>iCal / Google Calender integration</li>
		<li>Google Maps integration</li>
		<li>More languages</li>
		<li>More login options (probably only Apple though, unless someone really needs a different login option)</li>
	</section>

	<section>
		<h2 class="text-2xl font-bold">Where can I find more information?</h2>
		<p>
			For more information, please visit my website:
			<a href="https://pimtournaye.xyz" target="_blank" rel="noreferrer" class="text-cararra underline">pimtournaye.xyz</a>.
		</p>
		<p>
			If you have any requests or additional questions, please feel free to reach out via email at
			<a href="mailto:pimtournaye1@gmail.com" class="text-cararra underline">pimtournaye1@gmail.com</a>.
		</p>
	</section>
</main>

<style lang="scss">
	section {
		@apply mb-8;
	}

	h2 {
		@apply mb-2 text-cararra;
	}

	p, li {
		@apply text-cararra-800
	}
</style>
