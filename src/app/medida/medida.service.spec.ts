import { TestBed } from '@angular/core/testing';
import { MedidaService } from './medida.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environment';


describe('MedidaService', () => {
  let service: MedidaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Asegúrate de importar HttpClientTestingModule
      providers: [MedidaService]  // Asegúrate de que el servicio esté declarado
    });
    service = TestBed.inject(MedidaService);  // Inyecta el servicio
    httpMock = TestBed.inject(HttpTestingController);  // Inyecta el HttpTestingController
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no haya solicitudes pendientes
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();  // Verifica que el servicio haya sido creado correctamente
  });

  // Aquí puedes agregar más pruebas relacionadas con el servicio
  it('debería realizar una solicitud GET', () => {
    const mockResponse = { medida: 'valor' };

    service.getMedida().subscribe(response => {
      expect(response).toEqual(mockResponse);  // Verifica que la respuesta sea la esperada
    });

    // Simula la respuesta de la solicitud HTTP

    const req = httpMock.expectOne(environment.apiUrl+'/api/Atributos/Medidas');

    expect(req.request.method).toBe('GET');  // Verifica que el método sea GET
    req.flush(mockResponse);  // Simula la respuesta de la solicitud
  });
});