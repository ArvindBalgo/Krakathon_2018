function guess(number){
	let found = false;
	let min = 0;
	let max = 1e+21;
	while(!found && min<max){
		let currentGuess = Math.ceil((min + max)/2);
		let result = prompt("Is your number: "+currentGuess+'?');
		if(result=='<'){
			min = currentGuess;
		}
		else if(result=='>'){
			max = currentGuess;
		}
		else {
			found = true;
			alert('your number is: '+currentGuess)
        }
	}
}