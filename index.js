// main character array for the selection of password
const characterSet =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e",
"f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`",
"!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

// variables
const slider= document.getElementById("slider");
const numbersFilter= document.getElementById("numbers");
const symbolsFilter= document.getElementById("symbols");
const password= document.querySelector(".password-field");
const clickBtn= document.querySelector(".btn");

// custom values
let useNumbers= true;
let useSymbols= true;
let passLength= 6;

slider.addEventListener('input', () => {
    sliderText.innerText = `${slider.value}`;
    passLength= slider.value;
})

clickBtn.addEventListener("submit", (e) => {
    // e.preventDefault();

    let randomPass= newRandomPassword(passLength);
    console.log(newRandomPassword(passLength));
    password.textContent= randomPass;
    
})

// checkbox events
numbersFilter.addEventListener("change", (e) => {
	useNumbers = e.target.checked;  // sets boolean value
	// console.log(useNumbers);
});

symbolsFilter.addEventListener("change", (e) => {
	useSymbols = e.target.checked;  // sets boolean value
	// console.log(useSymbols);
});

// filter main characters array   

function filterNumbers(customArr) {
	let numberArr = ["0","1","2","3","4","5","6","7","8","9",];

	return customArr.filter((char) => !numberArr.includes(char));
}

function filterSymbols(customArr) {
	let symbolArr = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/",];

	return customArr.filter((char) => !symbolArr.includes(char));
    // console.log(symbolArr.includes(char));
}

// filter function
const filterCharacters = (customArr) => {
    if(!useNumbers && !useSymbols){
        // important logic
        let customFilter= filterNumbers(customArr);
        let filter= filterSymbols(customFilter);
        return filter;
    } else if(!useNumbers){
        let filter= filterNumbers(customArr);
        return filter;
    } else if(!useSymbols){
        let filter= filterSymbols(customArr);
        return filter;
    } else {
        return customArr;
    }
}

// main function
const newRandomPassword = (length) => {
    let newPassword="";
    let finalArr= filterCharacters(characterSet);
    for(let i=0; i < length; i++){
        newPassword += finalArr[Math.floor(Math.random() * finalArr.length)];
    }
    return newPassword;
}



