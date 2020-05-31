# Calc Loader
This is a webpack Loader for making functions available in CSS calc() function by interpolation.

## Installation
```
$ npm i -D calc-loader
```

## Usage

```sample.scss
@function pow($num) {
	@return $num * $num;
}

div {
	width: calc(pow(2) * 2); // => width: calc(#{pow(2))} * 2);
}
```

```webpack.config.js
module.exports = {
	// ......, 
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
				// ..., 
				// Add ''calc-loader' under the SCSS Loaders 
					{ 
						loader: 'calc-loader',
						options: {
							functions: ['pow']
						},
					}
        ],
      }
    ],
  },
}
```


## LICENSE
MIT
