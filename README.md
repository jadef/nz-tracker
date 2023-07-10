# nz-tracker

This pet project is a crossroads of my development/design exploration of building a standalone vue.js application from scratch, combined with the content of our experience of living in New Zealand for four years. I wanted to track that information in a _look back_ type of way, that allows me to reminisce (and dig deeper when desired).

Technically, the `package.json` can show you all the parts, but the important aspects:
1. Webpack and Babel
2. Vue.js and Axios
3. Sass and PostCSS

## Build and precompile (Webpack and Babel)
Check out `webpack.config.js` and `serve.js` for all the details on how all the bundling and loaders come together. the `src/jsconfig.json` shows the actual compiler options and includes.

Babel is the JS compiler, and you can see in `.babelrc` it's configuring for the preset-env with vue.

For JS formatting, eslint is configured in the `.eslintrc.js` file and the rule list is controlled in `.jshintrc`.

## Framework (Vue.js and Axios)

External data management handled by https://jsonbin.io/. Axios is employed to make the API calls.

Grid.vue houses the `get` calls to retrieve the bin and then the individual entries.

Manipulation of the data is handled in the `create.vue`, `delete.vue`, and `update.vue` components to post and or delete respectively.

## Styles (Sass and PostCSS)

Standard Sass compilation

PostCSS is currently used to automatically process brower prefixing needs. The configure for that is `postcss.config.js`.

Linting is handled by stylelint (configured via the `stylelint.config.js` file). Prettier is also configured (via the `.prettierrc` file) for editor rules (along with `.editorconfig`) for those that have that setup.

# Development

Install the packages with `npm`. run `npm start`. If everything is running correctly it will open a new browser window with http://localhost:5080/ and is now watching for any file changes for immediate browsersync.

## Organization
Because of Vue as the primary framework. The src folder is broken down into components (the styles included as isolated linked files).

As usual for a single page app, the `index.html` is the most basic entry point that really just links to the compiled js. `index.js` represents the setup of vue, but really `index.vue` is where things really start.

This shows the "global" component of app and the global styles that can be found in the `scss` folder. You can then follow the components down into the `controls` and `grid` and all subsequent child components for how the app is built.

### Assets folder

One aspect outside of the components folder is the assets, and particularly the `svg` subfolder. To organize and be able to call the `svgComponents` from anywhere the `src/assets/svg/index.js` file is an organizer that gives each file an export identity. The files themselves are `.vue` files, but are just svg code wrapped in a template tag.
