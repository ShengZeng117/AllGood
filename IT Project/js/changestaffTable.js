
function initStaffTable(){
    let tbody = document.querySelector("#staffTable tbody");
    tbody.innerHTML = "";
    let staffHTML = "";
    for (let staff of staffData){
        staffHTML += `<tr>
        <td class="TstaffFirstName">${staff.firstname}</td>
        <td class="TstaffLastName">${staff.lastname}</td>
        <td class="TstaffPosition">${staff.position}</td>
        <td class="TstaffID">${staff.id}</td>
        <td class="TstaffEmail">${staff.email}</td>
        <td class="TstaffNumber">${staff.number}</td>
        <td><a href="#" class="staffDetail">Detail</a></td>
    </tr>
        `;
    }
    tbody.innerHTML = staffHTML;
}




initStaffTable();