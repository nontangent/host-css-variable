type FunctionsResolver = (src: string, functions: string[]) => string;
const functionsResolver: FunctionsResolver = require('calc-loader/functions-resolver');
import { customPropertyResolver } from './custom-property-resolver';

export function hostCssVariableResolver(src: string): string {
	const functions = ['host-variable', 'host-var', 'hvar'];
	src = functionsResolver(src, functions);
	src = customPropertyResolver(src)
	return src;
}