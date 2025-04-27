import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private readonly apiUrl = environment.apiUrlAt+'/api/Atributos/Localizacion/Ciudades';
  

constructor(private  readonly http: HttpClient) { }
getCiudad(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}
}


