import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  ngOnInit() {
   this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  
    this.loginForm.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
      console.log('Errores username:', this.loginForm.get('username')?.errors);
      console.log('Errores contrasena:', this.loginForm.get('password')?.errors);
    }); 
  }
  iniciarSesion(): void {
   // if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        if (res.resultado === 1) {
          localStorage.setItem('auth', 'true');
          localStorage.setItem('token', res.token);
          localStorage.setItem('menuColor', res.menu);
          localStorage.setItem('idusuario', res.idusuario);
          this.router.navigate(['/inicio']);
        } else {
          this.error = res.mensaje;
        }
      },
      error: () => {
        this.error = 'Credenciales incorrectas';
      }
    }); 
    //if(username=='mariascoth@gmail.com'&& password == 'mariascoth@gmail.com'){
    /*  localStorage.setItem('auth', 'true');
      localStorage.setItem('token', 'qweekejr');
      localStorage.setItem('menuColor', 'negro');
      this.router.navigate(['/inicio']);*/
   // }
  } 
}
