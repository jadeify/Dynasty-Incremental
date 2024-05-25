let resources={money:15,wheat:0,stone:0}
let previousResources={money:15,wheat:0,stone:0}
let farm={amt:0,price:15,rate:0.1}
let mine={amt:0,price:100,rate:0.1}
let buildings={farm,mine}
function buyBuilding(building){
    if(resources.money>=buildings[building].price){
        resources.money-=buildings[building].price;
        buildings[building].price=Math.round(buildings[building].price*1.2);
        buildings[building].amt++;
    }
}
function roundTo(num, precision){
    const factor=Math.pow(10,precision);
    return Math.round(num*factor)/factor;
}
function updateValues(){
    document.getElementById("money").innerHTML=roundTo(resources.money,2);
    document.getElementById("wheat").innerHTML=roundTo(resources.wheat,2);
    document.getElementById("stone").innerHTML=roundTo(resources.stone,2);
    document.getElementById("farmcost").innerHTML=buildings.farm.price+" Money";
    document.getElementById("farms").innerHTML=buildings.farm.amt+" Farms";
    document.getElementById("minecost").innerHTML=buildings.mine.price+" Money";
    document.getElementById("mines").innerHTML=buildings.mine.amt+" Mines";
    document.getElementById("moneyPS").innerHTML=roundTo((resources.money-previousResources.money)*20,2);
    document.getElementById("wheatPS").innerHTML=roundTo((resources.wheat-previousResources.wheat)*20,2);
    document.getElementById("stonePS").innerHTML=roundTo((resources.stone-previousResources.stone)*20,2);
}
function sellResources(){
    resources.money+=50*resources.stone+10*resources.wheat;
    resources.wheat=0;
    resources.stone=0;
}
function storePastValues(){
    for (let i = 0; i < Object.keys(resources).length; i++) {
        previousResources[Object.keys(resources)[i]]=resources[Object.keys(resources)[i]];
    }
}
setInterval(function(){
    storePastValues();
    resources.stone+=buildings.mine.amt*buildings.mine.rate/20;
    resources.wheat+=buildings.farm.amt*buildings.farm.rate/20;
    document.title = "$"+roundTo(resources.money,1)+" - Dynasty Incremental";
    updateValues();
},50);