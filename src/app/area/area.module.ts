import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { PaginatorComponent } from './paginator/paginator.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    PaginatorComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule
  ]
})
export class AreaModule { }
