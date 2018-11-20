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


## Apps included

### Classic apps

- ausparken
- doppelpendel
- fish
- image-spiral
- iornament
- kaleidoskop
- platonic-solids
- polytope-morpher
- solitaire
- sphere-chaos
- tree

### Music apps

- euclidian-rhythm
- pachelbel-canon
- mozart-dice
- whitney
- sequenzer

### Auxiliary apps

- info
- sample

## Installation

Just copy the files to the public folder of a web server. Run an app by opening its main file (index.html) from
within its directory.

To only install one or more apps (instead of the whole collection) copy the app directory and the **common** directory.


## Embedding

Each app includes an app.html file in which it runs at a fixed size and an index.html file that embeds the app in a 
container that resizes to fill the whole window by using the cindy-viewer library. See the "viewer/README.md" file
for instructions to embed the apps in your own pages / apps in containers of any size.

## i18n

The apps can be loaded in a different language by passing the language code through the `lang` query string parameter.
For instance:

`index.html?lang=de`

The default language is always english by default. 

To add translations simply drop a `<iso language code>.json` file inside the appropriate `tr` directory.

The [i18n4js](https://github.com/IMAGINARY/i18n4js) library (by IMAGINARY) is used to read the language code from the query string and use it to dynamically 
load a translation file from the `<appname>/tr` directory.

## Themeing

To Do.

A library for themeing that can be modularly applied to Cindy apps should be added to this package.

## Adding new apps

The directory *sample* has a template of the files needed to add a new application.

## Application adaptation

Some standard steps performed to adapt fixed size apps (those that require a specific resolution to work well):

- Make sure the app's canvas is wrapped in `<div class="app-fixedsize"></div>`
- In the CreateCindy call, on the **ports** attribute add the `width` and `height` attributes.
- Use a <canvas> with no width or height
- Create an index.html that loads the app through the cindy-viewer

### Making CindyJS apps translatable

1. **Make strings translatable**

    Change all hard-coded strings to calls to the `international` function passing a unique string id as parameter:
  
    `international("DIFFICULTY_EASY")`
  
1. **Include the i18n4js library**

    Add the following to the header below the other `<script>` elements:
    
    `<script type="text/javascript" src="../common/js/i18n4js-1.3.0.min.js"></script>`

1. **Add the following snippet before the call to createCindy:**

    ```
    var ready = createCindy.waitFor('i18n');
    var translations = {};
    IMAGINARY.i18n.init().then(function(lang){
      translations[lang] = IMAGINARY.i18n.getStrings();
      ready();
    }).catch(function(err){
      console.log("Error loading translation: " + err);
      throw err;
    });
    ```
    
1. **Add the following options to the call to createCindy:**

    ```
    language: IMAGINARY.i18n.getLang(),
    translations: translations
    ```
    
# License

This compilation, adaptations, instructions and the i18n4js library:

Copyright 2017 IMAGINARY gGmbH.

Licensed under the Apache 2 license.

The CindyJS library:

Copyright 2013-2017 Jürgen Richter-Gebert

See the README file in the individual app folders for their own copyright and license information.
