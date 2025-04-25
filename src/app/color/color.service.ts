import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Atributos/colores';

constructor(private readonly http: HttpClient) { }

getColor(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}

}





  