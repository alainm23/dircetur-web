import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
Categorias:any[]=[];
Faqs:any[]=[];
idcat:any;
sus: any;
sus2: any;
etiquetas: any;
imagenes: any;
  constructor(
    public db:DatabaseService,
    public utils: UtilsService
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('contacto_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('contacto_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('contacto').subscribe ((res) => {
      this.imagenes = res;
    });

    this.db.getallcatfaqs().subscribe(res=>{
      this.Categorias=res;
      if(this.Categorias.length>0)
      {
        this.idcat=this.Categorias[0].id;
        this.db.getFaqsporCats(this.idcat).subscribe( data => 
          {
            this.Faqs=data;
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
      
    });
  } 

  TraerFaqs (id:string) {
    this.idcat=id;
    this.db.getFaqsporCats(id).subscribe( data => 
      {
        this.Faqs=data;
    
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

  ngOnDestroy(){
    if (this.sus !== null && this.sus !== undefined) {
      this.sus.unsubscribe ();
    }

    if (this.sus2 !== null && this.sus2 !== undefined) {
      this.sus2.unsubscribe ();
    }

  }
}
