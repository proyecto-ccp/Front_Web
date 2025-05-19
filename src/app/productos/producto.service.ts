import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private crearUrl = environment.apiUrl+'/api/Productos/Crear';
  private consultarUrl = environment.apiUrl+'/api/Productos/Consultar';
  private archivoUrl = environment.apirlArch+'/api/Archivos/EnviarPlanoCsv';
  private addPlanV=environment.apiUrlCP+'/api/PlanesVentas';
  private bodegasUrl=environment.apiUrl+'/api/Productos'

  constructor(private readonly http: HttpClient) {}

  guardarProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.crearUrl, producto, {
      headers: this.getAuthHeaders()
    });
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('File', file); // Asegúrate de usar 'File' con mayúscula si el backend lo espera así
    
    const token = localStorage.getItem('token');
    formData.append('Control.Token', '');
    console.log('token'+token);
    const headers = new HttpHeaders({
      'Accept': 'text/plain',
      'Authorization': `Bearer ${token}` // Agrega el token en el header
    });
  
    return this.http.post<any>(this.archivoUrl, formData, { headers });
  }

  obtenerProductos(): Observable<any> {
    return this.http.get<any>(this.consultarUrl, {
      headers: this.getAuthHeaders()
    });
  }
  agregarProductos(planId: string, productos: { idProducto: number; valorTotal: number }[]): Observable<any> {
    
    const url = `${this.addPlanV}/${planId}/Productos`;
    return this.http.post(url, productos, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });
  }
  getBodegas(productoId: number): Observable<any> {
   
    const url = `${this.bodegasUrl}/${productoId}/bodegas`;
    console.log("URLBODEGAS"+url);
    return this.http.get<any>(url);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // O sessionStorage
    console.log('token'+token)
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }
}