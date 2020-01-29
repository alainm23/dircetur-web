import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlojamientoCartillaComponent } from './alojamiento-cartilla.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlojamientoCartillaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AlojamientoCartillaModule { }
