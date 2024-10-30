<?php
// soubor slouží k ověření tokenu, zda požadavek na přijetí statistických dat přichází opravdu z našeho webu

session_start(); // Spouští relaci (session) pro uživatele. Session umožňuje ukládat data na straně serveru, která přetrvávají mezi jednotlivými požadavky od stejného uživatele.

// Ověření, zda byl POST požadavek odeslán s tokenem
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $csrfToken = $_POST['csrf_token'];

    // Ověření, zda token v session souhlasí s tokenem zaslaným klientem
    if (isset($_SESSION['csrf_token']) && $csrfToken === $_SESSION['csrf_token']) {
        echo "Token je platný. Ověření úspěšné.";
    } else {
        echo "Token je neplatný. Přístup zamítnut.";
        exit;
    }
} else {
    echo "Neplatný požadavek.";
    exit;
}


?>