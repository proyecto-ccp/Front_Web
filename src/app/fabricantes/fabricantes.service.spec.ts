import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FabricantesService } from './fabricantes.service';
import { environment } from 'src/environment';

describe('FabricantesService', () => {
  let service: FabricantesService;
  let httpMock: HttpTestingController;

  const apiUrlCrear = `${environment.apiUrlfa}/api/Proveedores/Crear`;
  const apiUrlListar = `${environment.apiUrlfa}/api/Proveedores/Listar`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FabricantesService]
    });
    service = TestBed.inject(FabricantesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('debería guardar un proveedor correctamente', () => {
    const proveedorMock = { id: '1', nombre: 'Proveedor A', categoria: 'Electrónica' };

    service.guardarProveedores(proveedorMock).subscribe(response => {
      expect(response).toEqual(proveedorMock);
    });

    // Verifica que se haya realizado la solicitud POST con la URL correcta
    const req = httpMock.expectOne(apiUrlCrear);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(proveedorMock);

    // Simula la respuesta con datos mockeados
    req.flush(proveedorMock);
  });

  it('debería listar los proveedores correctamente', () => {
    const proveedoresMock = [
      { id: '1', nombre: 'Proveedor A', categoria: 'Electrónica' },
      { id: '2', nombre: 'Proveedor B', categoria: 'Ropa' }
    ];

    service.getProveedores().subscribe(response => {
      expect(response).toEqual(proveedoresMock);
      expect(response.length).toBe(2);
    });

    // Verifica que se haya realizado la solicitud GET con la URL correcta
    const req = httpMock.expectOne(apiUrlListar);
    expect(req.request.method).toBe('GET');

    // Simula la respuesta con los proveedores mockeados
    req.flush(proveedoresMock);
  });
});