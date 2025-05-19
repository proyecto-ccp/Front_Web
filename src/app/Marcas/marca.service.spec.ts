import { TestBed } from '@angular/core/testing';
import { MarcaService } from './marca.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment';

describe('MarcaService', () => {
  let service: MarcaService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrlAt + '/api/Atributos/Productos/Marcas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarcaService]
    });

    service = TestBed.inject(MarcaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET to fetch marcas', () => {
    const dummyMarcas = [
      { id: 1, nombre: 'Marca 1' },
      { id: 2, nombre: 'Marca 2' }
    ];

    service.getMarcas().subscribe((marcas) => {
      expect(marcas).toEqual(dummyMarcas);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMarcas);
  });

  it('should handle error response from getMarcas', () => {
    const errorMessage = 'Error en el servidor';

    service.getMarcas().subscribe({
      next: () => fail('Debería fallar'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});