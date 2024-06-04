import Decimal from "../node_modules/break_infinity.js/dist/break_infinity.esm.js";
import * as ADNotations from "../node_modules/@antimatter-dimensions/notations/dist/ad-notations.esm.js";
const mixedScientific=new ADNotations.MixedScientificNotation();
let resources={
	money:{amt:new Decimal(15)},
	wheat:{amt:new Decimal(0),er:new Decimal(2)},
	cotton:{amt:new Decimal(0),er:new Decimal(5)},
	stone:{amt:new Decimal(0),er:new Decimal(3)},
	metal:{amt:new Decimal(0),er:new Decimal(7)},
	coal:{amt:new Decimal(0),er:new Decimal(4)}
};
let previousResources={money:new Decimal(15),wheat:new Decimal(0),cotton:new Decimal(0),stone:new Decimal(0),metal:new Decimal(0),coal:new Decimal(0)};
let buildings={
	farm:{amt:new Decimal(0),price:new Decimal(15),rate1:new Decimal(0.15),rate2:new Decimal(0.07)},
	mine:{amt:new Decimal(0),price:new Decimal(100),rate1:new Decimal(0.13),rate2:new Decimal(0.06),rate3:new Decimal(0.1)}
};
let employees=[{name:"john figgle",intelligence:new Decimal(1),}];
function addEmployee(name, intelligence, charisma, strength, vitality, dexterity){
	employees.push({name:name, intelligence:intelligence, charisma:charisma, strength:strength, vitality:vitality, dexterity:dexterity});
}
export function buyBuilding(building){
	if(resources.money.amt.greaterThanOrEqualTo(buildings[building].price)){
		resources.money.amt=resources.money.amt.minus(buildings[building].price);
		buildings[building].price=buildings[building].price.times(1.2);
		buildings[building].amt=buildings[building].amt.add(1);
	}
}
export function hireWorker(){

}
function updateValues(){
	document.getElementById("money").innerHTML=mixedScientific.format(resources.money.amt,2,2);
	document.getElementById("wheat").innerHTML=mixedScientific.format(resources.wheat.amt,2,2);
	document.getElementById("cotton").innerHTML=mixedScientific.format(resources.cotton.amt,2,2);
	document.getElementById("stone").innerHTML=mixedScientific.format(resources.stone.amt,2,2);
	document.getElementById("metal").innerHTML=mixedScientific.format(resources.metal.amt,2,2);
	document.getElementById("coal").innerHTML=mixedScientific.format(resources.coal.amt,2,2);
	document.getElementById("farmCost").innerHTML=mixedScientific.format(buildings.farm.price,2,2)+" Money";
	document.getElementById("farms").innerHTML=mixedScientific.format(buildings.farm.amt,0,0)+" Farms";
	document.getElementById("mineCost").innerHTML=mixedScientific.format(buildings.mine.price,2,2)+" Money";
	document.getElementById("mines").innerHTML=mixedScientific.format(buildings.mine.amt,0,0)+" Mines";
	document.getElementById("moneyPS").innerHTML=mixedScientific.format((resources.money.amt.minus(previousResources.money).times(20)),2,2);
	document.getElementById("wheatPS").innerHTML=mixedScientific.format((resources.wheat.amt.minus(previousResources.wheat).times(20)),2,2);
	document.getElementById("cottonPS").innerHTML=mixedScientific.format((resources.cotton.amt.minus(previousResources.cotton).times(20)),2,2);
	document.getElementById("stonePS").innerHTML=mixedScientific.format((resources.stone.amt.minus(previousResources.stone).times(20)),2,2);
	document.getElementById("metalPS").innerHTML=mixedScientific.format((resources.metal.amt.minus(previousResources.metal).times(20)),2,2);
	document.getElementById("coalPS").innerHTML=mixedScientific.format((resources.coal.amt.minus(previousResources.coal).times(20)),2,2);
}
export function sellResources(){
	for (let i = 1; i < Object.keys(resources).length; i++) {
		resources.money.amt=resources.money.amt.add((resources[Object.keys(resources)[i]].amt*resources[Object.keys(resources)[i]].er));
		resources[Object.keys(resources)[i]].amt=new Decimal(0);
	}
}
function storePastValues(){
	for (let i = 0; i < Object.keys(resources).length; i++) {
		previousResources[Object.keys(resources)[i]]=resources[Object.keys(resources)[i]].amt;
	}
}
export function changeWorkerAmount(building,amount){

}
function runGameTick(){
	storePastValues();
	resources.wheat.amt=resources.wheat.amt.add(buildings.farm.amt.times(buildings.farm.rate1.dividedBy(20)));
	resources.cotton.amt=resources.cotton.amt.add(buildings.farm.amt.times(buildings.farm.rate2.dividedBy(20)));
	resources.stone.amt=resources.stone.amt.add(buildings.mine.amt.times(buildings.mine.rate1.dividedBy(20)));
	resources.metal.amt=resources.metal.amt.add(buildings.mine.amt.times(buildings.mine.rate2.dividedBy(20)));
	resources.coal.amt=resources.coal.amt.add(buildings.mine.amt.times(buildings.mine.rate3.dividedBy(20)));
	document.title = "$"+mixedScientific.format(resources.money.amt,2,2)+" - Dynasty Incremental";
	updateValues();
}
setInterval(runGameTick,50);