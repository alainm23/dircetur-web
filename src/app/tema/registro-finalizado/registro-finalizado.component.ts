import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-registro-finalizado',
  templateUrl: './registro-finalizado.component.html',
  styleUrls: ['./registro-finalizado.component.css']
})
export class RegistroFinalizadoComponent implements OnInit {
  correo_usuario: string = '';
  constructor (private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe ((params: any) => {
      this.correo_usuario = params['correo']
    });
  }
}
