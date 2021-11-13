<script>
	export let alt;
	export let aspectRatio = '16/9';
	export let objectFit = 'cover';
	export let quality = 80;
	export let src = 'https://placehold.it/1600x900';
	export let loading = 'lazy';
	let clientW = 0;
	let clientWMax = 0;
	let domain = '';
	let imgPath = '';
	let imgSrc = '';
	$: {
		console.log('running');
		try {
			[, domain, imgPath] = src.match(/\/\/(.*?)\/(.*)/);
			// If you've already downloaded a higher quality image, then don't bother replacing with a lower quality one
			clientWMax = Math.max(clientW, clientWMax);
			imgSrc = `https://cdn.statically.io/img/${domain}/w=${clientWMax},q=${quality},f=auto/${imgPath}`;
		} catch (e) {
			// The user's done something silly like not passing us a full URL to the image, so let's not ask Statically to do anything, just show whatever the user wanted.
			console.log(e);
			imgSrc = src;
		}
	}
</script>

<div style="width: 100%; aspect-ratio: {aspectRatio}" bind:clientWidth={clientW}>
	<img
		src={imgSrc}
		style="width: 100%; height: 100%; object-fit: {objectFit}"
		{alt}
		{loading}
		on:error={(e) => {
			e.target.src = src;
		}}
	/>
</div>
