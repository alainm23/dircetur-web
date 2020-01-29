import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-comercioexterior',
  templateUrl: './comercioexterior.component.html',
  styleUrls: ['./comercioexterior.component.css']
})
export class ComercioexteriorComponent implements OnInit {
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
      this.sus=this.db.getPaginaWebEtiquetas ('comercio_exterior_' + nextValue).subscribe ((res) => {
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

    this.sus=this.db.getPaginaWebEtiquetas ('comercio_exterior_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('comercio_exterior').subscribe ((res) => {
      this.imagenes = res;
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
