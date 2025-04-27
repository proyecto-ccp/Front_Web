import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { environment } from 'src/environment';

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
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería obtener productos', () => {
    const productosMock = [
      { nombre: 'Producto A', precio: 100 },
      { nombre: 'Producto B', precio: 200 }
    ];

    service.obtenerProductos().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(productosMock);
    });

    const req = httpMock.expectOne(environment.apiUrl+'/api/Productos/Consultar');
    expect(req.request.method).toBe('GET');
    req.flush(productosMock);
  });

  it('debería guardar un producto', () => {
    const producto = { nombre: 'Producto Test', precio: 123 };

    service.guardarProducto(producto).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(environment.apiUrl+'/api/Productos/Crear');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(producto);
    req.flush({ success: true });
  });

  it('debería subir un archivo', () => {
    const archivoMock = new File(['contenido del archivo'], 'test.csv', { type: 'text/csv' });

    service.uploadFile(archivoMock).subscribe(response => {
      expect(response).toEqual({ mensaje: 'Archivo recibido' });
    });

    const req = httpMock.expectOne(environment.apiUrl+'/api/Archivos/EnviarPlanoCsv');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.has('file')).toBeTrue();

    const archivoEnviado = req.request.body.get('file') as File;
    expect(archivoEnviado.name).toBe('test.csv');

    req.flush({ mensaje: 'Archivo recibido' });
  });
});