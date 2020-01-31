import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SlugifyPipe } from '../../../app/pipe/slugify.pipe';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [SlugifyPipe]
})
export class BlogsComponent implements OnInit {
Blogs:any;
/* URL Imagen Default en caso de ser DIV */
url_img_blog:any="/assets/imagenes/fondo-blog.jpg";
Categorias:any;
Todos_los_blogs:string='todos';
todos:boolean=false;
id:string;
sus: any;
sus2: any;
sus3: any;
sus4: any;
sus5: any;
sus6: any;
etiquetas: any;
imagenes: any;
  constructor(
    public db:DatabaseService,
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private slugifyPipe: SlugifyPipe,
    public utils: UtilsService
  ) {
    utils.idioma.subscribe((nextValue) => {
      /* subscribirme */
      this.sus=this.db.getPaginaWebEtiquetas ('turismo_blog_' + nextValue).subscribe ((res) => {
        this.etiquetas = res;
      });
   })
   }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.utils.ElIdioma = localStorage.getItem("idioma");

    if (this.utils.ElIdioma === undefined || this.utils.ElIdioma === null) {
      this.utils.ElIdioma = 'es';
    }

    this.sus=this.db.getPaginaWebEtiquetas ('turismo_blog_' + this.utils.ElIdioma).subscribe ((res) => {
      this.etiquetas = res;
    });

    this.sus2=this.db.getPaginaWebEtiquetas ('turismo_blog').subscribe ((res) => {
      this.imagenes = res;
    });

    /* Capturamos el id */
    this.sus3=this.activatedRoute.params.subscribe( params =>{
      this.id=params['id'];
      /*let element = document.getElementById(params['id']);
      element.setAttribute ("style", "background-color: #3E729A; color: #fff;");*/
      if(params['id']=='todos')
      {
        this.TodoslosBlog();
      }
      else
      {
        this.todos=false;
        this.sus4=this.db.getBlogporCat(params['id']).subscribe( data => 
          {
            this.Blogs=data;
            console.log('Estos son los blog(Articulos):',this.Blogs);
          });
      }
    } );

    this.TraerCategoriasBlogs();
  }

  TodoslosBlog () {
    this.sus5=this.db.getallblogs().subscribe(res=>{
      this.Blogs=res;
      this.todos=true;
      console.log('Estos son Todos los blog(Articulos)',res,'este es el valor de todos:',this.todos);
    });
  }

  formatoFecha1(fecha:string)
  {
    return moment(fecha).format('L');
  }

  BlogDetalle(dato:any, id:string)
  {
    let slug:string;
    if (dato ['titulo_' + this.utils.ElIdioma]==null || dato ['titulo_' + this.utils.ElIdioma]==undefined)
    {
      slug = dato ['titulo_es'];
    }
    else
    {
      slug = dato ['titulo_' + this.utils.ElIdioma];
    }
     
    this.route.navigate (["/blog-detalle/"+this.slugifyPipe.transform (slug)+"/"+id]);
  }

  TraerCategoriasBlogs () {
    this.sus6=this.db.getallCats().subscribe(res=>{
      this.Categorias=res;
      console.log('categorias del blog',res);
    });
  }

  goBlogs (slug:string,id:string) {
    this.route.navigate (["/blogs/"+this.slugifyPipe.transform(slug)+"/"+id]);  
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

    if (this.sus3 !== null && this.sus3 !== undefined) {
      this.sus3.unsubscribe ();
    }

    if (this.sus4 !== null && this.sus4 !== undefined) {
      this.sus4.unsubscribe ();
    }

    if (this.sus5 !== null && this.sus5 !== undefined) {
      this.sus5.unsubscribe ();
    }

    if (this.sus6 !== null && this.sus6 !== undefined) {
      this.sus6.unsubscribe ();
    }

  }

}
