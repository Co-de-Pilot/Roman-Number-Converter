/* ----------------------------------------------- */
/* A római és arab számjegy konstansok             */
/* ----------------------------------------------- */
const convertRoman = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};
const romanDigits = Object.keys(convertRoman);
const arabicDigits = Object.values(convertRoman);

/* ----------------------------------------------- */
/* Arab számról rómaira konvertálás                */
/* ----------------------------------------------- */
let arabicToRoman = function (inputNumber) {
  let roman = "";
  arabicDigits.map((digit, index) => {
    while (inputNumber >= digit) {
      roman += romanDigits[index];
      inputNumber -= digit;
    }
  });
  return roman;
};

/* ----------------------------------------------- */
/* Római számról arabra konvertálás                */
/* ----------------------------------------------- */
let romanToArabic = function (InputString) {
  let characterArray = InputString.split("");
  let numberArray = characterArray.map(
    (character) => (character = convertRoman[character])
  );
  return numberArray.reduce((acc, number, index) => {
    if (numberArray[index] < numberArray[index + 1]) {
      return acc - number;
    } else {
      return acc + number;
    }
  });
};

/* ----------------------------------------------- */
/* Az INPUT és BUTTON konstansok meghatározása     */
/* ----------------------------------------------- */
const arabicField = document.querySelector("#arabic-number");
const romanField = document.querySelector("#roman-number");
const resultField = document.querySelector("#result");
const convertButton = document.querySelector(".convert");
const clipboardButton = document.querySelector(".clipboard");

/* ----------------------------------------------- */
/* A FORM SUBMIT eseménykezelőjének beállítása     */
/* ----------------------------------------------- */
document.querySelector(".js-form").addEventListener("submit", formSubmit);
function formSubmit(event) {
  event.preventDefault();
}

/* ----------------------------------------------- */
/* Római szám input eseménykezelőjének beállítása  */
/* ----------------------------------------------- */
arabicField.addEventListener("keyup", () => {
  arabicField.reportValidity(); //HTML Attribútum szerinti validáció ellenőrzés
  romanField.value = "";
});

/* ----------------------------------------------- */
/* Római szám input eseménykezelőjének beállítása  */
/* ----------------------------------------------- */
romanField.addEventListener("keyup", () => {
  romanField.reportValidity(); //HTML Attribútum szerinti validáció ellenőrzés
  arabicField.value = "";
});

/* ----------------------------------------------- */
/* Konvertálás gomb eseménykezelőjének beállítása  */
/* ----------------------------------------------- */
convertButton.addEventListener("click", () => {
  if (arabicField.reportValidity() && arabicField.value != "") {
    resultField.value = arabicToRoman(Number.parseInt(arabicField.value));
  } else if (romanField.reportValidity() && romanField.value != "") {
    resultField.value = romanToArabic(romanField.value);
  } else {
    resultField.value = "Please enter a valid input!";
  }
});

/* ----------------------------------------------- */
/* Vágólapra másolás beállítása                    */
/* ----------------------------------------------- */
clipboardButton.addEventListener("click", () => {
  navigator.clipboard.writeText(resultField.value);
});
