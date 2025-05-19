import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos.component';
import { MarcaService } from '../Marcas/marca.service';
import { MaterialService } from '../material/material.service';
import { ColorService } from '../color/color.service';
import { ModeloService } from '../modelo/modelo.service';
import { CategoriaService } from '../categoria/categoria.service';
import { MedidaService } from '../medida/medida.service';
import { ProductoService } from './producto.service';
import { FabricantesService } from '../fabricantes/fabricantes.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;
  let guardarProductoSpy: jasmine.Spy;



  // Mock services
  const mockMarcaService = {
    getMarcas: jasmine.createSpy().and.returnValue(of({ marcas: [{ id: 1, nombre: 'Marca 1' }] }))
  };

  const mockMaterialService = {
    getMaterial: jasmine.createSpy().and.returnValue(of({ materiales: [{ id: 1, nombre: 'Material 1' }] }))
  };

  const mockColorService = {
    getColor: jasmine.createSpy().and.returnValue(of({ colores: [{ id: 1, nombre: 'Color 1' }] }))
  };

  const mockModeloService = {
    getModelo: jasmine.createSpy().and.returnValue(of({ modelos: [{ id: 1, nombre: 'Modelo 1' }] }))
  };

  const mockCategoriaService = {
    getCategoria: jasmine.createSpy().and.returnValue(of({ categorias: [{ id: 1, nombre: 'Categoria 1' }] }))
  };

  const mockMedidaService = {
    getMedida: jasmine.createSpy().and.returnValue(of({ medidas: [{ id: 1, nombre: 'Medida 1' }] }))
  };

  const mockProductoService = {
    guardarProducto: jasmine.createSpy().and.returnValue(of({ mensaje: 'Producto guardado correctamenteProducto guardado correctamente' })),
    uploadFile: jasmine.createSpy().and.returnValue(of({ mensaje: 'Archivo subido' })),
    obtenerProductos: jasmine.createSpy().and.returnValue(of([]))
  };

  

  const mockFabricantesService = {
    getProveedores: jasmine.createSpy().and.returnValue(of({ proveedores: [{ id: 1, nombre: 'Proveedor 1' }] }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosComponent],
      imports: [FormsModule],
      providers: [
        { provide: MarcaService, useValue: mockMarcaService },
        { provide: MaterialService, useValue: mockMaterialService },
        { provide: ColorService, useValue: mockColorService },
        { provide: ModeloService, useValue: mockModeloService },
        { provide: CategoriaService, useValue: mockCategoriaService },
        { provide: MedidaService, useValue: mockMedidaService },
        { provide: ProductoService, useValue: mockProductoService },
        { provide: FabricantesService, useValue: mockFabricantesService },
      ]
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
    // 🔄 Resetea los spies
    mockProductoService.uploadFile.calls.reset();
    mockProductoService.guardarProducto.calls.reset();
    
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit and load data', () => {
    component.ngOnInit();
    expect(mockMarcaService.getMarcas).toHaveBeenCalled();
    expect(mockMaterialService.getMaterial).toHaveBeenCalled();
    expect(mockColorService.getColor).toHaveBeenCalled();
    expect(mockModeloService.getModelo).toHaveBeenCalled();
    expect(mockCategoriaService.getCategoria).toHaveBeenCalled();
    expect(mockMedidaService.getMedida).toHaveBeenCalled();
    expect(mockFabricantesService.getProveedores).toHaveBeenCalled();
  });

  it('should set selectedFile on file change when file is CSV', () => {
    const fakeCsv = new File(['id,nombre\n1,Producto'], 'archivo.csv', { type: 'text/csv' });
    const event = { target: { files: [fakeCsv] } };
  
    component.onFileChange(event);
  
    expect(component.selectedFile).toEqual(fakeCsv);
    expect(component.mensajeError).toBe('');
  });

  it('should call guardarProducto on Guardar()', () => {
    component.Guardar();
    expect(mockProductoService.guardarProducto).toHaveBeenCalledWith(component.productos);
  });

  it('should handle file upload on onSubmit()', () => {
    const fakeFile = new File([''], 'test.png', { type: 'image/png' });
    component.selectedFile = fakeFile;
    component.onSubmit();
    expect(mockProductoService.uploadFile).toHaveBeenCalledWith(fakeFile);
  });

  it('should call obtenerProductos()', () => {
    component.obtenerProductos();
    expect(mockProductoService.obtenerProductos).toHaveBeenCalled();
  });

  it('should reset form on limpiarFormulario()', () => {
    component.productos.nombre = 'Test';
    component.limpiarFormulario();
    expect(component.productos.nombre).toBe('');
    expect(component.productos.idMarca).toBe(0);
  });

  it('should call limpiarFormulario after guardar', () => {
    spyOn(component, 'limpiarFormulario');  // Espeje la función limpiarFormulario
    component.Guardar();  // Llama a la función Guardar
    
    expect(component.limpiarFormulario).toHaveBeenCalled();  // Verifica si se llamó a limpiarFormulario
  });

  it('should handle error when guardarProducto fails', () => {
    mockProductoService.guardarProducto.and.returnValue(throwError(() => new Error('Error')));
    component.Guardar();
    expect(component.mensajeError).toContain('Error al guardar el producto');
  });
  it('should handle error when loading marcas fails in ngOnInit', () => {
    mockMarcaService.getMarcas.and.returnValue(throwError(() => new Error('Error cargando marcas')));
    component.ngOnInit();
    expect(component.mensajeError).toContain('Error al cargar datos');
  });

  it('should handle error when loading materiales fails in ngOnInit', () => {
    mockMaterialService.getMaterial.and.returnValue(throwError(() => new Error('Error cargando materiales')));
    component.ngOnInit();
    expect(component.mensajeError).toContain('Error al cargar datos');
  });

  it('should not upload file if selectedFile is null in onSubmit', () => {
    component.selectedFile = null;
    component.onSubmit();
    expect(mockProductoService.uploadFile).not.toHaveBeenCalled();
  });

  it('should set mensaje and clear mensajeError after successful guardar', () => {
    const responseMock = { message: 'Producto guardado correctamente' };
    spyOn(mockProductoService, 'guardarProducto').and.returnValue(of(responseMock));
    spyOn(component, 'limpiarFormulario').and.callThrough(); // ✅ Espía correctamente
  
    component.Guardar();
  
    expect(component.mensaje).toBe('Producto guardado con éxito.');
    expect(component.mensajeError).toBe('');
    expect(component.limpiarFormulario).toHaveBeenCalled(); // ✅ Verifica que fue llamada
  });

  it('should show error if file is not a CSV in onFileChange', () => {
    const fakeFile = new File([''], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [fakeFile] } };
    component.onFileChange(event);
    expect(component.mensajeError).toContain('Solo se permiten archivos CSV');  // Verifica que el mensaje es correcto
  });

  it('should call limpiarFormulario after guardar', () => {
    spyOn(component, 'limpiarFormulario');
    component.Guardar();
    expect(component.limpiarFormulario).toHaveBeenCalled();
  });

  it('should initialize productos object correctly', () => {
    expect(component.productos).toEqual(jasmine.objectContaining({
      nombre: '',
      idMarca: 0,
      idMaterial: 0,
      idColor: 0,
      idModelo: 0,
      idCategoria: 0,
      idMedida: 0,
      idProveedor: '',
      precioUnitario: 0,
      descripcion: '',
    }));
  });
});