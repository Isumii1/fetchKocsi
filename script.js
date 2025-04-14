let json = [];
window.addEventListener("DOMContentLoaded",async()=>{
    const betoltes = await fetch('https://nodejs112.dszcbaross.edu.hu/cars');
    json = await betoltes.json();
    kepernyoBetoltes(json);
})

const szuro = document.getElementById("szuro");
const tarolo = document.getElementById("tarolo");
const kereso = document.getElementById("kereso");

szuro.addEventListener('change',szuroCucc)
kereso.addEventListener('input',szuroCucc)

function szuroCucc(){
    let filteredList=json;
    if(szuro.value==='all'){
        kepernyoBetoltes(json)
    }
    if(szuro.value==='newCars'){
        filteredList=filteredList.filter(x=>x.miles===0)
    }
    if(szuro.value==='usedCars'){
        filteredList=filteredList.filter(x=>x.miles>0)
    }
    if(kereso.value.trim()){
        filteredList = filteredList.filter(x=>x.name.includes(kereso.value));
    }
    kepernyoBetoltes(filteredList)
}

function card({image,name,details,miles,fuel,transmission,price}){
    return `
    <div class="col h-100">
            <img src="https://nodejs112.dszcbaross.edu.hu/${image}" class="rounded-top-4 card-img-top" alt="">
            <div class="border-bottom border-start border-end border-1 p-3 rounded-bottom-4">
                <div class="fw-bold fs-5">${name}</div>
                <div>${details}</div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="text-center">
                        <img src="miles.svg" class="card-img-top w-25" alt="">
                        <div class="fs-6 mt-2">${miles} Miles</div>
                    </div>
                    <div class="text-center">
                        <img src="fuel.svg" class="card-img-top w-50" alt="">
                        <div class="fs-6 mt-2">${fuel}</div>
                    </div class="text-center">
                    <div class="text-center">
                        <img src="transmission.svg " class="card-img-top w-50" alt="">
                        <div class="fs-6 mt-2">${transmission}</div>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="fs-4 fw-bold">$${price}</div>
                    <button class="btn btn-light">View Details</button>
                </div>
                </div>
            </div>
        </div>
    `
}

function kepernyoBetoltes(json){
    tarolo.innerHTML='';
    json.forEach(x=>{
        tarolo.innerHTML+=card(x);
    });
}