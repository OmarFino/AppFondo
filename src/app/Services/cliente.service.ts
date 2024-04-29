import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../Interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private endpoint:string = environment.endPoint
  private apiUrl:string = this.endpoint + "api/cliente/"

  constructor(private http:HttpClient) { }

  getList():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`)
  }

  // putFondoCliente(data: any): Observable<any> {
        
  //   return this.http.put<any>(`${this.apiUrl}`, data);
  // }

  putFondoCliente(id: string, idFondo: string, valor: string): Observable<any> {
    const url = `${this.apiUrl}${id}/${idFondo}/${valor}`;
    return this.http.put<any>(url, {});
  }

}
