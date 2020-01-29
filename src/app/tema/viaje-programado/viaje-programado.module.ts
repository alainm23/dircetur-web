import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViajeProgramadoComponent } from './viaje-programado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [ViajeProgramadoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ]
})
export class ViajeProgramadoModule { }
