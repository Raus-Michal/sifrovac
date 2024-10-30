<?php
// Přijetí dat
if($_SERVER["REQUEST_METHOD"]==="POST"){
$pocet=$_POST["pocet"]; // převede poslaný počet na proměnou type number
if($pocet)
{
// pokud byla zaslaná data s počtem
$file_data = "config/pocet-kliku.json"; // soubor JSON se statistickými daty
if (file_exists($file_data)){
// pokud existuje JSON soubor s daty
$jsonData = file_get_contents($file_data); // načte soubor JSON
$data = json_decode($jsonData, true); // dekóduje data JSON
$old_pocet_kliku=$data["klik"]; // načte starý počet kliků
$data["klik"]=$old_pocet_kliku+$pocet; // přičte stávající kliky k nově zaslaným klikům
}
else
{
// pokud soubor $JSON s daty neexistuje
$data = array("klik"=>1); // budou data prozatím pole s 1 kliků
}
$newJsonData = json_encode($data, JSON_PRETTY_PRINT); // aktualizovaná data zakóduje na JSON formát
file_put_contents($file_data, $newJsonData); // přepíše stávající JSON s aktualizovanými daty
}
}else{
http_response_code(405); // Method Not Allowed
}
?>