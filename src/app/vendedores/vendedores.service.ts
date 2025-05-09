import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class vendedorService {
 
  private readonly apiUrl = environment.apiUrlVe+'/api/Vendedor';
  private readonly addPlanV=environment.apiUrlCP
constructor(private http: HttpClient) { 

}
guardarVendedores(vendedor: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/Crear`, vendedor);
}
obtenerVendedores(): Observable<any>{
  return this.http.get<any>(`${this.apiUrl}/Consultar`)

}
agregarVendedores(planId: string, idVendedor: { idVendedor: string }[]): Observable<any> {
  const url = `${this.addPlanV}/api/PlanesVentas/${planId}/Vendedores`;
  

  return this.http.post(url, idVendedor, {
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  });
}
}