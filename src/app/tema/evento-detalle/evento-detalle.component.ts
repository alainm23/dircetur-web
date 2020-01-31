import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css'],
  providers: [SlugifyPipe]
})
export class EventoDetalleComponent implements OnInit {
  detalle:any;
  /* URL Imagen Default en caso de ser DIV */
  url_img_evento:any="/assets/imagenes/fondo-evento.jpg";
  Eventos:any[];
  Fecha_del_evento:any='vacio';
  sus: any;
  sus2: any;
  sus3: any;
  sus4: any;
  etiquetas: any;
  imagenes: any;
  
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private slugifyPipe: SlugifyPipe,
    public utils: UtilsService
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('evento_detalle_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    /* Idioma */

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('evento_detalle_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('evento_detalle').subscribe ((res) => {
      this.imagenes = res;
    });

    /* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.sus3=this.db.getEventosByKey(params['id']).subscribe( data => 
        {
          console.log (data);

          this.detalle=data;
          this.Fecha_del_evento=this.detalle.fecha;
          if(this.Fecha_del_evento!='vacio')
          {
            this.TraerEventos();
          }
        });
    })
    
  }
  
  ObtenerDia(fecha:string)
  {
    return moment(fecha).format('DD');
  }

  ObtenerMesEnLetra(fecha:string)
  {
    return moment(fecha).format('MMM');
  }

  goCalendario () {
    this.route.navigate (["/calendario"]);
  }

  verDetalleEvento(slug:string,id:string)
  {
    window.scrollTo(0, 0);
    this.route.navigate (["/evento-detalle/"+this.slugifyPipe.transform(slug)+"/"+id]);
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  TraerEventos() 
  {    
  this.sus4=this.db.getEventospormes(moment(this.Fecha_del_evento).format('MM')).subscribe((data: any [])=>{
    
      /*let respuesta=data.filter ((i: any) => {
        return new Date(i.datageneral.fecha).getTime() >= new Date().getTime();
      });*/
 
      this.Eventos = data.sort ((a: any, b: any) => {
        return +new Date(a.datageneral.fecha) - +new Date(b.datageneral.fecha);
      });

      let i=0;
      
      this.Eventos.forEach(evento => {
        //Asignar el color azul y rojo a cada evento
        if(i<1)
        {
          evento.color='azul';
          i++;
        }
        else
        {
          evento.color='rojo'; 
          if(i==1)
          {
            i=0;
          }
        }
        
      });
    })

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
