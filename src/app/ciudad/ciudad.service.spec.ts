import { TestBed } from '@angular/core/testing';
import { CiudadService } from './ciudad.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment';

describe('CiudadService', () => {
  let service: CiudadService;
  let httpMock: HttpTestingController;

  const mockResponse = [
    { id: 1, nombre: 'Bogotá' },
    { id: 2, nombre: 'Medellín' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiudadService]
    });

    service = TestBed.inject(CiudadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve cities from the API via GET', () => {
    service.getCiudad().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrlAt}/api/Atributos/Localizacion/Ciudades`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});