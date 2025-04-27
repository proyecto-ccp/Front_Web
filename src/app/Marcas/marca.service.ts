import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = environment.apiUrlAt+'/api/Atributos/Productos/Marcas';

  constructor(private http: HttpClient) {}

  // Método para obtener las marcas
  getMarcas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}