import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// Definimos la interfaz LoginResponse para la respuesta de login
interface LoginResponse {
  resultado: number;
  mensaje: string;
  token: string;
  menu: string;
  status: number;
  idusuario:string; 
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // llama a ngOnInit
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario inválido si campos están vacíos', () => {
    component.loginForm.setValue({ username: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('formulario válido con valores correctos', () => {
    component.loginForm.setValue({ username: 'usuario', password: 'clave' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('debería iniciar sesión exitosamente con credenciales correctas', () => {
    const mockResponse: LoginResponse = {
        resultado: 1,
        mensaje: 'Inicio de sesión exitoso',
        token: 'fake-token',
        menu: 'menu-azul',
        status: 200,
        idusuario: '12345678-abcd-efgh-ijkl-987654321000' // 👈 Obligatorio
      };

    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({ username: 'usuario', password: 'clave' });
    component.iniciarSesion();

    expect(authServiceSpy.login).toHaveBeenCalledWith('usuario', 'clave');
    expect(localStorage.getItem('auth')).toBe('true');
    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('menuColor')).toBe('oscuro');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/inicio']);
  });

  it('debería manejar errores de red correctamente', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Network error')));

    component.loginForm.setValue({ username: 'usuario', password: 'clave' });
    component.iniciarSesion();

    expect(component.error).toBe('Error en la conexión. Intenta más tarde.');
  });
});