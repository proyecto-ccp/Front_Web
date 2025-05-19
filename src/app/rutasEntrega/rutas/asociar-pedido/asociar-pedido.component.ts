import { Component, OnInit } from '@angular/core';
import { PedidoService } from './pedido.service';
import { ActivatedRoute } from '@angular/router';
import { RutaserviceService } from '../rutaservice.service';

@Component({
  selector: 'app-asociar-pedido',
  templateUrl: './asociar-pedido.component.html',
  styleUrls: ['./asociar-pedido.component.css']
})
export class AsociarPedidoComponent implements OnInit {
  pedidos: any[] = [];
  pedidosSeleccionados: Set<any> = new Set(); // Usamos un Set para gestionar la selección.
  idRuta: string = '';
  mensaje: string = '';
  mensajeError: string = '';

  constructor(
    private pedidoService: PedidoService,
    private rutaService: RutaserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idRuta = this.route.snapshot.paramMap.get('idRuta') || '';
    console.log("Ruta"+this.idRuta)
    this.obtenerPedidos('CONFIRMADO'); // o el estado que desees
  }

  obtenerPedidos(estado: string): void {
    this.pedidoService.obtenerPedidosPorEstado(estado).subscribe({
      next: (data) => {
        this.pedidos = data.pedidos || []; // Aseguramos que siempre sea un arreglo
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
      }
    });
  }

  toggleSeleccion(pedido: any): void {
    if (this.pedidosSeleccionados.has(pedido)) {
      this.pedidosSeleccionados.delete(pedido);
    } else {
      this.pedidosSeleccionados.add(pedido);
    }
  }

  asociarPedidos(): void {
    if (this.pedidosSeleccionados.size === 0) {
      alert('Debe seleccionar al menos un pedido y una ruta válida.');
      return;
    }

    const payload = Array.from(this.pedidosSeleccionados).map(p => ({ idPedido: p.id }));

    this.rutaService.asociarPedidosARuta(this.idRuta, payload).subscribe({
      next: () => {
        alert('Pedidos asociados exitosamente.');
        this.pedidosSeleccionados.clear(); // Limpiamos la selección después de asociar
        this.mensaje = 'Pedidos asociados exitosamente.';
      },
      error: (err) => {
        console.error('Error al asociar pedidos:', err);
        alert('Error al asociar pedidos.');
        this.mensajeError = 'Error al asociar pedidos:' + err;
      }
    });
  }
}