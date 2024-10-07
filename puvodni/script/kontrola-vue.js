// v css mají nastavený display:none - z důvodů prví animace Loading - a teď se provede náprava
document.getElementById("h-con").style.display="grid";
document.getElementById("u-podminky").style.display="block";
document.getElementById("z_uc").style.display="block";
// KONEC v css mají nastavený display:none - z důvodů prví animace Loading - a teď se provede náprava

// Pokud nebylo načteno Vue ze serveru, načte ho interně
if(typeof Vue==='undefined') {
  // Pokud Vue není dostupné, načti lokální kopii
  let script=document.createElement('script');
  script.src='script/vue.global.js'; // cesta k lokální kopii Vue
  document.head.appendChild(script);
}else{
  console.log("Externí Vue knihovna byla úspěšně načtena.");
}