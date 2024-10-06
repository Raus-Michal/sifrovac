

// VisualViewport API - úprva velikosti zobrazení BODY + HLAVNÍHO KONTEJNERU 
const v_port={
id:"h-con", // id hlavního kontejneru
casovac:null, // časovač pro kontrolu, zda úprava výšky sledovaných objektů je v pořádku

handleEvent(){
const o1=document.body; // sledovaný objekt 1
const o2=document.getElementById(this.id); // sledovaný objekt 2
const o1_v=parseInt(o1.clientHeight); // výška objektu 1
const o2_v=parseInt(o2.clientHeight); // výška objektu 2
const d_v=parseInt(window.innerHeight)||parseInt(document.documentElement.clientHeight); // Získání aktuální výšky viewportu
if(o1_v!==d_v||o2_v!==d_v)
{
// pokud se výška jednoho ze sledovaných bojektů !== výšce viewportu
o1.style.minHeight=`${d_v}px`; // upraví minimální výšku sledovaného objektu na výšku viewportu
o2.style.minHeight=`${d_v}px`; // upraví minimální výšku sledovaného objektu na výšku viewportu
clearTimeout(this.casovac); // vynuluje čaovač
this.casovac=setTimeout(()=>{
this.handleEvent; // funkce spustí samu sebe - rekluze
},500); // za určitý čas provede rekluzi funkce, aby zjistil, zda došlo k nápravě
}
},

aktivace(){
// v css mají nastavený display:none - z důvodů prví animace Loading - a teď se provede náprava
document.getElementById("h-con").style.display="grid";
document.getElementById("u-podminky").style.display="block";
document.getElementById("z_uc").style.display="block";
// KONEC v css mají nastavený display:none - z důvodů prví animace Loading - a teď se provede náprava

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
// KONEC - VisualViewport API - úprva velikosti zobrazení BODY + HLAVNÍHO KONTEJNERU


const app=Vue.createApp({

data(){
return {
loading:true, // v-show zobrazení animace Loading... před načtením aplikace //
apka:false, /* v-show zobrazení hlavní strany aplikace a schování startovacího okna */
podminky:false, /* utčuje zda uživatel v startovacím okně souhlasil s podmínkami používání šifrovače */
spustit:false, /* v-show zobrazení okno s UC startovacího okna */
souhlas_Ls:["souhlas","vydan"], // proměnná určuje string pro uložení souhlasu v Localstorage [klíč,data]
uk1:"", /* UC 1. číslo */
uk2:"", /* UC 2. číslo */
uk3:"", /* UC 3. číslo */
uk4:"", /* UC 4. číslo */
uk5:"", /* UC 5. číslo */
uk6:"", /* UC 6. číslo */
nepovolen:false, /* v-if zobrazí P s informací nepovoleného UC pokud bude true */
t1:"password", /* v-bind:type 1. input number/password při zadání UC */
t2:"password", /* v-bind:type 2. input number/password při zadání UC */
t3:"password", /* v-bind:type 3. input number/password při zadání UC */
t4:"password", /* v-bind:type 4. input number/password při zadání UC */
t5:"password", /* v-bind:type 5. input number/password při zadání UC */
t6:"password", /* v-bind:type 6. input number/password při zadání UC */
videt:false, /*  v-if a v-else-if zobrazení UC při zadání */
videt2:false, /*  v-if a v-else-if zobrazení UC přímo v apce */
t_v:"password", /* v-bind:type 1.-6. input number/password přímo v apce */
text_o1:"",  /* text v area 1 */
text_o2:"", /* text v area 2 */
otoceni:false, /* v-if a v-else-if určuje zda uživatel mění šifrovat/dešifrovat */
placeholder_ta1:"Napište text, který chcete šifrovat", // v-bind placeholder textarea1
placeholder_ta2:"Zmáčkněte Šifrovat a objeví se šifrovaný text", // v-bind placeholder textarea2
otocCSS:"o-normal", /* v-bind class pro otočení kruhu při zmáčknutí tlačítka Přehodit */
pole:`A„7BCD0<KO=PQ@1RS"TUVW[XYZ“Á6ÉEFGŠŘŽabc!def)ghi*j3kl_mnop{ qr.stLN4uv}wx-yzáŤŮHIJéí§:;óú,ý8čÍÓ/$#ÚÝ2ČĎ(ĚŇ?ď%ě5'ňř>šť+ůž9M]`, /* sada znaků k šifrování a dešifrování */
nep_znaky:"", /* proměnná slouží k výisu nepovolených znaků k šifrování v Dialog okně */
email:"", /* proměnná na binden value input zobrazení emailu */
udalos_viditelnost:"", /* promměnná slouží k testování a používání visibilitychange API */
statstika:false // proměnná určuje jestli se objeví statistika kliknutí na tlačítko šifrovat nebo dešifrovat v okně pro kontakt
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
},

start(){
if(this.nepovolen==false)
{
// pokud nebyl zadán nepovolený UC - vykoná akci
this.spustit=false;
this.apka=true;
}},

zobraz(){


/* !!!!!!!!!! z uk1-uk6 je potřeba udělat pole const uk=[uk1 , uk2 ...]  */
/* budoucí smyčka for */

if(this.uk1>9||this.uk1<0||isNaN(this.uk1)==true)
{
this.uk1="";
}

if(this.uk2>9||this.uk2<0||isNaN(this.uk2)==true)
{
this.uk2="";
}

if(this.uk3>9||this.uk3<0||isNaN(this.uk3)==true)
{
this.uk3="";
}


if(this.uk4>9||this.uk4<0||isNaN(this.uk4)==true)
{
this.uk4="";
}

if(this.uk5>9||this.uk5<0||isNaN(this.uk5)==true)
{
this.uk5="";
}

if(this.uk6>9||this.uk6<0||isNaN(this.uk6)==true)
{
this.uk6="";
}

/* !!!!!!!!!! konec budoucí smyčka FOR... */


this.videt=!this.videt; /* při kliknutí, změna proměnné */

/*  isNaN(hodnota); otestuje zda převedení value na číslo type integer je opravdu číslo - pokud bude proměnná TRUE výsledek parseInt byl NaN a tedy se nejedná o číslo */

if(this.videt==true)
{

/* !!!!!!!!!! z t1-t2 je potřeba udělat pole const tb=[t1 , t2 ...]  */
this.t1="number";
this.t2="number";
this.t3="number";
this.t4="number";
this.t5="number";
this.t6="number";
}
else
{
this.t1="password";
this.t2="password";
this.t3="password";
this.t4="password";
this.t5="password";
this.t6="password";
}
},

zobraz2(){
/* zobrazení anebo skrytí UC v hlavním kontejneru aplikace */

this.videt2=!this.videt2; /* změna promněnné způsobí zviditelnění jednoho anebo druhého buttonu pomocí podmínky v-if a v-if-else */

/* přehození inputu s UC number/password */
if(this.t_v=="password")
{
this.t_v="number";
}
else if(this.t_v=="number")
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

if(textarea.value=="")
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
document.execCommand('copy'); /* kopírování do paměti zařízení */
setTimeout(()=>{
const anotherElement=document.getElementById('button_kopi');
if(anotherElement){anotherElement.focus();}},200); // přehodí focus textu na button Kopírovat
}
this.zobraz_zkopirovano(); // Zobrazí oznámení o kopírování
},

copy_mail(){
const input_email=this.$refs.in_email; // načte do promněnné objekt input email

if(input_email.value=="")
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
document.execCommand('copy'); // kopírování do paměti zařízení
setTimeout(()=>{
const anotherElement=document.getElementById('butt_c_mail'); // načte objekt button Kopírovat email
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
console.error('Chyba při čtení ze schránky:', error);
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
textO.style.left=`calc(${leftO}px + 1rem)`; /* přepsání CSS parametru LEFT ((výpočet + px + 1rem), kde 1rem= nastavený margin arei) - oznámení "ZKOPÍROVÁNO" */

if(matchMedia('only screen and (min-width:48em)').matches){
/* pokud bude obrazovka větší než 48em - odebere se výpočet pro marchin, protože v CSS je tento margin v tomto bodu zlomu také odebrán */
  textO.style.left=`${leftO}px`; /* přepsání CSS parametru LEFT (výpočet + px)  oznámení "ZKOPÍROVÁNO" */
}

textO.style.zIndex=1; /* změní z index oznámení "ZKOPÍROVÁNO" */
textO.style.opacity=1;  /* změní opacity oznámení "ZKOPÍROVÁNO" */

setTimeout(()=>{document.getElementById("p_zkopirovano").style.opacity=0;},750); /* změní z index oznámení "ZKOPÍROVÁNO" na default */
setTimeout(()=>{document.getElementById("p_zkopirovano").style.zIndex=-1;},1000); /* změní opacity oznámení "ZKOPÍROVÁNO" na default */

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
  textO.style.left=`calc(${leftO}px + 1rem)`; /* přepsání CSS parametru LEFT ((výpočet + px + 1rem), kde 1rem= nastavený margin arei) - oznámení "Schránka je prázdná" */
  
  if(matchMedia('only screen and (min-width:48em)').matches){
  /* pokud bude obrazovka větší než 48em - odebere se výpočet pro marchin, protože v CSS je tento margin v tomto bodu zlomu také odebrán */
    textO.style.left=`${leftO}px`; /* přepsání CSS parametru LEFT (výpočet + px)  oznámení "Schránka je prázdná" */
  }
  
  textO.style.zIndex=1; /* změní z index oznámení "Schránka je prázdná" */
  textO.style.opacity=1;  /* změní opacity oznámení "Schránka je prázdná" */
  
  setTimeout(()=>{document.getElementById("p_prazdne").style.opacity=0;},750); /* změní z index oznámení "Schránka je prázdná" na default */
  setTimeout(()=>{document.getElementById("p_prazdne").style.zIndex=-1;},1000); /* změní opacity oznámení "Schránka je prázdná" na default */
  
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
textO.style.left=`${leftO}px`; /* přepsání CSS parametru LEFT ((výpočet + px + 1rem), kde 1rem= nastavený margin form) - oznámení "Zkopírováno" */
textO.style.zIndex=1; /* změní z index oznámení "Zkopírováno" */
textO.style.opacity=1;  /* změní opacity oznámení "Zkopírováno" */

setTimeout(()=>{document.getElementById("p_zkop_email").style.opacity=0;},750); /* změní z index oznámení "Zkopírováno" na default */
setTimeout(()=>{document.getElementById("p_zkop_email").style.zIndex=-1;},1000); /* změní opacity oznámení "Zkopírováno" na default */
    
},


// Funkce pro zakódování textu s použitím vlastního pole znaků pro posun
async kodovani(text,key){
  const charSet=this.pole; // Vlastní pole znaků
  let encodedText='';
  let startIndex=0;
  while(startIndex<text.length) {
      let chunk=text.substring(startIndex,startIndex+100);
      let chunkEncodedText='';
      for(let i=0;i<chunk.length;i++){
          let char=chunk[i];
          let index=charSet.indexOf(char);
          if (index!==-1) {
              let shift=parseInt(key[i%key.length]);
              if (shift===0){
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
async dekodovani(encodedText,key) {
  const charSet=this.pole; // Vlastní pole znaků
  let decodedText='';
  let startIndex=0;
  while(startIndex<encodedText.length) {
      let chunk=encodedText.substring(startIndex, startIndex + 100);
      let chunkDecodedText='';
      for (let i=0;i<chunk.length;i++) {
          let char=chunk[i];
          let index=charSet.indexOf(char);
          if (index!==-1) {
              let shift=parseInt(key[i%key.length]);
              if (shift===0){
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
  
  // Příklad použití
  
akce(){
// Zmáčknutí tlačítka šifrovat anebo dešifrovat

const dataToSend='sifrovani';
try{
  // Vytvoření AJAX požadavku
const xhr=new XMLHttpRequest();


xhr.open('POST','statistika/zapis.php',true);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  
  // Reakce na dokončení požadavku
xhr.onload=()=>{
if(xhr.status===200){
// console.log('Data byla úspěšně odeslána.'); 
}else{
// console.log('Došlo k chybě při odesílání dat.');
}
};

xhr.send('data='+encodeURIComponent(dataToSend));  // Odeslání dat
}
catch(err){
console.log("Statistická data neodeslána. Chyba:"+err);
}


  



  const text_orez=this.text_o1.trim(); /* načte text z prvního okna area a ořeže metodou trim všechny prázdné znaky z obou stran řetězce */
  
  const text=text_orez.replace(/[\u00A0\u200A\u200B\u200C\u200D\u200E\u200F\u202A\u202B\u202C\u202D\u202E\u202F\u206A\u206B\u206C\u206D\u206E\u206F\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u2060\n\t\v\b\r\f]/g," "); // nahrazení uvedených znaků v řetězci mezerou, jedná se o problematické znaky různých mezer, které tvoří komplikace při šifrování a dešifrování; /.../g = označuje globální vyhledávání, což znamená, že se nahradí všechny výskyty těchto znaků v celém řetězci
  const key=`${this.uk1}${this.uk2}${this.uk3}${this.uk4}${this.uk5}${this.uk6}`;
  const rada=this.pole; /* pole znaků ke kódování a dekódování */

if(text.length==0)
{
return; /* pokud area nebude obsahovat ani jeden znak - bude funkce ukončena! */
}

this.nep_znaky=""; /* vynuluje proměnnou */

for(let i=0;i<text.length;i++)
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



if(text[0]!="#"||text[text.length-1]!="#")
{
// pokud první a poslední znak šifrovaného textu není # , je něco špatně!
this.o_dia('ne_sifra','h_ne_sifra','z_ne_sifra'); /* pomocí této funkce aktivuje dialogové okno s upozorněním, že se nejedná o šifrovaný text */
return;
}

const u_delka=text.length-1; /* upravená délka řetězce, aby bylo možné odříznout poslední znak v řetězci */
const d_text=text.slice(1,u_delka); /* z proměnná text vyřízne část řetězce kde vynechá 1. a poslední znak v řetězci, který by měl být #, která na začátek a konec řetězce byly přidány při zakódování  */

/* console.log(d_text); */

  // Dekódování textu asynchronně
  this.dekodovani(d_text,key)
  .then(new_text=>{
    /* console.log("Dekódovaný text:", new_text); */
    this.text_o2=new_text;  /* převede dekódovaný text do druhého okna area */
  })
  .catch(error=>{
   /* console.error("Chyba při dekódování:", error); */
  });

}
else
{
/* pokud je aktivní šifrování */
  // Kódování textu asynchronně
this.kodovani(text,key)
    .then(new_text=>{
     /* console.log("Kódovaný text:", new_text); */
     const k_text=`#${new_text}#`; /* přidá na začátek a konec zakódovaného řetězce # ,aby určil počátek a konec kódování */
      this.text_o2=k_text;  /* převede kódovaný text do druhého okna area */
    })
    .catch(error=>{
     /* console.error("Chyba při dekódování:", error); */
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
this.placeholder_ta1="Napište text, který chcete šifrovat"; // v-bind placeholder textarea1
this.placeholder_ta2="Zmáčkněte Šifrovat a objeví se šifrovaný text"; // v-bind placeholder textarea2
}

},


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
// console.log(id);
document.getElementById(id).close(); // zavře dialog okno
},

mail(){
const x=["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqhc","eaw"];
const k=x[4][0]+x[2][1]+x[5][1]+x[9][0]+x[0][0]+x[6][0]+x[4][1]+x[9][3]+x[9][2]+x[10][1]+x[6][1]+x[1][2]+x[10][0]+x[6][0]+x[2][1]+x[4][1]+x[6][1]+x[0][1]+x[9][3]+x[0][2]; /* výsek emailu */
this.email=k; // přepíše proměnnou a udělá bind value input pro zobrazení emailu
},

orez_area1(){
// funkce se pouští pomocá posluchače @paste na Area 1

setTimeout(()=>{
this.text_o1=this.text_o1.trim();} // ořeže prázdné znaky textu area1
,250); // zpoždění 250ms je na místě, jinak akci neprovede

}


},





computed:{

b_v_c(){
/* pokud bude vyplněno alespoň jedno číslo UC - zobrazí se button Zobrazit UC */
if(this.uk1==""&&this.uk2==""&&this.uk3==""&&this.uk4==""&&this.uk5==""&&this.uk6=="")
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

if(this.otoceni==true)
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
if(this.uk1==this.uk2&&this.uk2==this.uk3&&this.uk3==this.uk2&&this.uk3!="")
{
/* 0 0 0 x x x ; 1 1 1 x x x ; 2 2 2 x x x atd. */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(this.uk4==this.uk5&&this.uk5==this.uk6&&this.uk6==this.uk5&&this.uk6!="")
{
/* x x x 0 0 0; x x x 1 1 1; x x x 2 2 2 atd. */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(this.uk1==this.uk4&&this.uk2==this.uk5&&this.uk3==this.uk6&&this.uk1!==""&&this.uk6!="")
{
/* 7 1 7 7 1 7  ; 2 0 2 2 0 2 ; 5 8 7 5 8 7 */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk1)==(parseInt(this.uk2)-1)&&parseInt(this.uk2)==(parseInt(this.uk3)-1)&&this.uk1!="")
{
/* 1 2 3 x x x; 2 3 4 x x x ; 3 4 5 x x x */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk4)==(parseInt(this.uk5)-1)&&parseInt(this.uk5)==(parseInt(this.uk6)-1)&&this.uk6!="")
{
/* x x x 1 2 3; x x x 2 3 4; x x x 3 4 5 */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk1)==(parseInt(this.uk2)+1)&&parseInt(this.uk2)==(parseInt(this.uk3)+1)&&this.uk1!="")
{
/* 4 3 2 x x x; 5 4 3 x x x ; 6 5 4 x x x */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else if(parseInt(this.uk4)==(parseInt(this.uk5)+1)&&parseInt(this.uk5)==(parseInt(this.uk6)+1)&&this.uk6!="")
{
/* x x x 3 2 1; x x x 4 2 3; x x x 5 4 3 */
return this.nepovolen=true; /* zobrazí cedulku, že UC není povoleno - v objektu watch následně zablokuje button disabled */
}
else
{
return this.nepovolen=false; /* odstraní cedulku, že UC není povoleno - v objektu watch následně odblokuje button disabled */
}
}





},
    
    
watch:{

all(n)
{
/* Wotcher musí být jinak nefunguje závislost computed properties! */
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
else if(n>9||n<0)
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
else if(n>9||n<0)
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
else if(n>9||n<0)
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
else if(n>9||n<0)
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
else if(n>9||n<0)
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
else if(n>9||n<0)
{
/* watch této podmínky blokuje zadání jiného čísla než 0 až 9 a zadání jiné hodnoty než je číslo isNaN(parseInt(n)) */
this.uk6=s; /* pokud dojde k splnění podmínky zůstává předešlá hodnota proměnné a tedy i value inputu (je to v-model) */
}
},  

text_o1(n){



if(n.length>=1000)
{
/* pokud je znaků 1000 a více v textarea 1 */
if(this.otoceni==true)
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
if(n==true)
{
// pokud bude zadán nepovolená kombinace UC
setTimeout(()=>{document.getElementById("butt_nepovolen").focus();},1500); // provede focus na button Otazník - UC Nepovolen za 1,5s protože 1s trvá animace
}
}
  
},

mounted(){
/* Hák mounted provede akci, která je v něm uvedena po načtení stránky */

this.$refs.uvod_animace.style.animationPlayState="paused"; // zastaví úvodní animaci Loading...
this.loading=false; // v-show : vipne úvodní animaci Loading...

if("localStorage" in window&&window["localStorage"]!==null)
{
// test jestli funguje localstorage
console.log("Local storage is ready!");

const byl_vydan_souhlas=localStorage.getItem(this.souhlas_Ls[0]); // z LocalStorage zjistí, zda vydal dříve uživatel Souhlas s podmínkami užívání aplikace

if(byl_vydan_souhlas==this.souhlas_Ls[1])
{
// pokud byl dříve vydán souhlas
this.podminky=false; // v-show schová okno s podmínkami
this.spustit=true; // v-show zobrazí okno s zadáním UC
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


/* // Zde je visibilitychange API - které se ukázalo, jako zatím nevyužité pro tento projekt

let neviditelnost;
let udalos_viditelnost;

if(typeof document.hidden !== "undefined")
{
neviditelnost = "hidden";
udalos_viditelnost = "visibilitychange";
}
else if(typeof document.msHidden !== "undefined")
{
neviditelnost = "msHidden";
udalos_viditelnost = "msvisibilitychange";
}
else if(typeof document.webkitHidden !== "undefined")
{
neviditelnost = "webkidHidden";
udalos_viditelnost = "webkitvisibilitychange";
}
//

if(typeof document.addEventListener === "undefined" || neviditelnost === undefined)
{
console.log("API kontrola viditelnosti stránky nefunguje.");
}
else
{
// API viditelnosti je v pořádku
console.log("visibilitychange API zapnuto");
document.addEventListener( udalos_viditelnost , ()=>{

console.log("stránka znovu zobrazena");

}
,false);

} */

},

});
    
app.mount('#app');




/* POUZE JAVASCRIPT */



const odkazy_window_open={id:["sdil-fb","sdil-tw","href_boar"] /* id určuje id odkazů, které mají být upraveny */ ,SIRKA:600,VYSKA:600,min_VYSKA:800,min_SIRKA:800,text_okna:"Nové okno",
prepis(){
/* funkce zajistí přepis odkazu href na JS funkci window.open */

const vyska=parseInt(window.screen.height); /* výška obrazovky */
const sirka=parseInt(window.screen.width); /* šířka obrazovky */
const z_leva=sirka/2-this.SIRKA/2;
const z_hora=vyska/2-this.VYSKA/2;

/* funkce přepíše HREF na tlačítkách sdílet Facebook a sdílet Twitter */
if(vyska>this.min_VYSKA&&sirka>this.min_SIRKA) /* podmínka, pro obrazovky s požadovanou velikostí, aby zbytečně pro malé obrazovky nebyl href upravován */
{

for(let i=0;i<this.id.length;i++)
{
/* smička, která všechny odkazy, které budou mít ID uvedené v poli this.id upraví tak, aby se otvírali pomocí window.open v rozměru podle parametrů v objektu */
if(document.getElementById(this.id[i])) /* podmínka zaručuje, že objekt v HTML existuje */
{
const obj=document.getElementById(this.id[i]); /* načte objekt odkazu do proměnné */
const Ahref=obj.href; /* načte href odkazu do proměnné */
obj.target=""; /* target musí být prázdý jinak nové okno neotevře */
const text=`window.open('${Ahref}','${this.text_okna}','width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora}');`; /* vytvoří JS příkaz, který bude v href odkazu */
obj.href=`javascript:${text}`; /* přepíše href odkazu na nový JavaScriptový výraz window.open */
}}

}
}};

odkazy_window_open.prepis(); /* zajistí přepis HREF odkazů podle ID uvedených prvků */
