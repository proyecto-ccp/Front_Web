import { TestBed } from '@angular/core/testing';
import { RutaserviceService } from './rutaservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environment';

describe('RutaserviceService', () => {
  let service: RutaserviceService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrlRu + '/api/Rutas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RutaserviceService]
    });

    service = TestBed.inject(RutaserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to guardarRutas', () => {
    const dummyRuta = {
      direccionOrigen: 'Origen',
      direccionDestino: 'Destino',
      tipoEntrega: 'Express',
      metodoTransporte: 'Camión'
    };

    service.guardarRutas(dummyRuta).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyRuta);
    req.flush({ success: true });
  });

  it('should send GET request to obtenerRutas', () => {
    const mockResponse = {
      rutas: [
        { id: 1, direccionOrigen: 'A', direccionDestino: 'B' }
      ]
    };

    service.obtenerRutas().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});