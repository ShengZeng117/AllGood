



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
let  creatNew = document.getElementById("creatNew");
let  datas = document.getElementById("datas");
let  profile = document.getElementById("profile");
let  staff = document.getElementById("staff");
let changePass = document.getElementById("changePass");

let over = document.getElementById("over");
let crea = document.getElementById("crea");
let data = document.getElementById("data");
let prof = document.getElementById("prof");
let changeSucc = document.getElementById("changeSucc");
let backToProf = document.getElementById("backToProf");
let staf = document.getElementById("staf");

let btn = document.getElementById('btn');



function removeAllLeft(){
    overview.style.backgroundColor = "#3D5967";
    overview.style.color = "white";
    creatNew.style.backgroundColor = "#3D5967";
    creatNew.style.color = "white";
    datas.style.backgroundColor = "#3D5967";
    datas.style.color = "white";
    profile.style.backgroundColor = "#3D5967";
    profile.style.color = "white";
    staff.style.backgroundColor = "#3D5967";
    staff.style.color = "white";
}
overview.onclick = function(){
    over.style.display = "block";
    prof.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    overview.style.backgroundColor = "#F4F2F2";
    overview.style.color = "black";
}
creatNew.onclick = function(){
    crea.style.display = "block";
    prof.style.display = "none";
    over.style.display = "none";
    data.style.display = "none";
    staf.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}

datas.onclick = function(){
    data.style.display = "block";
    prof.style.display = "none";
    over.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
profile.onclick = function(){
    prof.style.display = "block";
    over.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
staff.onclick = function(){
    staf.style.display = "block";
    prof.style.display = "none";
    over.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
changePass.onclick = function(){
    prof.style.display = "none";
    changePassword.style.display = "inline-block";
}

btn.onclick = function(){
    changePassword.style.display = "none";
    changeSucc.style.display = "inline-block";
}
backToProf.onclick = function(){
    changeSucc.style.display = "none";
    prof.style.display = "inline-block";
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

let areaFilter = document.getElementById('area');
let typeFilter = document.getElementById('type');

let resetFilter = document.getElementById('resetFilter');
resetFilter.onclick = function(){
   areaFilter.value = 'all';
   typeFilter.value = 'all';
}

console.log(areaFilter.value)
let table = document.getElementById('dataOverview');
let totalUsage = document.getElementById('totalUsage');
let totalRow = table.rows.length-1;
let sum = 0;
for(var i=1; i<totalRow; i++){
    sum += Number(table.rows[i].cells[4].innerHTML);
    totalUsage.innerHTML = sum;
}


let emailPass = document.getElementById('emailPass');
let emailFail = document.getElementById('emailFail');

const ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let email = document.getElementById('email');
let emi;
function checkEmail(emailData){
    emi = emailData;
    if (ePattern.test(emi)){
        emailPass.style.display = "inline-block";
        emailFail.style.display = "none";
    }else{
        emailFail.style.display = "inline-block";
        emailPass.style.display = "none";
    }
}


const contactPattern = /^0[1-9]\d{8}$/;
let submitBtn = document.getElementById('submit');
let contactNum = document.getElementById('contactNum');
let conNum;
//check if the contact number is valid
function checkContactNum(numInfo){
    conNum = numInfo;
    if (contactPattern.test(conNum)){
        submitBtn.removeAttribute("disabled");
    }
}



// remove staff from table
let allA = document.getElementsByClassName('delet');
for(var i = 0; i < allA.length; i++){
    allA[i].onclick = function(){
        var tr = this.parentNode.parentNode;
        var staffName = tr.getElementsByTagName("td")[0].innerHTML;
        if(confirm("Do you want to remove "+staffName+" ?")){
            tr.parentNode.removeChild(tr);
        };
    };
};

//submit a staff's information, add this staff to the table

// submitBtn.onclick = func(){

// }

