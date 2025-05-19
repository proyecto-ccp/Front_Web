import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendedoresComponent } from './vendedores.component';
import { vendedorService } from './vendedores.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { ZonasService } from '../zonas/zonas.service';
import { PaisService } from '../pais/pais.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('VendedoresComponent', () => {
  let component: VendedoresComponent;
  let fixture: ComponentFixture<VendedoresComponent>;
  let mockVendedorService: jasmine.SpyObj<vendedorService>;
  let mockTDocumentoService: jasmine.SpyObj<TDocumentoService>;
  let mockCiudadService: jasmine.SpyObj<CiudadService>;
  let mockZonasService: jasmine.SpyObj<ZonasService>;
  let mockPaisService: jasmine.SpyObj<PaisService>;

  beforeEach(async () => {
    const spyVendedor = jasmine.createSpyObj('vendedorService', ['guardarVendedores']);
    const spyTDocumento = jasmine.createSpyObj('TDocumentoService', ['getTDcoumento']);
    const spyCiudad = jasmine.createSpyObj('CiudadService', ['getCiudad']);
    const spyZonas = jasmine.createSpyObj('ZonasService', ['getZonas']);
    const spyPais = jasmine.createSpyObj('PaisService', ['getPaises', 'getIndicativoPais']);

    await TestBed.configureTestingModule({
      declarations: [VendedoresComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      providers: [
        { provide: vendedorService, useValue: spyVendedor },
        { provide: TDocumentoService, useValue: spyTDocumento },
        { provide: CiudadService, useValue: spyCiudad },
        { provide: ZonasService, useValue: spyZonas },
        { provide: PaisService, useValue: spyPais }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VendedoresComponent);
    component = fixture.componentInstance;
    mockVendedorService = TestBed.inject(vendedorService) as jasmine.SpyObj<vendedorService>;
    mockTDocumentoService = TestBed.inject(TDocumentoService) as jasmine.SpyObj<TDocumentoService>;
    mockCiudadService = TestBed.inject(CiudadService) as jasmine.SpyObj<CiudadService>;
    mockZonasService = TestBed.inject(ZonasService) as jasmine.SpyObj<ZonasService>;
    mockPaisService = TestBed.inject(PaisService) as jasmine.SpyObj<PaisService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar los países al inicializar', () => {
    const tiposDocumentos = [{ id: 1, descripcion: 'CC' }];
    const ciudades = [{ id: '1', nombre: 'Ciudad 1' }];
    const zonas = [{ id: '1', nombre: 'Zona 1' }];
    const paises = [{ id: 1, nombre: 'Colombia' }];

    mockTDocumentoService.getTDcoumento.and.returnValue(of({ tiposDocumentos }));
    mockCiudadService.getCiudad.and.returnValue(of({ ciudades }));
    mockZonasService.getZonas.and.returnValue(of({ zonas }));
    mockPaisService.getPaises.and.returnValue(of({ paises }));

    component.ngOnInit();

    expect(mockPaisService.getPaises).toHaveBeenCalled();
    expect(component.paises).toEqual(paises);
  });

  it('debería cargar los tipos de documentos al inicializar', () => {
    const tiposDocumentos = [{ id: 1, descripcion: 'CC' }];
    const ciudades = [{ id: '1', nombre: 'Bogotá' }];
    const paises = [{ id: 1, nombre: 'Colombia' }];
    const zonas = [{ id: 'z1', nombre: 'Zona 1' }];

    mockTDocumentoService.getTDcoumento.and.returnValue(of({ tiposDocumentos }));
    mockCiudadService.getCiudad.and.returnValue(of({ ciudades }));
    mockZonasService.getZonas.and.returnValue(of({ zonas }));
    mockPaisService.getPaises.and.returnValue(of({ paises }));

    component.ngOnInit();

    expect(mockTDocumentoService.getTDcoumento).toHaveBeenCalled();
    expect(component.tipoDocumento).toEqual(tiposDocumentos);
  });

  it('debería cargar las ciudades al inicializar', () => {
    const ciudades = [{ id: '1', nombre: 'Ciudad 1' }];
    const zonas = [{ id: 'z1', nombre: 'Zona 1' }];
    const tiposDocumentos = [{ id: 1, descripcion: 'CC' }];
    const paises = [{ id: 1, nombre: 'Colombia' }];

    mockTDocumentoService.getTDcoumento.and.returnValue(of({ tiposDocumentos }));
    mockCiudadService.getCiudad.and.returnValue(of({ ciudades }));
    mockZonasService.getZonas.and.returnValue(of({ zonas }));
    mockPaisService.getPaises.and.returnValue(of({ paises }));

    component.ngOnInit();

    expect(mockCiudadService.getCiudad).toHaveBeenCalled();
    expect(component.ciudades).toEqual(ciudades);
  });

  it('debería guardar un vendedor correctamente', () => {
    const vendedor = {
      nombre: 'Juan',
      apellido: 'Pérez',
      idTipoDocumento: 1,
      numeroDocumento: '12345678',
      correo: 'juan.perez@example.com',
      telefono: '300-1234567',
      direccion: 'Calle 123',
      idzona: 'zona-001',
      contrasena:'abc12345678',
      idUsuario:'81f78b2c-2c3a-4e05-85e4-97900435b8b2'
    };
    mockVendedorService.guardarVendedores.and.returnValue(of({ message: 'Vendedor guardado correctamente.' }));
    component.vendedor = vendedor;

    component.Guardar();

    expect(mockVendedorService.guardarVendedores).toHaveBeenCalledWith(vendedor);
    expect(component.mensaje).toBe('Vendedor guardado correctamente.');
  });

  it('debería manejar el error al guardar un vendedor', () => {
    const errorResponse = { error: { errors: { nombre: ['El nombre es requerido'] } } };
    mockVendedorService.guardarVendedores.and.returnValue(throwError(() => errorResponse));

    component.Guardar();

    expect(component.mensajeError).toContain('El nombre es requerido');
  });

  it('debería actualizar el teléfono correctamente con el formato de indicativo', () => {
    component.indicativo = '+57';
    component.vendedor = {
      nombre: 'Carlos',
      apellido: 'Ramírez',
      idTipoDocumento: 1,
      numeroDocumento: '12345678',
      correo: 'carlos@example.com',
      telefono: '3001234567',
      direccion: 'Calle 1',
      idzona: 'zona1',
      contrasena:'abc12345678',
      idUsuario:'81f78b2c-2c3a-4e05-85e4-97900435b8b2'
    };

    mockVendedorService.guardarVendedores.and.returnValue(of({ message: 'Vendedor guardado correctamente.' }));

    component.Guardar();

    expect(mockVendedorService.guardarVendedores).toHaveBeenCalledWith(jasmine.objectContaining({
      telefono: '+57 3001234567'
    }));
    expect(component.mensaje).toBe('Vendedor guardado correctamente.');
  });

  it('debería obtener el indicativo del país al seleccionar un país', () => {
    const pais = { id: 1, nombre: 'Colombia' };
    const indicativo = { pais: { indicativo: '+57' } };
    mockPaisService.getIndicativoPais.and.returnValue(of(indicativo));

    component.idPais = pais.id;
    component.onPaisSelected();

    expect(mockPaisService.getIndicativoPais).toHaveBeenCalledWith(pais.id);
    expect(component.indicativo).toBe('+57');
  });

  it('debería manejar el error al obtener el indicativo del país', () => {
    mockPaisService.getIndicativoPais.and.returnValue(throwError(() => new Error('Error al obtener indicativo')));

    component.idPais = 1;
    component.onPaisSelected();

    expect(component.indicativo).toBe('');
  });

  it('debería cargar las zonas al seleccionar una ciudad', () => {
    const zonas = [{ id: '1', nombre: 'Zona 1' }];
    mockZonasService.getZonas.and.returnValue(of({ zonas }));

    const event = {
      target: { value: '1' }
    } as unknown as Event;

    component.onCitySelected(event);

    expect(mockZonasService.getZonas).toHaveBeenCalledWith('1');
    expect(component.zonas).toEqual(zonas)
  });
  it('debería limpiar el formulario', () => {
    component.vendedor.nombre = 'Test';
    component.limpiarFormulario();
    expect(component.vendedor.nombre).toBe('');
  });
  it('debería devolver el nombre del campo o el mismo nombre si no está mapeado', () => {
    expect(component.obtenerNombreCampo('nombre')).toBe('Nombre');
    expect(component.obtenerNombreCampo('campoDesconocido')).toBe('campoDesconocido');
  });
});




