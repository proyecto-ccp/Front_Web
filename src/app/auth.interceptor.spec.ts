import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should add Authorization header', () => {
    // Simula token en el localStorage
    localStorage.setItem('token', 'fake-token');

    const httpRequestSpy = new HttpRequest('GET', '/test');
    const httpHandlerMock: HttpHandler = {
      handle: (req: HttpRequest<any>) => {
        // Aquí validas que se haya añadido el header
        expect(req.headers.get('Authorization')).toBe('Bearer fake-token');
        return of({} as HttpEvent<any>);
      }
    };

    interceptor.intercept(httpRequestSpy, httpHandlerMock).subscribe();
  });
});