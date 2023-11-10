


const validateEmail = (email) => {
  const emailValidate =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailValidate.test(email);
  };

 
const validatePhoneNumber = (phoneNumber)=>{
const n=10
const phoneNumberValidation = /^[6789]\d{9}$/
  return phoneNumberValidation.test(phoneNumber)
}


const validatePassword = (password) => {
  const m=8
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,}$/;
  return  passwordValidation.test(password)
}



module.exports= {
  validateEmail,
  validatePassword,
  validatePhoneNumber
}
