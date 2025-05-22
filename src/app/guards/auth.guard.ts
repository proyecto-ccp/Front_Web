import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log("token"+token);
    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está logueado
      return false;
    }
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return true;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now >= exp;
    } catch (e) {
      return true; // Si falla la decodificación, lo tratamos como expirado
    }
  }
}