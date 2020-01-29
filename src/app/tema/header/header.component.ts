import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [SlugifyPipe]
})
export class HeaderComponent implements OnInit {
menu:string="active";
Categorias:any;
sus: any;
sus2: any;
sus3: any;
etiquetas: any;
imagenes: any;

  constructor(
    public route: Router,
    public db:DatabaseService,
    public utils:UtilsService,
    private slugifyPipe: SlugifyPipe
    ) {
      utils.idioma.subscribe((nextValue) => {
        /* subscribirme */
        this.sus=this.db.getPaginaWebEtiquetas ('header_' + nextValue).subscribe ((res) => {
          this.etiquetas = res;
        });
     })
    }

  ngOnInit() {

    /* Idioma */

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('header_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('home').subscribe ((res) => {
      this.imagenes = res;
    });

    var estado2="inicial";
    $( document ).ready(function() {
    $('#icono-btn-interiores').click(function(){
          if(estado2=="inicial"){
          $('#buscador-exterior').css({'position':'absolute','z-index':'1000','padding-left':'5.5%'});
          $('#buscador-exterior').show(500);
          if($(window).width()>=1200){
                $('#buscador-exterior').css({'transform': 'translate3d(-100.5%,0,0)'});
                $('#buscador-exterior').css({'background-color':'#f0f0f0'});
                $('#navcol-1').css({'background-color':'#f0f0f0'});
          }
          if($(window).width()>=1300){
                $('#buscador-exterior').css({'transform': 'translate3d(-100%,0,0)'});
                $('#buscador-exterior').css({'background-color':'#f0f0f0'});
                $('#navcol-1').css({'background-color':'#f0f0f0'});
          }
          if($(window).width()>=1024 && $(window).width()<1200){
                $('#buscador-exterior').css({'transform': 'translate3d(-100%,0,0)'});
                $('#buscador-exterior').css({'background-color':'#f0f0f0'});
                $('#navcol-1').css({'background-color':'#f0f0f0'});
          }
          if($(window).width()<=1023){
                $('#buscador-exterior').css({'transform': 'translate3d(12%,0,0)'});
                $('#buscador-exterior').css({'background-color':'#fff'});
                $('#navcol-1').css({'background-color':'#fff'});
          }
          $('#buscador-exterior').css({'transition': 'transform 0.80s;'});
          $('#buscador-exterior').css({'font-size':'17px'});
          $('#btn-icono').css({'background-color':'#f0f0f0'});
          $('.padding-0').removeClass('py-2');
          $('#icono-btn-interiores').removeClass('fa-search');
          $('#icono-btn-interiores').addClass('fa-times');
          $('#icono-btn-interiores').css({'margin-top':'10px'});
          estado2="click";
          }else{
          $('.navbar').css({'background-color':'#ffffff'});
          $('#btn-icono').css({'background-color':'#ffffff'});
          $('#buscador-exterior').hide(500);
          $('#buscador-exterior').css({'width': '0'});
          $('#icono-btn-interiores').css({'margin-top':'0px'});
          $('.padding-0').addClass('py-2');
          $('#icono-btn-interiores').removeClass('fa-times');
          $('#icono-btn-interiores').addClass('fa-search');
          $('.navbar').css({'border':'0'});
                $('#navcol-1').css({'background-color':'#fff'});
          estado2="inicial";
                }
    });
});
    this.TraerCategoriasBlogs();
    
    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

  }

  changeIdioma (valor:string) {
    this.utils.ElIdioma = valor;      
    localStorage.setItem ("idioma", valor);
    moment.locale (valor);
  }

  TraerCategoriasBlogs () {
    this.sus3=this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
      console.log('categorias del blog',res);
    });
  }

  activarMenuinterno ()
  {
    if (this.menu=="active") {
      $('.mostrar-menu').show(500);
      $('.derecha-menu').css({'transform': 'translate3d(-10%,0,0)'});
      this.menu="click";
      }else if (this.menu=="click"){
      $('.mostrar-menu').hide(500);
      $('.derecha-menu').css({'transform': 'translate3d(0,0,0)'});
      this.menu="active";
      }
  }

  goBlogs (slug:string,id:string) {
    this.route.navigate (["/blogs/"+this.slugifyPipe.transform(slug)+"/"+id]);
  }

  gohome () {
    this.route.navigate (["/home"]);
  }

  goSobreDIR () {
    this.route.navigate (["/sobre-nosotros"]);
  }

  goTransparenciaInst () {
    this.route.navigate (["/transparencia-institucional"]);
  }
  
  goCircuitosTuristicos () {
    this.route.navigate (["/circuitos-turisticos"]);
  }
  
  goBoletoTuristico () {
    this.route.navigate (["/boleto-turistico"]);
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
