import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-viaje-rural',
  templateUrl: './viaje-rural.component.html',
  styleUrls: ['./viaje-rural.component.css']
})
export class ViajeRuralComponent implements OnInit {
detalle:any;
slider_imgs:any[]=[];
sus: any;
sus2: any;
sus3: any;
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
      this.sus=this.db.getPaginaWebEtiquetas ('viaje_rural_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('viaje_rural_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('viaje_rural').subscribe ((res) => {
      this.imagenes = res;
    });

    /* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.sus3=this.db.getTurismoRuralByKey(params['id']).subscribe( (data:any) => 
        {
          this.detalle=data;
          this.slider_imgs=data.imagenes;
          this.init();
          console.log('Este es el detalle:',this.detalle);
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

    if (this.sus3 !== null && this.sus3 !== undefined) {
      this.sus3.unsubscribe ();
    }

  }

}
