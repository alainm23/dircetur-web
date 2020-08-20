import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';

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

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
}
