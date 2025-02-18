// Pokud nebude načteno Vue ze serveru, načte ho interně
if(typeof Vue==="undefined"){
// Pokud Vue není dostupné, načti lokální kopii
console.log("Externí Vue knihovna NEBYLA načtena.");
let script=document.createElement("script");
script.src="script/vue.global.js"; // cesta k lokální kopii Vue
document.body.appendChild(script);

window.addEventListener("load",()=>{
// načte potřebný script
let script2=document.createElement("script");
script2.defer=true;
script2.src="script/script.js?v=1"; // cesta k hlavnímu scriptu aplikace
document.body.appendChild(script2);
});
}else{
// Pokud je Vue dostupné, načte pouze potřebný script
console.log("Externí Vue knihovna byla úspěšně načtena.");
let script=document.createElement("script");
script.defer=true;
script.src="script/script.js?v=1"; // cesta k hlavnímu scriptu aplikace
document.body.appendChild(script);
}