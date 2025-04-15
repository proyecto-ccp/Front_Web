import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Atributos/Marcas';

  constructor(private http: HttpClient) {}

  // Método para obtener las marcas
  getMarcas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}