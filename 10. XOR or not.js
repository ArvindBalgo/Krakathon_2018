function XOR(a,b){
	return !!((a-b)*(a-b));
}

console.info(true,true,XOR(true,true));
console.info(true,false,XOR(true,false));
console.info(false,true,XOR(false,true));
console.info(false,false,XOR(false,false));