const add_subject = document.getElementById("add_subject");
const subjects = document.getElementById("subjects");
let indicator = 0
const DataBase = JSON.parse(localStorage.getItem("DataBase")) || [];

if(DataBase.length>0){
    for (sub=0;sub<DataBase.length;sub++){
        const subject = DataBase[sub].subject;
        const N1 = DataBase[sub].N1;
        const N2 = DataBase[sub].N2;
        const N3 = DataBase[sub].N3;
        adder(subject,N1,N2,N3);
    }
};

add_subject.addEventListener("submit",()=>{
    const subject = document.getElementById("subject").value;
    DataBase.push({"subject":subject,"N1":"","N2":"","N3":""});
    save()
});

function save(){
    localStorage.setItem("DataBase",JSON.stringify(DataBase))
};

function adder(subject,V1,V2,V3){
    var agg = `<tr id=row_${indicator}>`
    agg += `<td>${subject}</td>`;
    agg += `<td><input class="inputs" id="${indicator}_N1" style="width:3em; text-align:center;" value="${V1}"></input></td>`;
    agg += `<td><input class="inputs" id="${indicator}_N2" style="width:3em; text-align:center;" value="${V2}"></input></td>`;
    agg += `<td><input class="inputs" id="${indicator}_N3" style="width:3em; text-align:center;" value="${V3}"></input></td>`;
    agg += `<td><t id="${indicator}_NN"></t></td>`;
    agg += `<td><t id="${indicator}_FN"></t></td>`;
    agg += `<td><button class="buttons" onclick="removerow(${indicator})">Delete</button>\
    <button class="buttons" onclick="calculate(${indicator})" style="margin-top:1em;">Calcular</button></td>`;
    agg += "</tr>";
    indicator++
    subjects.innerHTML += agg
};

function removerow(data){
    const row = document.getElementById(`row_${data}`);
    row.remove();
    DataBase.splice(data,1);
    save()
    location.reload()
};

function calculate(data){
    const N1 = parseFloat(document.getElementById(`${data}_N1`).value);
    if(N1<0||N1>100){
        return
    };
    const N2 = parseFloat(document.getElementById(`${data}_N2`).value);
    if(N2<0||N2>100){
        return
    };
    const N3 = parseFloat(document.getElementById(`${data}_N3`).value);
    if(N3<0||N3>100){
        return
    };
    const NN = document.getElementById(`${data}_NN`);
    const FN = document.getElementById(`${data}_FN`);
 
    var result = (N1+N2+N3)/3;

    if (isNaN(result)){
        return
    };

    NN.textContent = (Math.round(result*10))/10;
    FN.textContent = (Math.round((100-result)*10))/10;

    DataBase[data].N1 = N1;
    DataBase[data].N2 = N2;
    DataBase[data].N3 = N3;

    save()
};

function clearData(){
    localStorage.clear();
    location.reload()
};