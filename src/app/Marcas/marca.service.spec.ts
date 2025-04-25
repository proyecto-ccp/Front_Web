import { TestBed } from '@angular/core/testing';
import { MarcaService } from './marca.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('MarcaService', () => {
  let service: MarcaService;
  let httpMock: HttpTestingController;  // Para manejar las solicitudes HTTP durante las pruebas

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Aquí es donde se proporciona el módulo HttpClientTestingModule
      providers: [MarcaService]
    });

    service = TestBed.inject(MarcaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Comprobamos que el servicio se haya creado correctamente
  });

  // Si tienes otros tests que hagan peticiones HTTP, puedes usar httpMock para manejar las solicitudes

  afterEach(() => {
    // Verifica si alguna solicitud HTTP no fue manejada
    httpMock.verify();
  });
});