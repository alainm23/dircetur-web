import { Component, OnInit } from '@angular/core';

// Forms
import { FormGroup , FormControl, Validators, FormArray } from '@angular/forms';

// Services
import { DatabaseService } from '../../../services/database.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import * as html2pdf from 'html2pdf.js';
import { MatDialog } from '@angular/material';
import { CustomValidators } from 'ng2-validation';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  clasificaciones: any [] = [];
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

  correo_valido: any;
  ruc_valido: any;
  esta_validando: boolean = false;
  error_message: any;
  constructor (
    private database: DatabaseService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dialog: MatDialog
  ) {
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

  cambiar_vista (value: number) {
    this.vista += value;
    window.scroll (0,0);
  }

  change_tipo_registro (event: any) {
    if (event === '0') {
      this.form_01.controls ['fecha_exp'].setValidators ([]);
      this.form_01.controls ['numero_constancia'].setValidators ([]);
    } else {
      this.form_01.controls ['fecha_exp'].setValidators ([
        Validators.required, CustomValidators.date,
        CustomValidators.minDate ('1980-01-01'),
        CustomValidators.maxDate ('2050-01-01')
      ]);
      this.form_01.controls ['numero_constancia'].setValidators ([Validators.required]);
    }

    this.form_01.controls ['fecha_exp'].updateValueAndValidity ();
    this.form_01.controls ['numero_constancia'].updateValueAndValidity ();
  }

  ngOnInit () {
    this.form_01 = new FormGroup ({
      registro_nuevo: new FormControl ('0'),
      fecha_exp: new FormControl (''),
      numero_constancia: new FormControl (''),
    });

    const correo = new FormControl ('', Validators.required);
    const confir_correo = new FormControl ('', [Validators.required, CustomValidators.equalTo(correo)]);

    this.form_02 = new FormGroup ({
      razon_social: new FormControl ('', [Validators.required]),
      nombre_comercial: new FormControl ('', [Validators.required]),
      ruc: new FormControl ('', [
        Validators.required,
        Validators.minLength (11),
        Validators.maxLength (11),
        Validators.pattern("^[0-9]*$")]),
      direccion: new FormControl ('', [Validators.required]),
      provincia: new FormControl ('', [Validators.required]),
      distrito: new FormControl ('', [Validators.required]),
      pagina_web: new FormControl (''),
      correo: correo,
      confir_correo: confir_correo,
      telefono: new FormControl ('', [Validators.required, Validators.pattern("[0-9 ]{9}")]),
      representante_nombre: new FormControl ('', [Validators.required]),
      representante_tdoc: new FormControl ('', [Validators.required]),
      representante_ndoc: new FormControl ('', [Validators.required]),
      fecha_ins: new FormControl ('', [
        Validators.required,
        CustomValidators.minDate ('1980-01-01'),
        CustomValidators.maxDate ('2050-01-01')
      ]),
      numero_certificado: new FormControl ('', [Validators.required]),
      fecha_exp: new FormControl ('', [
        Validators.required,
        CustomValidators.minDate ('1980-01-01'),
        CustomValidators.maxDate ('2050-01-01')
      ]),
      clase: new FormControl ('', [Validators.required]),
    })

    this.form_03 = new FormGroup ({
      numero_habitaciones: new FormControl ('', [Validators.required, Validators.min (6)]),
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
      clase: new FormControl ('', [Validators.required]),

      fecha_ins: new FormControl ('', [Validators.required]),
      fecha_exp: new FormControl ('', [Validators.required]),
      numero_certificado: new FormControl ('', [Validators.required]),
      numero_constancia: new FormControl ('', [Validators.required]),

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

    this.database.get_alojamiento_clasi ().subscribe ((res: any []) => {
      this.clasificaciones = res;
    });

    this.agregar ();
  }

  validar_numero_pisos () {
    console.log (this.form_03.value);

    if (this.form_03.value.numero_pisos <= 3) {
      this.form_03.controls ['req_min_inf_05'].setValidators ([]);
    } else {
      this.form_03.controls ['req_min_inf_05'].setValidators ([Validators.required, Validators.pattern('true')]);
    }

    this.form_03.controls ['req_min_inf_05'].updateValueAndValidity ();
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

    this.hospedaje_form.patchValue (this.form_01.value);
    this.hospedaje_form.patchValue (this.form_02.value);
    this.hospedaje_form.patchValue (this.form_03.value);
    this.hospedaje_form.patchValue (this.form_05.value);

    if (this.form_01.value.registro_nuevo === '1') {
      this.hospedaje_form.controls ['fecha_exp'].setValue (this.form_01.value.fecha_exp);
    }

    let data: any = this.hospedaje_form.value;
    data.aprobado = false;

    if (data.fecha_exp !== '') {
      data.fecha_exp = new Date (data.fecha_exp).toISOString ();
    }

    if (data.fecha_ins !== '') {
      data.fecha_ins = new Date (data.fecha_ins).toISOString ();
    }

    data.fecha_solicitud = new Date ().toISOString ();
    data.personal = this.personal.value;

    this.database.addHotel (data)
      .then (async () => {
        await this.spinner.hide ();
        this.g_declaracion_alojamiento (data);
        this.router.navigate (["/registro-finalizado", data.correo]);
      }).catch (async (error: any) => {
        await this.spinner.hide ();
        console.log ("Error addHotel", error);
        this.error_message = error;
        this.dialog.open (dialog);
      });
  }

  tipo_persona_change (event: any) {
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

  async validar_correo_ruc (dialog: any) {
    this.esta_validando = true;
    this.correo_valido = await this.database.is_email_valid (this.form_02.value.correo);
    this.ruc_valido = await this.database.is_ruc_valid (this.form_02.value.ruc);

    if (this.correo_valido !== undefined || this.ruc_valido !== undefined) {
      this.esta_validando = false;
      this.dialog.open (dialog);
    } else {
      this.esta_validando = false;
      this.cambiar_vista (+1);
    }
  }

  get_x_condicional (value: boolean) {
    if (value) {
      return 'x'
    }

    return ' ';
  }

  g_declaracion_alojamiento (data: any) {
    let dd: any = {
      content: [],
      defaultStyle: {
        columnGap: 20,
        fontSize: 11,
      }
    };

    dd.content.push (
      {
        text: 'DECLARACIÓN JURADA ALOJAMIENTO\n\n',
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
        text: 'INFORMACIÓN DEL ESTABLECIMIENTO\n\n',
        fontSize: 13,
        bold: true
      }
    );

    // INFORMACIÓN DE LA PERSONA TITULAR
    dd.content.push ({
      columns: [
        {
          text: [
            {text: 'Razón Social:\n', bold: true},
            data.razon_social + '\n\n',
            {text: 'Nombre Comercial:\n', bold: true},
            data.nombre_comercial + '\n\n',
            {text: 'N.° de RUC:\n', bold: true},
            data.ruc + '\n\n',
            {text: 'Dirección completa:\n', bold: true},
            data.direccion + '\n\n',
            {text: 'Región:\n', bold: true},
            'Cusco' + '\n\n',
            {text: 'Provincia:\n', bold: true},
            data.provincia.nombre + '\n\n',
            {text: 'Distrito:\n', bold: true},
            data.distrito.nombre  + '\n\n',
          ],
        },
        {
          text: [
            {text: 'Página Web:\n', bold: true},
            data.pagina_web  + '\n\n',
            {text: 'Email:\n', bold: true},
            data.correo  + '\n\n',
            {text: 'Teléfono:\n', bold: true},
            data.telefono  + '\n\n',
            {text: 'Representante Legal:\n', bold: true},
            data.representante_nombre  + '\n\n',
            {text: 'Doc. Identidad:\n', bold: true},
            data.representante_tdoc  + '\n\n',
            {text: 'N.° Doc. Identidad:\n', bold: true},
            data.representante_ndoc  + '\n\n',
          ]
        },
        {
          text: [
            {text: 'Fecha inicio de operaciones:\n', bold: true},
            moment (data.fecha_ins.substring (0, 10)).format ('DD[-]MM[-]YYYY') + '\n\n',
            {text: 'N.° Licencia de Funcionamiento:\n', bold: true},
            data.numero_certificado + '\n\n',
            {text: 'Fecha de expedición:\n', bold: true},
            moment (data.fecha_exp.substring (0, 10)).format ('DD[-]MM[-]YYYY') + '\n\n',
          ]
        }
      ]}
    );

    // REQUISITOS MINIMOS
    dd.content.push (
      {
        text: 'REQUISITOS MÍNIMOS\n\n',
        fontSize: 13,
        bold: true
      }
    );

    dd.content.push ({
      columns: [{
          text: [
            {text: 'N.° de Habitaciones:\n', bold: true},
            data.numero_habitaciones + '\n\n',
            {text: 'Ingreso diferenciado para huéspedes y personal de servicio:\n', bold: true},
            data.ingreso_diferenciado + '\n\n',
            {text: 'N.° de Pisos:\n', bold: true},
            data.numero_pisos + '\n\n',
          ],
        }, {
          text: [
            {text: 'Número de personal ocupado:\n', bold: true},
            data.numero_personal + '\n\n',
            {text: 'Número de camas:\n', bold: true},
            data.numero_camas + '\n\n',
            {text: 'Número de baños privados:\n', bold: true},
            data.nro_banios_privados + '\n\n',
          ],
        }, {
          text: [
            {text: 'Numero de baños comunes:\n', bold: true},
            data.nro_banios_comunes + '\n\n'
          ]
        }
      ]}
    );

    dd.content.push (
      {
        columns: [
        {
          ul: [
            `(${this.get_x_condicional (data.req_min_inf_01)}) Área de recepción y consejería.`,
            `(${this.get_x_condicional (data.req_min_inf_02)}) El área de habitaciones (incluye el área del closet guardarropa) tiene como mínimo 6 m.`,
            `(${this.get_x_condicional (data.req_min_inf_03)}) El área de total de los SS.HH. privados o comunes tiene como mínimo 2 m.`,
            `(${this.get_x_condicional (data.req_min_inf_04)}) Los servicios higiénicos: Cuentan con pisos y paredes de material impermeable, el revestimiento de la pared tiene una altura mínima de 1.80 m.`,
            `(${this.get_x_condicional (data.req_min_inf_05)}) Contar con un ascensor a partir de (4) o más pisos.`,
            `(${this.get_x_condicional (data.req_min_inf_07)}) La edificación guarda armonía con el entorno en el que se ubica.`,
            `(${this.get_x_condicional (data.req_min_inf_08)}) Accesibilidad para personas con discapacidad y de las personas adultas mayores, según norma A.120.`,
            `(${this.get_x_condicional (data.req_min_inf_09)}) Para el diseño de acceso y salidas de emergencia pasajes de circulación de personas, escaleras, sistema contra incendios, etc., sé ha tomado en cuenta la norma A.130, requisitos de seguridad.`,
            `(${this.get_x_condicional (data.req_min_inf_10)}) Tabiquería: Los muros y divisiones interiores, especialmente entre dormitorios cumplen con los requisitos de seguridad del reglamento de edificaciones siendo combustibles, higiénicos y de fácil limpieza, brindando condiciones de privacidad y aislamiento acústico.`
          ],
        },
        {
          ul: [
            `(${this.get_x_condicional (data.req_min_eqp_01)}) Teléfono de uso público (puede ser teléfono fijo de recepción, celular, dependiendo de la zona y para uso exclusivo del huésped).`,
            `(${this.get_x_condicional (data.req_min_eqp_02)}) Botiquín de primeros auxilios según especificaciones técnicas del ministerio de salud.`,
            `(${this.get_x_condicional (data.req_min_eqp_03)}) Cuento con sistema que permita tener agua fría y caliente y las 24 horas del día el cual no es activado por el huésped.`
          ]
        }
        ]
      },
    );

    dd.content.push (
      {
        columns: [
        {
          ul: [
            `(${this.get_x_condicional (data.req_min_srv_01)}) Se realiza limpieza diaria de habitaciones y todos los ambientes del establecimiento.`,
            `(${this.get_x_condicional (data.req_min_srv_02)}) Brindo servicio de custodia de equipaje.`,
            `(${this.get_x_condicional (data.req_min_srv_03)}) El cambio de sábanas y toallas debe ser regular, (el huésped puede solicitar que no se cambie regularmente de acuerdo a criterios ambientales y otros).`
          ]
        },
        {

        },
        ]
      },
    );

    dd.content.push (
      {text: '\n\n'}
    );

    dd.content.push (
      'LA PRESENTE DECLARACIÓN JURADA LA REALIZO SEGÚN LO SEÑALADO EN EL NUMERAL 9.2 DEL ARTICULO 9 DEL REGLAMENTO DE AGENCIAS DE VIAJES Y TURISMO, APROBADO MEDIANTE D.S.001-2015- MINCETUR, MANIFESTANDO QUE LOS DATOS SEÑALADO EXPRESAN LA VERDAD Y QUE CONOZCO LAS SANCIONES ADMINISTRATIVAS Y PENALES A QUE HABRÁ LUGAR EN CASO DE FALSEDAD.'
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
