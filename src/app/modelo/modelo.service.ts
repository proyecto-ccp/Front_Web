import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  private apiUrl = environment.apiUrlAt+'/api/Atributos/Productos/Modelos';

constructor(private http: HttpClient) { }
 // Método para obtener las marcas
 getModelo(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}
}


