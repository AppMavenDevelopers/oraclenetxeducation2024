$(document).ready(Bindata());

function Bindata() {
  jQuery(".header__hamb").click(function (e) {
    //e Representa una accion en si  <i class="fa-solid fa-x"></i>
    e.preventDefault(); //Pausa el evento
    jQuery(".header .container .header__nav").toggleClass("header__open");
    /*quitar o agregar clase open*/
    jQuery(".header__hamb i").toggleClass("fa-times");
    // jQuery("body").toggleClass("no-scroll");

    /*Agregar o quitar clase fa-times para icono*/
    // var newSize = "4rem"; // Establece el tamaño deseado
    // jquery(".hamb i").css("font-size", newSize);
  });

  // cambiar a sección por id
  jQuery(".header .container .header__nav a").click(function () {
    //e.preventDefault(); //Pausa el evento
    /*Remover clases*/
    jQuery(".header .container .header__nav").removeClass("header__open");
    jQuery(".header__hamb i").removeClass("fa-times");
    /*Seleccionar id de seccion*/
    var id = jQuery(this).attr("href");
    /* This Hace referencia al elemento que le estamos haciendo click/ attr trabajar con el atributo */
    jQuery("html,body").animate({
      scrollTop: jQuery(id).offset().top - 70 /**/,
    });
  });
}
