const functionsResolver = require('calc-loader/functions-resolver');

module.exports = function(source, map) {
	const functions = ['host-variable', 'host-var', 'hvar'];
	source = functionsResolver(source, functions);
  this.callback(null, source, map);
}
