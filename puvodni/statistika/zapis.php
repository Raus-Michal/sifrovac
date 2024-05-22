<?php
// Přijetí dat
if($_SERVER['REQUEST_METHOD']==='POST'){
$sifrovani = $_POST['data'];

if($sifrovani=="sifrovani")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("pocet.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("pocet.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
}else{
http_response_code(405); // Method Not Allowed
}
?>