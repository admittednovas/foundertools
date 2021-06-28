import { TestBed } from '@angular/core/testing';

import { CheckbreakpointService } from './checkbreakpoint.service';

describe('CheckbreakpointService', () => {
  let service: CheckbreakpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckbreakpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
