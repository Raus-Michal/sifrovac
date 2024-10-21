<?php
// soubor slouží k ověření tokenu, zda požadavek na přijetí statistických dat přichází opravdu z aplikace

if($_SERVER["REQUEST_METHOD"]==="POST"){
// pokud byla zaslána nějáká data

$token_od_uzivatele = $_POST["token"]; // zaslaný token od uživatele

if($token_od_uzivatele)
{
// pokud byl zaslán token od uživatele

$token_file = "confug/token.json";
if (file_exists($token_file)){
// pokud soubor s tokenem existuje
$jsonData = file_get_contents($token_file); // přijetí souboru JSON s tokenem - cesta je upravena protože soubor je použit jako include
$data = json_decode($jsonData, true); // dekódování JSON souboru pro použití v PHP
$token = $data["token"]; // vyjmutí tokenu z objektu JSON
}
else
{
// pokud soubor s tokenem neexistuje
exit;
}

if($token_od_uzivatele!=$token)
{
// pokud se nezhoduje token od uživatele s tokenem
exit; // funkce se ukončí
}
}
else
{
// pokud nebyl zaslán token od uživatele
exit; // funkce se ukončí
}
}else{
http_response_code(405); // Method Not Allowed
}

?>