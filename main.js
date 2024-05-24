let resources={money:15,wheat:0,stone:0}
let farm={amt:0,price:15}
let mine={amt:0,price:100}
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
    document.getElementById("money").innerHTML=roundTo(resources.money,1);
    document.getElementById("wheat").innerHTML=roundTo(resources.wheat,1);
    document.getElementById("stone").innerHTML=roundTo(resources.stone,1);
    document.getElementById("farmcost").innerHTML=buildings.farm.price+" Money";
    document.getElementById("farms").innerHTML=buildings.farm.amt+" Farms";
    document.getElementById("minecost").innerHTML=buildings.mine.price+" Money";
    document.getElementById("mines").innerHTML=buildings.mine.amt+" Mines";
}
setInterval(function(){
    resources.stone+=buildings.mine.amt/10/20;
    resources.wheat+=buildings.farm.amt/10/20;
    document.title = "$"+roundTo(resources.money,1)+" - Dynasty Incremental";
    updateValues();
    console.log(resources.wheat);
    console.log(buildings.farm.amt)
},50);