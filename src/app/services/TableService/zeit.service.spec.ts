import { TestBed, inject } from '@angular/core/testing';
import { ZeitService } from './zeit.service';

describe('ZeitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZeitService]
    });
  });

  it('should be created', inject([ZeitService], (service: ZeitService) => {
    expect(service).toBeTruthy();
  }));
});
