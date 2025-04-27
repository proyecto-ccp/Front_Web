/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { TDocumentoService } from './TDocumento.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environment';



describe('TDocumentoService', () => {
  let service: TDocumentoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 👈 Importante
      providers: [TDocumentoService]
    });

    service = TestBed.inject(TDocumentoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener los tipos de documento', () => {
    const mockData = {
      documentos: [
        { id: 1, nombre: 'DNI' },
        { id: 2, nombre: 'Pasaporte' }
      ]
    };

    service.getTDcoumento().subscribe(data => {
      expect(data.documentos.length).toBe(2);
      expect(data.documentos[0].nombre).toBe('DNI');
    });


    const req = httpMock.expectOne(environment.apiUrl+'/api/Documentos/TiposDocumento'); // Reemplaza con la URL real del servicio


    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});