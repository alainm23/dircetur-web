import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {
  Funciones:any;
  Juntas_Directivas:any;
  sus: any;
  sus2: any;
  sus3: any;
  sus4: any;
  sus5: any;
  etiquetas: any;
  imagenes: any;
  constructor(
    public db:DatabaseService,
    private utils:UtilsService,
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('sobre_nosotros_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.TodaslasFunciones ();

    this.JuntaDirectiva ();

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('sobre_nosotros_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('sobre_nosotros').subscribe ((res) => {
      this.imagenes = res;
    });

  }

  TodaslasFunciones () {
   this.sus3=this.db.getallDirceturFunciones().subscribe(res=>{
      this.Funciones=res;
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
  }

  JuntaDirectiva () {
    this.sus4=this.db.getallDirceturJuntaDirectiva().subscribe(res=>{
      this.Juntas_Directivas=res;
    });
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
  }
  
}
