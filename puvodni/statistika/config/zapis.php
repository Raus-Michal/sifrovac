<?php
// Přijetí dat
if($_SERVER['REQUEST_METHOD']==='POST'){
$sifrovani=$_POST['data']; // proměnná pro určení vložení do statistiky
$pocet=(int)$_POST['pocet']; // převede poslaný počet na proměnou type number

if($sifrovani=="sifrovani")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení

if($pocet)
{
// pokud byla zaslaná data s počtem
$test = fopen("config/pocet.txt" , "a");  // tento PHP soubor se vlkládá pomocí include - cesta se počítá od souboru do kterého byl tento soubor vložen
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("config/pocet.txt" , "r+"); // otevře soubor pro čtení--- tento PHP soubor se vlkládá pomocí include - cesta se počítá od souboru do kterého byl tento soubor vložen
$u_pocet=fread($cteni,20); // načte uložený počet kliků
$u_pocet=(int)$u_pocet; // převede hodnotu explicitně na číslo
$u_pocet=$u_pocet+$pocet; // přičte k načtenému počtu počet zaslaný
rewind($cteni);
fwrite($cteni,$u_pocet); // uloží nový počet kliků
fclose($cteni); // zavře soubor
}
}
}else{
http_response_code(405); // Method Not Allowed
}
?>