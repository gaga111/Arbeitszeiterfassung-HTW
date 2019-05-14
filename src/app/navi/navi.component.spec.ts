
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviComponent } from './navi.component';

describe('NaviComponent', () => {
  let component: NaviComponent;
  let fixture: ComponentFixture<NaviComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NaviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
