import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrlLo + '/api/Usuarios/Login'; // Asegúrate de que esto sea el URL correcto

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer una solicitud POST a la API de Login y retornar un token válido', () => {
    const mockResponse = {
      token: 'token123',
      menu: 'dark',
      resultado: 1,
      mensaje: 'Login exitoso',
      status: 1
    };

    const loginRequest = {
      username: 'testuser',
      contrasena: 'password123',
      aplicacion: 1
    };

    service.login('testuser', 'password123').subscribe(response => {
      expect(response.token).toBe(mockResponse.token);
      expect(response.menu).toBe(mockResponse.menu);
      expect(response.resultado).toBe(mockResponse.resultado);
      expect(response.mensaje).toBe(mockResponse.mensaje);
      expect(response.status).toBe(mockResponse.status);
    });

    // Simular la solicitud HTTP y la respuesta
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest); // Verifica que los datos enviados sean correctos

    // Responder con la respuesta simulada
    req.flush(mockResponse);
  });

  it('debería manejar errores al hacer la solicitud POST de Login', () => {
    const errorMessage = 'Error en la conexión';

    service.login('testuser', 'password123').subscribe({
      next: () => fail('La solicitud no debería haber sido exitosa'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
        expect(error.error).toBe(errorMessage);
      }
    });

    // Simular un error en la solicitud
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});