import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AreaService } from '../../../services/http/area.service';

//Elementos
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {
  charge: boolean = false;
  titulo = 'Registro';
  form = this.fb.group({
    uuid: [' '],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private fb: FormBuilder,
    private areaSrv: AreaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<GestionComponent>,
    @Inject(MAT_DIALOG_DATA) private area: any
  ) {}

  ngOnInit(): void {
    if (this.area.uuid) {
      this.titulo = 'Actualización de área';
      this.form.patchValue({
        uuid: this.area.uuid,
        nombre: this.area.nombre,
      });
    }
  }

  registro() {
    if (this.form.invalid) return;
    this.charge = true;
    let solicitud = this.form.value.uuid
      ? this.areaSrv.modificar(
          this.form.value.uuid,
          this.form.value.nombre as any
        )
      : this.areaSrv.registrar(this.form.value.nombre as any);
    solicitud.subscribe(
      (resp: any) => {
        setTimeout(() => {
          this.charge = false;
          if (!resp.success) {
            this.snackBar.open(
              'No pudo ser registrado el usuario',
              'Cerrar',
              {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 5000,
              }
            );
            return;
          }

          let titulo = this.form.value.uuid
            ? 'Actualización exitosa'
            : 'Registro exitoso';
          this.snackBar.open(titulo, 'cerrar', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.dialogRef.close(true);
        }, 1000);
      },
      () => {
        this.snackBar.open(
          'Servicio no disponible, intente de nuevo dd',
          'Cerrar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          }
        );

        this.charge = false;
      }
    );
  }
}
