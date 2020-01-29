import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgenciaCartillaComponent } from './agencia-cartilla.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AgenciaCartillaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AgenciaCartillaModule { }
