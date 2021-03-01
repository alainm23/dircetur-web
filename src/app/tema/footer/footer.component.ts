import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';
declare var google: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [SlugifyPipe]
})
export class FooterComponent implements OnInit {
  @ViewChild ('map', { static: false }) mapRef: ElementRef;
  map: any;
  Categorias:any;
  sus: any;
  sus2: any;
  sus3: any;
  etiquetas: any;
  imagenes: any;

  constructor(
    public db:DatabaseService,
    public route: Router,
    private slugifyPipe: SlugifyPipe,
    public utils: UtilsService
  ) {
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('footer_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
  }

  ngOnInit () {
    this.TraerCategoriasBlogs();

    /* Idioma */

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('footer_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('home').subscribe ((res) => {
      this.imagenes = res;
    });

    setTimeout (() => {
      this.initMap ();
    }, 1000);
  }

  initMap () {
    let point = new google.maps.LatLng (-13.522226696384148, -71.96721645159772);

    const options = {
      center: point,
      zoom: 17,
      disableDefaultUI: true,
      streetViewControl: false,
      disableDoubleClickZoom: false,
      clickableIcons: false,
      scaleControl: true,
      mapTypeId: 'roadmap'
    }

    this.map = new google.maps.Map (this.mapRef.nativeElement, options);

    let marker: any = new google.maps.Marker ({
      position: point,
      animation: google.maps.Animation.DROP,
      map: this.map
    });
  }

  TraerCategoriasBlogs () {
    this.sus3=this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
      console.log('categorias del blog',res);
    });
  }

  goSobreDIR () {
    this.route.navigate (["/sobre-nosotros"]);
  }

  goTransparenciaInst () {
    this.route.navigate (["/transparencia-institucional"]);
  }

  goCalendario () {
    this.route.navigate (["/calendario"]);
  }

  goCircuitosTuristicos () {
    this.route.navigate (["/circuitos-turisticos"]);
  }

  goBoletoTuristico () {
    this.route.navigate (["/boleto-turistico"]);
  }

  goAppProveedor () {
    this.route.navigate (["/url-app-proveedores-FALTA"]);
  }

  goTurismoRural () {
    this.route.navigate (["/turismo-rural-comunitario"]);
  }

  goTurismoSocial () {
    this.route.navigate (["/turismo-social"]);
  }

  goTurismo () {
    this.route.navigate (["/turismo"]);
  }

  goComercioExterior () {
    this.route.navigate (["/comercio-exterior"]);
  }

  goArtesania () {
    this.route.navigate (["/artesania"]);
  }

  goContacto () {
    this.route.navigate (["/contacto"]);
  }

  goBlogs (slug:string,id:string) {
    this.route.navigate (["/blogs/"+this.slugifyPipe.transform(slug)+"/"+id]);
  }

  gohome () {
    this.route.navigate (["/home"]);
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
