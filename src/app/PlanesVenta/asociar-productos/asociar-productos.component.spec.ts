import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsociarProductosComponent } from './asociar-productos.component';
import { ProductoService } from 'src/app/productos/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AsociarProductosComponent', () => {
  let component: AsociarProductosComponent;
  let fixture: ComponentFixture<AsociarProductosComponent>;
  let mockProductoService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(() => {
    // Mocking ProductoService
    mockProductoService = {
      obtenerProductos: jasmine.createSpy().and.returnValue(of({ productos: [{ id: 1, nombre: 'Producto 1', precioUnitario: 100 }] })),
      agregarProductos: jasmine.createSpy().and.returnValue(of({}))
    };

    // Mocking ActivatedRoute
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('123')
        }
      }
    };

    // Mocking Router
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      declarations: [AsociarProductosComponent],
      imports: [
        MatPaginatorModule,  // Importar el módulo del paginador
        HttpClientTestingModule
      ],
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Para evitar errores si usas otros componentes personalizados
    }).compileComponents();

    fixture = TestBed.createComponent(AsociarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    component.ngOnInit();
    expect(mockProductoService.obtenerProductos).toHaveBeenCalled();
    expect(component.productos.length).toBe(1);
    expect(component.productos[0].nombre).toBe('Producto 1');
  });

  it('should handle error when loading products', () => {
    mockProductoService.obtenerProductos.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(component.errores.length).toBeGreaterThan(0);
    expect(component.errores[0]).toBe('No se pudieron cargar los productos.');
  });

  it('should filter products by supplier', () => {
    component.productos = [
      { id: 1, idProveedor: 'A', nombre: 'Producto 1' },
      { id: 2, idProveedor: 'B', nombre: 'Producto 2' }
    ];
    component.filtroProveedor = 'A';
    component.aplicarFiltrosProveedor();
    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].idProveedor).toBe('A');
  });

  it('should filter products by product ID', () => {
    component.productos = [
      { id: 1, nombre: 'Producto 1' },
      { id: 2, nombre: 'Producto 2' }
    ];
    component.filtroIdProducto = '1';
    component.aplicarFiltrosId();
    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].id).toBe(1);
  });

  
  it('should associate selected products', () => {
    component.productos = [
      { id: 1, nombre: 'Producto 1', seleccionado: true, cantidad: 2, precioUnitario: 100 },
      { id: 2, nombre: 'Producto 2', seleccionado: false, cantidad: 0, precioUnitario: 100 }
    ];
    component.asociarProductos();
    expect(mockProductoService.agregarProductos).toHaveBeenCalled();
    expect(component.mensaje).toBe('Productos asociados con éxito.');
  });

  it('should show error when no product is selected for association', () => {
    component.productos = [
      { id: 1, nombre: 'Producto 1', seleccionado: false, cantidad: 2, precioUnitario: 100 }
    ];
    component.asociarProductos();
    expect(component.errores.length).toBeGreaterThan(0);
    expect(component.errores[0]).toBe('Debe seleccionar al menos un producto.');
  });

  it('should show error when selected product has invalid quantity', () => {
    component.productos = [
      { id: 1, nombre: 'Producto 1', seleccionado: true, cantidad: 0, precioUnitario: 100 }
    ];
    component.asociarProductos();
    expect(component.errores.length).toBeGreaterThan(0);
    expect(component.errores[0]).toBe('Debe ingresar una cantidad válida para cada producto seleccionado.');
  });
  it('should handle error when associating products', () => {
    const errorResponse = { message: 'Error associating products' };
    mockProductoService.agregarProductos.and.returnValue(throwError(() => errorResponse));

    component.productos[0].seleccionado = true;
    component.productos[0].cantidad = 2;
    
    component.asociarProductos();

    expect(component.errores).toContain('No se pudieron asociar los productos.');
  });

});