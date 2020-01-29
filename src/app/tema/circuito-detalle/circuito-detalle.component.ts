import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-circuito-detalle',
  templateUrl: './circuito-detalle.component.html',
  styleUrls: ['./circuito-detalle.component.css']
})
export class CircuitoDetalleComponent implements OnInit {
detalle:any;
dias:any[];
slider_imgs:any[]=[];
sus: any;
sus2: any;
etiquetas: any;
imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    public utils: UtilsService
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('circuito_detalle_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
  }
  init() {
    /* Inicializamos el slider */
    var tag = document.createElement('script');
    tag.src = '../../../assets/js/initslider-1.js';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  ngOnInit() {
    
    window.scrollTo(0, 0);
    
    /* Idioma */

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('circuito_detalle_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('circuito_detalle').subscribe ((res) => {
      this.imagenes = res;
    });


    /* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
    
      this.db.getCircuitoTourByKey(params['id']).subscribe( (data:any) => 
        {
          this.detalle=data;
          this.slider_imgs=data.imagenes;
          this.init();
          console.log('este es mi arreglo del slider=',this.slider_imgs);
          console.log('Este es el detalle:',this.detalle);
        });
      this.db.getCircuitoTourDias(params['id']).subscribe( (data:any) => 
        {
          this.dias=data;
          console.log('Este es el detalle de los Dias:',this.dias);
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

}
