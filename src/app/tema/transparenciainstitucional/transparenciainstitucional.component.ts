import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';
import { DatabaseService } from '../../../services/database.service';
import { AngularFirestore } from '@angular/fire/firestore';
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

  categorias: any [] = [];
  categoria_seleccionado: any;
  items: any [] = [];
  constructor(
    public db:DatabaseService,
    private afs: AngularFirestore,
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

    this.afs.collection ('TransparenciaCategorias').valueChanges ().subscribe ((res: any []) => {
      this.categorias = res;
      console.log (res);  

      if (res.length > 0) {
        this.traer_medios (res [0]);
      }
    });
  }

  traer_medios (item: any) {
    this.categoria_seleccionado = item;
    this.afs.collection ('Transparencia_Medios', ref => ref.where ('categoria.id', '==', item.id)).valueChanges ().subscribe ((res: any []) => {
      this.items = res;
      console.log (res);
    });
  }

  traer_subcategorias (item: any) {
    console.log (item);
    this.categoria_seleccionado = item;
    this.afs.collection ('TransparenciaCategorias').doc (item.id).collection ('Subcategorias').valueChanges ().subscribe ((res: any []) => {
      this.items = res;
      
      $(document).ready(function() {
        $(".accordion-titulo").click(function(e){
          e.preventDefault();
          var contenido=$(this).next(".accordion-content");
          if(contenido.css("display")=="none"){ //open    
            contenido.slideDown(0);     
            $(this).addClass("open");
          }
          else{ //close   
            contenido.slideUp(0);
            $(this).removeClass("open");  
          }
          });
      });

      this.items.forEach ((i: any) => {
        this.afs.collection ('Transparencia_Medios', ref => ref.where ('sub_categoria.id', '==', i.id)).valueChanges ().subscribe ((medios: any []) => {
          i.medios = medios;
        });
      });
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

  ver (item: any) {
    console.log (item);
    var win = window.open (item.url, '_blank');
    win.focus ();
  }
}
