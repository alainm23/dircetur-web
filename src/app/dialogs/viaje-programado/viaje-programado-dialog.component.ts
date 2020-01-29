import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-viaje-programado-dialog',
  templateUrl: './viaje-programado-dialog.component.html',
  styleUrls: ['./viaje-programado-dialog.component.css']
})
export class ViajeProgramadoDialogComponent implements OnInit {
mostrar_termino: number;
mostrar_form_registro: number;
id_salida: string;
id_viaje_programado: string;
nombre_completo: string;
dni: string;
estado_termino: boolean = false;
estado_boton: boolean = true;
parte_dialogo: number = 1;
formreg: FormGroup;
enviar: boolean = false;
/*
fecha_actual: String = moment().format('L');
fecha_local_storage: any = null;
estado_validar: string = 'false';
*/
ipAddress_actual:any;
  constructor(public db:DatabaseService,
              private toastr: ToastrService,
              public http: HttpClient,
              private dialogRef: MatDialogRef<ViajeProgramadoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) { 
                this.mostrar_termino = data.mostrar_termino;
                this.mostrar_form_registro = data.mostrar_form_registro;
                this.id_salida = data.id_salida;
                this.dni = data.dni;
                this.id_viaje_programado = data.id_viaje_programado;
                this.nombre_completo = data.nombre_completo;

                this.http.get<{ip:string}>('https://jsonip.com')
                .subscribe( (data: any) => {
                  console.log('Info Ip Usuario=', data);
                  this.ipAddress_actual = data.ip;
                  console.log('Esta es la ip de su red=', this.ipAddress_actual);
                });

              }

  ngOnInit() {
    this.formreg = new FormGroup ({
    nombre_completo: new FormControl ('', Validators.required),
    correo: new FormControl ('',  [Validators.required, Validators.email]),
    telefono: new FormControl ('', Validators.required),
    fecha_nacimiento: new FormControl ('', Validators.required),
    genero: new FormControl ('Masculino', Validators.required),
    ocupacion: new FormControl ('')
  });

  /*this.fecha_local_storage = localStorage.getItem('validar');
  this.estado_validar = localStorage.getItem('estado_validar');*/
  }

  close() {
    this.dialogRef.close();
  }

  AceptoTC () {
    this.estado_termino=!this.estado_termino;
    if (this.estado_termino==true)
    {
      this.estado_boton=false;
    }
    else
    {
      this.estado_boton=true;
    }
  }

  ValidarBoton () {
    if (this.mostrar_form_registro==0)
    {
      console.log('El usuario ya existe');
      /* si existe no lo creamos y lo guardamos en viajeros del viaje programado */

      // validar variables LocalStorage
     /* console.log('fecha actual=', this.fecha_actual,'fecha local storage', this.fecha_local_storage,'estado validar', this.estado_validar);
      
      if (this.fecha_actual==this.fecha_local_storage && this.estado_validar=='true')
      {
        // No puede registrarse
        this.toastr.error('No puede registrarse en este viaje programado.', 'Estimado Ciudadano');
        this.dialogRef.close();
      }
      else
      {*/
        // add la ip del usuario en una coleccion de ip
        this.db.addIpUsuario (String(this.ipAddress_actual), this.nombre_completo)
        .then (() => {

          this.db.addViajeroViajeProgramadoV2 (this.id_viaje_programado, this.id_salida, this.dni)
          .then (() => {
            this.toastr.success('Se ha registrado con éxito en la salidad seleccionada', 'Estimado Ciudadano');
            localStorage.setItem('validar', String(moment().format('L')));
            localStorage.setItem('estado_validar', 'true');
            this.dialogRef.close();
          })
          .catch ((error) => {
            console.log('error detalle',error);
          });
          
        })
        .catch ((error) => {
          console.log('error IP detalle',error);
        });
      /*}*/
    } else if (this.mostrar_form_registro==1)
    {
      this.parte_dialogo=2;
    }
  }

  async registrarViaje () {
    // Validamos el formulario de registro 
    if (this.formreg.invalid) {
      this.toastr.warning('Todos los campos del formulario son requeridos.', 'Estimado Ciudadano');
      this.enviar = false;
      return;
    }
    else
    {
      this.enviar = true;
    }

    if(this.enviar==true)
    {
     /* si no existe el usuario lo creamos y lo guardamos en viajeros */ 

    // validar variables LocalStorage
   /* console.log('fecha actual=', this.fecha_actual,'fecha local storage', this.fecha_local_storage,'estado validar', this.estado_validar);
      
    if (this.fecha_actual==this.fecha_local_storage && this.estado_validar=='true')
    {
      // No puede registrarse
      this.toastr.error('No puede registrarse en este viaje programado.', 'Estimado Ciudadano');
      this.dialogRef.close();
    }
    else
    {*/
      // add la ip del usuario en una coleccion de ip
      this.db.addIpUsuario (String(this.ipAddress_actual), this.formreg.value.nombre_completo)
      .then (() => {
        let data : any =  {
          dni: this.dni,
          nombre_completo: this.formreg.value.nombre_completo,
          correo: this.formreg.value.correo,
          telefono: this.formreg.value.telefono,
          fecha_nacimiento: this.formreg.value.fecha_nacimiento,
          genero: this.formreg.value.genero,
          ocupacion: this.formreg.value.ocupacion,
          estado: true,
          nro_viajes: 0
        };
        this.db.addViajeroViajeProgramadoUsuarioV2 (this.id_viaje_programado, this.id_salida, data)
        .then (() => {
          this.toastr.success('Se ha registrado con éxito en la salidad seleccionada', 'Estimado Ciudadano');
          localStorage.setItem('validar', String(moment().format('L')));
          localStorage.setItem('estado_validar', 'true');
          this.dialogRef.close();
        })
        .catch ((error) => {
          console.log('error detalle',error);
        });
        
      })
      .catch ((error) => {
        console.log('error IP detalle',error);
      });
    /*}*/
    }  
  }
}
