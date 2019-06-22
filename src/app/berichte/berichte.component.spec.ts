import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerichteComponent } from './berichte.component';

describe('BerichteComponent', () => {
  let component: BerichteComponent;
  let fixture: ComponentFixture<BerichteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerichteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerichteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
