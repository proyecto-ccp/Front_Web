import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private apiUrl = environment.apiUrl+'/api/Atributos/colores';

constructor(private readonly http: HttpClient) { }

getColor(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}

}





  