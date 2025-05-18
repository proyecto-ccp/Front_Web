import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsociarVendedorComponent } from './asociar-vendedor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vendedorService } from 'src/app/vendedores/vendedores.service';
import { of, throwError } from 'rxjs';

describe('AsociarVendedorComponent', () => {
  let component: AsociarVendedorComponent;
  let fixture: ComponentFixture<AsociarVendedorComponent>;
  let vendedorSpy: jasmine.SpyObj<vendedorService>;

  beforeEach(async () => {
    vendedorSpy = jasmine.createSpyObj('vendedorService', ['obtenerVendedores', 'agregarVendedores']);

    await TestBed.configureTestingModule({
      declarations: [AsociarVendedorComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: vendedorService, useValue: vendedorSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'plan123'
              }
            }
          }
        },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsociarVendedorComponent);
    component = fixture.componentInstance;

    // 👉 Mock que evita el error de "undefined.subscribe"
    vendedorSpy.obtenerVendedores.and.returnValue(of({ vendedores: [{ id: '1', nombre: 'Juan' }] }));
    fixture.detectChanges();  // ngOnInit se llama aquí
  });

  it('debería cargar la lista de vendedores correctamente', () => {
    expect(vendedorSpy.obtenerVendedores).toHaveBeenCalled();
    expect(component.vendedores.length).toBeGreaterThan(0);
  });

  it('debería seleccionar un vendedor correctamente', () => {
    component.toggleSeleccion('1');
    expect(component.vendedoresSeleccionados).toContain('1');

    component.toggleSeleccion('1');
    expect(component.vendedoresSeleccionados).not.toContain('1');
  });

  it('debería mostrar error si no se seleccionan vendedores al guardar', () => {
    component.vendedoresSeleccionados = [];
    component.guardarAsociacion();

    expect(component.errores).toContain('Debe seleccionar al menos un vendedor.');
  });

  it('debería guardar los vendedores correctamente', () => {
    component.vendedoresSeleccionados = ['1'];
    vendedorSpy.agregarVendedores.and.returnValue(of({}));

    component.guardarAsociacion();

    expect(vendedorSpy.agregarVendedores).toHaveBeenCalledWith('plan123', [{ idVendedor: '1' }]);
    expect(component.mensaje).toBe('Vendedores asociados con éxito.');
    expect(component.mensajeError).toBe('');
  });

  it('debería manejar error al asociar vendedores', () => {
    component.vendedoresSeleccionados = ['1'];
    vendedorSpy.agregarVendedores.and.returnValue(throwError(() => ({ message: 'Error' })));

    component.guardarAsociacion();

    expect(component.errores).toContain('No se pudieron asociar los vendedores.');
  });
})