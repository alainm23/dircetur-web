import { Component, OnInit } from '@angular/core';

// Services
import { Meta } from '@angular/platform-browser';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-blog-detalle',
  templateUrl: './blog-detalle.component.html',
  styleUrls: ['./blog-detalle.component.css']
})
export class BlogDetalleComponent implements OnInit {
detalle:any;
/* URL Imagen Default en caso de ser DIV */
url_img_blog:any="/assets/imagenes/fondo-blog.jpg";
sus: any;
sus2: any;
etiquetas: any;
imagenes: any;
  constructor(public db:DatabaseService,
              public route: Router,
              private activatedRoute: ActivatedRoute,
              public utils: UtilsService,
              private meta: Meta) { 
    //this.set_tags ();
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('blog_detalle_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   });
  }

  set_tags () {
    /*
    this.meta.addTags([
      {
        name: 'twitter:card', 
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title', 
        content: 'Sam Vloeberghs - Freelance Webdeveloper &amp; Software Engineer'
      },
      {
        name: 'twitter:description', 
        content: 'Hi there! 👋 Thank you for visiting my website!'
      },
      {
        name: 'twitter:image', 
        content: 'https://samvloeberghs.be/assets/share/home.png'
      },
      {
        name: 'twitter:image:alt', 
        content: 'Sam Vloeberghs - Freelance Webdeveloper &amp; Software Engineer'
      },
      {
        name: 'twitter:site', 
        content: '@samvloeberghs'
      },
      {
        name: 'twitter:creator', 
        content: 'Angular, Meta Service'
      }
    ]);
    */
  }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('blog_detalle_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('blog_detalle').subscribe ((res) => {
      this.imagenes = res;
    });

/* Capturamos el id */
    this.activatedRoute.params.subscribe( params =>{
      this.db.getBlogByKey(params['id']).subscribe( data => 
        {
          this.detalle=data;
          console.log('Este es el detalle:',this.detalle);
        });
    })
  }

  formatoFecha1(fecha:string)
  {
    return moment(fecha).format('L');
  }

  ValidarIdioma (dato:any, campo: string) {
    if (dato [campo + this.utils.ElIdioma]==null || dato [campo + this.utils.ElIdioma]==undefined)
    {
      return dato [campo+'es'];
    }
    
    return dato [campo + this.utils.ElIdioma];
  
  }

  ngOnDestroy(){
    if (this.sus !== null && this.sus !== undefined) {
      this.sus.unsubscribe ();
    }

    if (this.sus2 !== null && this.sus2 !== undefined) {
      this.sus2.unsubscribe ();
    }

  }

}
