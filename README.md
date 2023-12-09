# Svelte Image

A Svelte component which uses CDNs to serve responsive images.

## Usage

### Install

`npm i @joeinnes/svelte-image`

### Import

Note that except for the 'alt' tag, all tags are optional and their default values are shown in the example below.

```
<script>
  import { Image } from '@joeinnes/svelte-image';
</script>

<Image src="https://kit.svelte.dev/images/svelte-kit-machine.webp" alt="Some alt text which is required" aspectRatio="16/9" objectFit="cover" quality="80"  loading="lazy" hidpi={true} />
```

By default, the [Statically](https://statically.io) will be used. You can configure alternative providers by specifying a 'name' and a 'key'.

```
import { Image, provider } from '@joeinnes/svelte-image';
provider.set({
  name: 'cloudimage',
  key: 'cloudimage_token'
});
```

Currently supported:

- Statically (zero configuration)
- Cloudimage (use your token as the 'key')

```
provider.set({
  name: 'cloudimage',
  key: 'cloudimage_token'
})
```

- Cloudinary (you need to create an HTTP Proxy media source, and then use your cloud name as the key)

```
provider.set({
  name: 'cloudinary',
  key: 'cloud_name'
})
```

## Notes and Caveats

- hidpi mode will load the image double size for retina displays.

- You should provide a full URL to the image, not a relative path.

- In case you're using Statically (ie: the default) and there's no supported extension (gif, jpg, jpeg, png, or webp) listed in the image path, then the component will render the original, unoptimised version (https://twitter.com/staticallyio/status/1405700757475663873). You may be able to work around this by adding an ignored query (eg: `&image.jpg`) to the end of the URL or somewhere in the path, but results may vary. For example, https://pbs.twimg.com/media/FEBzSvdWYAoVJGc?format=jpg&name=medium does not contain '.jpg', and appending `&image.jpg` does not work. However, you can add the .jpg after the ID: `https://pbs.twimg.com/media/FEBzSvdWYAoVJGc.jpg?format=jpg&name=medium`. This will vary depending on the origin.

## Aspect Ratio

Don't know exactly what aspect ratio your container will have when it loads on a user's screen? Use `bind:clientWidth` and `bind:clientHeight` to calculate the aspect ratio:

```
<script>
  import { Image } from '@joeinnes/svelte-image';
  let clientWidth = 0;
  let clientHeight = 0;
</script>

<div bind:clientWidth bind:clientHeight>
  <Image src="https://kit.svelte.dev/images/svelte-kit-machine.webp" alt="Some alt text which is required" aspectRatio={clientWidth + "/" + clientHeight} objectFit="cover" quality="80"  loading="lazy" hidpi={true} />
</div>
```

## Have full control of your server?

Then this might not be the best package for you.

This component is more suitable if you:

- don't have a server
- don't have storage space/processing power on the server
- need images to be cropped/resized/whatever at runtime rather than at buildtime
- want something that works with SvelteKit
- don't have a CDN in place already

If you:

- have a CDN in place
- need more finegrained control over image processing
- don't want third parties interfering with your images

You might instead want to check out https://github.com/matyunya/svelte-image
