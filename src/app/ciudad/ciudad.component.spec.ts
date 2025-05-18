import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadComponent } from './ciudad.component';
import { CiudadService } from './ciudad.service';
import { of } from 'rxjs';

// Mock de datos
const mockCiudades = [
  { id: 1, nombre: 'Bogotá' },
  { id: 2, nombre: 'Medellín' }
];

// Mock del servicio
const mockCiudadService = {
  getCiudad: jasmine.createSpy().and.returnValue(of(mockCiudades))
};

describe('CiudadComponent', () => {
  let component: CiudadComponent;
  let fixture: ComponentFixture<CiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CiudadComponent],
      providers: [
        { provide: CiudadService, useValue: mockCiudadService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCiudad on init and set ciudad list', () => {
    expect(mockCiudadService.getCiudad).toHaveBeenCalled();
    expect(component.ciudad.length).toBe(2);
    expect(component.ciudad).toEqual(mockCiudades);
  });
});