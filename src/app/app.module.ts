import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './tema/header/header.component';
import { FooterComponent } from './tema/footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlickityModule } from 'ngx-flickity';
import { AgenciaCartillaModule } from './tema/agencia-cartilla/agencia-cartilla.module';
import { AlojamientoCartillaModule } from './tema/alojamiento-cartilla/alojamiento-cartilla.module';
import { RestauranteCartillaModule } from './tema/restaurante-cartilla/restaurante-cartilla.module';
import { GuiaCartillaModule } from './tema/guia-cartilla/guia-cartilla.module';
import { ContenidoModule } from './tema/contenido/contenido.module';
import { TransparenciainstitucionalModule } from './tema/transparenciainstitucional/transparenciainstitucional.module';
import { TurismosocialModule } from './tema/turismosocial/turismosocial.module';
import { TurismoModule } from './tema/turismo/turismo.module';
import { TurismoruralcomunitarioModule } from './tema/turismoruralcomunitario/turismoruralcomunitario.module';
import { ProyectosEspecialesModule } from './tema/proyectos-especiales/proyectos-especiales.module';
import { EventoDetalleModule } from './tema/evento-detalle/evento-detalle.module';
import { ContactoModule } from './tema/contacto/contacto.module';
import { ComercioexteriorModule } from './tema/comercioexterior/comercioexterior.module';
import { CircuitosturisticosModule } from './tema/circuitosturisticos/circuitosturisticos.module';
import { CircuitoDetalleModule } from './tema/circuito-detalle/circuito-detalle.module';
import { CalendarioModule } from './tema/calendario/calendario.module';
import { BoletoturisticoModule } from './tema/boletoturistico/boletoturistico.module';
import { BlogsModule } from './tema/blogs/blogs.module';
import { BlogDetalleModule } from './tema/blog-detalle/blog-detalle.module';
import { ArtesaniaModule } from './tema/artesania/artesania.module';
import { ViajeProgramadoModule } from './tema/viaje-programado/viaje-programado.module';
import { ViajeRuralModule } from './tema/viaje-rural/viaje-rural.module';
import { SlugifyPipe } from './pipe/slugify.pipe';
import { TitleService } from "../app/services/title.service";
import { EventoDetalleArtesaniaModule } from './tema/evento-detalle-artesania/evento-detalle-artesania.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from "@angular/material";
import { ViajeProgramadoDialogComponent } from './dialogs/viaje-programado/viaje-programado-dialog.component';
import { ImagenUbigeoComponent } from './dialogs/imagen-ubigeo/imagen-ubigeo.component';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SlugifyPipe,
    ViajeProgramadoDialogComponent,
    ImagenUbigeoComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'dirceturcusco'),
    AngularFirestoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlickityModule,
    AgenciaCartillaModule,
    AlojamientoCartillaModule,
    RestauranteCartillaModule,
    GuiaCartillaModule,
    ContenidoModule,
    TransparenciainstitucionalModule,
    TurismosocialModule,
    TurismoModule,
    TurismoruralcomunitarioModule,
    ProyectosEspecialesModule,
    EventoDetalleModule,
    EventoDetalleArtesaniaModule,
    ContenidoModule,
    ContactoModule,
    ComercioexteriorModule,
    CircuitosturisticosModule,
    CircuitoDetalleModule,
    ViajeProgramadoModule,
    ViajeRuralModule,
    CalendarioModule,
    BoletoturisticoModule,
    BlogsModule,
    BlogDetalleModule,
    ArtesaniaModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ViajeProgramadoDialogComponent, ImagenUbigeoComponent]
})
export class AppModule { }
