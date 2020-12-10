import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators, FormArray } from '@angular/forms';

// Services
import { DatabaseService } from '../../../services/database.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as html2pdf from 'html2pdf.js';
import { MatDialog } from '@angular/material';
import * as jsPDF from 'jspdf'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-registro-agencia',
  templateUrl: './registro-agencia.component.html',
  styleUrls: ['./registro-agencia.component.css']
})
export class RegistroAgenciaComponent implements OnInit {
  @ViewChild ('pdf', {static: false}) pdf: ElementRef;
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
  esta_validando: boolean = false;

  error_message: any;
  constructor (
    private database: DatabaseService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private storage: AngularFireStorage,
    private dialog: MatDialog
  ) {
  }

  cambiar_vista (value: number) {
    this.vista += value;
    window.scroll (0,0);
  }

  agregar () {
    const group = new FormGroup ({
      anio_nacimiento: new FormControl ('', [
        Validators.required, CustomValidators.date,
        CustomValidators.minDate ('1900-01-01'),
        CustomValidators.maxDate ('2050-01-01')]),
      genero: new FormControl ('', [Validators.required])
    });

    this.personal.push (group);
  }

  eliminar_personal (index: number) {
    this.personal.removeAt (index);
  }

  change_tipo_registro (event: any) {
    if (event === '0') {
      this.form_01.controls ['fecha_exp'].setValidators ([]);
      this.form_01.controls ['numero_constancia'].setValidators ([]);
    } else {
      this.form_01.controls ['fecha_exp'].setValidators ([
        Validators.required, CustomValidators.date,
        CustomValidators.minDate ('2000-01-01'),
        CustomValidators.maxDate ('2050-01-01')]
      );
      this.form_01.controls ['numero_constancia'].setValidators ([Validators.required]);
    }

    this.form_01.controls ['fecha_exp'].updateValueAndValidity ();
    this.form_01.controls ['numero_constancia'].updateValueAndValidity ();
  }

  change_canales_digitales (event: any) {
    if (event === '0') {
      this.form_05.controls ['canales_opera'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_01'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_02'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_03'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_04'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_05'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_06'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_07'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_08'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_09'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_10'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_11'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_12'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_13'].setValidators ([]);
      this.form_05.controls ['cond_min_cd_14'].setValidators ([]);
    } else {
      this.form_05.controls ['canales_opera'].setValidators ([Validators.required, Validators.max (20), Validators.min (1)]);
      this.form_05.controls ['cond_min_cd_01'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_02'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_03'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_04'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_05'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_06'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_07'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_08'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_09'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_10'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_11'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_12'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_13'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
      this.form_05.controls ['cond_min_cd_14'].setValidators (Validators.compose([ Validators.required, Validators.pattern('true')]));
    }

    this.form_05.controls ['canales_opera'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_01'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_02'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_03'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_04'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_05'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_06'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_07'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_08'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_09'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_10'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_11'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_12'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_13'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_14'].updateValueAndValidity ();
  }

  tipo_persona_change (event: any) {
    if (event === '0') {
      this.form_02.controls ['representante_nombre'].setValidators ([Validators.required]);
      this.form_02.controls ['representante_razon_social'].setValidators ([]);
    } else {
      this.form_02.controls ['representante_razon_social'].setValidators ([Validators.required]);
      this.form_02.controls ['representante_nombre'].setValidators ([]);
    }

    this.form_02.controls ['representante_razon_social'].updateValueAndValidity ();
    this.form_02.controls ['representante_nombre'].updateValueAndValidity ();
  }

  ngOnInit () {
    this.form_01 = new FormGroup ({
      registro_nuevo: new FormControl ('0'),
      fecha_exp: new FormControl (''),
      numero_constancia: new FormControl (''),
    });

    this.form_02 = new FormGroup ({
      representante_tipo: new FormControl ('0'),
      representante_razon_social: new FormControl (''),
      representante_nombre: new FormControl ('', [Validators.required]),
      representante_ruc: new FormControl ('', [
        Validators.required,
        Validators.minLength (11),
        Validators.maxLength (11),
        Validators.pattern("^[0-9]*$")]),
      representante_direccion: new FormControl ('', [Validators.required]),
      representante_tdoc: new FormControl ('', [Validators.required]),
      representante_ndoc: new FormControl ('', [Validators.required]),
      representante_region: new FormControl ('Cusco', [Validators.required]),
      representante_provincia: new FormControl ('', [Validators.required]),
      representante_distrito: new FormControl ('', [Validators.required])
    });

    const correo = new FormControl ('', Validators.required);
    const confir_correo = new FormControl ('', [Validators.required, CustomValidators.equalTo(correo)]);

    this.form_03 = new FormGroup ({
      nombre_comercial: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      provincia: new FormControl ('', [Validators.required]),
      distrito: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required, Validators.pattern("[0-9 ]{9}")]),
      telefono_fijo: new FormControl (''),
      pagina_web: new FormControl (''),
      correo: correo,
      confir_correo: confir_correo,
      cuentas_redes_sociales: new FormControl (''),
      fecha_ins: new FormControl ('', [
        Validators.required, CustomValidators.date,
        CustomValidators.minDate ('2000-01-01'),
        CustomValidators.maxDate ('2050-01-01')]),
      numero_certificado: new FormControl ('', [Validators.required]),
      fecha_exp: new FormControl ('', [
        Validators.required, CustomValidators.date,
        CustomValidators.minDate ('2000-01-01'),
        CustomValidators.maxDate ('2050-01-01')
      ]),
    });

    this.form_04 = new FormGroup ({
      cond_min_ps_01: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_02: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_03: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_04: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cantidad_equipos_computo: new FormControl ('', [Validators.required]),
      cond_min_ps_05: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_06: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_07: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_08: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      cond_min_ps_09: new FormControl (false, Validators.compose([ Validators.required, Validators.pattern('true')])),
      total_personal_calificado: new FormControl ('', [Validators.required])
    });

    this.form_05 = new FormGroup ({
      canal_digital: new FormControl ('0', [Validators.required]),
      canales_opera: new FormControl (''),
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
      cond_min_cd_13: new FormControl (false),
      cond_min_cd_14: new FormControl (false),
    });

    this.form_06 = new FormGroup ({
      clasificacion: new FormControl ('', [Validators.required]),
      turismo_aventura_certificado: new FormControl ('', [Validators.pattern ('^[0-9]+(-[0-9]+)?$')]),
    });

    this.form_08 = new FormGroup ({
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
      canal_digital: new FormControl ('0'),
      ruc: new FormControl (''),
      nombre_comercial: new FormControl ('', [Validators.required]),
      direccion: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
      telefono_fijo: new FormControl (''),
      pagina_web: new FormControl (''),
      correo: new FormControl ('', [Validators.required, Validators.email]),
      cuentas_redes_sociales: new FormControl (''),
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
      representante_tipo: new FormControl ('0'),
      cantidad_equipos_computo: new FormControl (0),
      representante_region: new FormControl ('', [Validators.required]),
      representante_provincia: new FormControl ('', [Validators.required]),
      representante_distrito: new FormControl ('', [Validators.required]),
      numero_constancia: new FormControl ('', [Validators.required]),
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
      cond_min_cd_13: new FormControl (false),
      cond_min_cd_14: new FormControl (false),

      asociacion_turismo: new FormControl (''),
      clasificacion_calidad: new FormControl (''),
      trans_terres: new FormControl (false),
      trans_acuatico: new FormControl (false),
      trans_arere: new FormControl (false),
      nro_unidades_sericio: new FormControl (''),
      nro_placas_transporte: new FormControl (''),
      turismo_aventura_certificado: new FormControl (''),

      fecha_ins: new FormControl (''),
      fecha_exp: new FormControl (''),
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

  equipo_computo_change () {
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

  async submit (dialog: any) {
    await this.spinner.show ();

    this.agencia_form.patchValue (this.form_01.value);
    this.agencia_form.patchValue (this.form_02.value);
    this.agencia_form.patchValue (this.form_03.value);
    this.agencia_form.patchValue (this.form_04.value);
    this.agencia_form.patchValue (this.form_05.value);
    this.agencia_form.patchValue (this.form_06.value);
    this.agencia_form.patchValue (this.form_08.value);

    if (this.form_01.value.registro_nuevo === '1') {
      this.agencia_form.controls ['fecha_exp'].setValue (this.form_01.value.fecha_exp);
    }

    let data: any = this.agencia_form.value;
    data.id = this.database.createId ();
    data.aprobado = false;
    data.representante_provincia = data.representante_provincia.nombre;
    data.representante_distrito = data.representante_distrito.nombre;

    if (data.fecha_exp !== '') {
      data.fecha_exp = new Date (data.fecha_exp).toISOString ();
    }

    if (data.fecha_ins !== '') {
      data.fecha_ins = new Date (data.fecha_ins).toISOString ();
    }

    data.fecha_solicitud = new Date ().toISOString ();
    data.personal = [];
    this.personal.value.forEach ((element: any) => {
      data.personal.push ({
        anio_nacimiento: new Date (element.anio_nacimiento).toISOString (),
        genero: element.genero
      });
    });

    data.modalidad_turismo = this.modalidad_turismo.filter ((x: any) => {
      return x.checked === true;
    });

    data.tipos_turismo = this.tipos_turismo.filter ((x: any) => {
      return x.checked === true;
    });

    console.log (data);

    this.database.addAgencia (data)
      .then (async () => {
        await this.spinner.hide ();
        this.g_declaracion_a_fisica (data);
        this.router.navigate (["/registro-finalizado", data.correo]);
      }).catch (async (error: any) => {
        await this.spinner.hide ();
        console.log ("Error addAgencia", error);
        this.error_message = error;
        this.dialog.open (dialog);
      });
  }

  validar_form () {
    return this.personal.status === 'INVALID';
  }

  async validar_correo (dialog: any) {
    this.esta_validando = true;
    if (await this.database.is_email_valid (this.form_03.value.correo) === undefined) {
      this.esta_validando = false;
      this.cambiar_vista (+1);
    } else {
      this.esta_validando = false;
      this.dialog.open (dialog);
    }
  }

  async validar_ruc (dialog: any) {
    this.esta_validando = true;
    if (await this.database.is_ruc_valid (this.form_02.value.representante_ruc) === undefined) {
      this.esta_validando = false;
      this.cambiar_vista (+1);
    } else {
      this.esta_validando = false;
      this.dialog.open (dialog);
    }
  }

  check_cd_value () {
    if (this.form_05.value.cond_min_cd_13 === false && this.form_05.value.cond_min_cd_14 === false) {
      this.form_05.controls ['cond_min_cd_13'].setValidators ([Validators.compose([ Validators.required, Validators.pattern('true')])]);
      this.form_05.controls ['cond_min_cd_14'].setValidators ([Validators.compose([ Validators.required, Validators.pattern('true')])]);
    } else if (this.form_05.value.cond_min_cd_13 === true && this.form_05.value.cond_min_cd_14 === false) {
      this.form_05.controls ['cond_min_cd_14'].setValidators ([]);
    } else if (this.form_05.value.cond_min_cd_14 === true && this.form_05.value.cond_min_cd_13 === false) {
      this.form_05.controls ['cond_min_cd_13'].setValidators ([]);
    }

    this.form_05.controls ['cond_min_cd_13'].updateValueAndValidity ();
    this.form_05.controls ['cond_min_cd_14'].updateValueAndValidity ();
  }

  check_ps_value () {
    if (this.form_04.value.cond_min_ps_08 === false && this.form_04.value.cond_min_ps_09 === false) {
      this.form_04.controls ['cond_min_ps_09'].setValidators ([Validators.compose([ Validators.required, Validators.pattern('true')])]);
      this.form_04.controls ['cond_min_ps_08'].setValidators ([Validators.compose([ Validators.required, Validators.pattern('true')])]);
    } else if (this.form_04.value.cond_min_ps_08 === true && this.form_04.value.cond_min_ps_09 === false) {
      this.form_04.controls ['cond_min_ps_09'].setValidators ([]);
    } else if (this.form_04.value.cond_min_ps_09 === true && this.form_04.value.cond_min_ps_08 === false) {
      this.form_04.controls ['cond_min_ps_08'].setValidators ([]);
    }

    this.form_04.controls ['cond_min_ps_09'].updateValueAndValidity ();
    this.form_04.controls ['cond_min_ps_08'].updateValueAndValidity ();
  }

  check_numero_certificado_value (event: any) {
    if (event) {
      this.form_06.controls ['turismo_aventura_certificado'].setValidators ([Validators.required, Validators.pattern ('^[0-9]+(-[0-9]+)?$')]);
    } else {
      this.form_06.controls ['turismo_aventura_certificado'].setValidators ([]);
    }

    this.form_06.controls ['turismo_aventura_certificado'].updateValueAndValidity ();
  }

  validar_transporte () {
    if (this.form_08.value.trans_terres === true || this.form_08.value.trans_acuatico === true || this.form_08.value.trans_arere === true) {
      this.form_08.controls ['nro_unidades_sericio'].setValidators ([Validators.required]);
      this.form_08.controls ['nro_placas_transporte'].setValidators ([Validators.required]);
    } else {
      this.form_08.controls ['nro_unidades_sericio'].setValidators ([]);
      this.form_08.controls ['nro_placas_transporte'].setValidators ([]);
    }

    this.form_08.controls ['nro_unidades_sericio'].updateValueAndValidity ();
    this.form_08.controls ['nro_placas_transporte'].updateValueAndValidity ();
  }

  get_x_condicional (value: boolean) {
    if (value) {
      return 'x'
    }

    return ' ';
  }

  g_declaracion_a_fisica (data: any) {
    let dd: any = {
      content: [],
      defaultStyle: {
        columnGap: 20,
        fontSize: 11,
      }
    };

    dd.content.push (
      {
        text: 'DECLARACIÓN JURADA AGENCIA FÍSICA\n\n',
        alignment: "center",
        fontSize: 16,
        bold: true
      }
    );

    let tipo_declaracion = "REGISTRO NUEVO";
    if (data.registro_nuevo === '1') {
      tipo_declaracion = "ACTUALIZACIÓN DE DATOS";
    }

    dd.content.push (
      {
        text: '- ' + tipo_declaracion + '\n\n',
        alignment: "right",
      }
    );

    dd.content.push (
      {
        text: 'INFORMACIÓN DE LA PERSONA TITULAR\n\n',
        fontSize: 13,
        bold: true
      }
    );

    let representante_titulo = 'Nombres y Apellidos:\n'
    if (data.representante_tipo === '1') {
      representante_titulo = 'Razón Social:\n';
    }

    let representante_value = data.representante_nombre;
    if (data.representante_tipo === '1') {
      representante_value = data.representante_razon_social;
    }

    let representante_legal_titulo = '';
    if (data.representante_tipo === '1') {
      representante_legal_titulo = 'Representante legal:';
    }

    let representante_legal_valor = '';
    if (data.representante_tipo === '1') {
      representante_legal_valor = data.representante_nombre;
    }

    // INFORMACIÓN DE LA PERSONA TITULAR
    dd.content.push ({
      columns: [
        {
          text: [
            {text: representante_titulo, bold: true},
            representante_value + '\n\n',
            {text: 'N° de RUC:\n', bold: true},
            data.representante_ruc + '\n\n',
            {text: 'Domicilio legal:\n', bold: true},
            data.representante_direccion + '\n\n',
            {text: representante_legal_titulo + '\n', bold: true},
            representante_legal_valor + '\n\n'
          ],
        },
        {
          text: [
            {text: 'Región:\n', bold: true},
            data.representante_region + '\n\n',
            {text: 'Provincia:\n', bold: true},
            data.representante_provincia + '\n\n',
            {text: 'Distrito:\n', bold: true},
            data.representante_distrito  + '\n\n',
          ]
        },
        {
          text: [
            {text: 'Tipo Doc. Identidad:\n', bold: true},
            data.representante_tdoc + '\n\n',
            {text: 'N° Doc. Identidad:\n', bold: true},
            data.representante_ndoc + '\n\n',
            {text: 'Domicilio legal:\n', bold: true},
            data.representante_direccion + '\n\n'
          ]
        }
      ]}
    );

    // CONDICIONES MINIMAS PARA LA PRESTACION DE SERVICIOS (ANEXO I DEL REGLAMENTO)
    dd.content.push (
      {
        text: 'INFORMACIÓN DEL ESTABLECIMIENTO\n\n',
        fontSize: 13,
        bold: true
      }
    );
    dd.content.push ({
      columns: [{
          text: [
            {text: 'Nombre comercial:\n', bold: true},
            data.nombre_comercial + '\n\n',
            {text: 'Dirección:\n', bold: true},
            data.direccion + '\n\n',
            {text: 'Región:\n', bold: true},
            'Cusco' + '\n\n',
            {text: 'Provincia:\n', bold: true},
            data.provincia.nombre + '\n\n',
            {text: 'Distrito:\n', bold: true},
            data.distrito.nombre + '\n\n',
          ],
        }, {
          text: [
            {text: 'Tel. celular:\n', bold: true},
            data.telefono + '\n\n',
            {text: 'Tel. fijo:\n', bold: true},
            data.telefono_fijo + '\n\n',
            {text: 'Página web:\n', bold: true},
            data.pagina_web + '\n\n',
            {text: 'Correo electrónico:\n', bold: true},
            data.correo + '\n\n',
          ],
        }, {
          text: [
            {text: 'Enlace a redes sociales:\n', bold: true},
            data.cuentas_redes_sociales + '\n\n',
            {text: 'Fecha de inicio de operaciones:\n', bold: true},
            moment (data.fecha_ins.substring (0, 10)).format ('DD[-]MM[-]YYYY') + '\n\n',
            {text: 'N.° de licencia de funcionamiento:\n', bold: true},
            data.numero_certificado + '\n\n',
            {text: 'Fecha de expedición:\n', bold: true},
            moment (data.fecha_exp.substring (0, 10)).format ('DD[-]MM[-]YYYY') + '\n\n'
          ]
        }
      ]}
    );

    // CONDICIONES MINIMAS PARA LA PRESTACION DE SERVICIOS (ANEXO I DEL REGLAMENTO)
    dd.content.push (
      {
        text: 'CONDICIONES MÍNIMAS PARA LA PRESTACION DE SERVICIOS (ANEXO I DEL REGLAMENTO)\n\n',
        fontSize: 13,
        bold: true
      }
    );
    dd.content.push (
      {
        columns: [
        {
          ul: [
            {text: `(${this.get_x_condicional (data.cond_min_ps_01)}) Oficina administrativa`},
            {text: `(${this.get_x_condicional (data.cond_min_ps_02)}) Local de libre acceso al público para atender al turista y dedicado a prestar de manera exclusiva al servicio de agencia de viajes y turismo.`},
            {text: `(${this.get_x_condicional (data.cond_min_ps_03)}) Independizada de los locales de negocio colindantes.`},
          ],
        },
        {
          ul: [
            {text: `(${this.get_x_condicional (data.cond_min_ps_04)}) Equipo de cómputo: ` + data.cantidad_equipos_computo + ' unds.'},
            {text: `(${this.get_x_condicional (data.cond_min_ps_05)}) Conexión a internet y correo electrónico.`},
            {text: `(${this.get_x_condicional (data.cond_min_ps_06)}) Teléfono.`},
            {text: `(${this.get_x_condicional (data.cond_min_ps_07)}) Equipo de impresora y escáner.`}
          ]
        }
        ]
      },
    );
    dd.content.push ({text: '\n\n'});
    dd.content.push ({
      columns: [
        {
          ul: [
            `a) (${this.get_x_condicional (data.cond_min_ps_08)}) Con experiencia mínima de un (1) año en actividades turísticas y que haya llevado por lo menos un curso de técnicas de atención al caliente`,
            `b) (${this.get_x_condicional (data.cond_min_ps_09)}) Con formación académica superior o técnico productiva en materia de turismo`,
          ],
        },
        {
          text: [
            {text: 'Total de personal calificado:\n', bold: true},
            data.total_personal_calificado + '\n\n',
          ]
        }
      ]
    });

    if (data.canal_digital === '1') {
      dd.content.push ({text: '\n\n'});

      dd.content.push ({
        text: 'CONDICIONES MÍNIMAS PARA LA PRESTACIÓN DEL SERVICIO A TRAVÉS DE CANALES DIGITALES (ARTICULO 22 DEL REGLAMENTO) (1)\n\n',
        fontSize: 13,
        bold: true
      });

      dd.content.push ({
        text: 'Canales en los cuales opera:\n', bold: true
      });

      dd.content.push (
        data.canales_opera + '\n\n',
      );

      dd.content.push (
        {
          columns: [
          {
            ul: [
              `(${this.get_x_condicional (data.cond_min_cd_01)}) Ser propietario, licenciatario o administrador de canales digitales para la oferta, promoción, comercialización y, en general, la prestación de sus servicios, los cuales incluyen los contenidos mínimos siguientes:`,
              `(${this.get_x_condicional (data.cond_min_cd_02)}) Número de teléfono, dirección y datos de contacto de la agencia de viajes y turismo y correo electrónico, las cuales pueden ser utilizados para asistir y/o atender y/o asesorar al consumidor.`,
              `(${this.get_x_condicional (data.cond_min_cd_03)}) Número de RUC.`,
              `(${this.get_x_condicional (data.cond_min_cd_04)}) Razón social o nombres y apellidos, según corresponde.`,
              `(${this.get_x_condicional (data.cond_min_cd_05)}) Nombre comercial.`,
              `(${this.get_x_condicional (data.cond_min_cd_06)}) Política de protección de datos personales.`,
              `(${this.get_x_condicional (data.cond_min_cd_07)}) Términos y Condiciones de uso del canal digital, lo que incluye, entre otros aspectos, las políticas de cobro, cancelación y reembolso.`,
              `(${this.get_x_condicional (data.cond_min_cd_08)}) Constancia de inscripción en el directorio nacional de prestadores de servicios turísticos calificados, cuando esta sea expedida.`,
              `(${this.get_x_condicional (data.cond_min_cd_09)}) Versión digital del afiche u otro documento similar, que contenga información respecto de las disposiciones legales que sancionan penalmente las conductas vinculadas a las ESNNA, de acuerdo a las características y contenido establecido por el MINCETUR, asi como las que sancionan el hecho de tener relaciones sexuales con menores de edad, sin perjuicio de otras medidas que puedan adoptar con el mismo fin.`
            ],
          },
          {
            ul: [
              `(${this.get_x_condicional (data.cond_min_cd_10)}) El contenido detallado en el literal a) está publicado empleando un lenguaje claro, sencillo y transparente. Además, esta dispuesto de manera que el acceso a los mismos de la pagina de inicio del canal digital es asequible.`,
              `(${this.get_x_condicional (data.cond_min_cd_13)}) Con experiencia mínima de un (1) año en actividades turísticas y que haya llevado por lo menos un curso de técnicas de atención al caliente.`,
              `(${this.get_x_condicional (data.cond_min_cd_14)}) Con formación académica superior o técnico productiva en materia de turismo.`,
              `(${this.get_x_condicional (data.cond_min_cd_11)}) Medidas de seguridad y diligencia debida en la interfaz para la compra en linea, lo que incluye las herramientas empleadas para procesar los pagos.`,
              `(${this.get_x_condicional (data.cond_min_cd_12)}) Medidas técnicas de protección de los datos personales que son recabados a través del canal digital.`
            ]
          },
          ]
        },
      );
    }

    dd.content.push (
      {text: '\n\n'}
    );

    dd.content.push (
      {
        text: 'CLASIFICACIÓN\n',
        fontSize: 13,
        bold: true
      },
    );

    dd.content.push (data.clasificacion.nombre + '\n\n');

    dd.content.push (
      {text: '\n\n'}
    );

    // Modalidad de turismo
    dd.content.push (
      {
        text: 'MODALIDAD DE TURISMO\n',
        fontSize: 13,
        bold: true
      },
    );

    let modalidad_turismo: any [] = [];
    data.modalidad_turismo.forEach ((element: any) => {
      if (element.id === 'xi55CdN2tkJdm9d63iN3') {
        modalidad_turismo.push (element.nombre + ', N° de certificado: ' + data.turismo_aventura_certificado);
      } else {
        modalidad_turismo.push (element.nombre)
      }
    });

    dd.content.push (
      {
        ul: modalidad_turismo
      },
    );

    dd.content.push (
      {text: '\n\n'}
    );

    // Tipos de turismo
    dd.content.push (
      {
        text: 'TIPO DE TURISMO\n',
        fontSize: 13,
        bold: true
      },
    );

    let tipos_turismo: any [] = [];
    data.tipos_turismo.forEach ((element: any) => {
      tipos_turismo.push (element.nombre);
    });

    dd.content.push (
      {
        ul: tipos_turismo
      },
    );

    dd.content.push (
      {text: '\n\n'}
    );

    dd.content.push (
      {
        text: 'OTRA INFORMACIÓN\n',
        fontSize: 13,
        bold: true
      },
    );

    dd.content.push (
      {
        columns: [
        {
          text: [
            {text: 'Asociación de turismo a la que pertenece:\n', bold: true},
            data.asociacion_turismo + '\n\n',
            {text: 'Clasificación de calidad, sostenibilidad u otro reconocimiento especial que ostenta referencia a su periodo de vigencia:\n', bold: true},
            data.clasificacion_calidad + '\n\n',
            {text: 'N.° de unidades para brindar el servicio:\n', bold: true},
            data.nro_unidades_sericio + '\n\n',
            {text: 'Señalar el número de placas:\n', bold: true},
            data.nro_placas_transporte + '\n\n',
          ]
        },
        {
          ul: [
            `(${this.get_x_condicional (data.trans_terres)}) Transporte turístico terrestre`,
            `(${this.get_x_condicional (data.trans_acuatico)}) Transporte turístico acuático`,
            `(${this.get_x_condicional (data.trans_arere)}) Transporte aéreo especial en actividades de turismo`
          ]
        }]
      },
    );

    dd.content.push (
      {text: '\n\n'}
    );

    dd.content.push (
      {
        text: 'DECLARACIONES\n',
        fontSize: 13,
        bold: true
      },
    );

    dd.content.push (
      {text: '\n\n'}
    );

    dd.content.push (
      'LA PRESENTE DECLARACIÓN JURADA LA REALIZO SEGÚN LO SEÑALADO EN EL NUMERAL 9.2 DEL ARTICULO 9 DEL REGLAMENTO DE AGENCIAS DE VIAJES Y TURISMO, APROBADO MEDIANTE D.S.005-2020- MINCETUR, MANIFESTANDO QUE LOS DATOS SEÑALADO EXPRESAN LA VERDAD Y QUE CONOZCO LAS SANCIONES ADMINISTRATIVAS Y PENALES A QUE HABRÁ LUGAR EN CASO DE FALSEDAD.'
    );

    pdfMake.createPdf (dd).download ('Declaracion Jurada.pdf');
  }

  documentoChanged (value: string) {
    console.log (value);

    if (value === 'DNI') {
      this.form_02.controls ['representante_ndoc'].setValidators ([
        Validators.required,
        Validators.minLength (8),
        Validators.maxLength (8),
        Validators.pattern("^[0-9]*$"),
      ]);
    } else {
      this.form_02.controls ['representante_ndoc'].setValidators ([
        Validators.required,
        Validators.minLength (11),
        Validators.maxLength (11)
      ]);
    }

    this.form_02.controls ['representante_ndoc'].updateValueAndValidity ();
  }
}
