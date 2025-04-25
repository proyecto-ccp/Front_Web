import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private readonly apiUrl = 'https://proveedores-596275467600.us-central1.run.app/api/Ciudades/ListarCiudades';

constructor(private  readonly http: HttpClient) { }
getCiudad(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}
}


