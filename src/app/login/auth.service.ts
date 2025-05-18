import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

interface LoginRequest {
  username: string;
  contrasena: string;
  aplicacion: number;
}

interface LoginResponse {
  token: string;
  menu: string;
  resultado: number;
  mensaje: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrlLo+'/api/Usuarios/Login'; // <-- reemplaza TU_AMBIENTE

  constructor(private http: HttpClient) {}

  login(username: string, contrasena: string): Observable<LoginResponse> {
    const body: LoginRequest = {
      username,
      contrasena,
      aplicacion: 1 // Token tipo 1: web
    };

    return this.http.post<LoginResponse>(this.apiUrl, body);
  }
}