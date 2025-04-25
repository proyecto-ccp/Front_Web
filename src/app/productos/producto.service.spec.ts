import { TestBed } from '@angular/core/testing';
import { ProductoService } from './producto.service';  // Asegúrate de que la ruta sea correcta
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Agregamos HttpClientTestingModule para simular las peticiones HTTP
      providers: [ProductoService]  // Proveemos el ProductoService
    });

    // Inyectamos el servicio y el controlador HTTP
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  // Aquí puedes agregar más pruebas específicas para el servicio
  it('debería obtener productos correctamente', () => {
    const mockProductos = [
      { id: 1, nombre: 'Producto 1' },
      { id: 2, nombre: 'Producto 2' }
    ];

    // Llamada al servicio
    service.obtenerProductos().subscribe(productos => {
      expect(productos).toEqual(mockProductos);
    });

    // Simulamos la respuesta HTTP
    const req = httpMock.expectOne('https://productos-596275467600.us-central1.run.app/api/Productos/Consultar');
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);  // Simulamos la respuesta con mockProductos

    // Verificamos que no queden peticiones pendientes
    httpMock.verify();
  });
});