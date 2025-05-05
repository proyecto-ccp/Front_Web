import { TestBed } from '@angular/core/testing';
import { CategoriaService } from './categoria.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environment';


describe('CategoriaService', () => {
  let service: CategoriaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 👈 esto es obligatorio
      providers: [CategoriaService]
    });

    service = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // verifica que no hayan peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener categorías', () => {
    const mockResponse = [
      { id: 1, nombre: 'Tecnología' },
      { id: 2, nombre: 'Ropa' }
    ];

    service.getCategoria().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].nombre).toBe('Tecnología');
    });


    const req = httpMock.expectOne(environment.apiUrl+'/api/Atributos/Categorias'); // 👈 poné tu URL real acá

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
