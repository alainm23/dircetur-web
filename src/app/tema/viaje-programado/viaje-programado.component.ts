import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { UtilsService } from '../../services/utils.service';
import { FormBuilder, FormGroup , FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ViajeProgramadoDialogComponent } from '../../dialogs/viaje-programado/viaje-programado-dialog.component';
import { HttpClient } from '@angular/common/http';
import { ImagenUbigeoComponent } from 'src/app/dialogs/imagen-ubigeo/imagen-ubigeo.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-viaje-programado',
  templateUrl: './viaje-programado.component.html',
  styleUrls: ['./viaje-programado.component.css']
})
export class ViajeProgramadoComponent implements OnInit {
detalle: any;
info_principal: any;
salida: any=null;
sus: any;
sus2: any;
sus3: any;
sus4: any;
sus5: any;
validar_ip: any;
/* IDIOMA */
etiquetas: any;
imagenes: any;
/* END */
form: FormGroup;
form_ubigeo: FormGroup;
permiso: boolean=false;
user_sancionado_estado: boolean=false;
msj_alerta_estado: boolean=false;
msj_alerta: string;
ultimo_dni: string;
id_salida: any;
id_viaje_programado: any;
enviar: boolean=false;
estado_form_validar: number = 1;
detalle_salida: any;
nombre_completo_user_ip: string;
fecha_actual: String = moment().format('L');
/*
fecha_actual: String = moment().format('L');
fecha_local_storage: any = null;
estado_validar: string = 'false';
*/
ipAddress_actual:any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    public utils: UtilsService,
    private dialog: MatDialog,
    public http: HttpClient,
    public fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { 
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('viaje_programador_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   });
   this.http.get<{ip:string}>('https://jsonip.com')
    .subscribe( (data: any) => {
      console.log('Info Ip Usuario=', data);
      this.ipAddress_actual = data.ip;
      console.log('Esta es la ip de su red=', this.ipAddress_actual);
      

      this.validar_ip = this.db.getIpUsuario(String(this.ipAddress_actual)).subscribe((consulta:any)=>{
        console.log("informacion consulta ip usuario=",consulta);
        if (consulta!=null || consulta!=undefined)
        {
          // No puede registrarse
          this.estado_form_validar=3;
          this.permiso=false;
          console.log('Estimado Ciudadano, Ya se encuentra registrado en un viaje programado.');
          this.nombre_completo_user_ip=consulta.nombre_completo;
          this.msj_alerta_estado=true;
          this.msj_alerta="Ya se encuentra registrado en un viaje programado.";
        }
        else
        {
          this.estado_form_validar=1;
          this.msj_alerta_estado=false;
        }
      });

      
    });
    
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

  /* Formularios */
  this.form = this.fb.group ({
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
  });

  this.form_ubigeo = this.fb.group ({
    ubigeo: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
  });
  
  /* Idioma */

  this.utils.ElIdioma = localStorage.getItem("idioma");

  if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
    this.utils.ElIdioma = 'es';
  }

  this.sus=this.db.getPaginaWebEtiquetas ('viaje_programador_' + this.utils.ElIdioma).subscribe ((res) => {
    this.etiquetas = res;
  });

  this.sus2=this.db.getPaginaWebEtiquetas ('viaje_programador').subscribe ((res) => {
    this.imagenes = res;
  });

  /* Capturamos el id */
  this.activatedRoute.params.subscribe( params =>{
    this.id_viaje_programado=params['id'];
  
    this.sus3=this.db.getViajeProgramadoByKey(params['id']).subscribe((info:any)=>{
      this.info_principal=info;

    });

    this.sus4=this.db.getDetalleViajeProgramado(params['id']).subscribe((res:any)=>{
    this.detalle=res;

    $(document).ready(function() {
      $(".accordion-titulo").click(function(e){
        e.preventDefault();
        var contenido=$(this).next(".accordion-content");
        if(contenido.css("display")=="none"){ //open    
          contenido.slideDown(0);     
          $(this).addClass("open");
        }
        else{ //close   
          contenido.slideUp(0);
          $(this).removeClass("open");  
        }
        });
    });
    this.init();
    console.log('Este es el detalle del viaje programado:',this.detalle);
    });
  
  this.sus5=this.db.getViajeProgramadoSalidas(params['id']).subscribe( (data:any) => 
    {
      this.salida=data[0];
      this.id_salida=data[0].id;
      console.log('Este es el id de la salida seleccionada por el componente:',this.id_salida);
    });

  });
  /*
    this.fecha_local_storage = localStorage.getItem('validar');
    this.estado_validar = localStorage.getItem('estado_validar');
  */

  }

  validarUbigeo () {
    /** spinner starts on init */
    this.spinner.show();
    let ubigeo:string=String(this.form_ubigeo.value.ubigeo);
    console.log('Este es el ubigueo=',ubigeo);
    let primer_grupo:number=Number(ubigeo.substring(0, 1));
    if (primer_grupo!=7)
    {
      this.msj_alerta_estado=true;
      this.msj_alerta="Este servicio es exclusivo para Cusqueños.";
      setTimeout(() => {
        /** spinner ends after 2 seconds */
        this.spinner.hide();
      }, 2000);
    }
    else
    {
      
      if (this.info_principal.tipo.nombre=="Soy de la ciudad")
      {
        let segundo_grupo:number=Number(ubigeo.substring(2, 3));
        /* De la ciudad */
        if (segundo_grupo==1)
        {
          /* Pasa la validacion */
          this.msj_alerta_estado=false;
          this.estado_form_validar=2;
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
        else
        {
          /* No pasa la validacion */
          this.msj_alerta_estado=true;
          this.msj_alerta="Este servicio es exclusivo para la Provincia de Cusco.";
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
      } 
      else if (this.info_principal.tipo.nombre=="Soy comunitario")
      {
        let segundo_grupo:number=Number(ubigeo.substring(2, 3));
        /* De la Comunidad */
        if (segundo_grupo!=1)
        {
          /* Pasa la validacion */
          this.msj_alerta_estado=false;
          this.estado_form_validar=2;
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
        else
        {
          /* No pasa la validacion */
          this.msj_alerta_estado=true;
          this.msj_alerta="Lo sentimos, este servicio esta solo habilitado para usuarios cuyo ubigeo corresponda a provincias internas y comunidades de Cusco.";
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
      }
    }
  }

  verUbigeo () {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '500px';
    dialogConfig.width = '600px';
    
    this.dialog.open(ImagenUbigeoComponent, dialogConfig);

  }
  
  async validarDni () {
    /** spinner starts on init */
    this.spinner.show();
    let dni:any=this.form.value.dni;
    if (dni==null || dni==undefined || dni=='')
    {
      //this.toastr.warning('Debe ingresar su Dni.', 'Estimado Ciudadano');
      this.msj_alerta_estado=true;
      this.msj_alerta="Estimado Usuario, Debe ingresar su Dni.";
    }
    else
    {
      this.msj_alerta_estado=false;
      this.user_sancionado_estado=false;
      this.ultimo_dni=String(dni);
      console.log("Este es el Dni=",dni);  
    
      /* Validacion 1= Validamos si tenemos registrado el usuario */
      const usuario: any = await this.db.getUsuarioViajeProgramado (this.ultimo_dni).pipe (first ()).toPromise ();
      if(usuario!=null || usuario!=undefined)
      {
        /* Validacion 2= Que el usuario no posea una sancion activa */

        if(usuario.estado==false)
        {
          /* Tiene una sanción activa */
          this.permiso=false;
          console.log('Usted posee una sanción activa.');
          //this.toastr.error('Usted posee una sanción activa.', 'Estimado Ciudadano');
          this.user_sancionado_estado=true;
          this.nombre_completo_user_ip=usuario.nombre_completo;
          this.msj_alerta_estado=true;
          this.msj_alerta="Actualmente usted tiene una sanción vigente, por favor dirijase a la oficina de DIRCETUR ubicado en Plaza Túpac Amaru Mz. Lote 2, para presentar su descargo.";
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
        else
        {
          /* No tiene ninguna sanción activa */

          /* Validacion 3= Que el usuario no tenga mas de 2 viajes programado en sus ultimos 6 meses */

          if (usuario.nro_viajes>=2)
          {
            /* No paso la validacion */
            this.permiso=false;
            this.user_sancionado_estado=true;
            this.nombre_completo_user_ip=usuario.nombre_completo;
            this.msj_alerta_estado=true;
            this.msj_alerta="Estimado Usuario, Usted ya alcanzo el limite de viajes permitidos.";
            setTimeout(() => {
              /** spinner ends after 2 seconds */
              this.spinner.hide();
            }, 2000);
          }
          else 
          {
            /* Paso la validacion */

            /* Validacion 4= Tambien tenemos que validar que ya no este registrado en este viaje programado */
                              
            const validar: any = await this.db.getValidViajeUsuarioViajeProgramado (this.ultimo_dni, this.id_viaje_programado).pipe (first ()).toPromise ();

            if(validar==null || validar==undefined)
            {
              if (this.id_salida!=null || this.id_salida!=undefined)
              {
                /* Validacion 5= Que no este registrado en esta salida */
                
                const validacion_ultima: any = await this.db.getValidViajeProgramadoSalidaViajero (this.id_viaje_programado, this.id_salida, this.ultimo_dni).pipe (first ()).toPromise ();
                
                if (validacion_ultima==null || validacion_ultima==undefined)
                {
                  /* Paso la validacion */
                  this.permiso=false;
                
                  console.log('Usted puede registrarse en el viaje programado.');
                  //this.toastr.success('Usted puede registrarse en el viaje programado.', 'Estimado Ciudadano');
  
                  const dialogConfig = new MatDialogConfig();
                  dialogConfig.disableClose = true;
                  dialogConfig.autoFocus = true;
                  dialogConfig.height = '450px';
                  dialogConfig.width = '600px';
                  dialogConfig.data = {
                      mostrar_termino: 1,
                      mostrar_form_registro: 0,
                      id_salida: this.id_salida,
                      id_viaje_programado: this.id_viaje_programado,
                      dni: this.ultimo_dni,
                      nombre_completo: usuario.nombre_completo
                  };
                  this.dialog.open(ViajeProgramadoDialogComponent, dialogConfig);
  
                  this.form_ubigeo.reset ();
                  this.form.reset ();
  
                  setTimeout(() => {
                    /** spinner ends after 2 seconds */
                    this.spinner.hide();
                  }, 2000);
                }
                else
                {
                  /* No paso la validacion */
                  this.permiso=false;
                  console.log('Usted ya esta registrado en este Viaje Programado.');
                  
                  this.user_sancionado_estado=true;
                  this.nombre_completo_user_ip=usuario.nombre_completo;
                  this.msj_alerta_estado=true;
                  this.msj_alerta="Estimado Usuario, Usted ya esta registrado en este Viaje Programado.";
                  setTimeout(() => {
                    /** spinner ends after 2 seconds */
                    this.spinner.hide();
                  }, 2000);
                }
                
              }
              else
              {
                console.log('Debe seleccionar una salida.');
                //this.toastr.warning('Debe seleccionar una salida programada.', 'Estimado Ciudadano');
                this.msj_alerta_estado=true;
                this.msj_alerta="Estimado Usuario, Debe seleccionar una salida programada.";
                setTimeout(() => {
                  /** spinner ends after 2 seconds */
                  this.spinner.hide();
                }, 2000);
              }
            }
            else
            {
              console.log ("Estimado Usuario, Usted ya se encuentra registrado en una salida de este viaje programado.");
              /* No paso la validacion */
              this.permiso=false;
              this.user_sancionado_estado=true;
              this.nombre_completo_user_ip=usuario.nombre_completo;
              this.msj_alerta_estado=true;
              this.msj_alerta="Estimado Usuario, Usted ya participo en este Viaje el "+this.FormatFechaMensaje(validar.ultima_salida)+".";
              setTimeout(() => {
                /** spinner ends after 2 seconds */
                this.spinner.hide();
              }, 2000);
            }
          }
        }
      }
      else 
      {
        /* El usuario no se encuentra registrado puede registrarse*/

        if (this.id_salida!=null || this.id_salida!=undefined)
        {
          this.permiso=false;
          
          console.log('Usted puede registrarse en el viaje programado.');
          //this.toastr.success('Usted puede registrarse en el viaje programado.', 'Estimado Ciudadano');

          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.height = '450px';
          dialogConfig.width = '600px';
          dialogConfig.data = {
              mostrar_termino: 1,
              mostrar_form_registro: 1,
              id_salida: this.id_salida,
              id_viaje_programado: this.id_viaje_programado,
              dni: this.ultimo_dni,
              nombre_completo: 'vacio'
          };
          this.dialog.open(ViajeProgramadoDialogComponent, dialogConfig);

          this.form_ubigeo.reset ();
          this.form.reset ();

          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
        else
        {
          console.log('Debe seleccionar una salida.');
          //this.toastr.warning('Debe seleccionar una salida programada.', 'Estimado Ciudadano');
          this.msj_alerta_estado=true;
          this.msj_alerta="Estimado Usuario, Debe seleccionar una salida programada.";
          setTimeout(() => {
            /** spinner ends after 2 seconds */
            this.spinner.hide();
          }, 2000);
        }
      }
    }
  }

  ObtenerDia (fecha:any) {
    return moment(fecha).format('dddd');
  }
  
  FormatFecha (fecha:any) {
    return moment(fecha).format('L');
  }

  FormatFechaMensaje (fecha:any) {
    return moment(fecha).format('LL');
  }

  ngOnDestroy() {
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

    if (this.validar_ip !== null && this.validar_ip !== undefined) {
      this.validar_ip.unsubscribe ();
    }
    
  }

}
