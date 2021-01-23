import { hostCssVariableResolver} from './host-css-variable-resolver';

export default function(src: string, map: any) {
	this.callback(null, hostCssVariableResolver(src), map);
	return;
}
