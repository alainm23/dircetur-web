import { Component, OnInit } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators, FormArray } from '@angular/forms';

// Services
import { DatabaseService } from '../../../services/database.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
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

  finalizado: boolean = false;
  vista: number = 1;
  form_01: FormGroup;
  form_02: FormGroup;
  form_03: FormGroup;
  form_05: FormGroup;
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

  cambiar_vista (value: number) {
    this.vista += value;
    window.scroll (0,0);
  }

  change_tipo_registro (event: any) {
    if (event === '0') {
      this.form_01.controls ['fecha_exp'].setValidators ([]);
      this.form_01.controls ['numero_certificado'].setValidators ([]);

      this.form_02.controls ['fecha_exp'].setValidators ([Validators.required]);
      this.form_02.controls ['numero_certificado'].setValidators ([Validators.required]);
    } else {
      this.form_01.controls ['fecha_exp'].setValidators ([Validators.required]);
      this.form_01.controls ['numero_certificado'].setValidators ([Validators.required]);

      this.form_02.controls ['fecha_exp'].setValidators ([]);
      this.form_02.controls ['numero_certificado'].setValidators ([]);
    }

    this.form_01.controls ['fecha_exp'].updateValueAndValidity ();
    this.form_01.controls ['numero_certificado'].updateValueAndValidity ();

    this.form_02.controls ['fecha_exp'].updateValueAndValidity ();
    this.form_02.controls ['numero_certificado'].updateValueAndValidity ();
  }

  ngOnInit () {
    this.form_01 = new FormGroup ({
      registro_nuevo: new FormControl ('0'),
      fecha_exp: new FormControl (''),
      numero_certificado: new FormControl (''),
    });

    this.form_02 = new FormGroup ({
      razon_social: new FormControl ('', [Validators.required]),
      nombre_comercial: new FormControl ('', [Validators.required]),
      ruc: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      provincia: new FormControl ('', [Validators.required]),
      distrito: new FormControl ('', [Validators.required]),
      pagina_web: new FormControl (''),
      correo: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
      representante_nombre: new FormControl ('', [Validators.required]),
      representante_tdoc: new FormControl ('', [Validators.required]),
      representante_ndoc: new FormControl ('', [Validators.required]),
      fecha_ins: new FormControl ('', [Validators.required]),
      numero_certificado: new FormControl ('', [Validators.required]),
      fecha_exp: new FormControl ('', [Validators.required]),
    })

    this.form_03 = new FormGroup ({
      numero_habitaciones: new FormControl ('', [Validators.required]),
      ingreso_diferenciado: new FormControl ('', [Validators.required]),
      numero_pisos: new FormControl ('', [Validators.required]),
      numero_personal: new FormControl ('', [Validators.required]),
      numero_camas: new FormControl ('', [Validators.required]),
      nro_banios_privados: new FormControl (''),
      nro_banios_comunes: new FormControl (''),
      req_min_inf_01: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_02: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_03: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_04: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_05: new FormControl (false),
      req_min_inf_07: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_08: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_09: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_inf_10: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_eqp_01: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_eqp_02: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_eqp_03: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_srv_01: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_srv_02: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      req_min_srv_03: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')]))
    });

    this.form_05 = new FormGroup ({
      declaraciones_jurada: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
    })

    this.hospedaje_form = new FormGroup ({
      registro_nuevo: new FormControl ('0', [Validators.required]),
      razon_social: new FormControl ('', [Validators.required]),
      ruc: new FormControl ('', [Validators.required]),
      nombre_comercial: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      pagina_web: new FormControl (''),
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
      req_min_inf_05: new FormControl (false),
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
      nro_banios_privados: new FormControl (''),
      nro_banios_comunes: new FormControl (''),
      declaraciones_jurada: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
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

  async submit () {
    this.finalizado = true;
    await this.spinner.show ();
    window.scroll (0,0);

    this.hospedaje_form.patchValue (this.form_01.value);
    this.hospedaje_form.patchValue (this.form_02.value);
    this.hospedaje_form.patchValue (this.form_03.value);
    this.hospedaje_form.patchValue (this.form_05.value);

    let data: any = this.hospedaje_form.value;
    data.aprobado = false;
    data.fecha_exp = new Date (data.fecha_exp).toISOString ();
    data.fecha_ins = new Date (data.fecha_ins).toISOString ();
    data.fecha_solicitud = new Date ().toISOString ();
    data.personal = this.personal.value;

    console.log ('data para enviar', data);
    this.database.addHotel (data)
      .then (async () => {
        console.log ('data enviada');
        await this.spinner.hide ();
        this.export_pdf ();
        this.router.navigate (["/registro-finalizado", data.correo]);
      }).catch (async (error: any) => {
        await this.spinner.hide ();
        this.finalizado = false;
        console.log ("Error addAgencia", error);
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

  export_pdf () {
    let options: any = {
      margin: [2, 1, 2, 1],
      pagebreak: { mode: ['css', 'legacy'] },
      filename: 'Declaracion Jurada.pdf',
      image: { type: 'jpeg' },
      jsPDF: { unit: 'cm', format: 'letter', orientation: 'portrait' }
    };

    const content: Element = document.getElementById ('mypdf');
    html2pdf ().from (content).set (options).save ();
  }

  validar_form () {
    return this.personal.status === 'INVALID';
  }
}
