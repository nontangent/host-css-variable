const loaderUtils = require('loader-utils');
const functionsResolver = require('./functions-resolver');

module.exports = function(source, map) {
  // this.cacheable();
  const options = loaderUtils.getOptions(this);
	const functions = options.functions || [];
	source = functionsResolver(source, options.functions);

  this.callback(null, source, map);
}

