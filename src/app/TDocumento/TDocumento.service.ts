import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class TDocumentoService {
  apiURL=environment.apiUrlAt+'/api/Atributos/TiposDocumento'

constructor(private http: HttpClient) { }
getTDcoumento(): Observable<any> {
  return this.http.get<any>(this.apiURL);
}

}
