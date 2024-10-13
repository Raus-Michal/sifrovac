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
$test = fopen("pocet.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("pocet.txt" , "r+"); // otevře soubor pro čtení
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