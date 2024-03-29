import { Component, EventEmitter, ViewChild } from '@angular/core';

import { AreaService } from '../../services/http/area.service';
import { IPaginador } from '../../_helpers/IPaginador';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, startWith, switchMap } from 'rxjs';
import { merge, of as observableOf } from 'rxjs';
import { GestionComponent } from '../modal/gestion/gestion.component';
import { InformacionComponent } from '../modal/informacion/informacion.component';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  listaAreas: any[] = [];
  paginador: IPaginador = {
    total: 0,
    encabezados: ['nombre', 'empleados', 'estatus', 'accion'],
    buscar: '',
    max: 5
  };

  buscar = new EventEmitter<string>();
  charge = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private areaSrv: AreaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.buscar.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page, this.buscar)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.charge = true;
          return this.areaSrv
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
              'Sucedió algo inesperado, reintentar',
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

  gestionar(nombre?: string, uuid?: string) {
    const dialog = this.dialog.open(GestionComponent, {
      data: {
        nombre,
        uuid,
      },
      width: '25%',
      disableClose: true,
    });

    dialog.afterClosed().subscribe((guardar?: boolean) => {
      if (guardar) this.buscar.emit('');
    });
  }

  actualizarEstatus(uuid: string, estatus: number) {
    console.log(uuid, estatus)
    this.charge = true;
    this.areaSrv.actualizarEstatus(uuid, estatus).subscribe(
      (resp: any) => {
        this.charge = false;
        if (!resp.success) {
          this.snackBar.open('Servicio no disponible, reintente', 'Cerrar', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          });
          return;
        }
        let mensaje = 'Área activada';

        if (estatus == 2) mensaje = 'Area desactivada';
        if (estatus == 3) mensaje = 'Area eliminada';
        this.snackBar.open(mensaje, 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        });
        this.buscar.emit('');
      },
      () => {
        this.snackBar.open('Servicio Fallido, reintente', 'Cerrar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        });
        this.charge = false;
      }
    );
  }

  informacion(uuid: string) {
    this.dialog.open(InformacionComponent, {
      data: {
        uuid,
      },
      width: '50%',
    });
  }
}
