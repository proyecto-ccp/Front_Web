import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService {
  private  apiUrl = 'https://proveedores-596275467600.us-central1.run.app/api/Proveedores/Crear' 

constructor(private readonly  http: HttpClient) { }
guardarProveedores(proveedor: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, proveedor);
}
getProveedores(): Observable<any> {
  this.apiUrl='https://proveedores-596275467600.us-central1.run.app/api/Proveedores/Listar'
  return this.http.get<any>(this.apiUrl);
}

}



