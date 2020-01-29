import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-turismosocial',
  templateUrl: './turismosocial.component.html',
  styleUrls: ['./turismosocial.component.css'],
  providers: [SlugifyPipe]
})
export class TurismosocialComponent implements OnInit {
Viajes: any;
Tipos_viajes: any;
sus: any;
sus2: any;
sus3: any;
sus4: any;
sus5: any;
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
      this.sus=this.db.getPaginaWebEtiquetas ('turismo_social_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('turismo_social_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('turismo_social').subscribe ((res) => {
      this.imagenes = res;
    });

    this.TodosLosTipos ();
    this.TodoslosViajesProgramados ();
  }
  
  TodosLosTipos () {
    
    this.sus5=this.db.getAllTiposViajesProgramados().subscribe(res=>{
      this.Tipos_viajes=res;
      console.log ('Todos los tipos',this.Tipos_viajes);
    });
  
  }
  
  CambiarTodoslosViajesProgramados (id:string) {
  
    this.sus3=this.db.getViajesProgramadoXTipoID (id).subscribe (res=>{
      this.Viajes=res;
      this.Viajes.forEach(viaje => {
        this.sus4=this.db.getDetalleViajeProgramado(viaje.id).subscribe((res:any)=>{
          viaje.Detalle=res.resumen;
        });
      });
      
      console.log ('todos los viajes programados segun el tipo seleccionado con el detalle',this.Viajes);
    });

    $('.tipos').removeClass('btn-rojo-active');
    $('#'+id).addClass('btn-rojo-active');
  }

  TodoslosViajesProgramados () {
    this.sus3=this.db.getallViajesProgramados ().subscribe (res=>{
      this.Viajes=res;
      this.Viajes.forEach(viaje => {
        this.sus4=this.db.getDetalleViajeProgramado(viaje.id).subscribe((res:any)=>{
          viaje.Detalle=res.resumen;
        });
      });
      
      console.log ('todos los viajes programados con el detalle',this.Viajes);
    });
  }

  goViajeProgramado (slug:string,id:string) {
    this.route.navigate (["/viaje-programado/"+this.slugifyPipe.transform(slug)+"/"+id]);
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
