import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  post(path: string, data: any, objHeaders: any = null): Observable<any> {
    console.log(`${environment.http.server}${path}`)
    console.log(data)
    let headers = new HttpHeaders(objHeaders);
    return this.http.post(`${environment.http.server}${path}`, data, {
      headers,
    });
  }

  get(
    path: string,
    query: string = '',
    objHeaders: any = null
  ): Observable<any> {
    console.log(`${environment.http.server}${path}${query}`);
    let headers = new HttpHeaders(objHeaders);
    return this.http.get(`${environment.http.server}${path}${query}`, {
      headers,
    });
  }

  put(path: string, data: any, objHeaders: any = null): Observable<any> {
    console.log(`${environment.http.server}${path}`)
    let headers = new HttpHeaders(objHeaders);
    return this.http.put(`${environment.http.server}${path}`, data, {
      headers,
    });
  }

  patch(path: string, data: any, objHeaders: any = null): Observable<any> {
    // console.log(path, data)
    console.log(`${environment.http.server}${path}${data}`)
    let headers = new HttpHeaders(objHeaders);
    return this.http.patch(`${environment.http.server}${path}${data}`, {
      headers
    });
  }
}
