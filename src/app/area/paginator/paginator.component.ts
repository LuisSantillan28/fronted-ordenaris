import { Component, EventEmitter, ViewChild } from '@angular/core';

import { AreaService } from '../../services/http/area.service';
import { IPaginador } from '../../_helpers/IPaginador';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

  listaAreas: any[] = []
  paginador: IPaginador = {
    total: 0,
    encabezados: ['nombre', 'empleados', 'estatus', 'accion'],
    buscar: "",
    max: 10
  }

  buscar = new EventEmitter<string>();
  cargando = true;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort

  constructor(
    private areaSrv: AreaService,
    // private snackBar: MatSnackBar,
    // private dialog: MatDialog
  ){
  }

  ngAfterViewInit():
}
