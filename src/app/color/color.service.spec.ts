import { TestBed } from '@angular/core/testing';
import { ColorService } from './color.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // 👈 Importar esto

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // 👈 Agregar esto
      providers: [ColorService]
    });
    service = TestBed.inject(ColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});