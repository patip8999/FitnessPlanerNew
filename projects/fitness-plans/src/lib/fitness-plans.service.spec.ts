import { TestBed } from '@angular/core/testing';

import { FitnessPlansService } from './fitness-plans.service';

describe('FitnessPlansService', () => {
  let service: FitnessPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitnessPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
