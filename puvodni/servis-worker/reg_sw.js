if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sifrovac/sw.js',{scope:'/sifrovac/'}).then(function(registration){
      console.log('ServiceWorker registrován v rozsahu: ', registration.scope);
    }, function(err) {
      console.log('ServiceWorker registrován s chybou: ', err);
    });
  });
}