import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ZonasService } from './zonas.service';
import { environment } from 'src/environment';

describe('ZonasService', () => {
  let service: ZonasService;
  let httpMock: HttpTestingController;

  const apiUrlAt = environment.apiUrlAt + '/api/Atributos/Localizacion/Ciudad/123/Zonas'; // URL que se construye en el servicio

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ZonasService]
    });
    service = TestBed.inject(ZonasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer una solicitud GET a la API para obtener zonas por ciudad', () => {
    const mockZonas = [
      { id: '1', nombre: 'Zona 1' },
      { id: '2', nombre: 'Zona 2' }
    ];

    service.getZonas('123').subscribe((zonas) => {
      expect(zonas).toEqual(mockZonas); // Compara la respuesta con la respuesta esperada
    });

    // Simula la solicitud HTTP y la respuesta
    const req = httpMock.expectOne(apiUrlAt);
    expect(req.request.method).toBe('GET'); // Verifica que la solicitud sea GET
    req.flush(mockZonas); // Responde con los datos simulados
  });

  it('debería manejar el error si la solicitud GET falla', () => {
    const errorMessage = 'Error al obtener las zonas';

    service.getZonas('123').subscribe({
      next: () => fail('La solicitud no debería haber sido exitosa'),
      error: (error) => {
        expect(error.status).toBe(500); // Código de error esperado
        expect(error.statusText).toBe('Internal Server Error'); // Mensaje de error esperado
        expect(error.error).toBe(errorMessage); // Mensaje de error esperado
      }
    });

    // Simula una respuesta de error
    const req = httpMock.expectOne(apiUrlAt);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});