import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private authService: AuthGuard, private router: Router) { }

  ngOnInit() {
    if (this.authService.isTokenExpired()) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

}
