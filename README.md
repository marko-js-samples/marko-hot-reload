Marko Sample - Hot Reloading
===============================
Marko provides a hot-reloading feature that allows templates to automatically be reloaded without a restart. Your app must explicitly turn on this feature as described below and you would typically only enable hot-reloading in development (not production).

# Get started

```bash
git clone git@github.com:marko-js-samples/marko-hot-reload.git
cd marko-hot-reload
npm install
node server
```

# Enabling Hot Reloading

There are two steps to allowing Marko templates to be hot reloaded on the server:

___Step 1: Enable hot reloading:___

```javascript
require('marko/hot-reload').enable();
```

___Step 2: Tell the Marko runtime when a template is modified:___

Marko does not come with a mechanism for watching Marko template files for changes. Your app must include the code for watching a change to a file and then pass along the full template path to Marko so that the modified template can be hot reloaded. For example, using the [builtin fs file watching service](https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener):

```javascript
require('fs').watch(templatesDir, function (event, filename) {
    if (/\.marko$/.test(filename)) {
        // Resolve the filename to a full template path:
        var templatePath = path.join(templatesDir, filename);

        console.log('Marko template modified: ', templatePath);

        // Pass along the *full* template path to marko
        require('marko/hot-reload').handleFileModified(templatePath);
    }
});
```

The [chokidar](https://github.com/paulmillr/chokidar) module provides more robust file watching functionality that works across most OSs.

# Using browser-refresh

You can also use the [browser-refresh](https://github.com/patrick-steele-idem/browser-refresh) module to watch for changes to Marko template files. You just need to add the following line of code into the main script for your app:

```javascript
require('marko/browser-refresh').enable();
```

Then you would use [browser-refresh](https://github.com/patrick-steele-idem/browser-refresh) to launch your Node.js app. For example:

```bash
npm install browser-refresh --global
browser-refresh server.js
```

In addition, you'll need to include the `<browser-refresh>` tag in your main page template as shown below:

```xml
<!doctype html>
<html>
    <head>
        ...
    </head>
    <body>
        ...

        <browser-refresh enabled="true" />
    </body>
</html>
```

In addition, you will need to let the `browser-refresh` process launcher know when your server is ready so that it can trigger a refresh of all web pages at the correct time. This can be done using code similar to the following:

```javascript
app.listen(port, function() {
    console.log('Listening on port %d', port);

    if (process.send) {
        process.send('online');
    }
});
```

For more details, please see the docs for the [browser-refresh](https://github.com/patrick-steele-idem/browser-refresh) module.


