import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener productos', () => {
    const dummyProductos = [{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }];

    service.obtenerProductos().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyProductos);
    });

    const req = httpMock.expectOne('https://productos-596275467600.us-central1.run.app/api/Productos/Consultar');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProductos);
  });
});