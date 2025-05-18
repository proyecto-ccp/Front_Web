import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';  // Importa MatDatepickerModule
import { MatInputModule } from '@angular/material/input';  // Si usas mat-input
import { MatNativeDateModule } from '@angular/material/core';  // Importa MatNativeDateModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';  // Importa FormsModule si usas ngModel
import { FabricantesComponent } from './fabricantes.component';  // Ajusta esto según tu ruta
import { PaisService } from '../pais/pais.service';
import { FabricantesService } from './fabricantes.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { of, throwError } from 'rxjs';  // Importar 'of' y 'throwError' de rxjs

describe('FabricantesComponent', () => {
  let component: FabricantesComponent;
  let fixture: ComponentFixture<FabricantesComponent>;
  let fabricantesServiceSpy: jasmine.SpyObj<FabricantesService>;  // Define el espía del servicio

  beforeEach(async () => {
    // Crea un espía para el servicio FabricantesService
    fabricantesServiceSpy = jasmine.createSpyObj('FabricantesService', ['guardarProveedores']);

    await TestBed.configureTestingModule({
      declarations: [FabricantesComponent],
      imports: [
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FabricantesService, useValue: fabricantesServiceSpy },
        PaisService,
      { provide: CiudadService },
        TDocumentoService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería inicializar correctamente los datos en ngOnInit', () => {
    const getCiudadesSpy = spyOn(component, 'getCiudades').and.callThrough();
    const getTDocumentoSpy = spyOn(component, 'getTDocumento').and.callThrough();
    const getPaisesSpy = spyOn(component, 'getPaises').and.callThrough();
  
    component.ngOnInit();
  
    expect(getCiudadesSpy).toHaveBeenCalled();
    expect(getTDocumentoSpy).toHaveBeenCalled();
    expect(getPaisesSpy).toHaveBeenCalled();
  });

  it('debería guardar el fabricante correctamente', () => {
    const responseMock = { message: 'Fabricante guardado correctamente.' };
    fabricantesServiceSpy.guardarProveedores.and.returnValue(of(responseMock));  // Usar el espía aquí
    
    component.Guardar();
  
    expect(fabricantesServiceSpy.guardarProveedores).toHaveBeenCalled();
    expect(component.mensaje).toBe('Fabricante guardado correctamente.');
    expect(component.mensajeError).toBe('');
  });

  it('debería manejar los errores al guardar el fabricante', () => {
    const errorMock = { error: { errors: { nombre: 'El nombre es obligatorio' } } };
    fabricantesServiceSpy.guardarProveedores.and.returnValue(throwError(() => errorMock));  // Usar el espía aquí
  
    component.Guardar();
  
    expect(fabricantesServiceSpy.guardarProveedores).toHaveBeenCalled();
    expect(component.mensajeError).toContain('El nombre es obligatorio');
  });

  

  it('debería formatear el número de teléfono correctamente', () => {
    const telefonoMock = '1234567890';
    component.telefonoFormateado = telefonoMock;
  
    expect(component.fabricantes.telefono).toBe('123-456-7890');
  });

  it('debería limpiar los campos después de guardar', () => {
    const limpiarCamposSpy = spyOn(component, 'limpiarCampos').and.callThrough();
    const responseMock = { message: 'Fabricante guardado correctamente.' };
    fabricantesServiceSpy.guardarProveedores.and.returnValue(of(responseMock));  // Usar el espía aquí
  
    component.Guardar();
  
    expect(limpiarCamposSpy).toHaveBeenCalled();
  });

  

  it('debería manejar las peticiones HTTP correctamente', () => {
    // Escribe tu prueba aquí, ejemplo para un servicio de API que te devuelve un error
    const errorMock = { error: 'Error en la API' };
    fabricantesServiceSpy.guardarProveedores.and.returnValue(throwError(() => errorMock));  // Usar el espía aquí
  
    component.Guardar();
  
    expect(fabricantesServiceSpy.guardarProveedores).toHaveBeenCalled();
    expect(component.mensajeError).toBe('No se pudo interpretar la respuesta del servidor');
  });
});