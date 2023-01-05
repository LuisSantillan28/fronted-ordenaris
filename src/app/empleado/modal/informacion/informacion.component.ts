import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpleadoService } from 'src/app/services/http/empleado.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  charge = false;
  empleadoInformacion: any;

  constructor(
    private empleadoSrv: EmpleadoService,
    private snackBar: MatSnackBar,
    @Inject( MAT_DIALOG_DATA) private empleado: any
  ){}

  ngOnInit(): void{
    this.charge = true
    this.empleadoSrv.informacion( this.empleado.uuid).subscribe( (resp:any) => {
      setTimeout(()=>{
        this.charge = false;

        if(!resp.success){
          this.snackBar.open("Servicio no disponible", "Cerrar", {
          horizontalPosition: "end",
          verticalPosition: "top",
          duration: 5000
        })
        return
    }this.empleadoInformacion = resp.informacion;
  },500);
  }, () => {
    this.snackBar.open("No es posible acceder al servicio", "Cerrar", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000
    })
    this.charge = false
  })
  }
}
