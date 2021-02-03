import { TestBed } from '@angular/core/testing';

import { AnneeUnivService } from './annee-univ.service';

describe('AnneeUnivService', () => {
  let service: AnneeUnivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneeUnivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
