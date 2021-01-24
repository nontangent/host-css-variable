# Host CSS Variable
This package enable to host-scoped css variable(custom property) by using `hvar(--name)`.

## Installation

Install host-css-variable to dev dependencies

```
$ npm i -D host-css-variable
```

and add `host-css-variable/loader` to your `webpack.config.js`

```webpack.config.js
module.exports = {
	//...... 
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Add 'host-css-variable/loader' after the SCSS Loaders.
          { loader: 'host-css-variable/loader' }
        ],
      }
    ],
  },
}
```

## Usage Example

`child.component.scss`

```child.component.scss
@import '~host-css-variable/host-variable';
$host: host('child');

:host {
  // Define host css variable and default value. It can be accessed in host scope.
  @include hvar(--width, 200px);
  @include hvar(--height, 100vh);
}

:host {
	display: block;
  // Using defined host css variable.
  width: hvar(--width);
  height: hvar(--height);
}

```

`parent.component.scss`

```parent.component.scss
@import '~host-css-variable/host-variable';
$host: host('parent');

:host {
	@include hvar(--width, 1200px);
	@include hvar(--height, 100vh);
}

:host {
	display: block
	width: hvar(--width);
	height: hvar(--height);

	child {
		--width: calc(hvar(--width) / 2);
		--height: hvar(--height);
	}
}
```

`grandparent.component.scss`

```grandparent.component.scss
@import '~host-css-variable/host-variable';
$host: host('grandparent');

:host {
	@include hvar(--width, 1920px);
	@include hvar(--height, 100vh);
}

:host {
	display: block
	width: hvar(--width);
	height: hvar(--height);

	parent {
		--width: 1600px;
		--height: hvar(--height);
	}
}
```
 

In this case, the width of components is following.

|  components  |  width | height |
|  :----       |  ----: |  ----: |
|  grandparent | 1920px | 100vh  |
|  parent      | 1600px | 100vh  |
|  child       |  800px | 100vh  |