import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenutzerhandbuchComponent } from './benutzerhandbuch.component';

describe('BenutzerhandbuchComponent', () => {
  let component: BenutzerhandbuchComponent;
  let fixture: ComponentFixture<BenutzerhandbuchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenutzerhandbuchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenutzerhandbuchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
