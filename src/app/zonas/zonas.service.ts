import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  

  constructor(private http: HttpClient) { }

  // Método que hace la solicitud GET a la API
  getZonas(idCiudad: string): Observable<any> {
    const apiUrlAt = environment.apiUrlAt+`/api/Atributos/Localizacion/Ciudad/${idCiudad}/Zonas`; // Usa backticks (`` ` ``) para interpolar el valor
    return this.http.get<any>(apiUrlAt); // Aquí se hace la solicitud a la URL construida
  }
}