import { Component, OnInit } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators, FormArray } from '@angular/forms';

// Services
import { DatabaseService } from '../../../services/database.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-alojamiento',
  templateUrl: './registro-alojamiento.component.html',
  styleUrls: ['./registro-alojamiento.component.css']
})
export class RegistroAlojamientoComponent implements OnInit {
  form_seleccionado: string = '0';
  provincias: any [] = [];
  distritos: any [] = [];
  tipo_clasificaciones: any [] = [];
  modalidad_turismo: any [] = [];
  tipos_turismo: any [] = [];
  hospedaje_form: FormGroup;
  agencia_form: FormGroup;
  agencia_digital_form: FormGroup;
  personal: FormArray = new FormArray ([]);

  constructor (
    private database: DatabaseService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  agregar () {
    const group = new FormGroup ({
      anio_nacimiento: new FormControl ('', [Validators.required]),
      genero: new FormControl ('', [Validators.required])
    });

    this.personal.push (group);
  }

  eliminar_personal (index: number) {
    this.personal.removeAt (index);
  }

  ngOnInit () {
    this.hospedaje_form = new FormGroup ({
      registro_nuevo: new FormControl ('0', [Validators.required]),
      razon_social: new FormControl ('', [Validators.required]),
      ruc: new FormControl ('', [Validators.required]),
      nombre_comercial: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      pagina_web: new FormControl ('', [Validators.required]),
      correo: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
      provincia: new FormControl ('', [Validators.required]),
      distrito: new FormControl ('', [Validators.required]),
      representante_nombre: new FormControl ('', [Validators.required]),
      representante_tdoc: new FormControl ('', [Validators.required]),
      representante_ndoc: new FormControl ('', [Validators.required]),
      representante_telefono: new FormControl (''),
      representante_direccion: new FormControl (''),
      representante_correo: new FormControl (''),

      fecha_ins: new FormControl ('', [Validators.required]),
      fecha_exp: new FormControl ('', [Validators.required]),
      numero_certificado: new FormControl ('', [Validators.required]),

      req_min_inf_01: new FormControl (false, [Validators.required]),
      req_min_inf_02: new FormControl (false, [Validators.required]),
      req_min_inf_03: new FormControl (false, [Validators.required]),
      req_min_inf_04: new FormControl (false, [Validators.required]),
      req_min_inf_05: new FormControl (false, [Validators.required]),
      req_min_inf_06: new FormControl (false, [Validators.required]),
      req_min_inf_07: new FormControl (false, [Validators.required]),
      req_min_inf_08: new FormControl (false, [Validators.required]),
      req_min_inf_09: new FormControl (false, [Validators.required]),
      req_min_inf_10: new FormControl (false, [Validators.required]),

      req_min_eqp_01: new FormControl (false, [Validators.required]),
      req_min_eqp_02: new FormControl (false, [Validators.required]),
      req_min_eqp_03: new FormControl (false, [Validators.required]),

      req_min_srv_01: new FormControl (false, [Validators.required]),
      req_min_srv_02: new FormControl (false, [Validators.required]),
      req_min_srv_03: new FormControl (false, [Validators.required]),

      numero_habitaciones: new FormControl ('', [Validators.required]),
      numero_camas: new FormControl ('', [Validators.required]),
      numero_pisos: new FormControl ('', [Validators.required]),
      numero_personal: new FormControl ('', [Validators.required]),
      ingreso_diferenciado: new FormControl ('', [Validators.required]),
      nro_banios_privados: new FormControl ('', [Validators.required]),
      nro_banios_comunes: new FormControl ('', [Validators.required])
    });

    this.database.getProvincias ().subscribe ((response: any []) => {
      this.provincias = response;
    });

    this.database.getAgenciaTipo_Clasificaciones ().subscribe ((response: any []) => {
      this.tipo_clasificaciones = response;
    });

    this.database.getModalidad_Turismo ().subscribe ((response: any []) => {
      this.modalidad_turismo = response;
    });

    this.database.getTipos_Turismo ().subscribe ((res: any []) => {
      this.tipos_turismo = res;
    });

    this.agregar ();
  }

  provinciaChanged (event: any) {
    console.log (event);
    if (event !== null || event !== undefined) {
      // this.esta_distritos_cargando = true;
      console.log (event);
      this.database.getDistritosByProvincias (event.id).subscribe ((response: any []) => {
        this.distritos = response;
      }, (error: any) => {
        console.log ('getDistritosByProvincias', error);
      });
    }
  }

  submit () {
    this.spinner.show ();

    console.log (this.hospedaje_form);
    console.log (this.hospedaje_form.value);
    let data: any = this.hospedaje_form.value;
    data.aprobado = false;
    data.fecha_exp = new Date (data.fecha_exp).toISOString ();
    data.fecha_ins = new Date (data.fecha_ins).toISOString ();
    data.fecha_solicitud = new Date ().toISOString ();

    console.log (data);

    this.database.addHotel (data)
    .then (() => {
      this.spinner.hide ();
      this.hospedaje_form.reset ();
      console.log ('Datos enviados');
      this.router.navigate (["/registro-finalizado"]);
    }).catch ((error: any) => {
      this.spinner.hide ();
      console.log ("Error addHotel", error);
    });
  }

  tipo_persona_change (event: any) {
    console.log (event);
    if (event === '0') {
      this.agencia_form.controls ['representante_razon_social'].setValidators ([Validators.required]);
      this.agencia_form.controls ['representante_nombre'].setValidators ([]);
    } else {
      this.agencia_form.controls ['representante_razon_social'].setValidators ([]);
      this.agencia_form.controls ['representante_nombre'].setValidators ([Validators.required]);
    }
  }
}
