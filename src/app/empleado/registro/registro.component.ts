import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';


import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AreaService } from 'src/app/services/http/area.service';
import { EmpleadoService } from 'src/app/services/http/empleado.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [DatePipe],
})
export class RegistroComponent {
  uuid: string | null;
  charge = false;
  usrEdad: Date | null | undefined;
  listaAreas: any[] = [];
  form = this.fb.group({
    uuid: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    paterno: ['', [Validators.required, Validators.minLength(3)]],
    materno: ['', [Validators.minLength(3)]],
    fechaNacimiento: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    areas: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{10}?$/)]],
    correo: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ],
    ],
    calle: ['', [Validators.required, Validators.minLength(3)]],
    exterior: ['', [Validators.required]],
    interior: [''],
    cp: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
    colonia: ['', [Validators.required, Validators.minLength(3)]],
  });

  mostrar: number | any;

  constructor(
    private fb: FormBuilder,
    private areasSrv: AreaService,
    private empleadoSrv: EmpleadoService,
    private datePipe: DatePipe,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute
  ) {
    this.uuid = this.activatedRouter.snapshot.paramMap.get('uuid');

    this.areasSrv.lista().subscribe(
      (resp: any) => {
        if (!resp.success) {
          return;
        }
        this.listaAreas = resp.lista;
      },
      () => {
        this.snackBar.open(
          'Ocurrió un problema en el servicio, inténtelo más tarde.',
          'Cerrar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
      }
    );

    if (this.uuid) {
      this.charge = true;
      this.empleadoSrv.informacion(this.uuid).subscribe(
        (resp: any) => {
          setTimeout(() => {
            this.charge = false;
            this.form.patchValue({
              uuid: resp.informacion.uuid,
              nombre: resp.informacion.nombre,
              paterno: resp.informacion.paterno,
              materno: resp.informacion.materno,
              sexo: resp.informacion.sexo.toString(),
              correo: resp.informacion.correo,
              telefono: resp.informacion.telefono,
              fechaNacimiento: resp.informacion.fechaNacimiento,
              areas: resp.informacion.areas.map((el: any) => {
                return el.uuid;
              }),
              calle: resp.informacion.calle,
              exterior: resp.informacion.exterior,
              interior: resp.informacion.interior,
              cp: resp.informacion.cp,
              colonia: resp.informacion.colonia,
            });
          }, 100);
        },
        () => {
          this.charge = false;
          this.snackBar.open(
            'Ocurrió un problema en el servicio, inténtelo más tarde.',
            'Cerrar',
            {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000,
            }
          );
          this.router.navigateByUrl('/empleado/lista');
        }
      );
    }
  }
  //Prueba
  public getInputValue(inputValue:any){
    console.log( "'" + inputValue + "'");

    let usrValue = new Date(inputValue)
    let fecha = new Date( )
    let act = `${fecha.getDate()}/${('0'+(fecha.getMonth()+1)).slice(-2)}/${fecha.getFullYear()}`;
    console.log(act);
    console.log(usrValue)
  }
  



  registro() {
    if (this.form.invalid) return;
    this.charge = true;
    const data = this.form.value;

    let solicitud = this.empleadoSrv.registrar(
      data.nombre as any,
      data.paterno as any,
      data.materno as any,
      data.sexo as any,
      this.datePipe.transform(data.fechaNacimiento, 'MM/dd/yyyy')!,
      data.calle as any,
      data.exterior as any,
      data.interior as any,
      data.cp as any,
      data.colonia as any,
      data.telefono as any,
      data.correo as any,
      data.areas as any

      );      
      if (this.uuid) {
      solicitud = this.empleadoSrv.modificar(
        this.uuid,
        data.nombre as any,
        data.paterno as any,
        data.materno as any,
        data.sexo as any,
        this.datePipe.transform(data.fechaNacimiento, 'MM/dd/yyyy')!,
        data.calle as any,
        data.exterior as any,
        data.interior as any,
        data.cp as any,
        data.colonia as any,
        data.telefono as any,
        data.correo as any,
        data.areas as any
      );
      console.log(this.uuid);
    }

    solicitud.subscribe(
      (resp: any) => {
        setTimeout(() => {
          this.charge = false;
          if (!resp.success) {
            this.snackBar.open(
              'Ocurrió un problema en el servicio, inténtelo más tarde.',
              'Cerrar',
              {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 5000,
              }
            );
            return;
          }
          const titulo = this.uuid
            ? 'Empleado actualizado'
            : 'Empleado registrado';
          this.snackBar.open(titulo, 'Cerrar', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          });
          this.router.navigateByUrl('/empleado/lista');
        }, 500);
      },
      () => {
        this.charge = false;
        this.snackBar.open(
          'Ocurrió un problema en el servicio, inténtelo más tarde.',
          'Cerrar',
          {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
          }
        );
      }
    );
  }
  
    //Función para la edad
    public edad(usrEdad: any){

      const fec= new Date(usrEdad)
      const act= Date.now()
      const nac =fec.getTime()
      const diferencia= Math.abs(act-nac);
  
      this.mostrar = Math.floor((diferencia / (1000 * 3600 * 24))/(365.25));
      // const noMostrar = Math.abs((diferencia / (1000 * 3600 * 24))/(365.25));
      console.log(nac)
      console.log(this.mostrar)
      // console.log(noMostrar)
  
      return this.mostrar
    }

  imprimir(){
    console.log(this.form)
  }

}
