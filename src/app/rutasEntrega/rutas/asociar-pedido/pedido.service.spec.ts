import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PedidoService } from './pedido.service';
import { environment } from 'src/environment';

describe('PedidoService', () => {
  let service: PedidoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PedidoService]
    });

    service = TestBed.inject(PedidoService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.setItem('token', 'fake-token'); // Simula el token
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no hay peticiones pendientes
    localStorage.removeItem('token');
  });

  it('debería llamar a la API con el token y retornar pedidos por estado', () => {
    const estado = 'CONFIRMADO';
    const mockPedidos = { pedidos: [{ id: '1', estado: 'CONFIRMADO' }] };

    service.obtenerPedidosPorEstado(estado).subscribe(data => {
      expect(data).toEqual(mockPedidos);
    });

    const req = httpMock.expectOne(`${environment.apiUrlPe}/api/Pedido/ObtenerPedidosPorEstado/${estado}`);
    expect(req.request.method).toBe('GET');

    const authHeader = req.request.headers.get('Authorization');
    expect(authHeader).toBe('Bearer fake-token');

    req.flush(mockPedidos); // Simula la respuesta del servidor
  });
});