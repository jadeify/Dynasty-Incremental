let resources={
    money:{amt:new Decimal(15)},
    wheat:{amt:new Decimal(0),er:Decimal(2)},
    cotton:{amt:0,er:5},
    stone:{amt:0,er:3},
    metal:{amt:0,er:7},
    coal:{amt:0,er:4}
}
let previousResources={money:15,wheat:0,cotton:0,stone:0,metal:0,coal:0}
let buildings={
    farm:{amt:0,price:15,rate1:0.15,rate2:0.07},
    mine:{amt:0,price:100,rate1:0.13,rate2:0.06,rate3:0.1}
}
let employees=[];
function buyBuilding(building){
    if(resources.money.amt>=buildings[building].price){
        resources.money.amt-=buildings[building].price;
        buildings[building].price=Math.round(buildings[building].price*1.2);
        buildings[building].amt++;
    }
}
function roundTo(num, precision){
    const factor=Math.pow(10,precision);
    return Math.round(num*factor)/factor;
}
function buyWorker(){

}
function updateValues(){
    document.getElementById("money").innerHTML=roundTo(resources.money.amt,2);
    document.getElementById("wheat").innerHTML=roundTo(resources.wheat.amt,2)
    document.getElementById("cotton").innerHTML=roundTo(resources.cotton.amt,2);
    document.getElementById("stone").innerHTML=roundTo(resources.stone.amt,2);
    document.getElementById("metal").innerHTML=roundTo(resources.metal.amt,2);
    document.getElementById("coal").innerHTML=roundTo(resources.coal.amt,2);
    document.getElementById("farmCost").innerHTML=buildings.farm.price+" Money";
    document.getElementById("farms").innerHTML=buildings.farm.amt+" Farms";
    document.getElementById("mineCost").innerHTML=buildings.mine.price+" Money";
    document.getElementById("mines").innerHTML=buildings.mine.amt+" Mines";
    document.getElementById("moneyPS").innerHTML=roundTo((resources.money.amt-previousResources.money)*20,2);
    document.getElementById("wheatPS").innerHTML=roundTo((resources.wheat.amt-previousResources.wheat)*20,2);
    document.getElementById("cottonPS").innerHTML=roundTo((resources.cotton.amt-previousResources.cotton)*20,2);
    document.getElementById("stonePS").innerHTML=roundTo((resources.stone.amt-previousResources.stone)*20,2)
    document.getElementById("metalPS").innerHTML=roundTo((resources.metal.amt-previousResources.metal)*20,2);
    document.getElementById("coalPS").innerHTML=roundTo((resources.coal.amt-previousResources.coal)*20,2);
}
function sellResources(){
    for (let i = 1; i < Object.keys(resources).length; i++) {
        resources.money.amt+=(resources[Object.keys(resources)[i]].amt*resources[Object.keys(resources)[i]].er);
        resources[Object.keys(resources)[i]].amt=new Decimal(0);
    }
}
function storePastValues(){
    for (let i = 0; i < Object.keys(resources).length; i++) {
        previousResources[Object.keys(resources)[i]]=resources[Object.keys(resources)[i]].amt;
    }
}
function changeWorkerAmount(building,amount){

}
setInterval(function(){
    storePastValues();
    resources.wheat.amt+=buildings.farm.amt*buildings.farm.rate1/20;
    resources.cotton.amt+=buildings.farm.amt*buildings.farm.rate2/20;
    resources.stone.amt+=buildings.mine.amt*buildings.mine.rate1/20;
    resources.metal.amt+=buildings.mine.amt*buildings.mine.rate2/20;
    resources.coal.amt+=buildings.mine.amt*buildings.mine.rate3/20;
    document.title = "$"+roundTo(resources.money.amt,1)+" - Dynasty Incremental";
    updateValues();
},50);