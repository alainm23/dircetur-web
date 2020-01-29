import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-turismo',
  templateUrl: './turismo.component.html',
  styleUrls: ['./turismo.component.css']
})
export class TurismoComponent implements OnInit {
  sus: any;
  sus2: any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    public utils: UtilsService
  ) {
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('turismo_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
   }

  init() {
    /* Libreria de Flickity */
    var tag = document.createElement('script');
    tag.src = '../../../assets/js/flickity.min.js';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    /* Inicializamos Flickity */
    var tag2 = document.createElement('script');
    tag2.src = '../../../assets/js/initflickity.js';
    var firstScriptTag2 = document.getElementsByTagName('script')[0];
    firstScriptTag2.parentNode.insertBefore(tag2, firstScriptTag2);
  }

  ngOnInit() {
    this.init();
    window.scrollTo(0, 0);

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('turismo_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('turismo').subscribe ((res) => {
      this.imagenes = res;
    });

    /*$(document).on("scroll", function(){
      var desplazamientoActual = $(document).scrollTop();
      if(desplazamientoActual > 2400)
      {
          function count(){
          var counter = { var: 0 };
          TweenMax.to(counter, 3, {
          var: 1285, 
          onUpdate: function () {
          var number = Math.ceil(counter.var);
          $('.counter').html(number);
          if(number === counter.var){ count.kill(); }
          },
          onComplete: function(){
          count();
          },    
          ease:Circ.easeOut
          });
          }
          count();
      }
    });*/
  }

  goAlojamiento () {
    this.route.navigate (["/alojamiento-cartilla"]);
  }

  goRestaurante () {
    this.route.navigate (["/restaurante-cartilla"]);
  }

  goAgencia () {
    this.route.navigate (["/agencia-cartilla"]);
  }

  goGuia () {
    this.route.navigate (["/guia-cartilla"]);
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
