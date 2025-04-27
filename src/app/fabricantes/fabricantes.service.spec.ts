import { TestBed } from '@angular/core/testing';
import { FabricantesService } from './fabricantes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environment';


describe('FabricantesService', () => {
  let service: FabricantesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Importa HttpClientTestingModule aquí
      providers: [FabricantesService]
    });

    service = TestBed.inject(FabricantesService);  // Obtiene la instancia del servicio
    httpMock = TestBed.inject(HttpTestingController);  // Obtiene la instancia de HttpTestingController
  });

  it('should be created', () => {
    expect(service).toBeTruthy();  // Comprobamos que el servicio fue creado correctamente
  });

  it('should fetch fabricantes from API', () => {
    const mockResponse = [{ id: 1, nombre: 'Fabricante1' }, { id: 2, nombre: 'Fabricante2' }];
    
    // Llamamos al método del servicio que hace una solicitud HTTP
    service.getProveedores().subscribe(fabricantes => {
      expect(fabricantes.length).toBe(2);
      expect(fabricantes).toEqual(mockResponse);
    });

    // Simulamos la respuesta de la solicitud HTTP

    const req = httpMock.expectOne(environment.apiUrl+'/api/Proveedores/Listar');  // Verifica que la URL solicitada sea correcta

    expect(req.request.method).toBe('GET');  // Verifica que sea un método GET
    req.flush(mockResponse);  // Simula la respuesta con los datos mockeados
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpMock.verify();
  });
});