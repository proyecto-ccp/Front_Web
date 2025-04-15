import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Atributos/Materiales';

  constructor(private http: HttpClient) { }

  getMaterial(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}





