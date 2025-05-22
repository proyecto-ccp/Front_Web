import { Component } from '@angular/core';
import { APP_VERSION } from '../environments/version';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  seleccion: string = '';
  version = APP_VERSION;
  mostrarMenu = true; // <-- ahora es una propiedad booleana

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta el menú en login
        this.mostrarMenu = !event.url.includes('/login');
      }
    });
  }

  ngOnInit() {
    this.mostrarMenu = !!localStorage.getItem('token');
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }

  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.mostrarMenu = false;
    this.router.navigate(['/login']);
    
  }

  esPantallaInicio(): boolean {
    return this.router.url === '/inicio';
  }

  get menuColor(): string {
    return localStorage.getItem('menuColor') || '';
  }
}


