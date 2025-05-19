import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanesVentaService } from './planesVenta.service';

describe('PlanesVentaService', () => {
  let service: PlanesVentaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ Importante para habilitar HttpClient
      providers: [PlanesVentaService]
    });

    service = TestBed.inject(PlanesVentaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya llamadas HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Puedes agregar más pruebas aquí...
});
