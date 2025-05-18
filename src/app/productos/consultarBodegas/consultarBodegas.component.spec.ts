import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarBodegasComponent } from './consultarBodegas.component';
import { ProductoService } from '../producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ActivatedRouteStub } from './activated-route-stub';  // Necesitarás un stub para ActivatedRoute
import { FormsModule } from '@angular/forms'; // <-- IMPORTANTE

// Mock del ProductoService
const mockProductoService = {
  getBodegas: jasmine.createSpy().and.returnValue(of({ ubicaciones: [{ idBodega: 1, nombre: 'Bodega 1' }, { idBodega: 2, nombre: 'Bodega 2' }] }))
};

// Mock del Router
const mockRouter = {
  navigate: jasmine.createSpy()
};

describe('ConsultarBodegasComponent', () => {
  let component: ConsultarBodegasComponent;
  let fixture: ComponentFixture<ConsultarBodegasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarBodegasComponent],
      imports: [FormsModule],
      providers: [
        { provide: ProductoService, useValue: mockProductoService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }  // Simula la activación de la ruta
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarBodegasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});