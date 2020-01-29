import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-turismoruralcomunitario',
  templateUrl: './turismoruralcomunitario.component.html',
  styleUrls: ['./turismoruralcomunitario.component.css'],
  providers: [SlugifyPipe]
})
export class TurismoruralcomunitarioComponent implements OnInit {
Viajes:any;
sus: any;
sus2: any;
sus3: any;
etiquetas: any;
imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private slugifyPipe: SlugifyPipe,
    private utils:UtilsService
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('turismo_rural_comunitario_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('turismo_rural_comunitario_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('turismo_rural_comunitario').subscribe ((res) => {
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
    
    this.TodoslosTourRural ();
  }

  TodoslosTourRural () {
    this.sus3=this.db.getallTurismoRural().subscribe(res=>{
      this.Viajes=res;
    });
  }

  goTurismoRural (slug:string,id:string) {
    this.route.navigate (["/viaje-rural/"+this.slugifyPipe.transform(slug)+"/"+id]);
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
  }

}
