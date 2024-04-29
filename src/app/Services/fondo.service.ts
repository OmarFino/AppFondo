import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Fondo } from '../Interfaces/fondo';

@Injectable({
  providedIn: 'root'
})
export class FondoService {

  private endpoint:string = environment.endPoint
  private apiUrl:string = this.endpoint + "api/fondo"

  constructor(private http:HttpClient) { }

  getList():Observable<Fondo[]>{
    return this.http.get<Fondo[]>(`${this.apiUrl}`)
  }
}
