function detectFunctions(src, i, functions=[]){
	for (const name of functions) {
		if (src.substring(i-name.length, i) == name){
			return name.length;
		}
	}
	
	return -1;
}

function interpolation(s, i, j) {
	return s.slice(0, i) + '#{'  + s.substring(i, j) + '}' + s.slice(j);
}

module.exports = function(src, functions=[]) {
	const separators = [];

	var re = /[\ \:\,]calc/g;
	while((match = re.exec(src)) != null){
		
		let i = match.index;
		let s, e = null;
		let flag = true;
		
		const stack1 = [];
		const stack2 = [];
		const stack3 = [];

		while((flag || stack1.length != 0) && i < src.length) {
			i ++;
			if (src[i] == '(') {
				
				let len = detectFunctions(src, i, functions);
				if(len != -1 && stack2.length == 0) {
					stack3.push([i, len]);
				}

				stack1.push(i);
				flag = false;

			} else if (src[i] == ')') {
				s = stack1.pop();
				e = i;

				if (stack2.length == 0 && stack3.length > 0 && 
					s == stack3[stack3.length-1][0]
				) {
					let [j, len] = stack3.pop();
					// console.log(`>>>> ${src.substring(j - len, e+1)}`);
					separators.push([j-len, e+1]);
				}

			} else if (src[i] == '{') {
				stack2.push(i);
			} else if (src[i] == '}') {
				stack2.pop();
			} else if (src[i] == ';') {
				break;
			}
		}
	}

	let c = 0;
	for (const [i, j] of separators){
		src = interpolation(src, i+c, j+c);
		c = c + 3;
	}
	return src;

}
