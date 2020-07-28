![](https://badgen.net/badge/Editor.js/v2.0/blue)

# People Tool for Editor.js

People Tool for the [Editor.js](https://editorjs.io).


## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @groupher/editor-collapse
```

Include module at your application

```javascript
const People = require('@groupher/editor-people');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.


## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    people: People,
  }
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

This Tool returns data object.

```json
{
    "type" : "people",
    "data" : {
      title: "",
      content: "",
    }
}
```

