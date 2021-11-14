<script>
	import Image from '$lib/Image.svelte';
</script>

<div style="width: 50vw; margin: auto;">
	Demo at 50% screen width
	<Image
		src="https://apod.nasa.gov/apod/image/2111/67P_211107_1067.jpg"
		alt="Some alt text which is required"
		aspectRatio="16/9"
		objectFit="cover"
		quality="80"
		loading="lazy"
	/>
</div>
