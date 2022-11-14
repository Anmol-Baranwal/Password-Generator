// main character array for the selection of password
const characterSet =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e",
"f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`",
"!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

// variables
const slider= document.getElementById("slider");
const numbersFilter= document.getElementById("numbers");
const symbolsFilter= document.getElementById("symbols");
const visibileFilter= document.getElementById("visibility");
const password= document.querySelector(".password");
const clickBtn= document.querySelector(".btn");
let txt= document.querySelector(".password");
const copy= document.querySelector(".copy");
const copyIcon= document.querySelector(".toggled");
let eyeVisible= document.querySelector(".eye-visible");
const toggleDarkMode= document.querySelector(".toggle-btn");
const root = document.querySelector(':root');

// custom values
let useNumbers= true;
let useSymbols= true;
let passLength= 6;
let useVisibility= true;
let check=0;
let storePassword= "";

// slider for getting password length
slider.addEventListener('input', () => {
    sliderText.innerText = `${slider.value}`;
    passLength= slider.value;
})

// generate password button
clickBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resetCopy();
    check=1;

    let randomPass= newRandomPassword(passLength);
    password.innerText= randomPass;
    storePassword= randomPass;

    if(useVisibility == false)  hidePassword();  
    
})

// to toggle the dark mode 
toggleDarkMode.addEventListener("click", () => {
    if(!toggleDarkMode.classList.contains("toggled")){
        toggleDarkMode.classList.add("toggled");
        root.style.setProperty('--bg-dark', '#e3e9e6');
        root.style.setProperty('--bg-light', '#1F2937'); // --highlight: #4ADF86   --extra-fade: #888888
        root.style.setProperty('--fade', '#3d4755'); 
        root.style.setProperty('--btn-bg-color', '#1F2937');
        // root.style.setProperty('--btn-color', '#fff');
        root.style.setProperty('--state-copy', '#1F2937');
        root.style.setProperty('--scrollbar-bottom', '#1F2937');
        document.querySelector(".svg-style").style.fill="#1F2937";
        document.querySelector(".svg-style").style.color="#e3e9e6";
    }else if(toggleDarkMode.classList.contains("toggled")){
        toggleDarkMode.classList.remove("toggled");
        root.style.setProperty('--bg-dark', '#1F2937');
        root.style.setProperty('--bg-light', '#fff'); // --highlight: #4ADF86   --extra-fade: #888888
        root.style.setProperty('--fade', '#D5D4D8'); 
        root.style.setProperty('--btn-bg-color', '#4ADF86');
        root.style.setProperty('--state-copy', '#51c07e');
        root.style.setProperty('--scrollbar-bottom', '#D5D4D8');
        document.querySelector(".svg-style").style.fill="#10B981";
        document.querySelector(".svg-style").style.color="#1F2937";
    }
    
})

// checkbox events

// use of numbers 
numbersFilter.addEventListener("change", (e) => {
	useNumbers = e.target.checked;  // sets boolean value
	// console.log(useNumbers);
});

// use of symbols
symbolsFilter.addEventListener("change", (e) => {
	useSymbols = e.target.checked;  // sets boolean value
	// console.log(useSymbols);
});

// use of visibility of password
visibileFilter.addEventListener("change", (e) => {
    useVisibility = e.target.checked;
})

// filter main characters array   

// filter numbers
function filterNumbers(customArr) {
	let numberArr = ["0","1","2","3","4","5","6","7","8","9",];

	return customArr.filter((char) => !numberArr.includes(char));
}

// filter symbols
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

// get random password 
const newRandomPassword = (length) => {
    let newPassword="";
    let finalArr= filterCharacters(characterSet);
    for(let i=0; i < length; i++){
        newPassword += finalArr[Math.floor(Math.random() * finalArr.length)];
    }
    return newPassword;
}

// to change the copy icon on clicking
// copy.addEventListener("click", (e) => {
const copyPassword = async () => {
    if(copyIcon.classList.contains("toggled")){
        copyIcon.classList.remove("toggled","fa-copy","fa-regular");
        copyIcon.classList.add("fa-solid","fa-check");
    }
    setTimeout(() => {
        resetCopy();
    }, 2500);
    try {
      await navigator.clipboard.writeText(storePassword);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
}
// })

// to change the password to * with appropriate length
const hidePassword = () => {
    if(check){
        let hidePass= "";
        for(let i=0; i < passLength; i++){
            hidePass+="*";
        }
        password.innerText= hidePass;
    }
}

// reset the values and necessary components
const resetCopy = () => {

    if(useVisibility){
        makePasswordVisible();
    }else{
        makePasswordNotVisible();
    }

    if(!copyIcon.classList.contains("toggled")){
        copyIcon.classList.remove("fa-check","fa-solid");
        copyIcon.classList.add("toggled","fa-copy","fa-regular");
    }
}

// changing the visible icon 
const makePasswordVisible = () => {
    eyeVisible.classList.remove("fa-eye","eye-not-visible");
    eyeVisible.classList.add("eye-visible","fa-eye-slash");
    eyeVisible= document.querySelector(".eye-visible");
}

const makePasswordNotVisible = () => {
    eyeVisible.classList.remove("eye-visible","fa-eye-slash");
    eyeVisible.classList.add("fa-eye","eye-not-visible");
    eyeVisible= document.querySelector(".eye-not-visible");
    hidePassword();
}

// functionality to make password visible or not based on default values
const visiblePassword = () => {
    if(eyeVisible.classList.contains("eye-visible")){
        makePasswordNotVisible();

    } else if(eyeVisible.classList.contains("eye-not-visible")) {
        makePasswordVisible();
        check==0 ?  password.innerText= "Still Waiting ?" : password.innerText= storePassword; 
    }
}
