let deviceTitles = document.querySelectorAll("th");
for (let deviceTitle of deviceTitles){
    deviceTitle.onclick = function(){
        
        // once click, reset other titles to "sort"
        for (let deviceTitle of deviceTitles){
            if(deviceTitle !== this){
                deviceTitle.className = "sort";
            }
        }
        // check the order on this title
        if(this.classList.contains("sort-asc")){//ascending order,make it descending
            deviceTitle.className = "sort-desc";
            // descending order
            deviceData.sort(compare(this.dataset.key,false));
            inittable();
        }else{
            deviceTitle.className = "sort-asc";
            // ascending order
            deviceData.sort(compare(this.dataset.key,true));
            inittable();
        }

    }
}

function compare(key,sort){
    return function (value1,value2){
        let i = 0;
        if(value1[key] > value2[key]){
            i = 1;
        }else if(value1[key] < value2[key]){
            i = -1;
        }
        return sort ? i : i * -1;
    }
}

// creat table by deviceData
function inittable(){
    let tbody = document.querySelector("#dataOverview tbody");
    tbody.innerHTML = "";
    let deviceHTML = "";
    for (let device of deviceData){
        deviceHTML += `<tr>
        <td>${device.name}</td>
        <td>${device.id}</td>
        <td>${device.energytype}</td>
        <td>${device.area}</td>
        <td>${device.usage}</td>
        <td class="${device.status}"></td>
    </tr>
        `;
    }
    tbody.innerHTML = deviceHTML;
}

let area_1 = document.getElementById("area");




inittable();