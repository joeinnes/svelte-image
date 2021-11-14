<script lang="ts">
	import { browser } from '$app/env';
	export let alt;
	export let aspectRatio = '16/9';
	export let objectFit = 'cover';
	export let quality = '80';
	export let src = 'https://placehold.it/1600x900';
	export let loading = 'lazy';
	let clientW = 0;
	let clientWMax = 0;
	let domain = '';
	let imgPath = '';
	let imgSrc = src;

	let debounce;

	if (browser) {
		debounce = (callback, wait) => {
			let timeoutId = null;
			return (...args) => {
				window.clearTimeout(timeoutId);
				timeoutId = window.setTimeout(() => {
					callback.apply(null, args);
				}, wait);
			};
		};
	}

	const getNewImgSrc = (clientW) => {
		try {
			const imgUrl = new URL(src);
			domain = imgUrl.host;
			imgPath = imgUrl.pathname;
			// If you've already downloaded a higher quality image, then don't bother replacing with a lower quality one
			clientWMax = Math.max(clientW, clientWMax);
			// To Do: debounce this in case the user is resizing the window
			imgSrc = `https://cdn.statically.io/img/${domain}/w=${clientWMax},q=${quality},f=auto/${imgPath}`;
		} catch (e) {
			// The user's done something silly like not passing us a full URL to the image, so let's not ask Statically to do anything, just show whatever the user wanted.
			console.log(
				'Your image could not be optimised by Statically (did you provide a full path and make sure the extension is included?)'
			);
		} finally {
			return imgSrc;
		}
	};

	const getNewImgSrcDB = browser ? debounce(() => getNewImgSrc(clientW), 100) : getNewImgSrc;
	const handleError = (e) => {
		console.log(
			'Your image could not be optimised by Statically (did you provide a full path and make sure the extension is included?)'
		);
		e.target.src = src;
	};

	$: {
		imgSrc = getNewImgSrcDB(clientW);
	}
</script>

<div style="width: 100%; aspect-ratio: {aspectRatio}" bind:clientWidth={clientW}>
	<img
		src={imgSrc}
		style="width: 100%; height: 100%; object-fit: {objectFit}"
		{alt}
		{loading}
		on:error={handleError}
	/>
</div>
