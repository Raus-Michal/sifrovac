<!DOCTYPE html>
<html lang="cs" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<meta name="author" content="Boar-cz">
<title>Statistika aplikace Šifrovač</title>
<style>
html{
line-height:1.15;
-webkit-text-size-adjust:100%;
text-size-adjust:100%;
}
main{
display:block;
}
h1{font-size:2em;
margin:.67em 0;
}
a{
background-color:transparent;
}
abbr[title]{
border-bottom:none;
text-decoration:underline;
text-decoration:underline dotted;
}
b,strong{
font-weight:bolder;
}
code,kbd,samp{
font-family:monospace,monospace;
font-size:1em;
}
small{font-size:80%;}
img{border-style:none;}
button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0; }
button,input{overflow:visible;}
button,select{text-transform:none;}
button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button;appearance:button;}
button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0;}
button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring {outline:1px dotted ButtonText;}
fieldset{padding:.35em .75em .625em;}
progress{vertical-align:baseline;}
textarea{overflow:auto;}
[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}
[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto;}
[type="search"]{-webkit-appearance:textfield;appearance:textfield;outline-offset:-2px;}
[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}
::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}
details{display:block;}
summary{display:list-item;}
template{display:none;}
[hidden]{display:none;}
p,ul,ol,dl,table,blockquote,pre,figure{padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:1rem;}
h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem;}
ul ul,ul ol,ol ul,ol ol{margin-bottom:0;}
ul,ol,dd{padding-left:1.75rem;}
dd{margin-left:0;}
blockquote{border:0;padding-left:1.75rem;margin-left:0;font-style:italic;}
figure{margin-left:0;margin-right:0;} 
figure>table,figure>img,figure>picture{margin-bottom:0;}
fieldset{border:0;}
legend{padding:0 .5rem;}
/* KONEC NORMALIZACE */

@font-face{
font-display:fallback;
font-family:"nadpis";
src:url("../font/museo-moderno.ttf");
}

@font-face{
font-display:fallback;
font-family:"text";
src:url("../font/exo2.ttf");
}

:root
{
--b1:rgba(45,45,18,1);
--b2:rgba(167,163,192,1);
--b3:rgba(144,140,129,1);
--b4:rgba(206,206,232,1);
--b5:rgba(84,78,57,1);
}
  
*{-webkit-box-sizing:border-box;box-sizing:border-box;}
  
body{
font-family:"text",sans-serif;
font-size:100%;
display:grid;
min-height:100vh;
width:100%;
background-color:var(--b4);
color:var(--b1);
-webkit-box-align:center;
align-items:center;
justify-items:center;
line-height:1.2;
margin:0;
}

h1,h2,h3,h4,h5
{
font-family:"nadpis",sans-serif;
}

h1
{
font-size:2rem;
margin-bottom:2rem;
}

h2
{
font-size:1.5rem;
}
  
a,a:link,a:visited,a:active
{
color:var(--b1);
text-decoration:none;
}

input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{
display:none; /* vypne posuvník na volbu čísloem kliknutím */
}
button,input[type=checkbox]{cursor:pointer;}

button:focus{
outline:none; /* Odstranění standardního zvýraznění focusu */
box-shadow:0 0 5px var(--b2); /* Přidání stínu pro zvýraznění focusu */
}

button:active{
background-color:var(--b4); /* Barva pozadí při kliknutí */
box-shadow:0 1px 5px var(--b2);    /* Přidání stínu při kliknutí */
transform:translateY(1px); /* Mírný pohyb dolů při kliknutí */
}

img
{
width:100%;
height:auto;
}

.hl-con
{
padding:1rem;
text-align:center;
}

.f2
{
font-size:2rem;
}

</style>

</head>
<body>
<?php
$test = fopen("pocet.txt" , "a");
fclose($test);
$handle=fopen("pocet.txt" , "r+");
$pocet=fread($handle,20);
fclose($handle);
?>
<div class="hl-con">
<h1>Statistika aplikace Šifrovač</h1>
<p>Počet použítí talčítka Šifrovat/Dešifrovat</p>
<p class="f2"><?php echo $pocet; ?></p>
</div>
</body>
</html>