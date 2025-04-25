import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TDocumentoService {
  apiURL='https://proveedores-596275467600.us-central1.run.app/api/Documentos/TiposDocumento'

constructor(private http: HttpClient) { }
getTDcoumento(): Observable<any> {
  return this.http.get<any>(this.apiURL);
}

}
