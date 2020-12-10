import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';

// AlgoliaSearch’
const algoliasearch = require('algoliasearch');
import { environment } from '../../../environments/environment';

import * as moment from 'moment';

@Component({
  selector: 'app-agencia-cartilla',
  templateUrl: './agencia-cartilla.component.html',
  styleUrls: ['./agencia-cartilla.component.css']
})
export class AgenciaCartillaComponent implements OnInit {
  tipo: string;
  id: string;

  agencia: any;
  items: any [] = [];

  algolia_index: any;
  search_term: string = "";
  estadisticas: any;
  constructor(private database: DatabaseService,
              public route: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.initalgolia ();

    this.activatedRoute.params.subscribe ((params: any) =>{
      this.tipo = params['tipo'];
      this.id = params ['id'];

      if (this.tipo === 'agencia') {
        this.database.getAgenciaById (this.id).subscribe ((res: any) => {
          res.visible = true;
          res.tipo = 'agencia';
          this.items.push (res);

          console.log (res);
        });
      }

      this.database.get_prestadores_estadisticas ().subscribe ((res: any) => {
        console.log (res);
        this.estadisticas = res;
      });
    });
  }

  initalgolia () {
    const client = algoliasearch (environment.algolia.appId, environment.algolia.apiKey, { protocol: 'https:' });
    this.algolia_index = client.initIndex(environment.algolia.indexName);
  }

  search_changed () {
    if (this.search_term != "") {
      console.log (this.search_term);
      this.algolia_index.search({
        query: this.search_term,
        //filters: 'tipo:"agencia"'
      }).then((data: any)=>{
        console.log ('algolia_search', data);
        this.items = [];
        if (data.hits.length > 0) {
          data.hits.forEach ((element: any) => {
            element.nombre_comercial = element.nombre;
          });
          this.items = data.hits;
        }
      });
    } else {
      this.items = [];
    }
  }

  visible_toggled (item: any) {
    if (item.visible) {
      item.visible = false;
    } else {
      item.visible = true;


      if (item.cargado === undefined) {
        this.database.getAgenciaById (item.objectID).subscribe ((res: any) => {
          item.telefono = res.telefono;
          item.correo = res.correo;

          item.pagina_web = res.pagina_web;
          item.representante_nombre = res.representante_nombre;
          item.representante_correo = res.representante_correo;
          item.representante_telefono = res.representante_telefono;
          item.numero_certificado = res.numero_certificado;
          item.razon_social = res.razon_social;
          item.ruc = res.ruc;
          item.direccion = res.direccion;

          item.fecha_exp = res.fecha_exp;
          item.fecha_ins = res.fecha_ins;
          item.fecha_aprobado = res.fecha_aprobado;

          item.direccion = res.direccion;
          item.clasificacion = res.clasificacion;
          item.modalidad_turismo = res.modalidad_turismo;
          item.tipos_turismo = res.tipos_turismo;
          item.servicios_complementarios = res.servicios_complementarios;
          item.nro_certificado = res.nro_certificado;
          item.fecha_solicitud = res.fecha_solicitud;
          item.cargado = true;
        });
      }
    }
  }

  getDate (date: string, format: string="") {
    if (format === '') {
      return moment (date).format ('ll');
    }

    return moment (date, format).format ('ll');
  }

  get_certificado (item: any) {
    if (item.solo_digital === undefined) {
      return 'N° ' + this.pad (item.nro_certificado, 4) + '-' + moment (item.fecha_aprobado, "DD/MM/YYYY").format ('YYYY') + ' AV – GR / DIRCETUR';
    } else {
      return 'N° ' + this.pad (item.nro_certificado, 4) + '-' + moment (item.fecha_aprobado, "DD/MM/YYYY").format ('YYYY') + ' AF – GR / DIRCETUR';
    }
  }

  pad (num: number, size: number) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  go_web (web: string) {
    if (web.trim () !== '') {
      if (web.trim ().indexOf ('http') > -1) {
        window.open (web.replace(/\s+/g,""), '_blank');
      } else {
        window.open ('http://' + web.replace(/\s+/g,""), '_blank');
      }
    }
  }
}
