import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesVentaComponent } from './PlanesVenta.component';
import { PlanesVentaService } from './planesVenta.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';  // Importa MatNativeDateModule

describe('PlanesVentaComponent', () => {
  let component: PlanesVentaComponent;
  let fixture: ComponentFixture<PlanesVentaComponent>;
  let mockService: jasmine.SpyObj<PlanesVentaService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PlanesVentaService', [
      'guardarPlan',
      'ObtenerPlan',
      'consultarProductosPlan'
    ]);

    await TestBed.configureTestingModule({
      declarations: [PlanesVentaComponent],
      imports: [
        RouterTestingModule, 
        FormsModule,  
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,  // MatDatepickerModule para el uso de mat-datepicker
        MatNativeDateModule,  // Asegúrate de importar MatNativeDateModule
      ],
      providers: [
        { provide: PlanesVentaService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesVentaComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(PlanesVentaService) as jasmine.SpyObj<PlanesVentaService>;
    router = TestBed.inject(Router);

    // Espiar solo una vez en el beforeEach
    mockService.guardarPlan.and.returnValue(of({}));
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los planes al inicializar', () => {
    const mockPlanes = {
      planesVentas: [
        { id: '1', nombre: 'Plan 1', fechaInicio: new Date(), fechaFinal: new Date() }
      ]
    };
    mockService.ObtenerPlan.and.returnValue(of(mockPlanes));
    mockService.consultarProductosPlan.and.returnValue(of({ planVenta: { productos: [] } }));

    component.ngOnInit();

    expect(mockService.ObtenerPlan).toHaveBeenCalled();
    expect(component.planCreado.length).toBe(1);
    expect(component.planCreado[0].tieneProductos).toBeFalse();
  });

  it('debería mostrar error si falla cargarPlanes', () => {
    mockService.ObtenerPlan.and.returnValue(throwError(() => new Error('Error al cargar')));
    
    component.cargarPlanes();

    expect(component.errores).toContain('No se pudieron cargar los planes.');
  });

  it('debería guardar plan exitosamente', () => {
    const today = new Date();
    component.planVenta = {
      nombre: 'Plan Nuevo',
      fechaInicio: today,
      fechaFin: new Date(today.getTime() + 86400000) // +1 día
    };

    mockService.ObtenerPlan.and.returnValue(of({ planesVentas: [] }));

    component.guardarPlanVenta();

    expect(mockService.guardarPlan).toHaveBeenCalled();
    expect(component.mensaje).toBe('Plan creado con éxito.');
    expect(component.planVenta.nombre).toBe('');
  });

  it('debería mostrar error si fecha inicio < hoy', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    component.planVenta = {
      nombre: 'Plan Incorrecto',
      fechaInicio: yesterday,
      fechaFin: new Date()
    };

    component.guardarPlanVenta();

    expect(component.errores).toContain('La fecha de inicio no puede ser menor que la fecha actual.');
    expect(mockService.guardarPlan).not.toHaveBeenCalled();
  });

  it('debería mostrar error si faltan campos obligatorios', () => {
    component.planVenta = {
      nombre: '',
      fechaInicio: new Date(),
      fechaFin: new Date()
    };

    component.guardarPlanVenta();

    expect(component.errores).toContain('Todos los campos son obligatorios.');
  });

  it('debería mostrar error si fechaInicio > fechaFin', () => {
    const start = new Date();
    const end = new Date(start.getTime() - 86400000); // -1 día
    component.planVenta = {
      nombre: 'Plan',
      fechaInicio: start,
      fechaFin: end
    };

    component.guardarPlanVenta();

    expect(component.errores).toContain('Fecha Final debe ser mayor o igual a la inicial');
  });

  it('debería manejar errores de backend al guardar plan', () => {
    component.planVenta = {
      nombre: 'Plan con error',
      fechaInicio: new Date(),
      fechaFin: new Date()
    };

    const errorResponse = {
      error: {
        errors: {
          nombre: ['Nombre ya existe.']
        }
      }
    };

    mockService.guardarPlan.and.returnValue(throwError(() => errorResponse));

    component.guardarPlanVenta();

    expect(component.errores).toContain('Nombre ya existe.');
  });

  it('debería navegar a asociar productos', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const plan = { id: '123' } as any;

    component.irAAsociarProductos(plan);

    expect(navigateSpy).toHaveBeenCalledWith(['/asociar-productos', '123']);
  });

  it('debería navegar a asociar vendedores', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const plan = { id: '456' } as any;

    component.irAAsociarVendedores(plan);

    expect(navigateSpy).toHaveBeenCalledWith(['/asociar-vendedor', '456']);
  });

  it('consultarProductosPlan debe marcar tieneProductos en true si hay productos', () => {
    const plan = { id: '789', nombre: 'Plan prueba' };
    const respuesta = { planVenta: { productos: [{}] } };

    mockService.consultarProductosPlan.and.returnValue(of(respuesta));

    component.consultarProductosPlan(plan);

    expect(mockService.consultarProductosPlan).toHaveBeenCalledWith('789');
  });

  it('consultarProductosPlan debe manejar error del servicio', () => {
    const plan = { id: '999', nombre: 'Plan error' };
    const consoleSpy = spyOn(console, 'error');

    mockService.consultarProductosPlan.and.returnValue(throwError(() => new Error('Fallo')));

    component.consultarProductosPlan(plan);

    expect(consoleSpy).toHaveBeenCalledWith(`Error al consultar productos del plan 999:`, jasmine.any(Error));
  });

 
});