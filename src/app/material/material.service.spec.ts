import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MaterialService } from './material.service';
import { environment } from 'src/environment';

// Datos mock para el test
const mockMateriales = [
  { id: 1, nombre: 'Acero' },
  { id: 2, nombre: 'Plástico' }
];

describe('MaterialService', () => {
  let service: MaterialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas para HttpClient
      providers: [MaterialService] // Proveedor del servicio que se va a probar
    });

    service = TestBed.inject(MaterialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Asegurarse de que no quedan solicitudes pendientes después de cada prueba
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get materials', () => {
    // Llamar al método que se quiere probar
    service.getMaterial().subscribe((materials) => {
      expect(materials).toEqual(mockMateriales); // Verificar que los materiales obtenidos sean correctos
    });

    // Configurar el mock de la solicitud HTTP
    const req = httpMock.expectOne(`${environment.apiUrlAt}/api/Atributos/Productos/Materiales`);
    expect(req.request.method).toBe('GET'); // Asegurarse de que la solicitud sea de tipo GET

    // Simular la respuesta con los datos mock
    req.flush(mockMateriales);
  });

  it('should handle error', () => {
    const errorMessage = 'Error fetching materials';
  
    service.getMaterial().subscribe(
      () => fail('expected an error, not materials'),
      (error) => {
        // Asegurarse de que el mensaje de error coincida
        expect(error.error).toBe(errorMessage);  // Verificar que el error contenga el mensaje esperado
      }
    );
  
    // Configurar el mock de la solicitud HTTP para que falle
    const req = httpMock.expectOne(`${environment.apiUrlAt}/api/Atributos/Productos/Materiales`);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' }); // Simular un error 500
  });
});
