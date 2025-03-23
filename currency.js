const BASE_URL = "https://v6.exchangerate-api.com/v6/bbf922e9c577239d80b9b0a8/latest";


const dropdowns = document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let imgsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgsrc;
}

let btn = document.querySelector("button");
let from_curr = document.querySelector(".from select");
let to_curr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amt_val = amount.value;
    if(amt_val < 0 || amt_val === ""){
        amt_val = "1";
        amount.value = "1";
    }
    //1 usd = 83 inr ;
    let URL = `${BASE_URL}/${from_curr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let curr_rates = data.conversion_rates[to_curr.value];
    // if(amt_val)
    let final_value = amt_val * curr_rates;
    msg.innerHTML = `${amt_val} ${from_curr.value} = ${final_value} ${to_curr.value}`;
    
})