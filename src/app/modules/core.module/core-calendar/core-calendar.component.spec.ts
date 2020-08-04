import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCalendarComponent } from './core-calendar.component';

describe('CoreCalendarComponent', () => {
  let component: CoreCalendarComponent;
  let fixture: ComponentFixture<CoreCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
