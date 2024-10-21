<?php
// čtení statistických dat
$file_data = "config/pocet-kliku.json"; // soubor JSON se statistickými daty
if (file_exists($file_data)){
// pokud existuje JSON soubor s daty
$jsonData = file_get_contents($file_data); // načte soubor JSON
$data = json_decode($jsonData, true); // dekóduje data JSON
$pocet = $data["klik"]; // načte počet kliků
}
else
{
// pokud soubor $JSON s daty neexistuje
$pocet = 0; // bude počet kliků 0
}
?>