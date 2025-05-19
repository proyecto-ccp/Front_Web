/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { vendedorService } from './vendedores.service';
import { environment } from 'src/environment';

describe('vendedorService', () => {
  let service: vendedorService;
  let httpMock: HttpTestingController;

  const apiUrlVe = environment.apiUrlVe + '/api/Vendedor';
  const addPlanV = environment.apiUrlCP + '/api/PlanesVentas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [vendedorService]
    });
    service = TestBed.inject(vendedorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería hacer una solicitud POST para guardar vendedores', () => {
    const mockVendedor = { nombre: 'Juan', apellido: 'Pérez' };
    const mockResponse = { mensaje: 'Vendedor creado exitosamente' };

    service.guardarVendedores(mockVendedor).subscribe(response => {
      expect(response).toEqual(mockResponse); // Compara la respuesta con el mock
    });

    // Simula la solicitud HTTP y la respuesta
    const req = httpMock.expectOne(`${apiUrlVe}/Crear`);
    expect(req.request.method).toBe('POST'); // Verifica que la solicitud sea POST
    expect(req.request.body).toEqual(mockVendedor); // Verifica el cuerpo de la solicitud
    req.flush(mockResponse); // Responde con los datos simulados
  });

  it('debería hacer una solicitud GET para obtener vendedores', () => {
    const mockVendedores = [
      { id: '1', nombre: 'Juan', apellido: 'Pérez' },
      { id: '2', nombre: 'Ana', apellido: 'Gómez' }
    ];

    service.obtenerVendedores().subscribe(vendedores => {
      expect(vendedores).toEqual(mockVendedores); // Compara la respuesta con el mock
    });

    // Simula la solicitud HTTP y la respuesta
    const req = httpMock.expectOne(`${apiUrlVe}/Consultar`);
    expect(req.request.method).toBe('GET'); // Verifica que la solicitud sea GET
    req.flush(mockVendedores); // Responde con los datos simulados
  });

  it('debería hacer una solicitud POST para agregar vendedores a un plan', () => {
    const planId = '123';
    const idVendedores = [{ idVendedor: '1' }, { idVendedor: '2' }];
    const mockResponse = { mensaje: 'Vendedores agregados correctamente' };

    service.agregarVendedores(planId, idVendedores).subscribe(response => {
      expect(response).toEqual(mockResponse); // Compara la respuesta con el mock
    });

    // Simula la solicitud HTTP y la respuesta
    const req = httpMock.expectOne(`${addPlanV}/${planId}/Vendedores`);
    expect(req.request.method).toBe('POST'); // Verifica que la solicitud sea POST
    expect(req.request.body).toEqual(idVendedores); // Verifica el cuerpo de la solicitud
    req.flush(mockResponse); // Responde con los datos simulados
  });
});