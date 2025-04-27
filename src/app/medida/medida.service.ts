import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {
  private apiUrl = environment.apiUrlAt+'/api/Atributos/Productos/Medidas';

constructor(private http: HttpClient) { }

getMedida(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}
}






