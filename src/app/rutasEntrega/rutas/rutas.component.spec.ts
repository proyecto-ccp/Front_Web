import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutasComponent } from './rutas.component';
import { RutaserviceService } from './rutaservice.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RutasComponent', () => {
  let component: RutasComponent;
  let fixture: ComponentFixture<RutasComponent>;
  let mockService: jasmine.SpyObj<RutaserviceService>;

  beforeEach(async () => {
    const rutasMock = jasmine.createSpyObj('RutaserviceService', ['guardarRutas', 'obtenerRutas']);

    await TestBed.configureTestingModule({
      declarations: [RutasComponent],
      imports: [FormsModule],
      providers: [
        { provide: RutaserviceService, useValue: rutasMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RutasComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(RutaserviceService) as jasmine.SpyObj<RutaserviceService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerRutas on ngOnInit', () => {
    const mockRutas = [{ id: 1, direccionOrigen: 'A', direccionDestino: 'B' }];
    mockService.obtenerRutas.and.returnValue(of({ rutas: mockRutas }));

    component.ngOnInit();

    expect(mockService.obtenerRutas).toHaveBeenCalled();
    expect(component.rutas).toEqual(mockRutas);
  });

  it('should set mensaje on guardarRutas success', () => {
    mockService.guardarRutas.and.returnValue(of({ mensaje: 'OK' }));

    component.model = {
      direccionOrigen: 'Origen',
      direccionDestino: 'Destino',
      tipoEntrega: 'Express',
      metodoTransporte: 'Camión'
    };

    component.guardarRutas();

    expect(mockService.guardarRutas).toHaveBeenCalledWith(component.model);
    expect(component.mensaje).toBe('Ruta creada con éxito.');
    expect(component.errores.length).toBe(0);
    expect(component.mensajeError).toBe('');
  });

  it('should handle backend validation errors on guardarRutas', () => {
    const errorResponse = {
      error: {
        errors: {
          direccionOrigen: ['Dirección origen requerida'],
          metodoTransporte: ['Método de transporte inválido']
        }
      }
    };

    mockService.guardarRutas.and.returnValue(throwError(() => errorResponse));

    component.guardarRutas();

    expect(component.errores).toContain('Dirección origen requerida');
    expect(component.errores).toContain('Método de transporte inválido');
    expect(component.mensajeError).toBe('Ocurrió un error al crear la ruta.');
  });

  it('should handle general error on guardarRutas', () => {
    mockService.guardarRutas.and.returnValue(throwError(() => new Error('Server down')));

    component.guardarRutas();

    expect(component.errores).toContain('Server down');
    expect(component.mensajeError).toBe('Ocurrió un error al crear la ruta.');
  });

  it('should handle error on obtenerRutas', () => {
    mockService.obtenerRutas.and.returnValue(throwError(() => new Error('Error cargando rutas')));

    component.obtenerRutas();

    expect(component.rutas.length).toBe(0);
    expect(component.mensajeError).toBe('Error al obtener rutas.');
  });
});