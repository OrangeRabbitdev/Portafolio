
// Menu
let menu = $(".menu li");

function enfocarMenu(){

      $(this).addClass("active").siblings().removeClass("active");

}


menu.click(enfocarMenu);


//Scroll
let secciones = [
    $("#contenido1"),
    $("#contenido2"),
    $("#contenido3")
];

let seccionActual = 0;
let scrollBloqueado = false;

function ScrollToContenido(index) {
  index = Math.max(0, Math.min(index, secciones.length - 1));

  if (scrollBloqueado || index === seccionActual) return;

  scrollBloqueado = true;
  seccionActual = index;

menu.eq(index).addClass("active").siblings().removeClass("active");

  $("html, body")
    .stop(true)
    .animate(
      { scrollTop: secciones[index].offset().top},
      1000,
      () => (scrollBloqueado = false)
    );


}

$(window).on("wheel", function(e){

    if(e.originalEvent.deltaY > 0){
      ScrollToContenido(seccionActual + 1);
    }else{
      ScrollToContenido(seccionActual - 1);
    }
  
});

let Inicio = $("#inicio");
let Proyectos = $("#proyectos");
let Contacto = $("#contacto");

Inicio.click(function(){
  ScrollToContenido(0);
});
Proyectos.click(function(){
  ScrollToContenido(1);
});
Contacto.click(function(){
  ScrollToContenido(2);
});
//Texto animado
let $textoPerfil = $("#profile h2");

let palabras = [
  "Graphic Designer",
  "Web developer",
  "Video game developer",
  "3D Designer"
];

let palabraIndex = 0;
let letraIndex = 0;
let escribiendo = true;
let intervalo = 100;

function animacionTexto() {
  let palabraActual = palabras[palabraIndex];
  let texto = "";

  if (escribiendo) {
    texto = palabraActual.substring(0, letraIndex + 1);
    letraIndex++;

    if (letraIndex === palabraActual.length) {
      setTimeout(() => escribiendo = false, 4000);
    }
  } else {
    texto = palabraActual.substring(0, letraIndex - 1);
    letraIndex--;

    if (letraIndex === 0) {
      escribiendo = true;
      palabraIndex = (palabraIndex + 1) % palabras.length;
    }
  }

  $textoPerfil[0].style.setProperty("--texto", `"${texto}"`);
}

setInterval(animacionTexto, intervalo);