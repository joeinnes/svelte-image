# Statically Image

A Svelte component which uses the [Statically CDN](https://statically.io/) to serve responsive images.

## Usage

```
<script>
  import { Image } from '@joeinnes/statically-image';
</script>

https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXtyHCjI0n7rAD6AmyzeYxgtTkhn9iayaehA&usqp=CAU

<Image src="https://apod.nasa.gov/apod/image/2111/67P_211107_1067.jpg" alt="Some alt text which is required" aspectRatio="16/9" objectFit="cover" quality="80"  loading="lazy" hidpi={true} />
```

## Notes and Caveats

hidpi mode will load the image double size.

You should provide a full URL to the image, not a relative path.

In case there's no supported extension (gif, jpg, jpeg, png, or webp) listed in the image path, then the component will render the original, unoptimised version (https://twitter.com/staticallyio/status/1405700757475663873). You may be able to work around this by adding an ignored query (eg: `&image.jpg`) to the end of the URL or somewhere in the path, but results may vary. For example, https://pbs.twimg.com/media/FEBzSvdWYAoVJGc?format=jpg&name=medium does not contain '.jpg', and appending `&image.jpg` does not work. However, you can add the .jpg after the ID: `https://pbs.twimg.com/media/FEBzSvdWYAoVJGc.jpg?format=jpg&name=medium`. This will vary depending on the origin.
