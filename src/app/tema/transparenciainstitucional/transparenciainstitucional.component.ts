import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';
import { DatabaseService } from '../../../services/database.service';
@Component({
  selector: 'app-transparenciainstitucional',
  templateUrl: './transparenciainstitucional.component.html',
  styleUrls: ['./transparenciainstitucional.component.css']
})
export class TransparenciainstitucionalComponent implements OnInit {
  sus: any;
  sus2: any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    private utils:UtilsService
  ) {
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('transparencia_institucional_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
   }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('transparencia_institucional_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('transparencia_institucional').subscribe ((res) => {
      this.imagenes = res;
    });

    $(document).ready(function() {
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
    }); 
  }

  ngOnDestroy(){
    if (this.sus !== null && this.sus !== undefined) {
      this.sus.unsubscribe ();
    }

    if (this.sus2 !== null && this.sus2 !== undefined) {
      this.sus2.unsubscribe ();
    }
  }

}
