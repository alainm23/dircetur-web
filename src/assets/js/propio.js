
 /*animacion del menu*/
/*$(function(){
        $(".accordion-titulo").click(function(e){
           
        e.preventDefault();
    
        var contenido=$(this).next(".accordion-content");

        if(contenido.css("display")=="none"){ //open    
          contenido.slideDown(250);     
          $(this).addClass("open");
        }
        else{ //close   
          contenido.slideUp(250);
          $(this).removeClass("open");  
        }

          });
  });*/

 //$('[data-toggle="tooltip"]').tooltip();

 /*$(document).ready(function() {
  function clickcaja(e) {
    var lista = $(this).find("ul"),
    triangulo = $(this).find("span:last-child");
    e.preventDefault();
    //lista.is(":hidden") ? $(this).find("ul").show() : $(this).find("ul").hide();
  $(this).find("ul").toggle();
    if(lista.is(":hidden")) {
    triangulo.removeClass("triangulosup").addClass("trianguloinf");
    }
    else {
    triangulo.removeClass("trianguloinf").addClass("triangulosup");
    }
  }
  function clickli(e) {
    var texto = $(this).text(),
    seleccionado = $(this).parent().prev(),
    lista = $(this).closest("ul"),
    triangulo = $(this).parent().next();
    e.preventDefault();
    e.stopPropagation();    
    seleccionado.text(texto);
    lista.hide();
    triangulo.removeClass("triangulosup").addClass("trianguloinf");
  }
$(".cajaselect").click(clickcaja);
$(".cajaselect").on("click", "li", clickli);
}); */

