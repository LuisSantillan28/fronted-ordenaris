import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { InformacionComponent } from './modal/informacion/informacion.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { RegistroComponent } from './registro/registro.component';
import localeMx from '@angular/common/locales/es-MX';

//Material
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

registerLocaleData(localeMx, 'es-MX')

@NgModule({
  declarations: [
    InformacionComponent,
    PaginadorComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    MatProgressBarModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule
  ],
  providers:[
    {provide: MAT_DATE_LOCALE, useValue: "es-ES"}
  ] 
})
export class EmpleadoModule { }
