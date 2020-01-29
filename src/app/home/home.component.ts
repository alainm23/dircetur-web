import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as $ from 'jquery';
import { SlugifyPipe } from '../../app/pipe/slugify.pipe';
import { UtilsService } from '../services/utils.service';

// AlgoliaSearch’
const algoliasearch = require('algoliasearch');
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SlugifyPipe]
})
export class HomeComponent implements OnInit {
  sus: any;
  sus2: any;
  sus3: any;
  sus4: any;
  sus5: any;
  sus6: any;
  Blogs:any[];
  Categorias:any;
  Rutas:any;
  Eventos:any[];
  Ancho_video:any;
  Alto_video:any;
  etiquetas:any;
  imagenes:any;
  idioma: string;
  /* video */
  YT: any;
  video: any;
  player: any;
  reframed: Boolean = false;
  /* Calendario */
  Mes_actual=moment().format('MMMM');
  Ano_actual=moment().format('YYYY');

  client: any;
  algolia_index: any;
  search_term: string = "";
  busqueda_items: any [] = [];
  constructor(public db:DatabaseService,
              public route: Router,
              private slugifyPipe: SlugifyPipe,
              public utils: UtilsService) { }

    init() {
      if (window['YT']) {
        this.createPlayer();
        return;
      }
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => this.createPlayer();
    }
    
    initalgolia () {
      this.client = algoliasearch (environment.algolia.appId, environment.algolia.apiKey, { protocol: 'https:' });
      this.algolia_index = this.client.initIndex(environment.algolia.indexName);
    }

    ver_busqueda (item: any) {
      if (item.tipo === 'agencia') {
        this.route.navigate (['agencia-cartilla', 'agencia', item.objectID]);
      } else if (item.tipo === 'alojamiento') {
        this.route.navigate (['alojamiento-cartilla', 'alojamiento', item.objectID]);
      } else if (item.tipo === 'restaurante') {
        this.route.navigate (['restaurante-cartilla', 'restaurante', item.objectID]);
      } else if (item.tipo === 'guia') {
        this.route.navigate (['guia-cartilla', 'guia', item.objectID]);
      }
    }

    search_changed () {
      if (this.search_term != "") {
        this.algolia_index.search({
          query: this.search_term
          //attributesToRetrieve: ['primary_text', 'secondary_text', 'id', 'type', "avatar"]
        }).then((data: any)=>{
          this.busqueda_items = [];  
          if (data.hits.length > 0) {
            this.busqueda_items = data.hits;
          }
        });
      } else {
        this.busqueda_items = [];
      }
    }

    ngOnInit() {
      this.init();
      AOS.init();
      this.initalgolia ();

      this.sus2=this.db.getCatBlogHome().subscribe ((res:any)=>{
        this.db.getBlogporCat(res.home_categoria_seleccionado).subscribe((res: any [])=>{
          this.Blogs=res;
        });
      });

      this.sus3=this.db.get7RutasSugeridas().subscribe(res=>{
        this.Rutas=res;

        console.log (res);
      });
  
      this.TraerEventos();
      
      this.TraerCategoriasBlogs();

      /* Idioma */

      this.idioma = localStorage.getItem ("idioma");

      if (this.idioma == undefined || this.idioma == null) {
        this.idioma = 'es';
      }

      this.sus=this.db.getPaginaWebEtiquetas ('home_' + this.idioma).subscribe ((res) => {
        this.etiquetas = res;
      });

      this.sus4=this.db.getPaginaWebEtiquetas ('home').subscribe ((res) => {
        this.imagenes = res;
      });
    
      /* Para que funcione el menu */
      var estado="inicial";
      $( document ).ready(function() {
      $('#icono-btn-home').click(function(){
            if(estado=="inicial"){
            $('#largo-buscador').css({'position':'absolute','z-index':'1000','padding-left':'5.5%'});
            $('#largo-buscador').show(500);
            if($(window).width()>=1024 && $(window).width()<=1280){
                  $('#largo-buscador').css({'transform': 'translate3d(-100%,0,0)'});
            }
            if($(window).width()>=1300){
                  $('#largo-buscador').css({'transform': 'translate3d(-100%,0,0)'});
            }
            if($(window).width()<1024){
                  $('#largo-buscador').css({'transform': 'translate3d(12%,0,0)'});
            }
            $('#largo-buscador').css({'transition': 'transform 0.80s;'});
            $('#largo-buscador').css({'background-color':'#f0f0f0'});
            $('#largo-buscador').css({'font-size':'17px'});
            $('.navbar').css({'background-color':'#f0f0f0'});
            $('#btn-icono').css({'background-color':'#f0f0f0'});
            $('.padding-0').removeClass('py-2');
            $('#icono-btn-home').removeClass('fa-search');
            $('#icono-btn-home').addClass('fa-times');
            $('#icono-btn-home').css({'margin-top':'10px'});
            $('.navbar').css({'box-shadow': '0px 3px 6px #00000029;'});
      
            estado="click";
            }else{
            $('.navbar').css({'background-color':'#ffffff'});
            $('#btn-icono').css({'background-color':'#ffffff'});
            $('#largo-buscador').hide(200);
            $('#largo-buscador').css({'width': '0'});
            $('#icono-btn-home').css({'margin-top':'0px'});
            $('.padding-0').addClass('py-2');
            $('#icono-btn-home').removeClass('fa-times');
            $('#icono-btn-home').addClass('fa-search');
            $('.navbar').css({'border':'0'});
            estado="inicial";
            }
      });
      
      });

    };

    changeIdioma (valor:string) {
      console.log (valor);
      
      this.idioma = valor;
      localStorage.setItem ("idioma", valor);
      moment.locale (valor);

      this.sus=this.db.getPaginaWebEtiquetas ('home_' + this.idioma).subscribe ((res) => {
        this.etiquetas = res;
      });
    }
    
    createPlayer () {
      if(screen.width>=360 && screen.width<375){
        this.Ancho_video=screen.width;
        this.Alto_video=203;
      }else if (screen.width>=375 && screen.width<411){
        this.Ancho_video=screen.width;
        this.Alto_video=210;
      }else if (screen.width>=411 && screen.width<414){
        this.Ancho_video=screen.width;
        this.Alto_video=235;
      }else if (screen.width>=414 && screen.width<768){
        this.Ancho_video=screen.width;
        this.Alto_video=243;
      }else if (screen.width>=768 && screen.width<1024){
        this.Ancho_video=screen.width;
        this.Alto_video=433;
      }else if (screen.width>=1024 && screen.width<1250){
        this.Ancho_video=screen.width;
        this.Alto_video=575;
      }else if (screen.width>=1250 && screen.width<1280){
        this.Ancho_video=screen.width;
        this.Alto_video=712;
      }else if (screen.width>=1280 && screen.width<1366){
        this.Ancho_video=screen.width;
        this.Alto_video=719;
      }else if (screen.width>=1366 && screen.width<1399){
        this.Ancho_video=1349.4;
        this.Alto_video=760;
      }else if (screen.width>1399){
        this.Ancho_video=screen.width;
        this.Alto_video=780;
      }
      this.video = 'Mnjpd9qXwdI' //video id
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('player', {
        width: this.Ancho_video,
        height: this.Alto_video,
        videoId: this.video,
        playerVars: {
            autoplay: 1,        // Auto-play the video on load
            enablejsapi: 1,
            autohide: 1,
            disablekb: 1, 
            controls: 0,        // Hide pause/play buttons in player
            showinfo: 0,        // Hide the video title
            modestbranding: 1,  // Hide the Youtube Logo
            loop: 1,            // Run the video in a loop
            fs: 0,              // Hide the full screen button
            rel: 0,
        },
        
        events: {
          onReady: function(e) {
              e.target.mute();
              e.target.playVideo(); // para q funcione en el telefono
              e.target.setPlaybackQuality('hd720');
          },
          onStateChange: function(e) {
            var videoHolder = document.getElementById('video-prueba');
            var imagenView = document.getElementById('imagen-prueba');
            var imagenSrc = document.getElementById('imagen-prueba2');
            if(e && e.data === 1){
                if(videoHolder && videoHolder.id) {
                    imagenSrc.classList.remove('loading-img');
                    imagenSrc.classList.add('loading');
                  setTimeout(() => {
                    imagenView.classList.remove('loading-img');
                    videoHolder.classList.remove('loading'); 
                  }, 4*1000);
                  
                }
            }else if(e && e.data === 0){
              e.target.playVideo();
            }
          },
          onError: function(e) {
          console.log('Detalle del error del video de Youtube:', e);
        }
        }
      });
    }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  TraerCategoriasBlogs () {
    this.sus6=this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
    });
  }

  goSobreDIR () {
    if(this.idioma=='es')
    {
      this.route.navigate (["/sobre-nosotros"]);
    }else{
      this.route.navigate (["/about-us"]);
    } 
  }

  goTransparenciaInst () {
    this.route.navigate (["/transparencia-institucional"]);
  }

  formatoFecha1(fecha:string)
  {
    return moment(fecha).format('L');
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
  
  goTurismoRural () {
    this.route.navigate (["/turismo-rural-comunitario"]);
  }
  
  goTurismoSocial () {
    this.route.navigate (["/turismo-social"]);
  }

  BlogDetalle(dato:any, id:string)
  {
    let slug:string;
    if (dato ['titulo_' + this.utils.ElIdioma]==null || dato ['titulo_' + this.utils.ElIdioma]==undefined)
    {
      slug = dato ['titulo_es'];
    }
    else
    {
      slug = dato ['titulo_' + this.utils.ElIdioma];
    }
     
    this.route.navigate (["/blog-detalle/"+this.slugifyPipe.transform (slug)+"/"+id]);
  }

  verCircuitoTourDetalle(slug:string,id:string)
  {
    this.route.navigate (["/circuito-detalle/"+this.slugifyPipe.transform(slug)+"/"+id]);
  }

  verDetalleEvento(slug:string, id:string)
  {
    this.route.navigate (["/evento-detalle/"+this.slugifyPipe.transform(slug)+"/"+id]);
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

  goBlogs (slug:string,id:string) {
    this.route.navigate (["/blogs/"+this.slugifyPipe.transform(slug)+"/"+id]);
  }
  
  goContacto () {
    this.route.navigate (["/contacto"]);
  }
 
  ObtenerDia(fecha:string)
  {
    return moment(fecha).format('DD');
  }

  ObtenerMesEnLetra(fecha:string)
  {
    return moment(fecha).format('MMM');
  }

  /* Esta funciona sirve para traer el idioma correspondiente en las etiquetas de las colecciones generadas por el administrador */
  ValidarIdioma (dato:any, campo: string) {
    if (dato [campo + this.utils.ElIdioma]==null || dato [campo + this.utils.ElIdioma]==undefined)
    {
      return dato [campo+'es'];
    }
    
    return dato [campo + this.utils.ElIdioma];
  
  }

  TraerEventos() 
  {
    
    this.sus5=this.db.getEventospormes(moment().format('MM')).subscribe((data: any [])=>{
    
      /*let respuesta=data.filter ((i: any) => {
        return new Date(i.datageneral.fecha).getTime() >= new Date().getTime();
      });*/
 
      this.Eventos = data.sort ((a: any, b: any) => {
        return +new Date(a.datageneral.fecha) - +new Date(b.datageneral.fecha);
      });
      let i=1;
      this.Eventos.forEach(evento => {
        //Asignar el color azul y rojo a cada evento
        if(i<3)
        {
          evento.color='azul';
        }
        else
        {
          evento.color='rojo'; 
          if(i==4)
          {
            i=0;
          }
        }
        i++;
      });
    })

  }
  ngOnDestroy(){
    window['onYouTubeIframeAPIReady'] = null;
    if (this.player) {
      this.player.destroy();
    }
    $('#video-prueba').addClass('loading');
    $('#imagen-prueba').addClass('loading-img');
    $('#imagen-prueba2').addClass('loading-img');
    $('#imagen-prueba2').removeClass('loading');

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

    if (this.sus6 !== null && this.sus6 !== undefined) {
      this.sus6.unsubscribe ();
    }
  }

  get_value (item: any, val: string) {
    let returned = item [val + '_' + this.db.idioma ()];
    if (returned === null || returned === undefined) {
      returned = item [val + '_es'];
    }
    
    if (returned === null || returned === undefined) {
      returned = item [val];
    }

    if (returned === null || returned === undefined) {
      returned = '';
    }

    return returned;
  }
}