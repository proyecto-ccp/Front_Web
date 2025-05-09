import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';



@Injectable({
  providedIn: 'root'
})
export class PlanesVentaService {
  private readonly apiUrl = environment.apiUrlCP+'/api/PlanesVentas';

constructor(private http: HttpClient) { }

guardarPlan(plan: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, plan);
}
ObtenerPlan():Observable<any>{
  return this.http.get<any[]>(`${this.apiUrl}`);
}
consultarProductosPlan(planId:string):Observable<any>{
  return this.http.get<any[]>(`${this.apiUrl}/${planId}/Productos`);
}

  
}





