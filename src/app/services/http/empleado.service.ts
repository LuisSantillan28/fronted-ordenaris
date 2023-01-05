import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private req: RequestService
  ) { }

  paginar(sort: string, order: SortDirection, page: number, search: string=""): Observable<any>{
    page++
    return this.req.get( environment.http.empleado.paginar, `?sort=${sort}&order=${order}&page${page}&search=${search}`)
  }
}
