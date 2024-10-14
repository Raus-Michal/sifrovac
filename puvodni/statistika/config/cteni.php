
<?php
$test = fopen("config/pocet.txt" , "a"); // tento PHP soubor se vkládá pomocí include - cesta se počítá od souboru do kterého byl tento soubor vložen
fclose($test);
$handle=fopen("config/pocet.txt" , "r+"); // tento PHP soubor se vkládá pomocí include - cesta se počítá od souboru do kterého byl tento soubor vložen
$pocet=fread($handle,20);
fclose($handle);
?>