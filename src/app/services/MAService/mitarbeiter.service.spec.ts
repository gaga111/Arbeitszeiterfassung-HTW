import { TestBed, inject } from '@angular/core/testing';
import { MitarbeiterService } from '../MAService/mitarbeiter.service';


describe('MitarbeiterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitarbeiterService]
    });
  });

  it('should be created', inject([MitarbeiterService], (service: MitarbeiterService) => {
    expect(service).toBeTruthy();
  }));
});
