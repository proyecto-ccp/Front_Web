import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class vendedorService {
 
  private readonly apiUrl = environment.apiUrlVe+'/api/Vendedor/Crear';
constructor(private http: HttpClient) { 

}
guardarVendedores(vendedor: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, vendedor);
}
}