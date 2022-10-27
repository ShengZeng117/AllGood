let changePass = document.getElementById("changePass");
let changeSucc = document.getElementById("changeSucc");
let backToProf = document.getElementById("backToProf");
let changePassword = document.getElementById("changePassword");
let lowerCase = document.getElementById('lower');
let upperCase = document.getElementById('upper');
let numberCase = document.getElementById('number');
let minLength = document.getElementById('length');
let specialCase = document.getElementById('special');
let passOld = document.getElementById('passOld');
let failOld = document.getElementById('failOld');
let passNew = document.getElementById('passNew');
let failNew = document.getElementById('failNew');
let passCon = document.getElementById('passCon');
let failCon = document.getElementById('failCon');
let newPassword = document.getElementById('newPassword');
let pwd;


changePass.onclick = function () {
    prof.style.display = "none";
    changePassword.style.display = "flex";
}

btn.onclick = function () {
    changePassword.style.display = "none";
    changeSucc.style.display = "flex";
}
backToProf.onclick = function () {
    changeSucc.style.display = "none";
    prof.style.display = "flex";


}




const pPattern = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//check password
function checkPassword(data) {
    pwd = data;
    const lower = new RegExp('(?=.*[a-z])')
    const upper = new RegExp('(?=.*[A-Z])')
    const number = new RegExp('(?=.*[0-9])')
    const length = new RegExp('(?=.{8,})')
    const special = new RegExp('(?=.*[!@#\$%\^&\*])')

    //check lowercase letter
    if (lower.test(data)) {
        lowerCase.classList.add('valid')
    } else {
        lowerCase.classList.remove('valid')
    }
    //check uppercase letter
    if (upper.test(data)) {
        upperCase.classList.add('valid')
    } else {
        upperCase.classList.remove('valid')
    }
    //check number
    if (number.test(data)) {
        numberCase.classList.add('valid')
    } else {
        numberCase.classList.remove('valid')
    }
    //check special
    if (special.test(data)) {
        specialCase.classList.add('valid')
    } else {
        specialCase.classList.remove('valid')
    }
    //check length
    if (length.test(data)) {
        minLength.classList.add('valid')
    } else {
        minLength.classList.remove('valid')
    }

    if (pPattern.test(data)) {
        passNew.style.display = 'inline-block';
        failNew.style.display = 'none';
    } else {
        failNew.style.display = 'inline-block';
        passNew.style.display = 'none';
    }
    console.log(pwd);
}

function recheckPassword(data) {
    if (data == pwd) {
        passCon.style.display = ('inline-block');
        failCon.style.display = ('none');
    } else {
        failCon.style.display = ('inline-block');
        passCon.style.display = ('none');
    }
    if (passNew.style.display == 'inline-block' && passCon.style.display == 'inline-block') {
        btn.removeAttribute("disabled");
    }
}

function checkOldPassword(dbP,InputP){
    if(dbP == InputP){
        passOld.style.display = ('inline-block');
        failOld.style.display = ('none');
    }else{
        failOld.style.display = ('inline-block');
        passOld.style.display = ('none');
    }
}