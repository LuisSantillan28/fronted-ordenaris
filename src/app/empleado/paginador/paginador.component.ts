import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IPaginador } from 'src/app/_helpers/IPaginador';
import { EmpleadoService } from '../../services/http/empleado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  merge,
  startWith,
  switchMap,
  of as observableOf,
  catchError,
  map,
} from 'rxjs';
import { GestionComponent } from 'src/app/area/modal/gestion/gestion.component';
import { InformacionComponent } from '../modal/informacion/informacion.component';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css'],
})
export class PaginadorComponent {
  listaAreas: any[] = [];
  paginador: IPaginador = {
    total: 0,
    encabezados: [
      'ID Empleado',
      'Nombre',
      'Dirección',
      'Edad',
      'Areas',
      'Ingreso',
      'Estatus',
      'Accion',
    ],
    buscar: '',
    max: 10,
  };

  buscar = new EventEmitter<string>();
  charge = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private empleadoSrv: EmpleadoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
    });
    this.buscar.subscribe(() => {
      this.paginator.pageIndex = 0;
    });

    merge(this.sort.sortChange, this.paginator.page, this.buscar)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.charge = true;
          return this.empleadoSrv
            .paginar(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginador.buscar
            )
            .pipe(catchError(() => observableOf(null)));
        }),

        map((resp) => {
          this.charge = false;

          if (!resp.success) {
            this.snackBar.open(
              'No se puede acceder al servicio, por favor reintente',
              'Cerrar',
              {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 5000,
              }
            );

            return [];
          }
          this.paginador.total = resp.total;
          if (resp.total == 0) return [];
          return resp.lista;
        })
      )
      .subscribe((lista) => (this.listaAreas = lista));
  }

  timeout: any;

  buscarTabla(event: any): void {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.paginador.buscar = event.target.value;
      this.buscar.emit(event.target.value);
      clearTimeout(this.timeout);
    }, 500);
  }

  gestionar(nombre?: string, uuid?: string){
    const dialog = this.dialog.open(GestionComponent, {
      data: {
        nombre, uuid
      },
      width: '25%',
      disableClose: true
    })

    dialog.afterClosed().subscribe((guardado?: boolean)=>{
      if(guardado) this.buscar.emit('')
    })
  }

  actualizarEstatus( uuid: string, estatus: number){
    this.charge = true;
    this.empleadoSrv.actualizarEstatus( uuid, estatus).subscribe((resp: any)=>{
      this.charge = false;
      if(!resp.success){
        this.snackBar.open("No se puede actualizar estado, por favor rentente más tarde", "Cerrar", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
        })
        return 
      }
      let mensaje = "El área se activado"
      if(estatus==2) mensaje ="El área se ha deshabilitado"
      if(estatus==3) mensaje ="El área se ha eliminado"

      this.snackBar.open(mensaje, "Cerrar", {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 5000
      })

      this.buscar.emit('')
    }, ()=>{
      this.snackBar.open("Parece que a ocurrido un problema, por favor rentente más tarde", "Cerrar", {
        horizontalPosition: "end",
        verticalPosition: "top",
        duration: 5000
      })
      this.charge = false
    })
  }

  informacion(uuid: string){
    this.dialog.open( InformacionComponent, {
      data: {uuid}, width: '50%'
    })
  }
}
