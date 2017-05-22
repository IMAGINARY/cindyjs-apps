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

Some standard steps performed to adapt apps:

- Make sure the app's canvas is wrapped in `<div class="app"></div>`
- In the CreateCindy call, on the **ports** attribute add `fill: "window"`
- Use a <canvas> with no width or height

### Making CindyJS apps translatable

1. **Make strings translatable**

    Change all hard-coded strings to calls to the `international` function passing a unique string id as parameter:
  
    `international("DIFFICULTY_EASY")`
  
1. **Include the i18n4js library**

    Add the following to the header below the other `<script>` elements:
    
    `<script type="text/javascript" src="../common/js/i18n4js-1.2.0.min.js"></script>`

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
    