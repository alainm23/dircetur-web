import { Component, OnInit } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators } from '@angular/forms';

// Services
import { DatabaseService } from '../../../services/database.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-agencia',
  templateUrl: './registro-agencia.component.html',
  styleUrls: ['./registro-agencia.component.css']
})
export class RegistroAgenciaComponent implements OnInit {
  form_seleccionado: string = '0';
  provincias: any [] = [];
  distritos: any [] = [];
  tipo_clasificaciones: any [] = [];
  modalidad_turismo: any [] = [];
  tipos_turismo: any [] = [];
  hospedaje_form: FormGroup;
  agencia_form: FormGroup;
  agencia_digital_form: FormGroup;
  personal: any [] = [{
    id: this.database.createId (),
    anio_nacimiento: '',
    genero: ''
  }];

  constructor (
    private database: DatabaseService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
  }

  agregar () {
    this.personal.push ({
      id: this.database.createId (),
      anio_nacimiento: '',
      genero: ''
    });
  }

  eliminar_personal (item: any) {
    for (var i = 0; i < this.personal.length; i++) {
      if (this.personal [i].id === item.id) {
        this.personal.splice (i, 1);
      }
    }
  }

  ngOnInit () {
    this.agencia_form = new FormGroup ({
      razon_social: new FormControl (''),
      canal_digital: new FormControl ('0', [Validators.required]),
      ruc: new FormControl ('', [Validators.required]),
      nombre_comercial: new FormControl ('', Validators.required),
      direccion: new FormControl ('', Validators.required),
      telefono: new FormControl ('', Validators.required),
      pagina_web: new FormControl ('', Validators.required),
      correo: new FormControl ('', Validators.required),
      cuentas_redes_sociales: new FormControl ('', Validators.required),
      provincia: new FormControl ('', Validators.required),
      distrito: new FormControl ('', Validators.required),
      clasificacion: new FormControl ('', Validators.required),
      representante_nombre: new FormControl ('', Validators.required),
      representante_razon_social: new FormControl (''),
      representante_ruc: new FormControl (''),
      representante_tdoc: new FormControl ('', Validators.required),
      representante_ndoc: new FormControl ('', Validators.required),
      representante_telefono: new FormControl (''),
      representante_direccion: new FormControl (''),
      representante_correo: new FormControl (''),
      representante_departamento: new FormControl ('', Validators.required),
      representante_tipo: new FormControl ('0', Validators.required),

      cond_min_ps_01: new FormControl (false),
      cond_min_ps_02: new FormControl (false),
      cond_min_ps_03: new FormControl (false),
      cond_min_ps_04: new FormControl (false),
      cond_min_ps_05: new FormControl (false),
      cond_min_ps_06: new FormControl (false),
      cond_min_ps_07: new FormControl (false),
      cond_min_ps_08: new FormControl (false),
      cond_min_ps_09: new FormControl (false),

      cond_min_cd_01: new FormControl (false),
      cond_min_cd_02: new FormControl (false),
      cond_min_cd_03: new FormControl (false),
      cond_min_cd_04: new FormControl (false),
      cond_min_cd_05: new FormControl (false),
      cond_min_cd_06: new FormControl (false),
      cond_min_cd_07: new FormControl (false),
      cond_min_cd_08: new FormControl (false),
      cond_min_cd_09: new FormControl (false),
      cond_min_cd_10: new FormControl (false),
      cond_min_cd_11: new FormControl (false),
      cond_min_cd_12: new FormControl (false),

      fecha_ins: new FormControl (''),
      fecha_exp: new FormControl (''),
      numero_certificado: new FormControl (''),

      total_personal_calificado: new FormControl ('', [Validators.required])
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
  }

  radioChange () {
    this.personal = [{
      id: this.database.createId (),
      anio_nacimiento: '',
      genero: ''
    }];
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
    console.log (this.agencia_form.value);

    let data: any = this.agencia_form.value;
    data.aprobado = false;
    data.fecha_exp = new Date (data.fecha_exp).toISOString ();
    data.fecha_ins = new Date (data.fecha_ins).toISOString ();
    data.fecha_solicitud = new Date ().toISOString ();
    data.personal = this.personal;
    data.modalidad_turismo = this.modalidad_turismo.filter ((x: any) => {
      return x.checked === true;
    });

    data.tipos_turismo = this.tipos_turismo.filter ((x: any) => {
      return x.checked === true;
    });

    console.log (data);
    this.database.addAgencia (data)
      .then (() => {
        this.agencia_form.reset ();
        this.personal = [];
        console.log ('Datos enviados');
        this.router.navigate (["/registro-finalizado"]);
        this.spinner.hide ();
        console.log ('Datos enviados');
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
