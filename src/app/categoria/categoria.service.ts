import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiUrlAt+'/api/Atributos/Productos/Categorias';

  constructor(private  readonly http: HttpClient) { }

  getCategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}





