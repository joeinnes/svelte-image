# Statically Image

A Svelte component which uses the [Statically CDN](https://statically.io/) to serve responsive images.

## Usage

### Install
`npm i @joeinnes/statically-image`

### Import
Note that except for the 'alt' tag, all tags are optional and their default values are shown in the example below.
```
<script>
  import { Image } from '@joeinnes/statically-image';
</script>

<Image src="https://kit.svelte.dev/images/svelte-kit-machine.webp" alt="Some alt text which is required" aspectRatio="16/9" objectFit="cover" quality="80"  loading="lazy" hidpi={true} />
```

You can also configure alternative providers by specifying a 'name' and a 'key'.

```
import { Image, provider } from '$lib/index';
provider.set({
  name: 'cloudimage',
  key: 'cloudimage_token'
});
```

Currently supported:
* Cloudimage
* Cloudinary (create an HTTP Proxy media source)
* 
## Notes and Caveats

hidpi mode will load the image double size.

You should provide a full URL to the image, not a relative path.

In case there's no supported extension (gif, jpg, jpeg, png, or webp) listed in the image path, then the component will render the original, unoptimised version (https://twitter.com/staticallyio/status/1405700757475663873). You may be able to work around this by adding an ignored query (eg: `&image.jpg`) to the end of the URL or somewhere in the path, but results may vary. For example, https://pbs.twimg.com/media/FEBzSvdWYAoVJGc?format=jpg&name=medium does not contain '.jpg', and appending `&image.jpg` does not work. However, you can add the .jpg after the ID: `https://pbs.twimg.com/media/FEBzSvdWYAoVJGc.jpg?format=jpg&name=medium`. This will vary depending on the origin.
