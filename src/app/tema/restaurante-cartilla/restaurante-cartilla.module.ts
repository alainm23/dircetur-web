import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCartillaComponent } from './restaurante-cartilla.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RestauranteCartillaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RestauranteCartillaModule { }
