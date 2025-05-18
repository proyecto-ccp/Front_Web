import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuditoriaService } from './auditoria.service';
import { environment } from 'src/environment';

describe('AuditoriaService', () => {
  let service: AuditoriaService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrlAu}/api/Auditoria/ObtenerAuditoriasPorFecha`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditoriaService]
    });
    service = TestBed.inject(AuditoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpMock.verify();
  });

  it('debería obtener auditorías por fecha', () => {
    const fechaInicio = new Date('2025-05-15T16:00:00.420Z');
    const fechaFin = new Date('2025-05-22T16:00:00.420Z');
    const mockResponse = {
      auditorias: [{ id: 1, descripcion: 'Auditoria 1' }, { id: 2, descripcion: 'Auditoria 2' }]
    };

    service.obtenerAuditoriasPorFecha(fechaInicio, fechaFin).subscribe((data) => {
      expect(data.auditorias.length).toBe(2);
      expect(data.auditorias[0].descripcion).toBe('Auditoria 1');
    });

    // Verifica que la solicitud GET se hizo correctamente con los parámetros correctos
    const req = httpMock.expectOne((req) => {
      // Compara la URL base
      const urlMatch = req.url === apiUrl;
      
      // Compara los parámetros de la URL
      const fechaInicioMatch = req.params.has('fechaInicio') && req.params.get('fechaInicio') === fechaInicio.toISOString();
      const fechaFinMatch = req.params.has('fechaFin') && req.params.get('fechaFin') === fechaFin.toISOString();
      
      return urlMatch && fechaInicioMatch && fechaFinMatch;
    });
    
    expect(req).toBeTruthy(); // Verifica que la solicitud existe

    // Simula la respuesta con datos mockeados
    req.flush(mockResponse);
  });
});