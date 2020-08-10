import { Component, OnInit } from '@angular/core';

// Services
import { Router } from '@angular/router';


@Component({
  selector: 'app-popup-registro',
  templateUrl: './popup-registro.component.html',
  styleUrls: ['./popup-registro.component.css']
})
export class PopupRegistroComponent implements OnInit {

  constructor (
    public route: Router,
  ) { }

  ngOnInit () {
  }

  page (page: string) {
    this.route.navigate (["/" + page]);
  }
}
