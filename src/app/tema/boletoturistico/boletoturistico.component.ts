import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';
import { DatabaseService } from '../../../services/database.service';
@Component({
  selector: 'app-boletoturistico',
  templateUrl: './boletoturistico.component.html',
  styleUrls: ['./boletoturistico.component.css']
})
export class BoletoturisticoComponent implements OnInit {
  sus: any;
  sus2: any;
  sus3: any;
  sus4: any;
  sus5: any;
  sus6: any;
  etiquetas: any;
  imagenes: any;
  boletos: any;
  parques_arqueologicos: any;
  museos: any;
  precio_nacional: any;
  precio_extranjero: any;
  precio_mostrar: any=0.00;
  constructor(
    public db:DatabaseService,
    private utils:UtilsService
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('boleto_turistico_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    
    /* Idioma */

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('boleto_turistico_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('boleto_turistico').subscribe ((res) => {
      this.imagenes = res;
    });

    /* Fin Idioma */

    this.sus3=this.db.getallBoletos ().subscribe ((res) => {
      this.boletos = res;
      console.log('Este es el Objeto con los boletos=',this.boletos);
      /* codigo jquery para que funcione el select */
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
    });

    this.sus4=this.db.getallParquesArqueologicos ().subscribe ((res) => {
      this.parques_arqueologicos = res;
      console.log('Este es el Objeto con los Parques Arqueologicos=',this.parques_arqueologicos);
    });

    this.sus5=this.db.getallMuseos ().subscribe ((res) => {
      this.museos = res;
      console.log('Este es el Objeto con los Museos=',this.museos);
    });
    
  }

  calcularBoleto (id:string){
    this.sus6=this.db.getBoletobyKey(id).subscribe ((res:any) => {
      this.precio_extranjero=res.precio_extrajero;
      this.precio_nacional=res.precio_nacional;
      this.precio_mostrar=this.precio_nacional;
      $("#nacional").html('Nacional');
      console.log('Este es el detalle del Boleto seleccionado=',res);
    });
    
  }
  
  MostrarPrecio (tipo:string){
    if(tipo=="nacional"){
      this.precio_mostrar=this.precio_nacional;
    }
    else{
      this.precio_mostrar=this.precio_extranjero;
    }
  }

  ngOnDestroy(){
    if (this.sus !== null && this.sus !== undefined) {
      this.sus.unsubscribe ();
    }

    if (this.sus2 !== null && this.sus2 !== undefined) {
      this.sus2.unsubscribe ();
    }

    if (this.sus3 !== null && this.sus3 !== undefined) {
      this.sus3.unsubscribe ();
    }

    if (this.sus4 !== null && this.sus4 !== undefined) {
      this.sus4.unsubscribe ();
    }

    if (this.sus5 !== null && this.sus5 !== undefined) {
      this.sus5.unsubscribe ();
    }
  }

}
