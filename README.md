# cindyjs-apps

Repackaged exhibit-ready CindyJS Applications.

This repository hosts [CindyJS](https://github.com/CindyJS/CindyJS) applications which were adapted to be used in 
IMAGINARY exhibitions. Adaptations might include:

- Visual changes
- Themeing capabilities (to support light backgrounds, dark backgrounds, etc)
- i18n (translation, localization, etc.)
- etc.

Each application in this repository should (ideally):

- Run independently (simply copied to the public directory of a web server)
- Run in an IFRAME (launched by [AppLauncher Mark II](https://github.com/IMAGINARY/applauncher2) or other launcher) 
- Run in a standard modern desktop browser
- Run in a mobile browser (tablets and mobile phones if possible)
- Run in a the electron browser
- Run in https or http

Since these apps come from the CindyJS distribution or external sources our modifications to them should ideally
 be applied on top of the original sources with as little modification to them as possible. We should strive to
 easily incorporate any updates and enhancements to the originals.

## Installation

Just copy the files to the public folder of a web server. Run an app by opening its main file (index.html) from
within its directory.

To only install one or more apps (instead of the whole collection) copy the app directory and the **common** directory.

## i18n

To Do.

A library for i18n that can be modularly applied to Cindy apps for easy translation should be added to this package.

## Themeing

To Do.

A library for themeing that can be modularly applied to Cindy apps should be added to this package.

## Adding new apps

The directory *sample* has a template of the files needed to add a new application.

## Application adaptation

Some standard steps performed to adapt apps:

- Make sure the app's canvas is wrapped in `<div class="app"></div>`
- In the CreateCindy call, on the **ports** attribute add `fill: "window"`
- Use a <canvas> with no width or height
