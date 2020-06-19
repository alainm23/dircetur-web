import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-circuitosturisticos',
  templateUrl: './circuitosturisticos.component.html',
  styleUrls: ['./circuitosturisticos.component.css'],
  providers: [SlugifyPipe]
})
export class CircuitosturisticosComponent implements OnInit {
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
      this.sus=this.db.getPaginaWebEtiquetas ('circuitos_turisticos_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('circuitos_turisticos_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('circuitos_turisticos').subscribe ((res) => {
      this.imagenes = res;
    });

    this.TodoslosCircuitosTuristicos ();
  }

  TodoslosCircuitosTuristicos () {
    this.sus3=this.db.getallCircuitosTuristicos().subscribe(res=>{
      this.Viajes=res;
      console.log (res);
    });
  }

  goCircuitoDetalle (slug:string,id:string) {
    this.route.navigate (["/circuito-detalle/"+this.slugifyPipe.transform(slug)+"/"+id]);
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

  get_value (item: any, val: string) {
    let returned = item [val + '_' + localStorage.getItem ('idioma')];
    
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
