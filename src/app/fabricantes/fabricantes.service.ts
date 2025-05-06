import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class FabricantesService {
  private  apiUrl = environment.apiUrlfa+'/api/Proveedores/Crear'; 
  private apiUrlL='';

constructor(private readonly  http: HttpClient) { }
guardarProveedores(proveedor: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, proveedor);
}
getProveedores(): Observable<any> {
  this.apiUrlL=environment.apiUrlfa+'/api/Proveedores/Listar'
  return this.http.get<any>(this.apiUrl);
}

}



