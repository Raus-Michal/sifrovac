<?php
// soubor vyloučí nalimitní počet požadavků z jedné IP adresy

$limit = 100;  // Maximální počet požadavků
$timeWindow = 43200; // Časové okno v sekundách (43200sekund==12hodin)

$ipAddress = $_SERVER["REMOTE_ADDR"];
$rateLimitFile = "config/rate_limit.json";

// Načtení dat o předchozích požadavcích
if (file_exists($rateLimitFile)){
// pokud soubor $rateLimitFile existuje
    $data = json_decode(file_get_contents($rateLimitFile), true); // dekóduje data o Rate Limitu
} else {
// pokud soubor $rateLimitFile neexistuje
    $data = []; // budou data prozatím prázdne pole
}

$currentTime = time();

// Očistěte staré záznamy
if (isset($data[$ipAddress])) {
    $data[$ipAddress] = array_filter($data[$ipAddress], function ($timestamp) use ($currentTime, $timeWindow) {
        return ($currentTime - $timestamp) < $timeWindow;
    });
}

// Zkontrolujte, zda IP adresa překročila limit
if (isset($data[$ipAddress]) && count($data[$ipAddress]) >= $limit) {
    http_response_code(429);  // 429 Too Many Requests
    echo "Překročili jste limit požadavků. Zkuste to znovu později.";
    exit;
}

// Přidání nového požadavku
$data[$ipAddress][] = $currentTime;

// Uložení zpět do souboru
file_put_contents($rateLimitFile, json_encode($data));

// Zpracujte další část požadavku

?>