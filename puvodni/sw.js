const CACHE_NAME="sifrovac-cache-v5";

// Přidej externí Vue 3 knihovnu a další soubory do seznamu ke cache
const urlsToCache=[
"/sifrovac/",
"/sifrovac/index.php",
"/sifrovac/css/css.css",
"/sifrovac/script/kontrola-vue.js",
"/sifrovac/script/script.js",
"/sifrovac/script/vue.global.js",
"/sifrovac/sw.js",
"/sifrovac/font/exo2.woff2",
"/sifrovac/font/exo2.woff",
"/sifrovac/font/museo-moderno.woff2",
"/sifrovac/font/museo-moderno.woff",
"/sifrovac/svg/logo.svg",
"/sifrovac/svg/svg-full.svg",
"/sifrovac/favicon/android-chrome-192x192.png",
"/sifrovac/favicon/android-chrome-512x512.png",
"/sifrovac/favicon/apple-touch-icon.png",
"/sifrovac/favicon/browserconfig.xml",
"/sifrovac/favicon/favicon.ico",
"/sifrovac/favicon/favicon-16x16.png",
"/sifrovac/favicon/favicon-32x32.png",
"/sifrovac/favicon/mstile-70x70.png",
"/sifrovac/favicon/mstile-144x144.png",
"/sifrovac/favicon/mstile-150x150.png",
"/sifrovac/favicon/mstile-310x150.png",
"/sifrovac/favicon/mstile-310x310.png",
"/sifrovac/favicon/safari-pinned-tab.svg",
"/sifrovac/favicon/site.webmanifest",
"https://unpkg.com/vue@3", // URL Vue 3 knihovny z CDN
// Přidej další soubory, které chceš cachovat
];

// Instalace Service Worker a přidání souborů do cache
self.addEventListener("install",function(event){
event.waitUntil(
caches.open(CACHE_NAME)
.then(function(cache) {
console.log("Otevření cache a přidání do cache");
return cache.addAll(urlsToCache);
}));
});

// Aktivace a odstranění staré cache
self.addEventListener("activate",function(event){
const cacheWhitelist=[CACHE_NAME];
event.waitUntil(
caches.keys().then(function(cacheNames){
return Promise.all(
cacheNames.map(function(cacheName){
if(cacheWhitelist.indexOf(cacheName)===-1){
return caches.delete(cacheName);
}
})
);
})
);
});

// Obsluha fetch požadavků
self.addEventListener("fetch",function(event){
event.respondWith(
caches.match(event.request).then(function(response){
if(response){
return response; // Vrácení souboru z cache
}
return fetch(event.request).catch(()=>{
// Pokud fetch selže, vrátí fallback na hlavní stránku
if(event.request.mode==="navigate"){
return caches.match("/sifrovac/index.php");
}
});
})
);
});