



function show(anything) {
    document.querySelector('.textBox').value = anything;
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

let overview = document.getElementById("overview");
let creatNew = document.getElementById("creatNew");
let datas = document.getElementById("datas");
let profile = document.getElementById("profile");
let staff = document.getElementById("staff");
let department = document.getElementById("department");
let changePass = document.getElementById("changePass");


let over = document.getElementById("over");
let crea = document.getElementById("crea");
let data = document.getElementById("data");
let prof = document.getElementById("prof");
let changeSucc = document.getElementById("changeSucc");
let backToProf = document.getElementById("backToProf");
let staf = document.getElementById("staf");
let depa = document.getElementById("depa");
let addDevicePage = document.getElementById('addNewDevice');
let btn = document.getElementById('btn');



function removeAllLeft() {
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
    department.style.backgroundColor = "#3D5967";
    department.style.color = "white";
}
overview.onclick = function () {
    over.style.display = "flex";
    prof.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    depa.style.display = "none";
    addDevicePage.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    overview.style.backgroundColor = "#F4F2F2";
    overview.style.color = "black";
}
creatNew.onclick = function () {
    crea.style.display = "flex";
    prof.style.display = "none";
    over.style.display = "none";
    data.style.display = "none";
    staf.style.display = "none";
    depa.style.display = "none";
    addDevicePage.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}

datas.onclick = function () {
    data.style.display = "flex";
    prof.style.display = "none";
    over.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    depa.style.display = "none";
    addDevicePage.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
profile.onclick = function () {
    prof.style.display = "flex";
    over.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    depa.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    addDevicePage.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
staff.onclick = function () {
    staf.style.display = "flex";
    prof.style.display = "none";
    over.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    depa.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    addDevicePage.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}
department.onclick = function () {
    depa.style.display = "flex";
    prof.style.display = "none";
    over.style.display = "none";
    data.style.display = "none";
    crea.style.display = "none";
    staf.style.display = "none";
    changeSucc.style.display = "none";
    changePassword.style.display = "none";
    addDevicePage.style.display = "none";
    removeAllLeft();
    this.style.backgroundColor = "#F4F2F2";
    this.style.color = "black";
}

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

let areaFilter = document.getElementById('area');
let typeFilter = document.getElementById('type');

let resetFilter = document.getElementById('resetFilter');
resetFilter.onclick = function () {
    areaFilter.value = 'all';
    typeFilter.value = 'all';
}

console.log(areaFilter.value)
let table = document.getElementById('dataOverview');
let totalUsage = document.getElementById('totalUsage');
let totalRow = table.rows.length - 1;
let sum = 0;
for (var i = 1; i < totalRow; i++) {
    sum += Number(table.rows[i].cells[4].innerHTML);
    totalUsage.innerHTML = sum;
}


let emailPass = document.getElementById('emailPass');
let emailFail = document.getElementById('emailFail');

const ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let email = document.getElementById('email');
let emi;
function checkEmail(emailData) {
    emi = emailData;
    if (ePattern.test(emi)) {
        emailPass.style.display = "inline-block";
        emailFail.style.display = "none";
    } else {
        emailFail.style.display = "inline-block";
        emailPass.style.display = "none";
    }
}


let submitBtn = document.getElementById('submit');
let contactNum = document.getElementById('contactNum');
let position = document.getElementById('positionValue');
let fstName = document.getElementById('firstNa');
let lstName = document.getElementById('lastNa');

// email  fstName  lstName  position  contactNum  submitBtn

submitBtn.onclick = function(){
    console.log(contactNum.value);
}
// submitBtn.onclick = function () {
//     var oTable = document.getElementsById('table');
//     var oTr = document.createElement('tr');
//     var oTd1 = document.createElement('td');
//     var oTd2 = document.createElement('td');
//     var oTd3 = document.createElement('td');
//     var oTd4 = document.createElement('td');
//     var oTd5 = document.createElement('td');
//     var oTd6 = document.createElement('td');
//     // var btn1 = document.createElement('button');
//     oTd1.innerHTML = fstName.value;
//     oTd2.innerHTML = lstName.value;
//     oTd3.innerHTML = position.value;
//     oTd4.innerHTML = "11223344";
//     oTd5.innerHTML = email.value;
//     oTd6.innerHTML = fstNcontactNumme.value;
//     oTr.appendChild(oTd1);
//     oTr.appendChild(oTd2);
//     oTr.appendChild(oTd3);
//     oTr.appendChild(oTd4);
//     oTr.appendChild(oTd5);
//     oTr.appendChild(oTd6);
//     oTable.appendChild(oTr);
// };



// remove staff from table
let allA = document.getElementsByClassName('delet');
for (var i = 0; i < allA.length; i++) {
    allA[i].onclick = function () {
        var tr = this.parentNode.parentNode;
        var staffName = tr.getElementsByTagName("td")[0].innerHTML;
        if (confirm("Do you want to remove " + staffName + " ?")) {
            tr.parentNode.removeChild(tr);
        };
    };
};


// go to the Device's addition page
let addDevice = document.getElementById('addDevice');

addDevice.onclick = function(){
    data.style.display = "none";
    addDevicePage.style.display = "flex";
}
//finish adding device, turn back to data page
let saveNewDevice = document.getElementById('saveNewDevice');
saveNewDevice.onclick = function(){
    var deviceName = document.getElementById("deviceName");
    var deviceID = document.getElementById("deviceID");
    var energyType = document.getElementById("energyType");
    var device_area = document.getElementById("device_area");
    var editedUsage = document.getElementById("editedUsage");
    var tr_dev = document.createElement("tr");
    var del_btn = document.createElement("button");
    del_btn.className = "delet_device";
    var text_del = document.createTextNode("delet");
    del_btn.appendChild(text_del);
    var td_del = document.createElement("td");
    td_del.appendChild(del_btn);
    tr_dev.innerHTML = `<td >${deviceName.value}</td>
                        <td>${deviceID.value}</td>
                        <td>${energyType.value}</td>
                        <td>${device_area.value}</td>
                        <td>${editedUsage.value}</td>
                        <td></td>`


    tr_dev.appendChild(td_del);
    table.appendChild(tr_dev);

    sum += Number(editedUsage.value);
    totalUsage.innerHTML = sum;
    
    del_btn.onclick = function(){
        this.parentElement.parentElement.remove();
    }

    deviceName.value = '';
    deviceID.value = '';
    energyType.value = '';
    device_area.value = '';
    editedUsage.value = '';
    addDevicePage.style.display = "none";
    data.style.display = "flex";
}


    var deleBtn = document.getElementsByClassName('delet_device');
    
    for (var i = 0; i < deleBtn.length; i++) {
        deleBtn[i].onclick = function () {
            this.parentElement.parentElement.remove();
        }
    }




let mask = document.getElementById('j_mask');
let formAdd = document.getElementById('j_formAdd');
document.getElementById('addDepa').onclick = function(){
    formAdd.style.display = "block";
}
document.getElementById("j_hideFormAdd").onclick=function(){
    formAdd.style.display="none";
}
document.getElementById('j_btnAdd').onclick = function(){
    var one = document.getElementById("j_txtLesson");
    var departmentset = document.getElementById("departmentset");
    var new_depar = document.createElement('div');
    var new_a = document.createElement('a');
    var text = document.createTextNode(one.value);
    var text_a = document.createTextNode("Delet");
    new_a.href = "#"
    new_a.className = "delDepar";
    new_a.appendChild(text_a);
    new_depar.className = "departmentEle";
    new_depar.appendChild(text);
    new_depar.appendChild(new_a);
    departmentset.appendChild(new_depar);

    new_a.onclick=function(){
        if (confirm("Do you want to remove this department?")) {
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
        
    }

    one.value = '';
    formAdd.style.display="none";
}

let all_a_delDepa = document.getElementsByClassName("delDepar");

for (var i = 0; i < all_a_delDepa.length; i++) {
    all_a_delDepa[i].onclick = function () {
        var depa_set = this.parentNode.parentNode;
        depa_name = this.parentNode.innerHTML;
        
        
        if (confirm("Do you want to remove this department?")) {
            depa_set.removeChild(this.parentNode);
        };
    };
};



