import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private readonly apiUrl = environment.apiUrlAt+'/api/Atributos/Localizacion/Paises';
  

constructor(private  readonly http: HttpClient) { }
getPaises(): Observable<any>{
  return this.http.get<any>(this.apiUrl);
}

getIndicativoPais(idPais: number): Observable<any>{
  return this.http.get(`${this.apiUrl}/${idPais}`);
}

}






