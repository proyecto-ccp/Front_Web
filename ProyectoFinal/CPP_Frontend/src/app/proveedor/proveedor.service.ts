import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Atributos/proveedor';

  constructor(private http: HttpClient) { }
  getProveedor(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}





