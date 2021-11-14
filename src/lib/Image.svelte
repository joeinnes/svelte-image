<script lang="ts">
	import { browser } from '$app/env';
	import { provider } from '$lib/store/store';

	export let alt: string;
	export let aspectRatio = '16/9';
	export let objectFit = 'cover';
	export let quality = '80';
	export let src = 'https://kit.svelte.dev/images/svelte-kit-machine.webp';
	export let loading = 'lazy';
	export let hidpi = true;
	let actualImg: HTMLImageElement, shadowImg: HTMLImageElement;
	let clientW = 0;
	let clientWMax = 0;
	let domain = '';
	let imgPath = '';
	let imgSrc = '';

	let debounce: {
		(arg0: () => string, arg1: number): any;
		(callback: () => {}, wait: number): (...args: any) => void;
	};

	if (browser) {
		debounce = (callback: () => {}, wait: number) => {
			let timeoutId = null;
			return (...args: any) => {
				window.clearTimeout(timeoutId);
				timeoutId = window.setTimeout(() => {
					callback.apply(null, args);
				}, wait);
			};
		};
	}

	const getNewImgSrc = (clientW: number) => {
		try {
			const imgUrl = new URL(src);
			domain = imgUrl.host;
			imgPath = imgUrl.pathname;
			// If you've already downloaded a higher quality image, then don't bother replacing with a lower quality one
			clientWMax = Math.max(clientW, clientWMax);
			let width = hidpi ? 2 * clientWMax : clientWMax;
			switch ($provider.name) {
				case 'cloudinary':
					imgSrc = `https://${$provider.key}.mo.cloudinary.net/${imgUrl.protocol}//${domain}${imgPath}?tx=w_${width},c_fill,g_auto,q_${quality}`;
					break;
				case 'cloudimage':
					imgSrc = `https://${$provider.key}.cloudimg.io/v7/${domain}${imgPath}?width=${width}&q=${quality}`;
					break;
				default:
					imgSrc = `https://cdn.statically.io/img/${domain}/w=${width},q=${quality},f=auto${imgPath}`;
			}
		} catch (e) {
			console.log(
				'Your image could not be optimised (did you provide a full path and make sure the extension is included?)'
			);
		} finally {
			return imgSrc;
		}
	};

	const getNewImgSrcDB = browser ? debounce(() => getNewImgSrc(clientW), 100) : getNewImgSrc;
	const handleError = (e) => {
		console.log(
			'Your image could not be optimised (did you provide a full path and make sure the extension is included?)'
		);
		console.error(e);
		imgSrc = src;
	};

	$: {
		imgSrc = getNewImgSrcDB(clientW);
	}
</script>

<div style="width: 100%; aspect-ratio: {aspectRatio}" bind:clientWidth={clientW}>
	{#if imgSrc}
		<img
			src=""
			style="width: 100%; height: 100%; object-fit: {objectFit}"
			{alt}
			{loading}
			bind:this={actualImg}
		/>
		<img
			style="display:none"
			src={imgSrc}
			bind:this={shadowImg}
			on:error={handleError}
			on:load={() => (actualImg.src = shadowImg.src)}
			alt="This image should not be displayed"
			aria-hidden="true"
		/>
	{/if}
</div>
