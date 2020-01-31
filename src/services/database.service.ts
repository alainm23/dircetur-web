import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { map } from 'rxjs/operators';
import { combineLatest, of } from "rxjs/index";
import { first } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private afs: AngularFirestore) { }

  idioma () {
    return localStorage.getItem ("idioma");
  }

  getallblogs () {
    return this.afs.collection ('Blogs', res => res.orderBy('fecha_creado','desc')).valueChanges ();
  }

  getallcatfaqs () {
    return this.afs.collection ('FAQ_Categorias').valueChanges ();
  }

  getFaqsporCats (id: string) {
    const collection = this.afs.collection ("FAQ_Categorias").doc (id).collection ('FAQs');
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getallViajesProgramados () {
    return  this.afs.collection ("Viajes_Programados", ref => ref.where('estado', '<=' , 1)).valueChanges();
  }

  getDetalleViajeProgramado (id_viaje:string) {
    return this.afs.collection ('Viajes_Programados').doc (id_viaje).collection ('Detalle').doc ('Detalle').valueChanges ();
  }
  
  getallTurismoRural () {
    return this.afs.collection ('Turismo_Rural').valueChanges ();
  }

  getTurismoRuralByKey (id: string) {
    return this.afs.collection ("Turismo_Rural").doc (id).valueChanges ();
  }

  getViajeProgramadoByKey (id: string) {
    return this.afs.collection ("Viajes_Programados").doc (id).valueChanges ();
  }

  getViajeProgramadoSalidas (id: string) {
    return  this.afs.collection ("Viajes_Programados").doc (id).collection ('Salidas', ref => ref.where('estado', '<=' , 1)).valueChanges();
    /*const collection = this.afs.collection ("Viajes_Programados").doc (id).collection ('Salidas');
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });*/
  }
  
  /*getViajeProgramadoValidarViajero (dni_viajero:string,id_viaje: string) {
    return this.afs.collection ("usuarios_viajes_programados").doc (dni_viajero).collection ('Viajes_Inscritos').doc (id_viaje).valueChanges ();
  }*/

  /*getViajeProgramadoAddViajero (id_viaje: string, id_salida:string, data:any) {
    return this.afs.collection ("Viajes_Programados").doc (id_viaje).collection ('Salidas').doc (id_salida).collection ('Viajeros').doc (data.id).set(data);
  }*/

  get7RutasSugeridas () {
    return this.afs.collection ('Circuitos_Turisticos', res => res.limit(7)).valueChanges ();
  }
  
  getallCircuitosTuristicos () {
    return this.afs.collection ('Circuitos_Turisticos').valueChanges ();
  }

  getallDirceturFunciones () {
    return this.afs.collection ('Dircetur_Funciones').valueChanges ();
  }

  getallDirceturJuntaDirectiva () {
    return this.afs.collection ('Dircetur_JuntaDirectiva').valueChanges ();
  }

  getTiposEventos () {
    return this.afs.collection ('Eventos_Tipos').valueChanges ();
  }

  getTiposEventosArtesania () {
    return this.afs.collection ('Eventos_Artesania_Tipos').valueChanges ();
  }

  get7rutasugeridashome () {
    return this.afs.collection ('Rutas', res => res.orderBy('fecha_creado','desc').limit(7)).valueChanges ();
  }

  getBlogByKey (id: string) {
    return this.afs.collection ("Blogs").doc (id).valueChanges ();
  }

  getCircuitoTourByKey (id: string) {
    return this.afs.collection ("Circuitos_Turisticos").doc (id).valueChanges ();
  }
  
  getCircuitoTourDias (id: string) {
    const collection = this.afs.collection ("Circuitos_Turisticos").doc (id).collection ('Dias');
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();
          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getEventosByKey (id: string) {
    return this.afs.collection ("Eventos").doc (id).valueChanges ();
  }

  getEventosArtesaniaByKey (id: string) {
    return this.afs.collection ("Eventos_Artesania").doc (id).valueChanges ();
  }
  
  getEventosArtesaniapormes (mes: string) {
    const collection = this.afs.collection ("Eventos_Artesania_Fechas").doc (mes).collection ('Eventos');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getEventosArtesaniaByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getEventospormes (mes: string) {
    const collection = this.afs.collection ("Eventos_Fechas").doc (mes).collection ('Eventos');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getEventosByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });
  }

  getallCats (){
    return this.afs.collection ('Blog_Categorias', res => res.orderBy('date_added','desc').limit(5)).valueChanges ();
  }

  getCatBlogHome (){
    return this.afs.collection ('Blogs_Preferencias').doc ('preferencias').valueChanges ();
  }

  getBlogporCat (id: string) {
    return  this.afs.collection ("Blogs", ref => ref.where('categoria.id', '==' , id)).valueChanges();
    /*const collection = this.afs.collection ("Blog_Categorias").doc (id).collection ('Blogs');
                                                                                                                                                                                                                                    
    return collection.snapshotChanges ().pipe (map (refReferencias => {
      if (refReferencias.length > 0) {
        return refReferencias.map (refReferencia => {
          const data: any = refReferencia.payload.doc.data();

          return this.getBlogByKey (data.id).pipe (map (datageneral => Object.assign ({}, {data, datageneral})));
        });
      }
    })).mergeMap (observables => {
      if (observables) {
        return combineLatest(observables);
      } else {
        return of([]);
      }
    });*/
  }

  getPaginaWebEtiquetas (doc: string) {
    return this.afs.collection ('PaginaWeb').doc (doc).valueChanges ();
  }

  getBoletobyKey (id:string){
    return this.afs.collection ('Boleto_Turistico').doc (id).valueChanges ();
  }

  getallBoletos (){
    return this.afs.collection ('Boleto_Turistico').valueChanges ();
  }

  getallParquesArqueologicos (){
    return this.afs.collection ('Parques_Arqueologicos').valueChanges ();
  }

  getallMuseos (){
    return this.afs.collection ('Museos').valueChanges ();
  }

  /*getUsuariosSancionados (dni:string){
    return this.afs.collection ('usuarios_sancionados').doc (dni).valueChanges ();
  }*/

  /*getAddUsuarioViajeProgramado (id: string, data:any) {
    return this.afs.collection ("usuarios_viajes_programados").doc (id).set(data);
  }*/

  /*getViajeProgramadoInfoSalida (id_viaje: string, id_salida:string) {
    return this.afs.collection ("Viajes_Programados").doc (id_viaje).collection ('Salidas').doc (id_salida).valueChanges ();
  }*/


  /* Estas consultas me las envio ALAIN */

  getUsuarioViajeProgramado (dni: string) {
    return this.afs.collection ('Usuarios_Viajes_Programados').doc (dni).valueChanges ();
  }

  getValidViajeUsuarioViajeProgramado (dni: string, viaje_id: string) {
    return this.afs.collection ('Usuarios_Viajes_Programados').doc (dni).collection ('Viajes_Inscritos').doc (viaje_id).valueChanges ();
  }

  async addViajeroViajeProgramado (viaje: any, salida_id: string, data: any) {
    let batch = this.afs.firestore.batch ();

    const step_01 = this.afs.collection ('Usuarios_Viajes_Programados').doc (data.dni).ref;
    batch.set (step_01, data);
    
    const step_02 = this.afs.collection ('Usuarios_Viajes_Programados').doc (data.dni).collection ('Viajes_Inscritos').doc (viaje.id).ref;    
    batch.set (step_02, {
      id: viaje.id,
      nombre: viaje.nombre,
      ultima_salida: salida_id
    });

    const step_03 = this.afs.collection ('Usuarios_Viajes_Programados').doc (data.dni).collection ('Viajes_Inscritos').doc (viaje.id).collection ('Salidas').doc (salida_id).ref;    
    batch.set (step_03, {
      id: salida_id,
      checked: true
    });

    const step_04 = this.afs.collection ('Viajes_Programados').doc (viaje.id).collection ("Salidas").doc (salida_id).collection ('Viajeros').doc (data.dni).ref;
    batch.set (step_04, {
      nombre_completo: data.nombre_completo,
      dni: data.dni,
      checked: true,
      fecha_nacimiento: data.fecha_nacimiento,
      fecha_agregado: new Date ().toISOString (),
      correo: data.correo
    });

    return await batch.commit ();
  }

  async addUsuarioViajeProgramado (data: any, viaje: any, salida_id: string) {
    let batch = this.afs.firestore.batch ();

    const step_01 = this.afs.collection ('Viajes_Programados').doc (viaje.id).collection ("Salidas").doc (salida_id).collection ('Viajeros').doc (data.dni).ref;
    batch.set (step_01, {
      nombre_completo: data.nombre_completo,
      dni: data.dni,
      checked: true,
      fecha_nacimiento: data.fecha_nacimiento,
      fecha_agregado: new Date ().toISOString (),
      correo: data.correo,
      genero: data.genero
    });

    const step_02 = this.afs.collection ('Usuarios_Viajes_Programados').doc (data.dni).collection ('Viajes_Inscritos').doc (viaje.id).ref;    
    batch.set (step_02, {
      id: viaje.id,
      nombre: viaje.nombre,
      ultima_salida: salida_id
    });

    const step_03 = this.afs.collection ('Usuarios_Viajes_Programados').doc (data.dni).collection ('Viajes_Inscritos').doc (viaje.id).collection ('Salidas').doc (salida_id).ref;    
    batch.set (step_03, {
      id: salida_id,
      checked: true
    });

    return await batch.commit ();
  }


  /* Consultas hechas por Jose de los viajes programados */

  async addViajeroViajeProgramadoUsuarioV2 (viaje_id: string, salida_id: string, data: any) {
    let batch = this.afs.firestore.batch ();

    const step_01 = this.afs.collection ('Usuarios_Viajes_Programados').doc (data.dni).ref;
    batch.set (step_01, data);

    const step_02 = this.afs.collection ('Viajes_Programados').doc (viaje_id).collection ("Salidas").doc (salida_id).collection ('Viajeros').doc (data.dni).ref;
    batch.set (step_02, {
      nombre_completo: data.nombre_completo,
      dni: data.dni,
      checked: true,
      fecha_nacimiento: data.fecha_nacimiento,
      fecha_agregado: new Date ().toISOString (),
      correo: data.correo,
      telefono: data.telefono,
      esta_cola:false
    });

    return await batch.commit ();
  }

  async addViajeroViajeProgramadoV2 (viaje_id: string, salida_id: string, dni_viajero: string) {
    const usuario: any = await this.afs.collection ('Usuarios_Viajes_Programados').doc (dni_viajero).valueChanges ().pipe (first ()).toPromise ();
    console.log('este es el detalle del usuario',usuario);
    return this.afs.collection ('Viajes_Programados').doc (viaje_id).collection ("Salidas").doc (salida_id).collection ('Viajeros').doc (usuario.dni).set ({
        nombre_completo: usuario.nombre_completo,
        dni: usuario.dni,
        checked: true,
        fecha_nacimiento: usuario.fecha_nacimiento,
        fecha_agregado: new Date ().toISOString (),
        correo: usuario.correo,
        telefono: usuario.telefono,
        esta_cola:false
      });

  }

  getAllTiposViajesProgramados () {
    return this.afs.collection ('ViajesProgramados_Tipos').valueChanges ();
  }

  getViajesProgramadoXTipoID (id:string) {
    return  this.afs.collection ("Viajes_Programados", ref => ref.where('tipo.id', '==' , id).where('estado', '<=' , 1)).valueChanges();
  }

  getValidViajeProgramadoSalidaViajero (viaje_id: string, salida_id: string, dni: string) {
    return this.afs.collection ('Viajes_Programados').doc (viaje_id).collection ('Salidas').doc (salida_id).collection ('Viajeros').doc (dni).valueChanges ();
  }

  addIpUsuario (ip:String, nombre_completo:String) {
    return this.afs.collection ("Listados_Ip_Registros").doc (String(ip)).set ({
      ip: String(ip),
      nombre_completo: nombre_completo
    });
  }

  getIpUsuario (ip:String) {
    return this.afs.collection ("Listados_Ip_Registros").doc (String(ip)).valueChanges ();
  }

  getAgenciaById (id: string) {
    return this.afs.collection ('Agencias').doc (id).valueChanges ();
  }

  getAlojamientoById (id: string) {
    return this.afs.collection ('Alojamientos').doc (id).valueChanges ();
  }

  getRestauranteById (id: string) {
    return this.afs.collection ("Restaurantes").doc (id).valueChanges ();
  }

  getGuiaById (id: string) {
    return this.afs.collection ('Guias').doc (id).valueChanges ();
  }
}
