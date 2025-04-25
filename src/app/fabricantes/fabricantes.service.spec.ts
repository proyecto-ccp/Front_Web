/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FabricantesService } from './fabricantes.service';

describe('Service: Fabricantes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FabricantesService]
    });
  });

  it('should ...', inject([FabricantesService], (service: FabricantesService) => {
    expect(service).toBeTruthy();
  }));
});
