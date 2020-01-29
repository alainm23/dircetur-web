import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  header_visible: boolean = false;
  idioma:any = new Subject();
  constructor() { 
    let lang: string = localStorage.getItem ("idioma");

    if (lang === null || lang === undefined) {
      lang = 'es';
    }

    this.ElIdioma =  lang;
  }

  set ElIdioma(value) {
    this.idioma.next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem('idioma', value);
  }
 
  get ElIdioma() {
    return localStorage.getItem('idioma');
  }
}
