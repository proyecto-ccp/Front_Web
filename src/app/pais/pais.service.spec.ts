import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaisService } from './pais.service';
import { environment } from 'src/environment';

describe('PaisService', () => {
  let service: PaisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaisService]
    });

    service = TestBed.inject(PaisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should fetch countries', () => {
    const mockPaises = [{ id: 1, nombre: 'Colombia' }];

    service.getPaises().subscribe(paises => {
      expect(paises).toEqual(mockPaises);
    });

    const req = httpMock.expectOne(
      environment.apiUrlAt+'/api/Atributos/Localizacion/Paises' // Usa la URL correcta aquí
    );
    
    expect(req.request.method).toBe('GET');
    req.flush(mockPaises);
  });
});
