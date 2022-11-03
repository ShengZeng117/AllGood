let deviceTitles = document.querySelectorAll("#dataOverview th");
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
            deviceDataList.sort(compare(this.dataset.key,false));
            inittable();
        }else{
            deviceTitle.className = "sort-asc";
            // ascending order
            deviceDataList.sort(compare(this.dataset.key,true));
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
    for (i = 0; i<deviceDataList.length; i++){
        deviceHTML += `
        <tr>
        <td>${deviceDataList[i].name}</td>
        <td>${deviceDataList[i].id}</td>
        <td>${deviceDataList[i].energytype}</td>
        <td>${deviceDataList[i].area}</td>
        <td>${deviceDataList[i].usage}</td>
        <td class="${deviceDataList[i].status}"></td>
        <td><button class="deletdevice" name="deletdevice" value=${deviceDataList[i].id}>
            <img class="delet_device" src="/picture/delet.png"></img>
        </button></td>
        </tr>
        `;
    }
    tbody.innerHTML = deviceHTML;
}

let area_1 = document.getElementById("area");




inittable();
