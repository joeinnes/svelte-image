# Statically Image

A Svelte component which uses the [Statically CDN](https://statically.io/) to serve responsive images.

## Usage

```
<script>
  import { Image } from '@joeinnes/statically-image';
</script>

<Image src="https://apod.nasa.gov/apod/image/2111/67P_211107_1067.jpg" alt="Some alt text which is required" aspectRatio="16/9" objectFit="cover" quality="80"  loading="lazy">
```

## Notes and Caveats

In case there's no supported extension (gif, jpg, jpeg, png, or webp) listed in the image path, then the component will render the original, unoptimised version (https://twitter.com/staticallyio/status/1405700757475663873).

You should provide a full URL to the image, not a relative page.
