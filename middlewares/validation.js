
const asynchandler = require("express-async-handler")
exports.ReguxPassword = asynchandler(async (password) => {
    // Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.
    let reguxPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/

    if (reguxPassword.test(password)) {
        // console.log({"password":password});
        // console.log("AAAAAAAAA");
    }
    else {
        throw new Error(`Invalid Password`)

    }
})

exports.Emailvalidation = asynchandler(async (email) => {
    const emailRegex =
        new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    const isValidEmail = emailRegex.test(email);

    if(! isValidEmail){
        throw new Error(`Invalid ${email} address`)
    }
})


exports.PhoneValidation = async(phoneNumber)=>{
    const phonePattern = /^[6-9]\d{9}$/;
    const result = phonePattern.test(phoneNumber);
    if(!result){
        throw new Error(`Invalid ${phoneNumber} `)
    }
    


}



