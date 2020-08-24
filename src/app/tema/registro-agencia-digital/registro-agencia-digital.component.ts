import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators, FormArray } from '@angular/forms';

// Services
import { DatabaseService } from '../../../services/database.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-registro-agencia-digital',
  templateUrl: './registro-agencia-digital.component.html',
  styleUrls: ['./registro-agencia-digital.component.css']
})
export class RegistroAgenciaDigitalComponent implements OnInit {
  @ViewChild ('pdf', {static: false}) pdf: ElementRef;
  finalizado: boolean = false;
  form_seleccionado: string = '0';
  provincias: any [] = [];
  distritos: any [] = [];
  tipo_clasificaciones: any [] = [];
  modalidad_turismo: any [] = [];
  tipos_turismo: any [] = [];
  hospedaje_form: FormGroup;
  agencia_form: FormGroup;
  agencia_digital_form: FormGroup;
  form_01: FormGroup;
  form_02: FormGroup;
  form_03: FormGroup;
  form_04: FormGroup;
  form_05: FormGroup;
  form_06: FormGroup;
  form_08: FormGroup;
  personal: FormArray = new FormArray ([]);
  vista: number = 1;
  constructor (
    private database: DatabaseService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
  }

  cambiar_vista (value: number) {
    this.vista += value;
    window.scroll (0,0);
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


  tipo_persona_change (event: any) {
    if (event === '0') {
      this.form_01.controls ['representante_nombre'].setValidators ([Validators.required]);
      this.form_01.controls ['representante_razon_social'].setValidators ([]);
    } else {
      this.form_01.controls ['representante_razon_social'].setValidators ([Validators.required]);
      this.form_01.controls ['representante_nombre'].setValidators ([]);
    }

    this.form_01.controls ['representante_razon_social'].updateValueAndValidity ();
    this.form_01.controls ['representante_nombre'].updateValueAndValidity ();
  }

  ngOnInit () {
    this.form_01 = new FormGroup ({
      representante_tipo: new FormControl ('0'),
      representante_razon_social: new FormControl (''),
      representante_nombre: new FormControl ('', [Validators.required]),
      representante_ruc: new FormControl ('', [Validators.required]),
      representante_direccion: new FormControl ('', [Validators.required]),
      representante_departamento: new FormControl ('', [Validators.required]),
      representante_tdoc: new FormControl ('', [Validators.required]),
      representante_ndoc: new FormControl ('', [Validators.required]),
    });

    this.form_02 = new FormGroup ({
      nombre_comercial: new FormControl ('', [Validators.required]),
      provincia: new FormControl ('', [Validators.required]),
      distrito: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
      telefono_fijo: new FormControl (''),
      pagina_web: new FormControl ('', [Validators.required]),
      correo: new FormControl ('', [Validators.required]),
      cuentas_redes_sociales: new FormControl ('', [Validators.required]),
      fecha_ins: new FormControl ('', [Validators.required])
    });

    this.form_03 = new FormGroup ({
      canal_digital: new FormControl ('1', [Validators.required]),
      canales_opera: new FormControl (''),
      cond_min_cd_01: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_02: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_03: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_04: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_05: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_06: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_07: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_08: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_09: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_10: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_11: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_cd_12: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
    });

    this.form_04 = new FormGroup ({
      clasificacion: new FormControl ('', [Validators.required]),
    });

    this.form_06 = new FormGroup ({
      asociacion_turismo: new FormControl (''),
      clasificacion_calidad: new FormControl (''),
      trans_terres: new FormControl (''),
      trans_acuatico: new FormControl (''),
      trans_arere: new FormControl (''),
      nro_unidades_sericio: new FormControl (''),
      nro_placas_transporte: new FormControl (''),
      declaraciones_jurada: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
    });

    this.agencia_form = new FormGroup ({
      registro_nuevo: new FormControl ('0'),
      razon_social: new FormControl (''),
      canales_opera: new FormControl (''),
      canal_digital: new FormControl ('1'),
      ruc: new FormControl (''),
      nombre_comercial: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
      telefono_fijo: new FormControl (''),
      pagina_web: new FormControl ('', [Validators.required]),
      correo: new FormControl ('', [Validators.required]),
      cuentas_redes_sociales: new FormControl ('', [Validators.required]),
      provincia: new FormControl ('', [Validators.required]),
      distrito: new FormControl ('', [Validators.required]),
      clasificacion: new FormControl ('', [Validators.required]),
      representante_nombre: new FormControl ('', [Validators.required]),
      representante_razon_social: new FormControl (''),
      representante_ruc: new FormControl ('', [Validators.required]),
      representante_tdoc: new FormControl ('', [Validators.required]),
      representante_ndoc: new FormControl ('', [Validators.required]),
      representante_telefono: new FormControl (''),
      representante_direccion: new FormControl ('', [Validators.required]),
      representante_correo: new FormControl (''),
      representante_departamento: new FormControl ('', [Validators.required]),
      representante_tipo: new FormControl ('0'),
      cantidad_equipos_computo: new FormControl (0),
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

      asociacion_turismo: new FormControl (''),
      clasificacion_calidad: new FormControl (''),
      trans_terres: new FormControl (false),
      trans_acuatico: new FormControl (false),
      trans_arere: new FormControl (false),
      nro_unidades_sericio: new FormControl (''),
      nro_placas_transporte: new FormControl (''),

      fecha_ins: new FormControl (''),
      numero_certificado: new FormControl (''),

      total_personal_calificado: new FormControl ('', [Validators.required]),
      declaraciones_jurada: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')]))
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

  equipo_computo_change (event: any) {
    if (this.form_04.value.cond_min_ps_04) {
      this.form_04.controls ['cantidad_equipos_computo'].setValidators ([Validators.required]);
    } else {
      this.form_04.controls ['cantidad_equipos_computo'].setValidators ([]);
    }

    this.form_04.controls ['cantidad_equipos_computo'].updateValueAndValidity ();
  }

  provinciaChanged (event: any) {
    if (event !== null || event !== undefined) {
      this.database.getDistritosByProvincias (event.id).subscribe ((response: any []) => {
        this.distritos = response;
      }, (error: any) => {
        console.log ('getDistritosByProvincias', error);
      });
    }
  }

  submit () {
    this.finalizado = true;
    this.spinner.show ();

    window.scroll (0,0);

    this.agencia_form.patchValue (this.form_01.value);
    this.agencia_form.patchValue (this.form_02.value);
    this.agencia_form.patchValue (this.form_03.value);
    this.agencia_form.patchValue (this.form_04.value);
    this.agencia_form.patchValue (this.form_06.value);

    let data: any = this.agencia_form.value;
    data.solo_digital = true;
    data.id = this.database.createId ();
    data.aprobado = false;
    data.fecha_ins = new Date (data.fecha_ins).toISOString ();
    data.fecha_solicitud = new Date ().toISOString ();
    data.personal = this.personal.value;
    data.modalidad_turismo = this.modalidad_turismo.filter ((x: any) => {
      return x.checked === true;
    });

    data.tipos_turismo = this.tipos_turismo.filter ((x: any) => {
      return x.checked === true;
    });

    this.database.addAgencia (data)
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

  validar_form () {
    return this.personal.status === 'INVALID';
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
}
