$(document).ready(function () {

    function abrirImagenPopup(src, alt){
        if (!src) return;

        $("#imagen-popup-overlay").remove();

        const $overlayImagen = $("<div>", {
            id: "imagen-popup-overlay"
        });

        const $imagen = $("<img>", {
            src: src,
            alt: alt
        });

        $overlayImagen.append($imagen);

        $("body").append($overlayImagen);
        $overlayImagen.hide().fadeIn(200);
    }

    function cerrarImagenPopup(){
        $("#imagen-popup-overlay").fadeOut(200, function(){
            $(this).remove();
        });
    }

    function cargarPopup(){
        $("#popup-overlay").css("display", "flex").hide().fadeIn(300);
        scrollBloqueado = true;
    }

    // ABRIR POPUP
    $("#videojuegos").on("click", function () {
        cargarPopup();
        $("#popup-body").load("templates/videojuegos.html");
    });

    $("#web").on("click", function () {
        cargarPopup();
        $("#popup-body").load("templates/web.html");
    });

    $("#3D").on("click", function () {
        cargarPopup();
        $("#popup-body").load("templates/3d.html");
    });

    $("#design").on("click", function () {
        cargarPopup();
        $("#popup-body").load("templates/design.html");
    });




    $("#popup-contenido").on("click", "img", function (e) {
        e.stopPropagation();
        abrirImagenPopup($(this).attr("src"), $(this).attr("alt") || "");
    });

    $("body").on("click", "#imagen-popup-overlay", function () {
        cerrarImagenPopup();
    });

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
            cerrarImagenPopup();
        }
    });











    // CERRAR CON BOTÓN
    $("#popup-cerrar").on("click", function () {
        cerrarPopup();
    });

    // CERRAR CLIC FUERA
    $("#popup-overlay").on("click", function (e) {
        if (e.target.id === "popup-overlay") {
            cerrarPopup();
        }
    });

    function cerrarPopup() {
        $("#popup-overlay").fadeOut(300, function () {
            $("#popup-body").empty();
        });

        cerrarImagenPopup();
        scrollBloqueado = false;
    }

});
