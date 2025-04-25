/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TDocumentoService } from './TDocumento.service';

describe('Service: TDocumento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TDocumentoService]
    });
  });

  it('should ...', inject([TDocumentoService], (service: TDocumentoService) => {
    expect(service).toBeTruthy();
  }));
});
