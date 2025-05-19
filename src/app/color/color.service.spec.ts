import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ColorService } from './color.service';
import { environment } from 'src/environment';

describe('ColorService', () => {
  let service: ColorService;
  let httpMock: HttpTestingController;

  // Configuración del entorno de prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Necesario para probar servicios con HttpClient
      providers: [ColorService]
    });
    service = TestBed.inject(ColorService); // Obtención del servicio
    httpMock = TestBed.inject(HttpTestingController); // Obtención del controlador de las solicitudes HTTP
  });

  // Limpieza después de cada prueba para asegurarse de que no haya solicitudes no manejadas
  afterEach(() => {
    httpMock.verify();
  });

  // Prueba que verifica que el servicio realiza correctamente la solicitud GET
  it('should retrieve colors from the API', () => {
    const mockColors = ['Red', 'Green', 'Blue']; // Simulación de respuesta esperada del backend

    service.getColor().subscribe(colors => {
      expect(colors).toEqual(mockColors); // Verifica que la respuesta coincida con la simulada
    });

    // Simulación de la solicitud HTTP GET
    const req = httpMock.expectOne(`${environment.apiUrlAt}/api/Atributos/Productos/colores`);
    expect(req.request.method).toBe('GET'); // Verifica que la solicitud sea un GET
    req.flush(mockColors); // Simula la respuesta de la API con los colores

  });

  // Prueba que maneja correctamente un error de la API
  it('should handle error when the API fails', () => {
    const errorMessage = 'Error fetching colors';

    service.getColor().subscribe(
      () => fail('expected an error, not colors'),
      (error) => {
        expect(error.status).toBe(500); // Verifica el código de estado HTTP
        expect(error.statusText).toBe('Internal Server Error'); // Verifica el texto del estado HTTP
        expect(error.error).toBe(errorMessage); // Verifica que el mensaje de error sea el esperado
      }
    );

    // Simulación de una solicitud HTTP que falla
    const req = httpMock.expectOne(`${environment.apiUrlAt}/api/Atributos/Productos/colores`);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' }); // Simula el error 500
  });
});