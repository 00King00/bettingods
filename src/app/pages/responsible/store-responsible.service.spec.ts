import { TestBed } from '@angular/core/testing';

import { StoreResponsibleService } from './store-responsible.service';

describe('StoreResponsibleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreResponsibleService = TestBed.get(StoreResponsibleService);
    expect(service).toBeTruthy();
  });
});
