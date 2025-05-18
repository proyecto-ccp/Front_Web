import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: spy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    localStorage.clear(); // Limpia entre pruebas
  });

  it('should allow activation if token exists', () => {
    localStorage.setItem('token', 'test-token');
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should block activation and redirect if token does not exist', () => {
    localStorage.removeItem('token');
    
    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});