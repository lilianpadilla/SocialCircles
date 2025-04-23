//PASSWORD VALIDATION

// password input + each validation message
const pass = document.getElementById("password");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

// .onkeyup checks requirements every time they type a character
pass.onkeyup = () => {
  const hasLower = /[a-z]/.test(pass.value);
  const hasUpper = /[A-Z]/.test(pass.value);
  const hasNumber = /\d/.test(pass.value);
  const isLongEnough = pass.value.length >= 8;

  if (hasLower) {
    letter.className = "valid";
  } else {
    letter.className = "invalid";
  }
  
  if (hasUpper) {
    capital.className = "valid";
  } else {
    capital.className = "invalid";
  }
  
  if (hasNumber) {
    number.className = "valid";
  } else {
    number.className = "invalid";
  }
  
  if (isLongEnough) {
    length.className = "valid";
  } else {
    length.className = "invalid";
  }
  
};
