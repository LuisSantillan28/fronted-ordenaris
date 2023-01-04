import { Component, Inject, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaService } from 'src/app/services/http/area.service';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
})
export class InformacionComponent implements OnInit {
  charge = true;
  areaInformation: any;

  constructor(
    private snackBar: MatSnackBar,
    private areaSrv: AreaService,
    @Inject(MAT_DIALOG_DATA) private area: any
  ) {}

  ngOnInit(): void {
    this.areaSrv.informacion(this.area.uuid).subscribe(
      (resp: any) => {
        setTimeout(() => {
          this.charge = false;
          if (!resp.success) {
            this.snackBar.open(
              'No se puede acceder al servicio, reintente',
              'Cerrar',
              {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 5000,
              }
            );
            return;
          }

          this.areaInformation = resp.information;
        }, 500);
      },
      () => {
        this.snackBar.open(
          'Algo salió mal, por favor vuelve a intentarlo',
          'Cerrar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
        this.charge = true;
      }
    );
  }
}
