import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class vendedorService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Vendedor/Crear';
constructor(private http: HttpClient) { 

}
guardarVendedores(vendedor: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, vendedor);
}
}