import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContenidoComponent } from './tema/contenido/contenido.component';
import {BoletoturisticoComponent} from './tema/boletoturistico/boletoturistico.component';
import {CircuitosturisticosComponent} from './tema/circuitosturisticos/circuitosturisticos.component';
import {TransparenciainstitucionalComponent} from './tema/transparenciainstitucional/transparenciainstitucional.component';
import {TurismoruralcomunitarioComponent} from './tema/turismoruralcomunitario/turismoruralcomunitario.component';
import {TurismosocialComponent} from './tema/turismosocial/turismosocial.component';
import { BlogDetalleComponent } from './tema/blog-detalle/blog-detalle.component';
import { TurismoComponent } from './tema/turismo/turismo.component';
import { ComercioexteriorComponent } from './tema/comercioexterior/comercioexterior.component';
import { ArtesaniaComponent } from './tema/artesania/artesania.component';
import { BlogsComponent } from './tema/blogs/blogs.component';
/*
import { EventosComponent } from './tema/eventos/eventos.component';
import { ProyectosEspecialesComponent } from './tema/proyectos-especiales/proyectos-especiales.component';
*/
import { ContactoComponent } from './tema/contacto/contacto.component';
import { EventoDetalleComponent } from './tema/evento-detalle/evento-detalle.component';
import { CircuitoDetalleComponent } from './tema/circuito-detalle/circuito-detalle.component';
import { CalendarioComponent } from './tema/calendario/calendario.component';
import { GuiaCartillaComponent } from './tema/guia-cartilla/guia-cartilla.component';
import { AlojamientoCartillaComponent } from './tema/alojamiento-cartilla/alojamiento-cartilla.component';
import { RestauranteCartillaComponent } from './tema/restaurante-cartilla/restaurante-cartilla.component';
import { AgenciaCartillaComponent } from './tema/agencia-cartilla/agencia-cartilla.component';
import { ViajeProgramadoComponent } from './tema/viaje-programado/viaje-programado.component';
import { ViajeRuralComponent } from './tema/viaje-rural/viaje-rural.component';
import { EventoDetalleArtesaniaComponent } from './tema/evento-detalle-artesania/evento-detalle-artesania.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent,  data: {title: "Inicio"}},
  { path: 'home', component: HomeComponent,  data: {title: "Home"}},
  { path: 'sobre-nosotros', component: ContenidoComponent, data: {title: "Sobre Nosotros"}},
  { path: 'about-us', component: ContenidoComponent, data: {title: "About Us"}},
  { path: 'transparencia-institucional', component: TransparenciainstitucionalComponent, data: {title: "Transparencia Institucional"}},
  { path: 'circuitos-turisticos', component: CircuitosturisticosComponent, data: {title: "Circuitos Turisticos"}},
  { path: 'boleto-turistico', component: BoletoturisticoComponent, data: {title: "Boleto Turistico"}},
  { path: 'turismo-rural-comunitario', component: TurismoruralcomunitarioComponent, data: {title: "Turismo Rural Comunitario"}},
  { path: 'turismo-social', component: TurismosocialComponent, data: {title: "Turismo Social"}},
  { path: 'blog-detalle/:slug/:id', component: BlogDetalleComponent},
  { path: 'evento-detalle/:slug/:id', component: EventoDetalleComponent},
  { path: 'evento-detalle-artesania/:slug/:id', component: EventoDetalleArtesaniaComponent},
  { path: 'circuito-detalle/:slug/:id', component: CircuitoDetalleComponent},
  { path: 'turismo', component: TurismoComponent, data: {title: "Turismo"}},
  { path: 'comercio-exterior', component: ComercioexteriorComponent, data: {title: "Comercio Exterior"}},
  { path: 'artesania', component: ArtesaniaComponent, data: {title: "Artesania"}},
  { path: 'blogs/:slug/:id', component: BlogsComponent},
  { path: 'viaje-programado/:slug/:id', component: ViajeProgramadoComponent},
  { path: 'viaje-rural/:slug/:id', component: ViajeRuralComponent},
 /* { path: 'eventos', component: EventosComponent},
  { path: 'proyectos-especiales', component: ProyectosEspecialesComponent},*/
  { path: 'contacto', component: ContactoComponent, data: {title: "Contacto"}},
  { path: 'calendario', component: CalendarioComponent, data: {title: "Calendario"}},
  { path: 'agencia-cartilla/:tipo/:id', component: AgenciaCartillaComponent},
  { path: 'alojamiento-cartilla/:tipo/:id', component: AlojamientoCartillaComponent},
  { path: 'restaurante-cartilla/:tipo/:id', component: RestauranteCartillaComponent},
  { path: 'guia-cartilla/:tipo/:id', component: GuiaCartillaComponent},
  { path: '**', component: HomeComponent},
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

  
 }
