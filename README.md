# Host CSS Variable
This is a library that pseudo-encapsulates host CSS variables for component based architectures.

## Install
```
$ npm install host-css-variable
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
					// Add 'host-css-valiable/loader' under the SCSS Loaders 
					{ loader: 'host-css-variable/loader' }
        ],
      }
    ],
  },
}
```

## Usage
```child.component.scss
@import '~host-css-variable/host-variable';
$host: host('child');

:host {
	@include host-variable($host, --width, 200px);
	@include hvar($host, --height, 200px);
}

:host {
	display: block;
	width: hvar(--width);
	height: hvar(--height);
}

```

```parent.component.scss
@import '~host-css-variable/host-variable';
$host: host('parent');

:host {
	@include hvar(--width, 1200px);
	@include hvar(--height, 200px);
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

In this case, the width of the parent component is 1200px and the width of the child component is 600px.

