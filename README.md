# Statically Image

Uses the [Statically CDN](https://statically.io/) to serve responsive images.

## Usage

```
<script>
  import { Image } from '@joeinnes/statically-image';
</script>

<Image src="https://placehold.it/1600x900" alt="Some alt text which is required" aspectRatio="16/9" objectFit="cover" quality="80"  loading="lazy">
```

## Note

In case there's no supported extension (gif, jpg, jpeg, png, or webp) listed in the image path, then the component will render the original, unoptimised version (https://twitter.com/staticallyio/status/1405700757475663873)