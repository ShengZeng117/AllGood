



function show(anything){
    document.querySelector('.textBox').value = anything;
}
let dropdown = document.querySelector('.dropBox');
dropdown.onclick = function(){
    dropdown.classList.toggle('active')
}


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

let  overview = document.getElementById("overview");
let  usage = document.getElementById("usage");
let  datas = document.getElementById("datas");
let  profile = document.getElementById("profile");
let changePass = document.getElementById("changePass");

let over = document.getElementById("over");
let usag = document.getElementById("usag");
let data = document.getElementById("data");
let prof = document.getElementById("prof");
let changeSucc = document.getElementById("changeSucc");
let backToProf = document.getElementById("backToProf");
let typeS = document.getElementById("type");

let btn = document.getElementById('btn');


function removeAllLeft(){
    overview.style.backgroundColor = "#3D5967";
    overview.style.color = "white";
    usage.style.backgroundColor = "#3D5967";
    usage.style.color = "white";
    datas.style.backgroundColor = "#3D5967";
    datas.style.color = "white";
    profile.style.backgroundColor = "#3D5967";
    profile.style.color = "white";
}
overview.onclick = function(){
    over.style.display = "flex";
    prof.style.display = "none";
    data.style.display = "none";
    usag.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    overview.style.backgroundColor = "#F4F2F2";
    overview.style.color = "black";
}

usage.onclick = function(){
    usag.style.display = "block";
    prof.style.display = "none";
    data.style.display = "none";
    over.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
datas.onclick = function(){
    data.style.display = "flex";
    prof.style.display = "none";
    over.style.display = "none";
    usag.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
profile.onclick = function(){
    prof.style.display = "flex";
    over.style.display = "none";
    data.style.display = "none";
    usag.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}

typeS.onclick = function(){
    data.style.display = "flex";
    prof.style.display = "none";
    over.style.display = "none";
    usag.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
    getvalue();
}

changePass.onclick = function(){
    prof.style.display = "none";
    changePassword.style.display = "flex";
}

btn.onclick = function(){
    changePassword.style.display = "none";
    changeSucc.style.display = "flex";
}
backToProf.onclick = function(){
    changeSucc.style.display = "none";
    prof.style.display = "flex";
    //记录最后更改的password到数据库中

}




const pPattern = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
//check password
function checkPassword(data){
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

    if (pPattern.test(data)){
        passNew.style.display = 'inline-block';
        failNew.style.display = 'none';
    }else{
        failNew.style.display = 'inline-block';
        passNew.style.display = 'none';
    }
    console.log(pwd);
}

function recheckPassword(data){
    if(data==pwd){
        passCon.style.display = ('inline-block');
        failCon.style.display = ('none');
    }else{
        failCon.style.display = ('inline-block');
        passCon.style.display = ('none');
    }
    if(passNew.style.display == 'inline-block' && passCon.style.display == 'inline-block'){
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


let table = document.getElementById('dataOverview');
let totalUsage = document.getElementById('totalUsage');
let totalRow = table.rows.length-1;
let sum = 0;
for(var i=1; i<totalRow; i++){
    sum += Number(table.rows[i].cells[4].innerHTML);
    totalUsage.innerHTML = sum;
}

function getvalue(){
    const index = typeS.selectedIndex
    console.log(typeS.options[index].value)
    return typeS.options[index].value
}

