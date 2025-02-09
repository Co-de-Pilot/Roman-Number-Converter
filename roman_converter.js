const digits = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
const romanDigits = [
  "M",
  "CM",
  "D",
  "CD",
  "C",
  "XC",
  "L",
  "XL",
  "X",
  "IX",
  "V",
  "IV",
  "I",
];

let intToRoman = function (number) {
  let roman = "";
  digits.map((digit, index) => {
    while (number >= digit) {
      roman += romanDigits[index];
      number -= digit;
    }
  });
  return roman;
};

let romanToInt = function (s) {
  let convertRoman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let characterArray = s.split("");
  let numberArray = characterArray.map(
    (character) => (character = convertRoman[character])
  );
  let valueArray = numberArray.map((character, index) =>
    negativSetter(index, numberArray)
  );
  return valueArray.reduce((acc, number) => acc + number);
};

function negativSetter(i, array) {
  if (array[i] < array[i + 1]) {
    array[i] = -Math.abs(array[i]);
  }
  return array[i];
}

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
    resultField.value = intToRoman(Number.parseInt(arabicField.value));
  } else if (romanField.reportValidity() && romanField.value != "") {
    resultField.value = romanToInt(romanField.value);
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
