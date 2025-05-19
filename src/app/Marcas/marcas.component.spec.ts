import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcasComponent } from './Marcas.component';
import { MarcaService } from './marca.service';
import { of } from 'rxjs';

// Mock del servicio
const mockMarcaService = {
  getMarcas: jasmine.createSpy().and.returnValue(of([
    { id: 1, nombre: 'Marca 1' },
    { id: 2, nombre: 'Marca 2' }
  ]))
};

describe('MarcasComponent', () => {
  let component: MarcasComponent;
  let fixture: ComponentFixture<MarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarcasComponent],
      providers: [
        { provide: MarcaService, useValue: mockMarcaService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Esto ejecuta ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMarcas and set marcas on init', () => {
    expect(mockMarcaService.getMarcas).toHaveBeenCalled();
    expect(component.marcas.length).toBe(2);
    expect(component.marcas[0].nombre).toBe('Marca 1');
  });
});