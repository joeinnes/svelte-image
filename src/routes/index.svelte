<script>
	import Image from '$lib/Image.svelte';
</script>

<div style="width: 50vw; margin: auto;">
	Demo at 50% screen width
	<Image
		src="https://kit.svelte.dev/images/svelte-kit-machine.webp"
		alt="Some alt text which is required"
		aspectRatio="16/9"
		objectFit="cover"
		quality="80"
		loading="lazy"
	/>
</div>
