var lib;(()=>{"use strict";var e={d:(t,n)=>{for(var m in n)e.o(n,m)&&!e.o(t,m)&&Object.defineProperty(t,m,{enumerable:!0,get:n[m]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{buyBuilding:()=>o,buyWorker:()=>c,changeWorkerAmount:()=>l,sellResources:()=>i});let n={money:{amt:15},wheat:{amt:0,er:2},cotton:{amt:0,er:5},stone:{amt:0,er:3},metal:{amt:0,er:7},coal:{amt:0,er:4}},m={money:15,wheat:0,cotton:0,stone:0,metal:0,coal:0},a={farm:{amt:0,price:15,rate1:.15,rate2:.07},mine:{amt:0,price:100,rate1:.13,rate2:.06,rate3:.1}};function o(e){n.money.amt>=a[e].price&&(n.money.amt-=a[e].price,a[e].price=Math.round(1.2*a[e].price),a[e].amt++)}function r(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}function c(){}function i(){for(let e=1;e<Object.keys(n).length;e++)n.money.amt+=n[Object.keys(n)[e]].amt*n[Object.keys(n)[e]].er,n[Object.keys(n)[e]].amt=0}function l(e,t){}setInterval((function(){!function(){for(let e=0;e<Object.keys(n).length;e++)m[Object.keys(n)[e]]=n[Object.keys(n)[e]].amt}(),n.wheat.amt+=a.farm.amt*a.farm.rate1/20,n.cotton.amt+=a.farm.amt*a.farm.rate2/20,n.stone.amt+=a.mine.amt*a.mine.rate1/20,n.metal.amt+=a.mine.amt*a.mine.rate2/20,n.coal.amt+=a.mine.amt*a.mine.rate3/20,document.title="$"+r(n.money.amt,1)+" - Dynasty Incremental",document.getElementById("money").innerHTML=r(n.money.amt,2),document.getElementById("wheat").innerHTML=r(n.wheat.amt,2),document.getElementById("cotton").innerHTML=r(n.cotton.amt,2),document.getElementById("stone").innerHTML=r(n.stone.amt,2),document.getElementById("metal").innerHTML=r(n.metal.amt,2),document.getElementById("coal").innerHTML=r(n.coal.amt,2),document.getElementById("farmCost").innerHTML=a.farm.price+" Money",document.getElementById("farms").innerHTML=a.farm.amt+" Farms",document.getElementById("mineCost").innerHTML=a.mine.price+" Money",document.getElementById("mines").innerHTML=a.mine.amt+" Mines",document.getElementById("moneyPS").innerHTML=r(20*(n.money.amt-m.money),2),document.getElementById("wheatPS").innerHTML=r(20*(n.wheat.amt-m.wheat),2),document.getElementById("cottonPS").innerHTML=r(20*(n.cotton.amt-m.cotton),2),document.getElementById("stonePS").innerHTML=r(20*(n.stone.amt-m.stone),2),document.getElementById("metalPS").innerHTML=r(20*(n.metal.amt-m.metal),2),document.getElementById("coalPS").innerHTML=r(20*(n.coal.amt-m.coal),2)}),50),lib=t})();