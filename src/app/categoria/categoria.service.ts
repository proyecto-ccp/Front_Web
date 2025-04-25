import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Atributos/Categorias';

  constructor(private  readonly http: HttpClient) { }

  getCategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}





