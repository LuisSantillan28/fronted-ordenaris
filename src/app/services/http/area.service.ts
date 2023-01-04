import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from './request.service';
//Ordena los datos 
import { SortDirection } from '@angular/material/sort';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private req: RequestService) {}

  //Función para hacer la paginación  de las áreas

  paginar(
    sort: string,
    order: SortDirection,
    page: number,
    search: string = ''
  ): Observable<any> {
    //Se define para acumular páginas
    page++;
    return this.req.get(
      environment.http.area.paginar,
      `?sort=${sort}&order=${order}&page=${page}&search=${search}`
    );
  }

  //Lista de las areas
  lista(): Observable<any> {
    return this.req.get(environment.http.area.lista);
  }

  //
  registrar(nombre: string): Observable<any> {
    return this.req.post(environment.http.area.registro, {
      nombre,
    });
  }

  modificar(uuid: string, nombre: string): Observable<any> {
    return this.req.put(
      environment.http.area.modificar.replace('#uuid#', uuid),
      {
        nombre,
      }
    );
  }

  actualizarEstatus(uuid: string, estatus: number): Observable<any>{
    return this.req.patch(environment.http.area.actualizarEstatus.replace("uuid", uuid), `?estatus=${estatus}`)
  }

  informacion(uuid: string): Observable<any>{
    return this.req.get(environment.http.area.informacion.replace("uuid", uuid))
  }
}
