import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendedoresComponent } from './vendedores.component';
import { vendedorService } from './vendedores.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importar HttpClientTestingModule
import { FormsModule } from '@angular/forms';
 // También podrías necesitar esto en algunos casos.

describe('VendedoresComponent', () => {
  let component: VendedoresComponent;
  let fixture: ComponentFixture<VendedoresComponent>;
  let mockVendedorService: jasmine.SpyObj<vendedorService>;
  let mockTDocumentoService: jasmine.SpyObj<TDocumentoService>;

  beforeEach(async () => {
    // Crear un espía para el servicio vendedorService
    mockVendedorService = jasmine.createSpyObj('vendedorService', ['guardarVendedores']);
    mockTDocumentoService = jasmine.createSpyObj('TDocumentoService', ['getTDcoumento']);

    // Simulamos que getTDcoumento devuelve un observable con respuesta esperada
    mockTDocumentoService.getTDcoumento.and.returnValue(of({ documentos: [{ id: 1, nombre: 'CC' }] }));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule ],  // Asegúrate de que HttpClientTestingModule esté importado
      declarations: [VendedoresComponent],
      providers: [
        { provide: vendedorService, useValue: mockVendedorService },
        { provide: TDocumentoService, useValue: mockTDocumentoService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería limpiar el formulario', () => {
    component.vendedor.nombre = 'Juan';
    component.limpiarFormulario();
    expect(component.vendedor.nombre).toBe('');
    expect(component.vendedor.numeroDocumento).toBe('');
  });

  it('debería obtener los tipos de documento', () => {
    // Llamamos a getTDocumento() que hará la suscripción.
    component.getTDocumento();

    // Verificamos que la suscripción se haya llamado correctamente y se asignó el valor.
    expect(mockTDocumentoService.getTDcoumento).toHaveBeenCalled();
    expect(component.tipoDocumento).toEqual([{ id: 1, nombre: 'CC' }]);
  });

  it('debería guardar un vendedor correctamente', () => {
    const mockResponse = { mensaje: 'ok' };
    mockVendedorService.guardarVendedores.and.returnValue(of(mockResponse));

    spyOn(window, 'alert');

    component.Guardar();

    expect(mockVendedorService.guardarVendedores).toHaveBeenCalledWith(jasmine.any(Object));
  });
});