import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
@Component({
  selector: 'app-artesania',
  templateUrl: './artesania.component.html',
  styleUrls: ['./artesania.component.css'],
  providers: [SlugifyPipe]
})
export class ArtesaniaComponent implements OnInit {
sus: any;
sus2: any;
sus3: any;
sus4: any;
etiquetas: any;
imagenes: any;
/* calendario artesania eventos */
Eventos:any[];
Eventos_back: any[];
Tipos:any;
Fecha_formato_completo=moment();
Fecha_actual=moment().format('MM');
Mes_actual=moment().format('MMMM');
Mes_actual_numero=moment().format('MM');
Ano_actual=moment().format('YYYY');
Estado:boolean=true;
Todos_los_eventos:string='todos';
Tipo_nombre:any='todos';
  constructor(
    public db:DatabaseService,
    public utils: UtilsService,
    public route: Router,
    private slugifyPipe: SlugifyPipe
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('artesania_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('artesania_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('artesania').subscribe ((res) => {
      this.imagenes = res;
    });

    this.TraerEventos(this.Fecha_actual);

    this.sus3=this.db.getTiposEventosArtesania().subscribe(res=>{
      this.Tipos=res;
      console.log(res);
    });
  }

  CambiarMes(direccion:number,fecha:any){
    console.log('sentido de la flecha:',direccion,'fecha old:',fecha);
    let fecha_actual_num:any;
    if(direccion==1)
    {
      fecha_actual_num=moment(fecha).subtract(1, 'months');
    }
    else
    {
      fecha_actual_num=moment(fecha).add(1, 'months');
    }
   
    console.log('mes new',fecha_actual_num);
    this.TraerEventos(moment(fecha_actual_num).format('MM'));
    this.Mes_actual=moment(fecha_actual_num).format('MMMM');
    this.Mes_actual_numero=moment(fecha_actual_num).format('MM');
    this.Fecha_formato_completo=fecha_actual_num;
  }

  TraerEventos(fecha:string) 
  {
    this.sus4=this.db.getEventosArtesaniapormes(fecha).subscribe((data: any [])=>{
    
     /* let respuesta=data.filter ((i: any) => {
        return new Date(i.datageneral.fecha).getTime() >= new Date().getTime();
      });*/
 
      this.Eventos = data.sort ((a: any, b: any) => {
        return +new Date(a.datageneral.fecha) - +new Date(b.datageneral.fecha);
      });
      let i=1;
      this.Eventos.forEach(evento => {
        //Asignar el color azul y rojo a cada evento
        if(i<4)
        {
          evento.color='azul';
        }
        else
        {
          evento.color='rojo'; 
          if(i==6)
          {
            i=0;
          }
        }
        i++;
      });
      
      this.Eventos_back = this.Eventos;
      console.log('listado de eventos del mes actual:', this.Eventos);
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

  verDetalleEvento(slug:string,id:string)
  {
    this.route.navigate (["/evento-detalle-artesania/"+this.slugifyPipe.transform(slug)+"/"+id]);
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  filtrarCalendario(name_tipo:string)
  {
    console.log ('nombre del tipo de evento seleccionado:',name_tipo);
    this.Tipo_nombre = name_tipo;
    this.Estado=false;
    this.Tipos.forEach((tipo:any) => {
        
      if (tipo.nombre==name_tipo)
      {
        tipo.checked=true;
      }
      else
      {
        tipo.checked=false;
      }

    });

    if(name_tipo=='todos')
    {
      this.Estado=true;
      this.Eventos = this.Eventos_back;
    }
    else
    {
      this.Eventos = this.Eventos_back;
      this.Eventos = this.Eventos.filter ((i: any) => {
        return i.datageneral.tipo.nombre==name_tipo;
      });
    }
    
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
