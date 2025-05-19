import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class vendedorService {
 
  private readonly apiUrl = environment.apiUrlVe+'/api/Vendedor';
  private readonly addPlanV=environment.apiUrlCP
  private readonly urlRe=environment.apiUrlRe+'/api/Vendedor/ReporteVentas'
constructor(private http: HttpClient) { 

}
guardarVendedores(vendedor: any): Observable<any> {
  const idusuario = localStorage.getItem('idusuario');
  vendedor.idUsuario=idusuario;
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
getReporteVentas(idVendedor: string, fechaInicio: string, fechaFin: string): Observable<any> {
  // Cuerpo de la solicitud (JSON)
  const body = {
    idVendedor: idVendedor,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin
  };

  // Configuración de los encabezados
  const headers = new HttpHeaders()
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json');

  // Realizamos la solicitud POST
  return this.http.post(this.urlRe, body, { headers });
}
}