import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarProductosComponent } from './consultarProductos.component';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PaginatePipe } from 'src/app/pipes/paginate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

// Mock del ProductoService
const mockProductoService = {
  obtenerProductos: jasmine.createSpy().and.returnValue(of({
    productos: [
      { id: 1, nombre: 'Producto 1', idProveedor: 'Proveedor1' },
      { id: 2, nombre: 'Producto 2', idProveedor: 'Proveedor2' },
    ]
  }))
};

// Mock del Router
const mockRouter = {
  navigate: jasmine.createSpy()
};

describe('ConsultarProductosComponent', () => {
  let component: ConsultarProductosComponent;
  let fixture: ComponentFixture<ConsultarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarProductosComponent],
      imports: [PaginatePipe, NgxPaginationModule, FormsModule],
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerProductos on ngOnInit and load products', () => {
    component.ngOnInit();
    expect(mockProductoService.obtenerProductos).toHaveBeenCalled();
    expect(component.producto.length).toBe(2);  // Verifica que se cargaron 2 productos
    expect(component.productosFiltrados.length).toBe(2);  // Verifica que los productos filtrados sean los mismos inicialmente
  });

  it('should apply filtroProveedor correctly', () => {
    component.filtroProveedor = 'Proveedor1';
    component.aplicarFiltrosProveedor();
    expect(component.productosFiltrados.length).toBe(1);  // Debería filtrar y mostrar solo un producto
    expect(component.productosFiltrados[0].idProveedor).toBe('Proveedor1');
  });

  it('should apply filtroId correctly', () => {
    component.filtroIdProducto = '1';
    component.aplicarFiltrosId();
    expect(component.productosFiltrados.length).toBe(1);  // Debería filtrar y mostrar solo un producto
    expect(component.productosFiltrados[0].id).toBe(1);
  });

  it('should navigate to consultarBodegas with the correct product ID', () => {
    const productoId = { id: 1 };  // Producto con id 1
    component.irAConsultarBodegas(productoId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/consultarBodegas/', 1]);
  });

  
});