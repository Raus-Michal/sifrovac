
// v css mají nastavený display:none - z důvodů prví animace Loading - a teď se provede náprava
document.getElementById("h-con").style.display="grid";
document.getElementById("u-podminky").style.display="block";
document.getElementById("z_uc").style.display="block";
document.getElementById("okno-prehled").style.display="block";
// KONEC v css mají nastavený display:none - z důvodů prví animace Loading - a teď se provede náprava

const app=Vue.createApp({
data(){
return {
loading:true, // v-show zobrazení animace Loading... před načtením aplikace //
apka:false, /* v-show zobrazení hlavní strany aplikace a schování startovacího okna */
podminky:false, /* utčuje zda uživatel v startovacím okně souhlasil s podmínkami používání šifrovače */
spustit:false, /* v-show zobrazení okno s UC startovacího okna */
prehled:false, // v-show zobrazí okno s přehledem šifrování a dešifrování
prehled_obsah:false, // proměnná určuje zda je v okně Přehled šifrování a dešifrování nějáký obsah. TRUE===´je tam obsah, FALSE===není tam obsah, POUŽÍVÁ se také jako v-if pro informační text - Zatím nebylo nic šifrováno ani dešifrováno
souhlas_Ls:["souhlas","vydan"], // proměnná určuje string pro uložení souhlasu v Localstorage [klíč,data]
uk1:"", /* UC 1. číslo */
uk2:"", /* UC 2. číslo */
uk3:"", /* UC 3. číslo */
uk4:"", /* UC 4. číslo */
uk5:"", /* UC 5. číslo */
uk6:"", /* UC 6. číslo */
nepovolen:false, /* v-if zobrazí P s informací nepovoleného UC pokud bude true */
s_rada:0, // určuje, která řada číselných kódů je chybně zadaná 0-žádná, 1=první tři čísla, 2=druhé tři čísla, 3=všech šest čísel
casovac1:null, // časovač pro fokus na HELP - při zadané nepovolené číselné kombinaci
t:["password","password","password","password","password","password","password"], // v-bind:type input number/password při zadání ČK 1-6
videt:false, /*  v-if a v-else-if zobrazení UC při zadání */
videt2:false, /*  v-if a v-else-if zobrazení UC přímo v apce */
t_v:"password", /* v-bind:type 1.-6. input number/password přímo v apce */
text_o1:"",  /* text v area 1 */
text_o2:"", /* text v area 2 */
otoceni:false, /* v-if a v-else-if určuje zda uživatel mění šifrovat/dešifrovat */
placeholder_ta1:"Napište anebo vložte text, který chcete šifrovat", // v-bind placeholder textarea1
placeholder_ta2:"Zmáčkněte Šifrovat a objeví se šifrovaný text", // v-bind placeholder textarea2
otocCSS:"o-normal", /* v-bind class pro otočení kruhu při zmáčknutí tlačítka Přehodit */
pole:`A„7BCD0<KO=PQ@1RS"TUVW[XYZ“Á6ÉEFGŠŘŽabc!def)ghi*j3kl_mnop{ qr.stLN4uv}wx-yzáŤŮHIJéí§:;óú,ý8čÍÓ/$#ÚÝ2ČĎ(ĚŇ?ď%ě5'ňř>šť+ůž9M]`, /* sada znaků k šifrování a dešifrování */
nep_znaky:"", /* proměnná slouží k výisu nepovolených znaků k šifrování v Dialog okně */
email:"", /* proměnná na binden value input zobrazení emailu */
udalos_viditelnost:"", /* promměnná slouží k testování a používání visibilitychange API */
kliku:0, // proměnná pro statistiku počítá počet kliků na tlačítko šifrovat/dešifrovat pokud je uživatel offline
token:"aplikace-Šifrovač-2024" // token pro ověření, že zaslaná statistická data pocházejí z aplikace
}},
    
methods:{

souhlas(){

if("localStorage" in window&&window["localStorage"]!==null)
{
// test jestli funguje localstorage
localStorage.removeItem(this.souhlas_Ls[0]); // nejprve provede smazání dat pod klíčem
localStorage.setItem(this.souhlas_Ls[0],this.souhlas_Ls[1]); // provede uložení dat se souhlasem na localStorage [klíč,data k uložení]
}
this.podminky=false; // v-show schoví okno s podmínkami
this.spustit=true; // v-show zobrazí okno s zadáním UC
this.reg_sw(false); // funkce provede registraci Servis Workeru (hodnota false===o registraci zažádáno pomocí klik na button)
},

start(){
// Klik na tlačítko Spustit při zadávání číselného kódu
if(this.nepovolen==false)
{
// pokud nebyl zadán nepovolený UC - vykoná akci
this.spustit=false; // pomocí v-show vypne okno se zadáním Číselného kódu
this.apka=true; // pomocí v-show zapne hlavní kontejner aplikace
this.kodovani(this.token,"729318")
.then(new_token=>{
this.token=new_token; // pomocí šifrování vytvoří nový token
});
}},

reset(){
// funkce zajistí reset aplikace
this.apka=false; // vypne hlavní kontajner aplikace
this.spustit=true; // zapne okno se zadáním ČK
this.uk1=""; // ČK 1. číslo
this.uk2=""; // ČK 2. číslo
this.uk3=""; // ČK 3. číslo
this.uk4=""; // ČK 4. číslo
this.uk5=""; // ČK 5. číslo
this.uk6=""; // ČK 6. číslo
this.text_o1="";  // text v area 1
this.text_o2=""; // text v area 2
this.videt=false; //  v-if a v-else-if zobrazení UC při zadání
l=this.t.length; // délka pole
for(let i=0;i<l;i++)
{
this.t[i]="password"; // změní všechny input pro vstupní ČK na password
}
this.videt2=false, //  v-if a v-else-if zobrazení UC přímo v apce
this.t_v="password"; // v-bind:type 1.-6. input number/password přímo v apce
const prehled_telo=this.$refs.telo_prehled; // DIV tělo okna Přehled šifrování a dešifrování
prehled_telo.innerHTML=" "; // vymaže obsah DIV tělo okna Přehled šifrování a dešifrování
this.prehled_obsah=false; // proměnná určuje zda je v okně Přehled šifrování a dešifrování nějáký obsah. TRUE===´je tam obsah, FALSE===není tam obsah
setTimeout(()=>{
window.scrollTo(0,0); // posun okna TOP, občas se stává, že laiout je posunutý dole, nutný posun TOP
},100); // drobné zpoždění zabrání konfliktu se scroolTo
},

reg_sw(pri_spusteni=true){
// funkce provede registraci Servis Workeru
if("serviceWorker" in navigator){
// pokud je servis worker podporován v zařízen
if(pri_spusteni)
{
// pokud je požadaven na registraci Servis Workeru při načtení stránky
window.addEventListener("load",()=>{
navigator.serviceWorker.register("sw.js",{scope:"/sifrovac/"}).then((registration)=>{
console.log("ServiceWorker registrován v rozsahu: ",registration.scope);
},(err)=>{
console.log("ServiceWorker registrován s chybou: ",err);
});
});
}
else
{
// pokud je požadaven na registraci Servis Workeru po zmáčknutí buttonu
navigator.serviceWorker.register("sw.js",{scope:"/sifrovac/"}).then((registration)=>{
console.log("ServiceWorker registrován v rozsahu: ",registration.scope);
},(err)=>{
console.log("ServiceWorker registrován s chybou: ",err);
});
}
}
else{console.log("ServiceWorker není podporován");}
},

zobraz(){
// funkce slouží k zobrazení a schování číselného kódu při zadání

const ck=[this.uk1,this.uk2,this.uk3,this.uk4,this.uk5,this.uk6]; // číselný kód 1-6 v poli

const l=ck.length; // délka pole
for(let i=0;i<l;i++)
{
if(ck[i]>9||ck[i]<0||isNaN(ck[i])===true) // podmínka testuje jestli zadání čísel je v rozsahu 1-9 a zda se vůbec jedná o číslo - isNaN(hodnota); otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo
{
// pokud není zadání znaku v číselném kódu v povoleném rozsahu Nummer 0-9 anebo se nejedná o číslo
ck[i]=""; // konkrétní pole bude anulováno
}}

[this.uk1,this.uk2,this.uk3,this.uk4,this.uk5,this.uk6]=ck; // nahradí současný číselný kód, pokud nebude uživatelem zadán správný rozsah 0-9 anebo s nebude jednat o číslo, konkrétní číselný kód bude nahrazen "" - jak je uvedeno výše ve smyčce

this.videt=!this.videt; // při kliknutí, změna proměnné

const d=this.t.length; // délka řetězce
if(this.videt===true)
{
// pokud je ČK viditelné
for(let i=0;i<d;i++)
{
this.t[i]="number"; // změní typ input 1-6 na number
}
}
else
{
// pokud je ČK skryté
for(let i=0;i<d;i++)
{
this.t[i]="password"; // změní typ input 1-6 na password
}}
},

zobraz2(){
/* zobrazení anebo skrytí UC v hlavním kontejneru aplikace */

this.videt2=!this.videt2; /* změna promněnné způsobí zviditelnění jednoho anebo druhého buttonu pomocí podmínky v-if a v-if-else */

/* přehození inputu s UC number/password */
if(this.t_v==="password")
{
this.t_v="number";
}
else if(this.t_v==="number")
{
this.t_v="password";
}

},

uc_z(event){
/* funkce zajistí selekci value zadaného uživatelem při kliknutí do inputu pro zadání kódu */
const obj=event.target; /* podle event.target zjistí konkrétní nput objekt */
obj.select(); /* provede selekt value objektu */
},

kopirovat(){
const textarea=this.$refs.area_o2; /* načte do promněnné objekt textarea 2 */

if(textarea.value==="")
{
/* pokud v textarea není žádný znak, provede se return */
return;
}

if(navigator.clipboard){
/* pokud bude v zařízení uživatele navigator.clipboard API */
navigator.clipboard.writeText(this.text_o2); /* do paměti zkopíruje proměnnou this.text_o2, která pomocí v-modelu kopíruje obsah Area1 */
}
else
{
// Náhradní řešení v případě, že nefunguje navigator.clipboard API
textarea.select(); /* udělá select textu v arei */
document.execCommand("copy"); /* kopírování do paměti zařízení */
setTimeout(()=>{
const anotherElement=document.getElementById("button_kopi");
if(anotherElement){anotherElement.focus();}},200); // přehodí focus textu na button Kopírovat
}
this.zobraz_zkopirovano(); // Zobrazí oznámení o kopírování
},

copy_mail(){
const input_email=this.$refs.in_email; // načte do promněnné objekt input email

if(input_email.value==="")
{
// pokud v inputu není žádný znak, provede se return
return;
}

if(navigator.clipboard){
/* pokud bude v zařízení uživatele navigator.clipboard API */
const v_email=this.$refs.in_email.value; // načte hodnotu value inputu - tedy samotný email
navigator.clipboard.writeText(v_email); /* do paměti zkopíruje proměnnou v_email, která odpovídá emailu */
}
else
{
// Náhradní řešení v případě, že nefunguje navigator.clipboard API
input_email.select(); // udělá select textu v input
document.execCommand("copy"); // kopírování do paměti zařízení
setTimeout(()=>{
const anotherElement=document.getElementById("butt_c_mail"); // načte objekt button Kopírovat email
if(anotherElement){anotherElement.focus();}},200); // přehodí focus textu na button Kopírovat
}

this.zobraz_zkopirovan_email(); // Zobrazí oznámení o kopírování

},


smazat1(){
// funkce pro vyjmutí textu z Area 1
this.text_o1=""; // vymaže obsah text area, tím, že znuluje tuto proměnnou, která je s area 1 ve v-modelu
},

smazat2(){
// funkce pro vyjmutí textu z Area 2
this.text_o2=""; // vymaže obsah text area, tím, že znuluje tuto proměnnou, která je s area 2 ve v-modelu
},

vlozit(){
/* funkce pro vložení textu do Area 1 */


if(navigator.clipboard)
{
/* vložení textu z paměti pomocí navigator.clipboard API */
navigator.clipboard.readText()
.then((text)=>{
// Zkontrolujte, zda je text k dispozici
if(text){
// Vložení textu z paměti do textového pole

let vycisteny_text=text.replace(/[\u00A0\u200A\u200B\u200C\u200D\u200E\u200F\u202A\u202B\u202C\u202D\u202E\u202F\u206A\u206B\u206C\u206D\u206E\u206F\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u2060\n\t\v\b\r\f]/g," "); // nahrazení uvedených znaků v řetězci mezerou, jedná se o problematické znaky různých mezer, které tvoří komplikace při šifrování a dešifrování; /.../g = označuje globální vyhledávání, což znamená, že se nahradí všechny výskyty těchto znaků v celém řetězci

this.text_o1=vycisteny_text; // převede vložený text do proměnné, která díky v-modelu tvoří value Area 1
this.text_o1=this.text_o1.trim(); // ořeže prázdné znaky textu area1

} else{
// console.log('Schránka je prázdná.');

this.zobraz_schranka_prazdna(); // funkce zobrazí v Area 1 oznámení: "Schránka je prázdná"

}
})
.catch((error)=>{
console.error("Chyba při čtení ze schránky:", error);
});
}
else
{
// náhradní řešení pokud zařízení nepodporuje navigator.clipboard API
const textarea=this.$refs.area_o1; // načte do promněnné objekt textarea 1
textarea.select(); // udělá select textu v arei
document.execCommand("paste");
this.text_o1=this.text_o1.trim(); // ořeže prázdné znaky textu area1
}
},

zobraz_zkopirovano(){
/* Zobrazení oznámení o kopírování */
const area=this.$refs.area_o2; /* načte do proměnné objekt textarea 2 */
const textO=this.$refs.oznCop; /* načte do proměnné P blok oznámení "ZKOPÍROVÁNO" */

const sirkaA=parseInt(area.clientWidth); /* zjístí šířku oznámení "ZKOPÍROVÁNO"  */
const vyskaA=parseInt(area.clientHeight); /* zjistí výšku oznámení "ZKOPÍROVÁNO" */
const sirkaO=parseInt(textO.clientWidth); /* zjístí šířku area 2 */
const vyskaO=parseInt(textO.clientHeight); /* zjistí výšku area 2 */
const leftO=(sirkaA/2)-(sirkaO/2); /* výpočet parametru LEFT pro  oznámení "ZKOPÍROVÁNO" */
const topO=(vyskaA/2)-(vyskaO/2); /* výpočet parametru TOP pro  oznámení "ZKOPÍROVÁNO" */

textO.style.top=`${topO}px`; /* přepsání CSS parametru TOP (výpočet + px)  oznámení "ZKOPÍROVÁNO" */
textO.style.left=`${leftO}px`; /* přepsání CSS parametru LEFT (výpočet + px)  oznámení "ZKOPÍROVÁNO" */

textO.style.zIndex=1; /* změní z index oznámení "ZKOPÍROVÁNO" */
textO.style.opacity=1;  /* změní opacity oznámení "ZKOPÍROVÁNO" */

setTimeout(()=>{textO.style.opacity=0;},750); /* změní z index oznámení "ZKOPÍROVÁNO" na default */
setTimeout(()=>{textO.style.zIndex=-1;},1000); /* změní opacity oznámení "ZKOPÍROVÁNO" na default */

},

smaz_nep_znaky(){
// funkce odstaní nepovolené znaky z Area 1 a nahadí je znakem *
let delka=this.nep_znaky.length; // délka řetězce nepovolených znaků
for(let i=0;i<delka;i++)
{
// smyčka provede nahrazení všech nepovolených znaků v řetězci
let mazani_znaku= this.text_o1.replace(this.nep_znaky[i],"*"); // nahrazení nepovolené znaky v řetězci znakem *
this.text_o1=mazani_znaku; /* opravený řetězec bez nepovolených znaků nahradí stávající řetězec */
}
this.nep_znaky=""; /* vynuluje proměnnou nepovolených znaků */
},

zobraz_schranka_prazdna(){
/* Zobrazení oznámení o kopírování */
const area=this.$refs.area_o1; /* načte do proměnné objekt textarea 2 */
const textO=this.$refs.oznNeVloz; /* načte do proměnné P blok oznámení "Schránka je prázdná" */
  
const sirkaA=parseInt(area.clientWidth); /* zjístí šířku oznámení "Schránka je prázdná"  */
const vyskaA=parseInt(area.clientHeight); /* zjistí výšku oznámení "Schránka je prázdná" */
const sirkaO=parseInt(textO.clientWidth); /* zjístí šířku area 1 */
const vyskaO=parseInt(textO.clientHeight); /* zjistí výšku area 1 */
const leftO=(sirkaA/2)-(sirkaO/2); /* výpočet parametru LEFT pro  oznámení "Schránka je prázdná" */
const topO=(vyskaA/2)-(vyskaO/2); /* výpočet parametru TOP pro  oznámení "Schránka je prázdná" */
  
textO.style.top=`${topO}px`; /* přepsání CSS parametru TOP (výpočet + px)  oznámení "Schránka je prázdná" */
textO.style.left=`${leftO}px`; /* přepsání CSS parametru LEFT (výpočet + px)  oznámení "Schránka je prázdná" */

textO.style.zIndex=1; /* změní z index oznámení "Schránka je prázdná" */
textO.style.opacity=1;  /* změní opacity oznámení "Schránka je prázdná" */

setTimeout(()=>{textO.style.opacity=0;},750); /* změní z index oznámení "Schránka je prázdná" na default */
setTimeout(()=>{textO.style.zIndex=-1;},1000); /* změní opacity oznámení "Schránka je prázdná" na default */

},

zobraz_zkopirovan_email(){
/* Zobrazení oznámení o kopírování */
const form_e=this.$refs.e_form; // načte do proměnné objekt form - kde je umístěno zobrazení emailu
const textO=this.$refs.emailCop; // načte do proměnné P blok oznámení "Zkopírováno"

const sirkaA=parseInt(form_e.clientWidth); /* zjístí šířku oznámení "Zkopírováno"  */
const vyskaA=parseInt(form_e.clientHeight); /* zjistí výšku oznámení "Zkopírováno" */
const sirkaO=parseInt(textO.clientWidth); /* zjístí šířku form */
const vyskaO=parseInt(textO.clientHeight); /* zjistí výšku form */
const leftO=(sirkaA/2)-(sirkaO/2); /* výpočet parametru LEFT pro  oznámení "Zkopírováno" */
const topO=(vyskaA/2)-(vyskaO/2); /* výpočet parametru TOP pro  oznámení "Zkopírováno" */

textO.style.top=`${topO}px`; /* přepsání CSS parametru TOP (výpočet + px)  oznámení "Zkopírováno" */
textO.style.left=`${leftO}px`; /* přepsání CSS parametru LEFT - oznámení "Zkopírováno" */
textO.style.zIndex=1; /* změní z index oznámení "Zkopírováno" */
textO.style.opacity=1;  /* změní opacity oznámení "Zkopírováno" */

setTimeout(()=>{textO.style.opacity=0;},750); /* změní z index oznámení "Zkopírováno" na default */
setTimeout(()=>{textO.style.zIndex=-1;},1000); /* změní opacity oznámení "Zkopírováno" na default */
},

// Funkce pro zakódování textu s použitím vlastního pole znaků pro posun
async kodovani(text,key){
const charSet=this.pole; // Vlastní pole znaků
let encodedText="";
let startIndex=0;
while(startIndex<text.length) {
let chunk=text.substring(startIndex,startIndex+100);
let chunkEncodedText="";
for(let i=0;i<chunk.length;i++){
let char=chunk[i];
let index=charSet.indexOf(char);
if(index!==-1){
let shift=parseInt(key[i%key.length]);
if(shift===0){
shift=10;
}
let shiftedIndex=(index+shift)%charSet.length;
let encodedChar=charSet[shiftedIndex];
chunkEncodedText+=encodedChar;
}
}
encodedText+=chunkEncodedText;
startIndex+=100;
}
return encodedText; // Vrací zakódovaný text
},


// Funkce pro dekódování zakódovaného textu s použitím vlastního pole znaků pro posun
async dekodovani(encodedText,key){
const charSet=this.pole; // Vlastní pole znaků
let decodedText="";
let startIndex=0;
while(startIndex<encodedText.length){
let chunk=encodedText.substring(startIndex,startIndex+100);
let chunkDecodedText="";
for (let i=0;i<chunk.length;i++) {
let char=chunk[i];
let index=charSet.indexOf(char);
if(index!==-1){
let shift=parseInt(key[i%key.length]);
if(shift===0){
shift=10;
}
let shiftedIndex=(index-shift+charSet.length)%charSet.length;
let decodedChar=charSet[shiftedIndex];
chunkDecodedText+=decodedChar;
}
}
decodedText+=chunkDecodedText;
startIndex+=100;
}
return decodedText; // Vrací dekódovaný text
},
async vlozit_prehled(akce="",text=""){
// funkce slouží k vložení textu do okna Přehled šifrování a dešifrování akce="" / šifrování anebo dešifrování ; text="" - text který se buď šifroval anebo dešifroval
if((akce===""||text==="")&&(akce!=="Šifrování"||akce!=="Dešifrování")) /* ||akce!=="Šifrování"||akce!=="Dešifrování" */
{
return; // pokud nebude zaslána do funkce jedna z potřebných hodnot bude return a funkce se ukončí, Fukce vyžaduje striktně zaslat akce==="Šifrování" anebo "Dešifrování"
}

let class_ico=""; // zde bude název class ico pro Šifrování anebo Dešifrování

if(akce==="Šifrování")
{
class_ico="i-12"; // název css class pro šifrování
}
else
{
class_ico="i-13"; // název css class pro dešifrování
}

const dat=new Date(); // objekt datum
dat.den_t=dat.getDay(); // den v týdnu, kde 0 je neděle a 1 je pondělí
dat.den=dat.getDate(); // den v měsíci
dat.mesic=dat.getMonth(); // měsíc kde leden je 0 a prosinec 11
dat.hodin=dat.getHours(); // aktuální hodina
dat.minut=dat.getMinutes(); // aktuální minuta
dat.sekund=dat.getSeconds(); // aktuální sekunda

const dny=["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"]; // dne v týdnu seřazeny v poli pro potřeby vestavěné funkce getDay()

if(dat.minut<10)
{
dat.minut=`0${dat.minut}`; // přidání 0 před jednomístné minuty
}

if(dat.sekund<10)
{
dat.sekund=`0${dat.sekund}`; // přidání 0 před jednomístné sekundy
}

const prehled_telo=this.$refs.telo_prehled; // DIV tělo okna Přehled šifrování a dešifrování

const objekt_hlavicka=document.createElement("div"); // vytvoří DIV pro hlavičku BOXU
const objekt_ico=document.createElement("span"); // vytvoří SPAN pro ICO hlavičky
objekt_ico.setAttribute("class",`s-1 ${class_ico}`); // přidání class třídy pro ICO do hlavičky Šifrování/Dešifrování
objekt_hlavicka.appendChild(objekt_ico); // přidá ico šifrování/dešifrování do DIV hlavičky

const hlavicka_cas=document.createTextNode(`${dat.hodin}:${dat.minut}:${dat.sekund} hod.`); // vytvoří textový uzel hlavičky ČAS
const hlavicka_date=document.createTextNode(`(${dny[dat.den_t]} ${dat.den}.${dat.mesic+1}.)`); // vytvoří textový uzel hlavičky DATUM

const objekt_hlavickaS2=document.createElement("span"); // span display=inline-block pro čas hlavičky
const objekt_hlavickaS3=document.createElement("span"); // span display=inline-block pro datum hlavičky
objekt_hlavickaS2.appendChild(hlavicka_cas); // přidá do SPANu pro čas textový uzel s časem
objekt_hlavickaS2.setAttribute("style","font-size:.8rem;"); // zmenšení SPAN s časem
objekt_hlavickaS3.appendChild(hlavicka_date); // přidá do SPANu pro datum textový uzel s datumem
objekt_hlavickaS3.setAttribute("style","font-size:.8rem;font-weight:400;"); // zmenšení SPAN s datumem a odebrání tučnosti

const objekt_hlavickaA=document.createElement("p"); // vytvoří P text akce Šifrování/Dešifrování
objekt_hlavickaA.setAttribute("style","width:6.5rem;"); // přidání styl pevné šířky akce Šifrování/Dešifrování
const hlavicka_akce=document.createTextNode(akce); // vytvoří textový uzel hlavičky šifrování/dešifrování
objekt_hlavickaA.appendChild(hlavicka_akce); // k P hlavčky akce Šifrování/Dešifrování přidán text
objekt_hlavicka.appendChild(objekt_hlavickaA); // přidá P hlavičky AKCE Šifrování/Dešifrování


const objekt_hlavickaP=document.createElement("p"); // vytvoří P pro čas a datum hlavičky
objekt_hlavickaP.appendChild(objekt_hlavickaS2); // přidá do P hlavičky SPAN s časem
objekt_hlavickaP.appendChild(document.createTextNode(" ")); // přidá do P hlavičky mezeru mezi SPANY
objekt_hlavickaP.appendChild(objekt_hlavickaS3); // přidá do P hlavičky SPAN s datumem

objekt_hlavicka.appendChild(objekt_hlavickaP); // přidá P hlavičky do DIV hlavičky

const objekt_telo=document.createElement("p"); // vytvoří P HTML element pro text obsahu šifrováno/dešifrováno
objekt_telo.setAttribute("style","overflow-wrap:anywhere;"); // přidání styl pro lepší zalamování dlouhých textů
const obsah_text=document.createTextNode(text); // vytvoří textový uzel pro text obsahu šifrováno/dešifrováno
objekt_telo.appendChild(obsah_text); // přidá textový uzel pro text obsahu šifrováno/dešifrováno do P HTML element pro text obsahu šifrováno/dešifrováno

const novy_objekt=document.createElement("div"); // vytvoří hlavní BOX pro kompletní informaci Šifrováno/Dešifrováno

novy_objekt.appendChild(objekt_hlavicka); // přidá hlavičku do hlavního BOXu pro kompletní informaci Šifrováno/Dešifrováno
novy_objekt.appendChild(objekt_telo); // přidá P HTML element s textem obsahu šifrováno/dešifrováno do hlavního BOXu pro kompletní informaci Šifrováno/Dešifrováno

prehled_telo.appendChild(novy_objekt); // přidá hlavní BOX pro kompletní informaci Šifrováno/Dešifrováno do těla okna Přehled šifrování a dešifrování

this.prehled_obsah=true; // proměnná určuje zda je v okně Přehled šifrování a dešifrování nějáký obsah. TRUE===´je tam obsah, FALSE===není tam obsah

},
statistika(){
// funkce slouží k sbírání statistických dat

if("localStorage" in window&&window["localStorage"]!==null)
{
// pokud je Local Storage API podporován
let pocet_ls=localStorage.getItem("statistika"); // poček kliknutí uložených na local storage

if(pocet_ls!==null)
{
// pokud byla nějáká data načtena
pocet_ls=parseInt(pocet_ls); // převede string na number
this.kliku=pocet_ls; // počet kliků == počet uložených kliků
}
}

if(navigator.onLine)
{
// pokud je uživatel onLine
const dataToSend="sifrovani";
try{
// Vytvoření AJAX požadavku
this.kliku++; // přičte jeden klik
const xhr=new XMLHttpRequest();
xhr.open("POST","statistika/zapis.php",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(`pocet=${encodeURIComponent(this.kliku)}&token=${encodeURIComponent(this.token)}`);  // Odeslání dat
this.kliku=0; // vynuluje počet kliků
/*
xhr.onload=()=>{
// Reakce na dokončení požadavku
if(xhr.status===200){
console.log('Data byla úspěšně odeslána.');
}else{
console.log('Došlo k chybě při odesílání dat.');
}};
*/
}
catch(err){
console.log("Statistická data neodeslána. Chyba:"+err);
this.kliku++; // přičte jeden klik pokud došlo k chybě
}
}
else
{
// pokud není uživatel onLine
this.kliku++; // přičte jeden klik pokud není uživatel onLine
}

if("localStorage" in window&&window["localStorage"]!==null)
{
// pokud je Local Storage API podporován
localStorage.setItem("statistika",this.kliku); // uloží na Local storage počet kliků
}},

akce(){
// Zmáčknutí tlačítka šifrovat anebo dešifrovat - odeslání dat pro statistiku
this.statistika(); // funkce slouží k sbírání statistických dat

const text_orez=this.text_o1.trim(); /* načte text z prvního okna area a ořeže metodou trim všechny prázdné znaky z obou stran řetězce */
const text=text_orez.replace(/[\u00A0\u200A\u200B\u200C\u200D\u200E\u200F\u202A\u202B\u202C\u202D\u202E\u202F\u206A\u206B\u206C\u206D\u206E\u206F\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u2060\n\t\v\b\r\f]/g," "); // nahrazení uvedených znaků v řetězci mezerou, jedná se o problematické znaky různých mezer, které tvoří komplikace při šifrování a dešifrování; /.../g = označuje globální vyhledávání, což znamená, že se nahradí všechny výskyty těchto znaků v celém řetězci
const key=`${this.uk1}${this.uk2}${this.uk3}${this.uk4}${this.uk5}${this.uk6}`;
const rada=this.pole; /* pole znaků ke kódování a dekódování */
const l=text.length; // délka řetězce text

if(l===0)
{
return; /* pokud area nebude obsahovat ani jeden znak - bude funkce ukončena! */
}

this.nep_znaky=""; /* vynuluje proměnnou */

for(let i=0;i<l;i++)
{
/* projde celý řetězec znaků ke kódování */
if(!rada.includes(text[i])) /* Metoda includes() vrátí hodnotu true, pokud řetězec obsahuje zadanou hodnotu. */
{
/* pokud řetězec, který se má kódovat obsahuje znaky, které nejsou obsaženy v poly znaků ke kódování */
this.nep_znaky+=`${text[i]}`; /* nepovolené znaky přidá do proměnné s mezerami */

/* console.log("Text ke kódování obsahuje tento nepovolený znak: "+text[i]);  vypíše do konzoly tento nepovolený znak */
}}

if(this.nep_znaky!="")
{
/* pokud výše ve smyčce FOR byly objeveny nepovolené znaky */
this.o_dia('ne_znaky','h_ne_znaky','z_ne_znaky'); /* pomocí této funkce aktivuje dialogové okno s výčtem nepovolených znaků */
return; /* ukončí funkci */
}

if(this.otoceni){
/* pokud je aktivní dešifrování */

if(text[0]!=="#"||text[l-1]!=="#")
{
// pokud první a poslední znak šifrovaného textu není # , je něco špatně!
this.o_dia('ne_sifra','h_ne_sifra','z_ne_sifra'); /* pomocí této funkce aktivuje dialogové okno s upozorněním, že se nejedná o šifrovaný text */
return;
}

const u_delka=l-1; /* upravená délka řetězce, aby bylo možné odříznout poslední znak v řetězci */
const d_text=text.slice(1,u_delka); /* z proměnná text vyřízne část řetězce kde vynechá 1. a poslední znak v řetězci, který by měl být #, která na začátek a konec řetězce byly přidány při zakódování  */

// Dekódování textu asynchronně
this.dekodovani(d_text,key)
.then(new_text=>{
this.text_o2=new_text;  /* převede dekódovaný text do druhého okna area */
this.vlozit_prehled("Dešifrování",new_text); // funkce zajistí, že text který byl dešifrován bude přidán do okna Přehled Šifrování a dešifrování
})
.catch(error=>{
console.error("Chyba při dekódování: ",error);
});
}
else
{
/* pokud je aktivní šifrování */
// Kódování textu asynchronně
this.kodovani(text,key)
.then(new_text=>{
const k_text=`#${new_text}#`; /* přidá na začátek a konec zakódovaného řetězce # ,aby určil počátek a konec kódování */
this.text_o2=k_text;  /* převede kódovaný text do druhého okna area */
this.vlozit_prehled("Šifrování",text); // funkce zajistí, že text který se šifroval bude přidán do okna Přehled Šifrování a dešifrování
})
.catch(error=>{
console.error("Chyba při zakódování:", error);
});
}
},

zmena(){
// Zmáčknutí tlačítka Přehodit
this.otoceni=!this.otoceni; /* změna proměnné z false na true dává podmět pro změnu v popiscích Area */

if(this.otoceni)
{
// Když je nastaveno Dešifrovat
this.otocCSS="o-jinak";
this.placeholder_ta1="Vložte text, který chcete dešifrovat"; // v-bind placeholder textarea1
this.placeholder_ta2="Zmáčkněte Dešifrovat a objeví se dešifrovaný text"; // v-bind placeholder textarea2
}
else
{
// Když je nastaveno Šifrovat
this.otocCSS="o-normal";
this.placeholder_ta1="Napište anebo vložte text, který chcete šifrovat"; // v-bind placeholder textarea1
this.placeholder_ta2="Zmáčkněte Šifrovat a objeví se šifrovaný text"; // v-bind placeholder textarea2
}},


o_dia(id,scrool,z_but){
/* funkce otevře DIALOGOVÉ okn o - očekává parametry: id dialogového okna , id prvku na který se má scroolovat , id buttonu pro zavření dialogového okna na který se má provést focus */
const dia=document.getElementById(id); /* objekt dialogového okna */
dia.showModal(); /* otevře dialogové okno */
setTimeout(()=>{
const but=document.getElementById(z_but); /* objekt buttonu pro zavření dialogového okna */
const sc=document.getElementById(scrool); /* objekt na který se při otevření dialogového okna má provést scrool */
sc.scrollIntoView({behavior:"smooth"}); /* bude scrool na nadpis, pokud by uživatel opět otevřel DIALOG a byl v něm posunut dole */
but.focus(); /* zaměří button dialogového okna */
},200); /* zpoždění je nutné, aby bylo možné prvky zobrazené zachytit */ 
},

z_dia(id){
// funkce zavře dialogové okno
document.getElementById(id).close(); // zavře dialog okno
},

mail(){
const x=["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqhc","eaw"];
const k=`${x[4][0]}${x[2][1]}${x[5][1]}${x[9][0]}${x[0][0]}${x[6][0]}${x[4][1]}${x[9][3]}${x[9][2]}${x[10][1]}${x[6][1]}${x[1][2]}${x[10][0]}${x[6][0]}${x[2][1]}${x[4][1]}${x[6][1]}${x[0][1]}${x[9][3]}${x[0][2]}`; /* výsek emailu */
this.email=k; // přepíše proměnnou a udělá bind value input pro zobrazení emailu
},

orez_area1(){
// funkce se pouští pomocá posluchače @paste na Area 1
setTimeout(()=>{
this.text_o1=this.text_o1.trim();} // ořeže prázdné znaky textu area1
,250); // zpoždění 250ms je na místě, jinak akci neprovede
},
prehled_on(){
// funkce zajišťuje zapnutí okna Přehled šifrování a dešifrování
this.apka=!this.apka; // v-show - vypnutí hlavního kontajneru aplikace
this.prehled=!this.prehled; // v-show - zapnutí okna Přehled šifrování a dešifrování

if(this.prehled_obsah===false)
{
// pokud obsah okna Přehled šifrování a dešifrování bude prázdný
setTimeout(()=>{
this.$refs.okno_prehled.scrollIntoView({behavior:'smooth'}); // scroll na horní část okna Přehled šifrování a dešifrování
// window.scrollTo(0,0); // posun okna TOP
},200); // drobné zpoždění zabrání konfliktu se scroolTo
setTimeout(()=>{
this.$refs.okno_prehled.scrollIntoView({behavior:'smooth'}); // scroll na horní část okna Přehled šifrování a dešifrování
// window.scrollTo(0,0); // posun okna TOP
},500); // další scroll pro pomalejší zařízení
}
else
{
// pokud obsah okna Přehled šifrování a dešifrování bude zaplněn
this.$refs.telo_prehled.style.filter="blur(5px)"; // rozmaže obsah těla okna Přehled šifrování a dešifrování
this.o_dia('zobrazit_prehled','h_zobraz','z_zobrazit_prehled'); // otevře dialogové okno s dotazem zda Zobrazit přehled

setTimeout(()=>{
this.$refs.kotva_prehled.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}); // scroll na kotvu okna Přehled šifrování a dešifrování
},200); // drobné zpoždění zabrání konfliktu se scroolTo
setTimeout(()=>{
this.$refs.kotva_prehled.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}); // scroll na kotvu okna Přehled šifrování a dešifrování
},500); // další scroll pro pomalejší zařízení
}


},
prehled_off(){
// funkce zajišťuje vypnutí okna Přehled šifrování a dešifrování
this.prehled=false; // v-show - vypnutí okna Přehled šifrování a dešifrování
this.apka=true; // v-show - zapnutí hlavního kontajneru aplikace

}
},

computed:{

b_v_c(){
/* pokud bude vyplněno alespoň jedno číslo UC - zobrazí se button Zobrazit UC */
if(this.uk1===""&&this.uk2===""&&this.uk3===""&&this.uk4===""&&this.uk5===""&&this.uk6==="")
{
return false;
}
else
{
return true;
}
},

znaku()
{
/* vrací Počet znaků v psaní zadání textAREA */
return this.text_o1.length;
},

max_znaku(){
// ukazatel maximálního početu možných vložených znaků

if(this.otoceni===true)
{
// Pokud bude aktiuvní vložení Šifrovaného textu
return 1010; // řetězec má mimořádně 1010 znaků - kvůli vložení, kdyby někdo zkopíroval šifrovaný text + řádek anebo mezeru navíc a následně je vložil, aby nedošlo k ořezání šifrovaného textu
}
else
{
return 1000; // běžný stav maximálního počtu znaků
}},

all(){
/* computed slouží k hlídání nepovolených kombinací UC */
if(this.uk1===this.uk2&&this.uk2===this.uk3&&this.uk3===this.uk2&&this.uk3!=="")
{
/* 0 0 0 x x x ; 1 1 1 x x x ; 2 2 2 x x x atd. */
return this.nepovolen=true,this.s_rada=1; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(this.uk4===this.uk5&&this.uk5===this.uk6&&this.uk6===this.uk5&&this.uk6!=="")
{
/* x x x 0 0 0; x x x 1 1 1; x x x 2 2 2 atd. */
return this.nepovolen=true,this.s_rada=2; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(this.uk1===this.uk4&&this.uk2===this.uk5&&this.uk3===this.uk6&&this.uk1!==""&&this.uk6!=="")
{
/* 7 1 7 7 1 7  ; 2 0 2 2 0 2 ; 5 8 7 5 8 7 */
return this.nepovolen=true,this.s_rada=3; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk1)===(parseInt(this.uk2)-1)&&parseInt(this.uk2)===(parseInt(this.uk3)-1)&&this.uk1!=="")
{
/* 1 2 3 x x x; 2 3 4 x x x ; 3 4 5 x x x */
return this.nepovolen=true,this.s_rada=1; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk4)===(parseInt(this.uk5)-1)&&parseInt(this.uk5)===(parseInt(this.uk6)-1)&&this.uk6!=="")
{
/* x x x 1 2 3; x x x 2 3 4; x x x 3 4 5 */
return this.nepovolen=true,this.s_rada=2; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk1)===(parseInt(this.uk2)+1)&&parseInt(this.uk2)===(parseInt(this.uk3)+1)&&this.uk1!=="")
{
/* 4 3 2 x x x; 5 4 3 x x x ; 6 5 4 x x x */
return this.nepovolen=true,this.s_rada=1; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk4)===(parseInt(this.uk5)+1)&&parseInt(this.uk5)===(parseInt(this.uk6)+1)&&this.uk6!=="")
{
/* x x x 3 2 1; x x x 4 2 3; x x x 5 4 3 */
return this.nepovolen=true,this.s_rada=2; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else
{
return this.nepovolen=false,this.s_rada=0; /* odstraní cedulku, že UC není povoleno - v objektu watch následně odblokuje button disabled */
}
}

},
    
    
watch:{

all(n)
{
/* Wotcher musí být jinak nefunguje závislost computed properties! */
},

s_rada(n)
{
// watcher přebarví ty inputy zadání číselného kódu, která řada číselných kódů je chybně zadaná 0-žádná, 1=první tři čísla, 2=druhé tři čísla, 3=všech šest čísel
const r="2px solid red";
const d="1px solid rgb(45,45,18)"; // default css style rámečku

const i1=[this.$refs.c1,this.$refs.c2,this.$refs.c3]; // první tři input pro zadání číselného kódu pro šifrování semkne do jednoho pole
const l1=i1.length; // délka pole i1
const i2=[this.$refs.c4,this.$refs.c5,this.$refs.c6]; // druhé tři input pro zadání číselného kódu pro šifrování semkne do jednoho pole
const l2=i2.length; // délka pole i2

if(n===1)
{
// pokud bude návaratová hodnota z metody all() this.s_rada===1, je špatně zadaná první řada 3 čísel
for(let i=0;i<l1;i++)
{
i1[i].style.border=r; // přebarví první řadu zadání čísel na červenou
}
for(let i=0;i<l2;i++)
{
i2[i].style.border=d; // přebarví druhou řadu zadání čísel na default
}
}
else if(n===2)
{
// pokud bude návaratová hodnota z metody all() this.s_rada===2, je špatně zadaná druhá řada 3 čísel
for(let i=0;i<l1;i++)
{
i1[i].style.border=d; // přebarví první řadu zadání čísel na default
}
for(let i=0;i<l2;i++)
{
i2[i].style.border=r; // přebarví druhou řadu zadání čísel na červenou
}
}
else if(n===3)
{
// pokud bude návaratová hodnota z metody all() this.s_rada===3, jsou špatně zadány obě řady čísel 3-3
for(let i=0;i<l1;i++)
{
i1[i].style.border=r; // přebarví první řadu zadání čísel na červenou
}
for(let i=0;i<l2;i++)
{
i2[i].style.border=r; // přebarví druhou řadu zadání čísel na červenou
}
}
else if(n===0)
{
// pokud bude návaratová hodnota z metody all() this.s_rada===0, jsou SPRÁVNĚ zadány obě řady čísel 3-3
for(let i=0;i<l1;i++)
{
i1[i].style.border=d; // přebarví první řadu zadání čísel na default
}
for(let i=0;i<l2;i++)
{
i2[i].style.border=d; // přebarví druhou řadu zadání čísel na default
}
}
},

uk1(n,s){
/* n=nová zadaná hodnota do formuláře ; s=stará (tedy předeělá) hodnota ve formuláři */
const hod=parseInt(n); /* nově zadanou hodnotu převede na číslo type integer */
const vys=isNaN(hod); /* otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */
if(vys)
{
/* pokud nebude zadaná hodnota číslo - tedy bude proměnná TRU a parseInt(VALUE) byl NaN */
this.uk1=""; /* bude value prázdný řetězec */
}
else if(n>9||n<0||n.length>1)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk1=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
else
{
/* pokud se úspěšně prošlo výše uvedenými podmínkami bude VALUE číslo od 0- 9 a následovat bude focus na další pole */
this.$refs.c2.focus(); /* fokus input pro zadání druhého čísla UC */
this.$refs.c2.select(); /* select value input pro zadání druhého čísla UC */
}



},

uk2(n,s){
/* n=nová zadaná hodnota do formuláře ; s=stará (tedy předeělá) hodnota ve formuláři */
const hod=parseInt(n); /* nově zadanou hodnotu převede na číslo type integer */
const vys=isNaN(hod); /* otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */

if(vys)
{
/* pokud nebude zadaná hodnota číslo - tedy bude proměnná TRU a parseInt(VALUE) byl NaN */
this.uk2=""; /* bude value prázdný řetězec */
}
else if(n>9||n<0||n.length>1)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk2=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
else
{
/* pokud se úspěšně prošlo výše uvedenými podmínkami bude VALUE číslo od 0- 9 a následovat bude focus na další pole */
this.$refs.c3.focus(); /* fokus input pro zadání druhého čísla UC */
this.$refs.c3.select(); /* select value input pro zadání druhého čísla UC */
}
},

uk3(n,s){
/* n=nová zadaná hodnota do formuláře ; s=stará (tedy předeělá) hodnota ve formuláři */
const hod=parseInt(n); /* nově zadanou hodnotu převede na číslo type integer */
const vys=isNaN(hod); /* otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */

if(vys)
{
/* pokud nebude zadaná hodnota číslo - tedy bude proměnná TRU a parseInt(VALUE) byl NaN */
this.uk3=""; /* bude value prázdný řetězec */
}
else if(n>9||n<0||n.length>1)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk3=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
else
{
/* pokud se úspěšně prošlo výše uvedenými podmínkami bude VALUE číslo od 0- 9 a následovat bude focus na další pole */
this.$refs.c4.focus(); /* fokus input pro zadání druhého čísla UC */
this.$refs.c4.select(); /* select value input pro zadání druhého čísla UC */
}
},
uk4(n,s){
/* n=nová zadaná hodnota do formuláře ; s=stará (tedy předeělá) hodnota ve formuláři */
const hod=parseInt(n); /* nově zadanou hodnotu převede na číslo type integer */
const vys=isNaN(hod); /* otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */

if(vys)
{
/* pokud nebude zadaná hodnota číslo - tedy bude proměnná TRU a parseInt(VALUE) byl NaN */
this.uk4=""; /* bude value prázdný řetězec */
}
else if(n>9||n<0||n.length>1)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk4=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
else
{
/* pokud se úspěšně prošlo výše uvedenými podmínkami bude VALUE číslo od 0- 9 a následovat bude focus na další pole */
this.$refs.c5.focus(); /* fokus input pro zadání druhého čísla UC */
this.$refs.c5.select(); /* select value input pro zadání druhého čísla UC */
}
},
uk5(n,s){
/* n=nová zadaná hodnota do formuláře ; s=stará (tedy předeělá) hodnota ve formuláři */
const hod=parseInt(n); /* nově zadanou hodnotu převede na číslo type integer */
const vys=isNaN(hod); /* otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */

if(vys)
{
/* pokud nebude zadaná hodnota číslo - tedy bude proměnná TRU a parseInt(VALUE) byl NaN */
this.uk5=""; /* bude value prázdný řetězec */
}
else if(n>9||n<0||n.length>1)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk5=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
else
{
/* pokud se úspěšně prošlo výše uvedenými podmínkami bude VALUE číslo od 0- 9 a následovat bude focus na další pole */
this.$refs.c6.focus(); /* fokus input pro zadání druhého čísla UC */
this.$refs.c6.select(); /* select value input pro zadání druhého čísla UC */
}
},

uk6(n,s){
/* n=nová zadaná hodnota do formuláře ; s=stará (tedy předeělá) hodnota ve formuláři */
const hod=parseInt(n); /* nově zadanou hodnotu převede na číslo type integer */
const vys=isNaN(hod); /* otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */

if(vys)
{
/* pokud nebude zadaná hodnota číslo - tedy bude proměnná TRU a parseInt(VALUE) byl NaN */
this.uk6=""; /* bude value prázdný řetězec */
}
else if(n>9||n<0||n.length>1)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk6=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
},  

text_o1(n){
// hlídá maximální délku textu v area 1
if(n.length>=1000)
{
/* pokud je znaků 1000 a více v textarea 1 */
if(this.otoceni===true)
{
/* Pokud bude aktiuvní vložení Šifrovaného textu */
this.text_o1=this.text_o1.slice(0,1010); /* řetězec ořezán mimořádně na 1010 znaků - kvůli vložení, kdyby někdo zkopíroval šifrovaný text + řádek anebo mezeru navíc a následně je vložil, aby nedošlo k ořezání šifrovaného textu */
}
else
{
this.text_o1=this.text_o1.slice(0,1000); /* odřízne řetězec 0 až 1000 z this.text_o1 a vrátí ho zpět, tak aby řetězec nebyl větší jak 1000 znaků */
}

}},

nepovolen(n){
// wotcher hlídá hodnotu nepovoleného UC
if(n===true)
{
// pokud bude zadán nepovolená kombinace UC
clearTimeout(this.casovac1); // vynuluje časovač
this.casovac1=setTimeout(()=>{this.$refs.butt_nepovolen.focus();},1500); // provede focus na button Otazník - UC Nepovolen za 1,5s protože 1s trvá animace
}
else
{
clearTimeout(this.casovac1); // vynuluje časovač
}
}
},

mounted(){
/* Hák mounted provede akci, která je v něm uvedena po načtení stránky */

// VisualViewport API - úprva velikosti zobrazení BODY, HLAVNÍHO KONTEJNERU a Okna Přehled šifrování a dešifrování
const v_port={
id:"h-con", // id hlavního kontejneru
id2:"okno-prehled", // id okna Přehled šifrování a dešifrování
casovac:null, // časovač pro kontrolu, zda úprava výšky sledovaných objektů je v pořádku

handleEvent(){
const o1=document.body; // sledovaný objekt 1
const o2=document.getElementById(this.id); // sledovaný objekt 2
const o3=document.getElementById(this.id2); // sledovaný objekt 3
const o1_v=parseInt(o1.clientHeight); // výška objektu 1
const o2_v=parseInt(o2.clientHeight); // výška objektu 2
const o3_v=parseInt(o3.clientHeight); // výška objektu 3
const d_v=parseInt(window.innerHeight)||parseInt(document.documentElement.clientHeight); // Získání aktuální výšky viewportu
if(o1_v!==d_v||o2_v!==d_v||o3_v!==d_v)
{
// pokud se výška jednoho ze sledovaných bojektů !== výšce viewportu
o1.style.minHeight=`${d_v}px`; // upraví minimální výšku sledovaného objektu na výšku viewportu
o2.style.minHeight=`${d_v}px`; // upraví minimální výšku sledovaného objektu na výšku viewportu
o3.style.minHeight=`${d_v}px`; // upraví minimální výšku sledovaného objektu na výšku viewportu
clearTimeout(this.casovac); // vynuluje čaovač
this.casovac=setTimeout(()=>{
this.handleEvent; // funkce spustí samu sebe - rekluze
},500); // za určitý čas provede rekluzi funkce, aby zjistil, zda došlo k nápravě
}
},

aktivace(){
if(window&&window.visualViewport) // test - zda je visualViewport podporováno
{
// Posluchače
window.visualViewport.addEventListener("resize",this); // přidá posluchač na změnu velikosti viewportu
window.visualViewport.addEventListener("scroll",this); // přidá posluchač na scroolování obrazovky ve viewportu
}
else
{
// pokud není dostupná podpora Visual Viewport API
addEventListener("scroll",this); // přidá klasický posluchač na scroolování obrazovky
}
this.handleEvent(); // s aktivací spustí první srovnání velikosti sledovaných objektů
}};
v_port.aktivace(); // aktivuje visualViewport API

this.$refs.uvod_animace.style.animationPlayState="paused"; // zastaví úvodní animaci Loading...
this.loading=false; // v-show : vypne úvodní animaci Loading...

if("localStorage" in window&&window["localStorage"]!==null)
{
// test jestli funguje localstorage
console.log("Local storage is ready!");

const byl_vydan_souhlas=localStorage.getItem(this.souhlas_Ls[0]); // z LocalStorage zjistí, zda vydal dříve uživatel Souhlas s podmínkami užívání aplikace

if(byl_vydan_souhlas===this.souhlas_Ls[1])
{
// pokud byl dříve vydán souhlas
this.podminky=false; // v-show schová okno s podmínkami
this.spustit=true; // v-show zobrazí okno s zadáním UC
this.reg_sw(true); // funkce provede registraci Servis Workeru (parametr true znamená, že o registraci Servis workeru bylo požádáno při spuštění aplikace)
}
else
{
// pokud souhlas dříve vydán nebyl
this.podminky=true; // v-show : zobrazí úvodní okno Se souhlasem s podmínkami 
}

}
else
{
// pokud nefunguje Localstorage - zobrazí okno se Souhasem s podmínkami
this.podminky=true; // v-show : zobrazí úvodní okno Se souhlasem s podmínkami 
}

function prepis_odkazy(){
// funkce zajistí přepis odkazu href na JS funkci window.open u odkazů na sociální sítě Facebook, síť X a Webové stránky výrobce aplikace
const id=["sdil-fb","sdil-tw","href_boar"];
const SIRKA=600; // šířka nově otevřeného okna v px
const VYSKA=600; // výška nově otevřeného okna v px
const min_VYSKA=800; // minimální výška obrazovky v px
const min_SIRKA=800; // minimální šířka obrazovky v px
const vyska=parseInt(window.screen.height); // výška obrazovky v px
const sirka=parseInt(window.screen.width); // šířka obrazovky v px
const z_leva=sirka/2-SIRKA/2; // poloha nového okna z leva
const z_hora=vyska/2-VYSKA/2; // poloha nového okna z hora

// funkce přepíše HREF na tlačítkách sdílet Facebook, sdílet Twitter a webové stránky programátora
if(vyska>min_VYSKA&&sirka>min_SIRKA) // podmínka, pro obrazovky s požadovanou velikostí, aby zbytečně pro malé obrazovky nebyl href upravován
{
let l=id.length;
for(let i=0;i<l;i++)
{
// smička, která všechny odkazy, které budou mít ID uvedené v poli this.id upraví tak, aby se otvírali pomocí window.open v rozměru podle parametrů v objektu
if(document.getElementById(id[i])) /* podmínka zaručuje, že objekt v HTML existuje */
{
const obj=document.getElementById(id[i]); // načte objekt odkazu do proměnné
const Ahref=obj.href; // načte href odkazu do proměnné
obj.target=""; // target musí být prázdý jinak nové okno neotevře
const text=`window.open('${Ahref}','','width=${SIRKA},height=${VYSKA},left=${z_leva},top=${z_hora}',false);`; // vytvoří JS příkaz, který bude v href odkazu
obj.href=`javascript:${text}`; // přepíše href odkazu na nový JavaScriptový výraz window.open
}}
}
};
prepis_odkazy(); // funkce přepíše odkazy na sociální sítě Facebook, síť X a Webové stránky výrobce aplikace

},

});
    
app.mount('#app');