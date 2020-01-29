import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../app/services/utils.service';
import * as moment from 'moment';
import { Location } from "@angular/common";
import {TitleService} from "../app/services/title.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dir';
  route: string;
  constructor(
    public utils: UtilsService,
    private router: Router,
    private location: Location,
    private titleService: TitleService
  ) {
    let lang: string = localStorage.getItem ("idioma");
    console.log (lang);

    if (lang === null || lang === undefined) {
      lang = 'es';
    }

    localStorage.setItem ("idioma", lang);
    moment.locale (lang);

    router.events.subscribe(val => {
      if (location.path() == "/home" || location.path() == "" || location.path() == "/") {
        this.utils.header_visible=false;
      } else {
        this.utils.header_visible=true;
      }
      $('.mostrar-menu').hide();
      $('.derecha-menu').css({'transform': 'translate3d(0,0,0)'});
    });
    this.titleService.init();
  }
}
