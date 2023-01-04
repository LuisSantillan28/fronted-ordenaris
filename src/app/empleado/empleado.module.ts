import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { InformacionComponent } from './modal/informacion/informacion.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    InformacionComponent,
    PaginadorComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule
  ]
})
export class EmpleadoModule { }
