
let networthCount = 0;
let bankCount = 0;
let btcCount = 0;
let stocksCount=0;
let propertyCashCount=0;
let propertyCount=0;
let foodLevel = 100;
let age = 20;
let daysForLearning=0;
let nineToFiveEarnings=15;
let businessEarnings=0.01;

const birthDay = new Date(2005, 0, 22);
let date = new Date(2025, 0, 22);
let networthMoneyID = document.getElementById("networthCountID");
let bankMoneyID = document.getElementById("bankCountID");
let btcCountID = document.getElementById("btcCountID");
let stocksCountID = document.getElementById("stocksCountID");
let propertyMoneyCountID = document.getElementById("propertyMoneyCountID");
let propertyCountID = document.getElementById("propertyCountID");

let ageID = document.getElementById("ageID");
let dateID =document.getElementById("dateID");
let nineToFiveID =document.getElementById("nineToFiveID");
let workBusinessID =document.getElementById("workBusinessID");
let incrementBusinessEarningsID = document.getElementById("incrementBusinessEarningsID");
let foodBarID = document.getElementById("foodBarID");

let btcInputID = document.getElementById("btcInputID");
let btcValidatorID= document.getElementById("btcValidatorID");
let propertyInputID = document.getElementById("propertyInputID");
let propertyValidatorID = document.getElementById("propertyValidatorID");
let stocksInputID = document.getElementById("stocksInputID");
let stocksValidatorID= document.getElementById("stocksValidatorID");
let investBusinessInputID = document.getElementById("investBusinessInputID");
let investBusinessValidatorID= document.getElementById("investBusinessValidatorID");

let sellAssetsID = document.getElementById("sellAssetsID");
let sellMoneyInputID = document.getElementById("sellMoneyInputID");
let sellAssetValidatorID = document.getElementById("sellAssetValidatorID");

function nineToFiveOption(){
    let foodBool = checkFood();
    if(foodBool){
        incrementBankCount();
        incrementDate();
        decrementFood();
    }else{
        showDialog();
    }
}

function workBusinessOption(){
    let foodBool = checkFood();
    if(foodBool){
    incrementBankCountBusiness();
    incrementDate();
    decrementFood();
    }else{
        showDialog();
    }
}

function learnBusinessOption(){
    let foodBool = checkFood();
    if(foodBool){
        if(daysForLearning===0){
            businessEarnings*=1.05;
            workBusinessID.innerHTML=businessEarnings.toFixed(2);
            incrementDate();
            decrementFood();
            daysForLearning=5;
            incrementBusinessEarningsID.style.color="grey";
        }else{
            return;
        }
        
    }else{
        showDialog();
    }
    
}


function incrementDate(){
    if(daysForLearning!=0){
        daysForLearning--;
        }else{
            incrementBusinessEarningsID.style.color="green";
        }
       
    date.setDate(date.getDate()+ 1);
    if(date.getMonth()===birthDay.getMonth() &&
    date.getDate() === birthDay.getDate()){
        age++;
        ageID.innerHTML=age;
    }
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get human-readable month
    let year = date.getFullYear().toString();

    let formattedDate = `${day}.${month}.${year}`;
    dateID.innerHTML=formattedDate;
    adjustCourses();
    updateNetworth();
}

function incrementBankCount(){
    bankCount+=nineToFiveEarnings;
    bankMoneyID.innerHTML=bankCount.toFixed(2);
    nineToFiveEarnings*=1.0001;
    nineToFiveID.innerHTML=nineToFiveEarnings.toFixed(2);
    updateNetworth();
}

function incrementBankCountBusiness(){
    bankCount+=businessEarnings;
    bankMoneyID.innerHTML=bankCount.toFixed(2);
    businessEarnings*=1.01;
    workBusinessID.innerHTML=businessEarnings.toFixed(2);
    updateNetworth();
}


function incrementFood(){
    foodLevel+=10;
    let newPercentage = `${foodLevel}%`;
    foodBarID.style.width=newPercentage;
}

function decrementFood(){
    foodLevel-=10;
    let newPercentage = `${foodLevel}%`;
    foodBarID.style.width=newPercentage;
    
}

function checkFood(){
    if(foodLevel===10){
        showDialog();
        return false;
    }else{
        return true;
    }
}
function showDialog() {
    const yesButton = document.getElementById("yesButton");
    const cancelButton = document.getElementById("cancelButton");
  
    yesButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
  }
  
  function closeDialog() {
    const yesButton = document.getElementById("yesButton");
    const cancelButton = document.getElementById("cancelButton");
  
    yesButton.style.display = "none";
    cancelButton.style.display = "none";
  }

function deadMessage(){
    foodBarID.style.width="0%";
        alert('Youre dead');
        closeDialog();
}



function buyFood(){
    if(foodLevel==100){
        alert('Food is already maxed');
        return;
    }else if(bankCount<14){
        alert('You dont have enough money');
        return;
    }
    bankCount-=14;
    bankMoneyID.innerHTML=bankCount.toFixed(2);
    incrementFood();
    updateNetworth();
}  


function validateBtcInput(){
    if(parseFloat(btcInputID.value)<=0){
        btcValidatorID.style.display="inline-block";
    }else{
        if(parseFloat(btcInputID.value)<=bankCount){
            btcCount+=parseFloat(btcInputID.value);
            btcCountID.innerHTML=btcCount.toFixed(2);
            bankCount-=parseFloat(btcInputID.value);
            bankMoneyID.innerHTML=bankCount.toFixed(2);
            btcInputID.value=0;
            btcValidatorID.style.display="none";
            updateNetworth();
        }else{
            alert('You dont have enough money');
        }
    }
}
function validatePropertyInput(){
    if(parseFloat(propertyInputID.value)<=0){
        propertyValidatorID.style.display="inline-block";
    }else{
        if(parseFloat(propertyInputID.value)*100000<=bankCount){
            propertyCashCount+=parseFloat(propertyInputID.value)*100000;
            propertyMoneyCountID.innerHTML=propertyCashCount.toFixed(2);
            propertyCount+=parseFloat(propertyInputID.value);
            propertyCountID.innerHTML=propertyCount.toFixed(2);

            bankCount-=parseFloat(propertyInputID.value)*100000;
            bankMoneyID.innerHTML=bankCount.toFixed(2);
            propertyInputID.value=0;
            propertyValidatorID.style.display="none";
            updateNetworth();
        }else{
            alert('You dont have enough money');
        }
    }
}
function validateStocksInput(){
    if(parseFloat(stocksInputID.value)<=0){
        stocksValidatorID.style.display="inline-block";
    }else{
        if(parseFloat(stocksInputID.value)<=bankCount){
            stocksCount+=parseFloat(stocksInputID.value);
            stocksCountID.innerHTML=stocksCount.toFixed(2);
            bankCount-=parseFloat(stocksInputID.value);
            bankMoneyID.innerHTML=bankCount.toFixed(2);
            stocksInputID.value=0;
            stocksValidatorID.style.display="none";
            updateNetworth();
        }else{
            alert('You dont have enough money');
        }
    }
}
function validateInvestBusinessInput(){
    if(parseFloat(investBusinessInputID.value)<=0){
        investBusinessValidatorID.style.display="inline-block";
    }else{
        if(parseFloat(investBusinessInputID.value)<=bankCount){
            let newValue = 1+((investBusinessInputID.value/businessEarnings)/200);
            businessEarnings*=newValue;
            workBusinessID.innerHTML=businessEarnings.toFixed(2);
            bankCount-=parseFloat(investBusinessInputID.value);
            bankMoneyID.innerHTML=bankCount.toFixed(2);
            investBusinessInputID.value=0;
            investBusinessValidatorID.style.display="none";
            updateNetworth();
        }else{
            alert('You dont have enough money');
        }
    }
}

function sellAsset(){
    if(parseFloat(sellMoneyInputID.value)<=0){
        sellAssetValidatorID.style.display="inline-block";
    }else{if (sellAssetsID.value === "btcValue") {
        sellBtc();
      } else if (sellAssetsID.value === "stocksValue") {
        sellStocks();
      } else if (sellAssetsID.value === "propertyValue") {
        sellProperty();
      } else {
        alert("Please select a valid option.");
      }}
    
}

function sellBtc(){
        if(parseFloat(sellMoneyInputID.value)<=btcCount){
            bankCount+=parseFloat(sellMoneyInputID.value);
            bankMoneyID.innerHTML=bankCount.toFixed(2);

            btcCount-=parseFloat(sellMoneyInputID.value);
            btcCountID.innerHTML=btcCount.toFixed(2);
            
            sellMoneyInputID.value=0;
            sellAssetValidatorID.style.display="none";
            updateNetworth();
        }else{
            alert('You dont have enough money');
        }
    
}

function sellStocks(){
        if(parseFloat(sellMoneyInputID.value)<=stocksCount){
            bankCount+=parseFloat(sellMoneyInputID.value);
            bankMoneyID.innerHTML=bankCount.toFixed(2);

            stocksCount-=parseFloat(sellMoneyInputID.value);
            stocksCountID.innerHTML=stocksCount.toFixed(2);
            
            sellMoneyInputID.value=0;
            sellAssetValidatorID.style.display="none";
            updateNetworth();
        }else{
            alert('You dont have enough money');
        }
}

function sellProperty(){
    if(parseFloat(sellMoneyInputID.value)<=propertyCount){
        bankCount+=parseFloat(sellMoneyInputID.value*100000);
        bankMoneyID.innerHTML=bankCount.toFixed(2);

        propertyCount-=parseFloat(sellMoneyInputID.value);
        propertyCountID.innerHTML=propertyCount.toFixed(2);
        
        propertyCashCount-=(parseFloat(sellMoneyInputID.value)*100000);
        propertyMoneyCountID.innerHTML=propertyCashCount.toFixed(2);

        sellMoneyInputID.value=0;
        sellAssetValidatorID.style.display="none";
        updateNetworth();
    }else{
        alert('You dont have enough money');
    }
}

function adjustCourses(){
    let todaysPropertyEarnings=propertyCashCount/3000;
    bankCount+=todaysPropertyEarnings;
    bankMoneyID.innerHTML=bankCount.toFixed(2);
    if(Math.random()<=0.7){
        stocksCount*=1.01;
    }else{
        stocksCount*=0.99;
    }
        stocksCountID.innerHTML=stocksCount.toFixed(2);

    if(Math.random()<=0.54){
        btcCount*=1.15;
    }else{
        btcCount*=0.90;
    }
        btcCountID.innerHTML=btcCount.toFixed(2);
    
}

function updateNetworth(){
    networthCount = bankCount+btcCount+stocksCount+propertyCashCount;
    networthMoneyID.innerHTML=networthCount.toFixed(2);
}