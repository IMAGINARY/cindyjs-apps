# Cindy Viewer

A library to embed fixed size CindyJS applications in containers of any size.
 
## Usage

Include the library in a `<script>` element in the `<head>`.

The CindyJS app will be embedded in any container where you place the following element attributes:

- `data-cindy-src`: URL of the CindyJS app html file
- `data-cindy-appwidth`: *(optional)* Width of the CindyJS app (defaults to 1560)
- `data-cindy-appheight`: *(optional)* Height of the CindyJS app (defaults to 1170)
- `data-cindy-lang`: *(optional)* Language code of the language to load the app with.

If the `data-cindy-lang` attribute is not specified and the `lang` query string parameter is present, it will be passed
on to the CindyJS app.

The hosting page is responsible to set the size of the container; it can be a fixed size or a percentage. The style 
`overflow: hidden` will be applied to the container.

## Philosophy and roadmap

This library was created as an alternative to [iframezoom](https://github.com/IMAGINARY/iframezoom) in JS library form
instead of a whole HTML page and which used declarative attributes instead of query string arguments.

Right now it's not really specific to CindyJS apps and could except for the the default width and height it uses 
(which are the dimensions that CindyJS are optimized for right now) and the way it injects the `lang` query string 
parameters. I resisted the urge to make it a completely independent library because perhaps in the future it will
be extended with other Cindy-specific characteristics... but it may well end up being an independent library.

In the current version apps are centered horizontally and vertically aligned to the top of the container. This could be
made parametric in the future.
 
## License

Licensed under the Apache 2 license.

Copyright 2017 IMAGINARY gGmbH