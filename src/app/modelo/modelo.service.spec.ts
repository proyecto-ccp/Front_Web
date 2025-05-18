import { TestBed } from '@angular/core/testing';
import { ModeloService } from './modelo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment';

describe('ModeloService', () => {
  let service: ModeloService;
  let httpMock: HttpTestingController;

  const dummyResponse = {
    modelos: [
      { id: 1, nombre: 'Modelo A' },
      { id: 2, nombre: 'Modelo B' }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModeloService]
    });

    service = TestBed.inject(ModeloService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch modelos via GET', () => {
    service.getModelo().subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrlAt}/api/Atributos/Productos/Modelos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});