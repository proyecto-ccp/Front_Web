import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditarComponent } from './auditar.component';
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule
import { MatButtonModule } from '@angular/material/button';  // Si usas botones con iconos
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';  // Para DateAdapter
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Necesario para las animaciones
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Para pruebas HTTP
import { FormsModule } from '@angular/forms';  // Importa FormsModule

describe('AuditarComponent', () => {
  let component: AuditarComponent;
  let fixture: ComponentFixture<AuditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuditarComponent],
      imports: [
        MatIconModule,  // Asegúrate de importar MatIconModule
        MatButtonModule,  // Si utilizas botones con iconos
        MatDatepickerModule,  // Si usas mat-datepicker
        MatInputModule,  // Si usas mat-input
        MatNativeDateModule,  // Necesario para las fechas
        BrowserAnimationsModule,  // Necesario para las animaciones
        HttpClientTestingModule,  // Para simular peticiones HTTP
        FormsModule,  // Importa FormsModule para ngModel
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});